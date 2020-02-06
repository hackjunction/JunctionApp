/** A clone of the throng library with one edit: await for the master function
 *  to resolve before forking workers. Also adds the onError parameter in case
 *  said master function errors out.
 *
 *  See the commented section of the code below
 */

const cluster = require('cluster')
const { EventEmitter } = require('events')
const _ = require('lodash')
const cpuCount = require('os').cpus().length

const DEFAULT_OPTIONS = {
    workers: cpuCount,
    lifetime: Infinity,
    grace: 5000,
}

const NOOP = () => {}

module.exports = async (options, startFunction) => {
    options = options || {}
    const startFn = options.start || startFunction || options
    const masterFn = options.master || NOOP

    if (typeof startFn !== 'function') {
        throw new Error('Start function required')
    }
    if (cluster.isWorker) {
        return startFn(cluster.worker.id)
    }

    const opts = isNaN(options)
        ? _.defaults(options, DEFAULT_OPTIONS)
        : _.defaults({ workers: options }, DEFAULT_OPTIONS)
    const emitter = new EventEmitter()
    let running = true
    const runUntil = Date.now() + opts.lifetime

    function listen() {
        cluster.on('exit', revive)
        emitter.once('shutdown', shutdown)
        process.on('SIGINT', proxySignal).on('SIGTERM', proxySignal)
    }

    function fork() {
        for (let i = 0; i < opts.workers; i++) {
            cluster.fork()
        }
    }

    function proxySignal() {
        emitter.emit('shutdown')
    }

    function shutdown() {
        running = false
        for (const id in cluster.workers) {
            cluster.workers[id].process.kill()
        }
        setTimeout(forceKill, opts.grace).unref()
    }

    function revive(worker, code, signal) {
        if (running && Date.now() < runUntil) cluster.fork()
    }

    function forceKill() {
        for (const id in cluster.workers) {
            cluster.workers[id].kill()
        }
        process.exit()
    }

    /**
     * Await the masterFn completion, call onError otherwise. Previously this
     * was just:
     *
     * listen()
     * masterFn()
     * fork()
     */
    listen()
    try {
        await masterFn()
    } catch (e) {
        options.onError(e)
    }
    fork()
}

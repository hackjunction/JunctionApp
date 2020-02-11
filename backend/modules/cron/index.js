const CronJob = require('cron').CronJob

const generateEventResults = require('./jobs/generate-event-results.js')

const patterns = {
    DAILY_2AM: '0 0 2 * * *',
}

const jobs = {
    GENERATE_EVENT_RESULTS: (runImmediately = false) =>
        new CronJob(
            patterns.DAILY_2AM,
            generateEventResults(),
            null,
            runImmediately,
            'Europe/Helsinki'
        ),
}

const utils = {
    startAll: () => {
        Object.keys(jobs).forEach(job => {
            jobs[job](true).start()
        })
    },
}

module.exports = {
    utils,
    jobs,
    patterns,
}

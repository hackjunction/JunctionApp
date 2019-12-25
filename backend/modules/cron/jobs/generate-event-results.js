const moment = require('moment-timezone')
const Promise = require('bluebird')
const Event = require('../../event/model')

const RankingsController = require('../../rankings/controller')

const job = async () => {
    const allEvents = await Event.find({})

    /** Find all events which have ended */
    const pastEvents = allEvents.filter(event => {
        return moment(event.endTime)
            .tz(event.timezone)
            .isBefore()
    })

    /** */

    Promise.each(pastEvents, async event => {
        const results = await RankingsController.resetAllResults(event)
    })
}

module.exports = job

const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 23,
    name: '23-add-timeline-to-event',
    description: 'add timeline event',
    run: async () => {
        const nres = await mongoose
            .model('Event')
            .updateMany(
                { eventTimeline: { $exists: false } },
                { $set: { eventTimeline: { items: [] } } },
            )
        const bres = await mongoose
            .model('Event')
            .updateMany(
                { eventTimeline: null },
                { $set: { eventTimeline: { items: [] } } },
            )
        console.info('Done with event timeline', nres.n, nres.nModified)
        return Promise.resolve()
    },
}

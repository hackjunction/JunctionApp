const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 15,
    name: '04-add-meetingRooms-to-event',
    description: 'Add meeting rooms in to event',
    run: async () => {
        const res = await mongoose
            .model('Event')
            .updateMany(
                { meetingsEnabled: { $exists: false } },
                { $set: { meetingsEnabled: true } },
            )
        console.log('Done with meetingsEnabled', res.n, res.nModified)

        return Promise.resolve()
    },
}

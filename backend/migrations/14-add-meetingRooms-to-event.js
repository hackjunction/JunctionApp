const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 4,
    name: '04-add-meetingRooms-to-event',
    description: 'Add meeting rooms in to event',
    run: async () => {
        const res = await mongoose
            .model('Event')
            .updateMany(
                { meetingRooms: { $exists: false } },
                { $set: { meetingRooms: [] } },
            )
        console.log('Done with Events', res.n, res.nModified)

        return Promise.resolve()
    },
}

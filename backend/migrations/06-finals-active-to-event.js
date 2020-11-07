const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 6,
    name: '06-finals-to-event',
    description: 'Add finals check to event',
    run: async () => {
        const res = await mongoose
            .model('Event')
            .updateMany(
                { finalsActive: { $exists: false } },
                { $set: { finalsActive: false } },
            )

        console.log('Event', res.n, res.nModified)
        return Promise.resolve()
    },
}

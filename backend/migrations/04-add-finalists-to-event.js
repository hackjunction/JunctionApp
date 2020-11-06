const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 4,
    name: '04-add-finalists-to-event',
    description: 'Add finalists in to event',
    run: async () => {
        const res = await mongoose
            .model('Event')
            .updateMany(
                { finalists: { $exists: false } },
                { $set: { finalists: [] } },
            )
        console.log('Done with Events', res.n, res.nModified)

        return Promise.resolve()
    },
}

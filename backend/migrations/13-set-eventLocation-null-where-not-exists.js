const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 13,
    name: '13-set-eventLocation-null-where-not-exists',
    description: 'set eventLocation null where not exists',
    run: async () => {
        const nres = await mongoose
            .model('Event')
            .updateMany(
                { eventLocation: { $exists: false } },
                { $set: { eventLocation: null } },
            )
        console.info('Done with event timeline', nres.n, nres.nModified)
        return Promise.resolve()
    },
}

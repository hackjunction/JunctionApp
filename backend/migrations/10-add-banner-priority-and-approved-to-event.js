const mongoose = require('mongoose')
const Promise = require('bluebird')

// const UserProfileControlller = require('../modules/user-profile/controller')

module.exports = {
    index: 10,
    name: '10-add-banner-priority-and-approved-to-event',
    description: 'add fields to event',
    run: async () => {
        const res = await mongoose
            .model('Event')
            .updateMany(
                { approved: { $exists: false } },
                { $set: { approved: true } },
            )

        const nres = await mongoose
            .model('Event')
            .updateMany(
                { frontPagePriority: { $exists: false } },
                { $set: { frontPagePriority: 0 } },
            )

        console.log(
            'Done with event priority and approved',
            res.n,
            res.nModified,
            nres.n,
            nres.nModified,
        )
        return Promise.resolve()
    },
}

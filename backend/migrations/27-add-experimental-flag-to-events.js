const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 27,
    name: '27-add-experimental-flag-to-events',
    description:
        'Add new experimental flag to events, to allow events to use experimental features',
    run: async () => {
        const addExperimental = await mongoose.model('Event').updateMany(
            { experimental: { $exists: false } },
            {
                $set: {
                    experimental: false,
                },
            },
        )

        console.log(
            'Done adding experimental flag to events',
            addExperimental.n,
            addExperimental.nModified,
        )

        return Promise.resolve()
    },
}

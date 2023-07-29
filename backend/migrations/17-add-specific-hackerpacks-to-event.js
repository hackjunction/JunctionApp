const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 17,
    name: '17-add-specific-hackerpacks-to-event',
    description: 'Add specifc hackerpacks to event',
    run: async () => {
        const res = await mongoose.model('Event').updateMany(
            { hackerpacksEnabled: { $exists: false } },

            {
                $set: {
                    hackerpacksEnabled: true,
                },
            },
        )
        console.log('Done with Events', res.n, res.nModified)

        return Promise.resolve()
    },
}

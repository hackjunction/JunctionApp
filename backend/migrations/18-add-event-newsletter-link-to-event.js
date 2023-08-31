const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 18,
    name: '18-add-event-newsletter-link-to-event',
    description: 'Add event newsletter link to event',
    run: async () => {
        // Update newsletter field
        const resNewsletter = await mongoose
            .model('Event')
            .updateMany(
                { newsletter: { $exists: false } },
                { $set: { newsletter: '' } },
            )
        console.log(
            'Done updating newsletter field',
            resNewsletter.n,
            resNewsletter.nModified,
        )

        return Promise.resolve()
    },
}

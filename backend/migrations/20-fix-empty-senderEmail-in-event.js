const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 20,
    name: '20-fix-empty-senderEmail-in-event',
    description: 'Replace empty senderEmail with noreply@hackjunction.com',
    run: async () => {
        // Update emailConfig.senderEmail field for documents with an empty senderEmail
        const resSenderEmail = await mongoose
            .model('Event')
            .updateMany(
                { 'emailConfig.senderEmail': { $in: [null, ""] } },
                {
                    $set: {
                        'emailConfig.senderEmail': "noreply@hackjunction.com"
                    }
                }
            )

        console.log('Done updating empty senderEmail fields', resSenderEmail.n, resSenderEmail.nModified)

        return Promise.resolve()
    },
}

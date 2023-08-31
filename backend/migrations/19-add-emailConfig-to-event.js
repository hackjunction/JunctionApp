const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 19,
    name: '19-add-emailConfig-to-event',
    description: 'Add emailConfig to event',
    run: async () => {
        // Update emailConfig field
        const resEmailConfig = await mongoose.model('Event').updateMany(
            { emailConfig: { $exists: false } },
            {
                $set: {
                    emailConfig: {
                        senderName: '',
                        senderEmail: '',
                        acceptanceEmail: {
                            title: '',
                            subtitle: '',
                            body: '',
                        },
                        rejectionEmail: {
                            title: '',
                            subtitle: '',
                            body: '',
                        },
                        registrationEmail: {
                            title: '',
                            subtitle: '',
                            body: '',
                        },
                    },
                },
            },
        )
        console.log(
            'Done updating emailConfig field',
            resEmailConfig.n,
            resEmailConfig.nModified,
        )

        return Promise.resolve()
    },
}

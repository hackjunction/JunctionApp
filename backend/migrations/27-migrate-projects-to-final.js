const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 27,
    name: '27-migrate-projects-to-final',
    description: 'migrate juntion 23 event projects to final for gavel testing',
    run: async () => {
        // Update emailConfig.senderEmail field for documents with an empty senderEmail
        const projects = await mongoose
            .model('Project')
            .updateMany(
                { event: '647860c38fd56d0036cc6033'},
                {
                    $set: {
                        status: "final"
                    }
                }
            )

        console.log('Done migrate projects to final', projects.n, projects.nModified)

        return Promise.resolve()
    },
}

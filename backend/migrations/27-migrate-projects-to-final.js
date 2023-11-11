const mongoose = require('mongoose')
const Promise = require('bluebird')
const Project = require('../modules/project/model')

module.exports = {
    index: 27,
    name: '27-migrate-projects-to-final',
    description: 'migrate juntion 23 event projects to final for gavel testing',
    run: async () => {
        // Update emailConfig.senderEmail field for documents with an empty senderEmail
        const projects = await mongoose
            .model('Project')
            .find(
                { event: '647860c38fd56d0036cc6033'},
                { status: "draft "}
            )

        projects.forEach( p => {
           Project.findById(p._id).then(project => {
            
                project.status ="final"
            
            return project.save()
        }
            )
    })
        console.log('Done migrate projects to final')

        return Promise.resolve()
    },
}

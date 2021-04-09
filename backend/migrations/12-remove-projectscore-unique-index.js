const mongoose = require('mongoose')
const Promise = require('bluebird')
const logger = require('../misc/logger')

module.exports = {
    index: 12,
    name: '12-remove-projectscore-unique-index',
    description: 'Remove unique project score index from ProjectScore schema',
    run: async () => {
        const indexes = await mongoose.model('ProjectScore').listIndexes()
        const indexToDelete = indexes.find(
            index => index.name === 'project_1_event_1_challenge_1_track_1',
        )
        if (indexToDelete) {
            await mongoose
                .model('ProjectScore')
                .collection.dropIndex(indexToDelete.name)
            logger.info(`Unique index dropped`)
        } else {
            logger.info(`-> No indexes to delete`)
        }
        return Promise.resolve()
    },
}

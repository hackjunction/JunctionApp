const mongoose = require('mongoose')
const Promise = require('bluebird')
const logger = require('../misc/logger')

module.exports = {
    index: 1,
    name: '01-remove-project-unique-index',
    description: 'Remove unique team and event index from Project schema',
    run: async () => {
        const indexes = await mongoose.model('Project').listIndexes()
        const indexToDelete = indexes.find(
            index => index.name === 'event_1_team_1',
        )
        if (indexToDelete) {
            await mongoose
                .model('Project')
                .collection.dropIndex(indexToDelete.name)
            logger.info(`Unique index dropped`)
        } else {
            logger.info(`-> No indexes to delete`)
        }
        return Promise.resolve()
    },
}

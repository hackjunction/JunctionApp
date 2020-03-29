/** Change the way registration questions are stored in the Event model.
 *  Previously events had a rather strange UserDetailsConfig object for defining
 *  which questions to ask in the registration form. This script makes the following
 *  change to the event model:
 *
 *  Before:
 *  {
 *    userDetailsConfig: {
 *      phoneNumber: {
 *          enabled: true,
 *          required: true,
 *          editable: true
 *      },
 *      countryOfResidence: {
 *          enabled: true,
 *          required: false,
 *          editable: true
 *      },
 *      ...(all other fields here)
 *    }
 *  }
 *
 *  After:
 *  {
 *    registrationConfig: {
 *      optionalFields: ['countryOfResidence'],
 *      requiredFields: ['phoneNumber'],
 *    }
 *  }
 *
 *  In addition, the "editable" field which was used just for disallowing
 *  removing firstName, lastName, email from the registration questions, is
 *  replaced with just hardcoding this condition in code rather than in the
 *  event model.
 */

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
            index => index.name === 'event_1_team_1'
        )
        if (indexToDelete) {
            await mongoose
                .model('Project')
                .collection.dropIndex(indexToDelete.name)
            logger.info(`Unique index dropped`)
        } else {
            logger.info(`-> No indexes to deletee`)
        }
        return Promise.resolve()
    },
}

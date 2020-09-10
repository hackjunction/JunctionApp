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
    index: 0,
    name: '00-registration-questions',
    description: 'Migrate userDetailsConfig to registrationConfig',
    run: async () => {
        /** Get all events with the userDetailsConfig field */
        const events = await mongoose.model('Event').find({
            userDetailsConfig: {
                $ne: null,
            },
        })
        if (events.length > 0) {
            return Promise.map(events, event => {
                const { optionalFields, requiredFields } = Object.keys(
                    event.toJSON().userDetailsConfig,
                ).reduce(
                    (result, field) => {
                        if (
                            ['firstName', 'lastName', 'email'].indexOf(
                                field,
                            ) !== -1
                        ) {
                            return result
                        }
                        const obj = event.userDetailsConfig[field]
                        if (obj.enable) {
                            if (obj.require) {
                                result.requiredFields.push(field)
                            } else {
                                result.optionalFields.push(field)
                            }
                        }
                        return result
                    },
                    {
                        optionalFields: [],
                        requiredFields: [],
                    },
                )

                return mongoose.model('Event').findByIdAndUpdate(event._id, {
                    $set: {
                        registrationConfig: {
                            optionalFields,
                            requiredFields,
                        },
                    },
                    $unset: {
                        userDetailsConfig: '',
                    },
                })
            })
        }
        logger.info(`-> No events to migrate`)
        return Promise.resolve()
    },
}

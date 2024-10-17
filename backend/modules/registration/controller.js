/* eslint-disable no-param-reassign */
const _ = require('lodash')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const {
    RegistrationStatuses,
    RegistrationFields,
    FieldTypes,
    RegistrationTravelGrantStatuses,
    EventTypes,
    TravelGrantDetailsValidationSchema,
} = require('@hackjunction/shared')
const yup = require('yup')
const Registration = require('./model')
const {
    NotFoundError,
    ForbiddenError,
    AlreadyExistsError,
} = require('../../common/errors/errors')
const RegistrationHelpers = require('./helpers')
const EmailTaskController = require('../email-task/controller')
// const { checklistItemsOnline, checklistItemsPhysical } = require('./checklists')

const STATUSES = RegistrationStatuses.asObject
const TRAVEL_GRANT_STATUSES = RegistrationTravelGrantStatuses.asObject
const UserProfileController = require('../user-profile/controller')

const controller = {}

controller.getUserRegistrations = user => {
    return Registration.find({
        user: user.sub,
    })
}

controller.createRegistration = async (user, event, data) => {
    const answers = await RegistrationHelpers.registrationFromUser(data)
    try {
        const registration = new Registration({
            event: event._id.toString(),
            user: user.sub,
            answers,
        })
        // if (event.eventType === 'online') {
        //     registration.checklist = {
        //         items: checklistItemsOnline(),
        //     }
        // } else {
        //     registration.checklist = {
        //         items: checklistItemsPhysical(),
        //     }
        // }
        registration.status = RegistrationStatuses.asObject.incomplete.id
        return registration.save()
    } catch (error) {
        throw new AlreadyExistsError(
            'User already registered for this event',
            error,
        )
    }

    // return registration.save()
}

controller.createPartnerRegistration = async (user, event, data) => {
    let registration = {}
    try {
        const userProfile = await UserProfileController.getUserProfile(user)
        if (!userProfile) {
            throw new NotFoundError('User profile not found')
        }
        registration = new Registration({
            event: event._id.toString(),
            user: user,
            answers: {
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                email: userProfile.email,
            },
        })
        //TODO change to partner status later - Check if partner status works
        registration.status = RegistrationStatuses.asObject.incomplete.id
        return registration.save()
    } catch (error) {
        throw new ForbiddenError(
            'User Registration failed, try again or contact support',
            error,
        )
    }
}

controller.getRegistration = async (userId, eventId) => {
    return Registration.findOne({
        event: eventId,
        user: userId,
    }).then(registration => {
        if (!registration) {
            throw new NotFoundError(
                `Registration for event ${eventId} not found for user ${userId}`,
            )
        }
        return registration
    })
}

controller.updateRegistration = (user, event, data) => {
    return controller
        .getRegistration(user.sub, event._id.toString())
        .then(async registration => {
            // return Registration.updateAllowed(registration, { data })
            const modifiedRegistration = _.merge(registration.answers, data)
            const [success, answers] =
                await RegistrationHelpers.validateAnswers(
                    modifiedRegistration,
                    event,
                )
            // answers are valid
            if (answers) {
                return Registration.updateAllowed(registration, {
                    modifiedRegistration,
                })
            }
            // return false
        })
}

controller.finishRegistration = (user, event, data) => {
    return controller
        .getRegistration(user.sub, event._id.toString())
        .then(async registration => {
            const [success, answers] =
                await RegistrationHelpers.validateAnswers(data, event)
            // answers are valid
            if (answers) {
                // answers are complete
                if (success) {
                    if (
                        registration.status ===
                        RegistrationStatuses.asObject.incomplete.id
                    ) {
                        registration.status =
                            RegistrationStatuses.asObject.pending.id
                        // if (
                        //     event.eventType === EventTypes.physical.id ||
                        //     event.eventType === EventTypes.hybrid.id
                        // ) {
                        //     registration.status =
                        //         RegistrationStatuses.asObject.pending.id
                        // }
                        // TODO we most likely don't want to do this here? Get desired state from event?
                        // if (event.eventType === EventTypes.online.id) {
                        //     registration.status =
                        //         RegistrationStatuses.asObject.checkedIn.id
                        // }
                    }
                    return Registration.updateAllowed(registration, { answers })
                }
                return false
            }
            return false
        })
}

controller.confirmRegistration = (user, event) => {
    return controller
        .getRegistration(user.sub, event._id.toString())
        .then(registration => {
            switch (registration.status) {
                case STATUSES.accepted.id:
                    registration.status = STATUSES.confirmed.id
                    return registration.save()
                case STATUSES.acceptedToHub.id:
                    registration.status = STATUSES.confirmedToHub.id
                    return registration.save()
                default:
                    throw new ForbiddenError(
                        'Only accepted registrations can be confirmed',
                    )
            }
        })
}

controller.cancelRegistration = (user, event) => {
    return controller
        .getRegistration(user.sub, event._id.toString())
        .then(registration => {
            if (
                registration.status === STATUSES.confirmed.id ||
                registration.status === STATUSES.accepted.id ||
                registration.status === STATUSES.confirmedToHub.id ||
                registration.status === STATUSES.acceptedToHub.id
            ) {
                registration.status = STATUSES.cancelled.id
                return registration.save()
            }

            throw new ForbiddenError(
                'Only accepted or confirmed registrations can be cancelled',
            )
        })
}

controller.setTravelGrantDetailsForRegistration = async (
    user,
    event,
    travelGrantDetails,
) => {
    const schema = yup.object().shape(TravelGrantDetailsValidationSchema)
    const validated = await schema.validate(travelGrantDetails, {
        stripUnknown: true,
    })
    const registration = await controller.getRegistration(user.sub, event._id)

    if (registration.status !== STATUSES.checkedIn.id) {
        throw new ForbiddenError(
            'Only those can receive reimbursement who have checked-in at the event!',
        )
    }
    if (registration.travelGrant <= 0) {
        throw new ForbiddenError('This registration has no travel grant given.')
    }
    if (
        registration.travelGrantStatus &&
        registration.travelGrantStatus === TRAVEL_GRANT_STATUSES.accepted.id
    ) {
        throw new ForbiddenError('Accepted travel grants cannot be edited')
    }

    registration.travelGrantDetails = validated
    registration.travelGrantStatus = TRAVEL_GRANT_STATUSES.pending.id
    return registration.save()
}

controller.updateChecklist = (registrationId, data) => {
    return Registration.findById(registrationId).then(registration => {
        registration.checklist.items[data.itemIndex] = data.checklistItem
        return registration.save()
    })
}

controller.updateTravelGrantDetails = (registrationId, event, data) => {
    return Registration.findById(registrationId).then(registration => {
        if (data.hasOwnProperty('status')) {
            switch (data.status) {
                case 'pending': {
                    registration.travelGrantStatus =
                        TRAVEL_GRANT_STATUSES.pending.id
                    registration.travelGrantComment = undefined
                    registration.travelGrantAmount = undefined
                    break
                }
                case 'accepted': {
                    registration.travelGrantStatus =
                        TRAVEL_GRANT_STATUSES.accepted.id
                    registration.travelGrantAmount = data.amount
                    registration.travelGrantComment = undefined
                    break
                }
                case 'rejected': {
                    registration.travelGrantStatus =
                        TRAVEL_GRANT_STATUSES.rejected.id
                    registration.travelGrantComment = data.comment
                    registration.travelGrantAmount = undefined
                    break
                }
                default:
                    break
            }
        }
        return registration.save()
    })
}

controller.notifyAcceptedTravelGrants = async event => {
    const registrations = await Registration.find({
        event: event._id,
        travelGrantStatus: TRAVEL_GRANT_STATUSES.accepted.id,
    })
    Promise.map(
        registrations,
        registration => {
            return EmailTaskController.createTravelGrantDetailsAcceptedTask(
                registration,
                true,
            )
        },
        {
            concurrency: 10,
        },
    )
    return registrations.length
}

controller.notifyRejectedTravelGrants = async event => {
    const registrations = await Registration.find({
        event: event._id,
        travelGrantStatus: TRAVEL_GRANT_STATUSES.rejected.id,
    })
    Promise.map(
        registrations,
        registration => {
            return EmailTaskController.createTravelGrantDetailsRejectedTask(
                registration,
                true,
            )
        },
        {
            concurrency: 10,
        },
    )

    return registrations.length
}

controller.updateTravelGrantStatus = (user, event, status) => {
    return controller
        .getRegistration(user.sub, event._id.toString())
        .then(registration => {
            registration.travelGrantStatus = status
            return registration.save()
        })
}

controller.getRegistrationsForQuery = async (query, pagination) => {
    const found = await Registration.find(query)
        .sort({ updatedAt: 1, _id: 1 })
        .skip(pagination.skip)
        .limit(pagination.limit)

    const count = (await Registration.find(query).lean().countDocuments()) || 0
    return { found, count }
}

controller.getAllRegistrationsForEventWithRecruitmentConsent = async (
    eventId,
    consentQuery,
) => {
    const consentFilter = consentQuery || {
        'answers.recruitmentOptions.consent': true,
    }

    const found = await Registration.find({
        event: eventId,
        ...consentFilter,
    })
        .lean()
        .sort('updatedAt')
    console.log(found.length)
    return found
}

controller.getRegistrationsForEvent = (eventId, getFullStrings = false) => {
    return Registration.find({
        event: eventId,
    }).then(registrations => {
        /** TODO Do some minor optimisation here to cut down on size */
        return registrations.map(document => {
            const reg = document.toObject()
            if (!getFullStrings) {
                reg.answers = _.mapValues(reg.answers, (answer, field) => {
                    const fieldType = RegistrationFields.getFieldType(field)
                    if (answer === null) {
                    }
                    switch (fieldType) {
                        case FieldTypes.LONG_TEXT.id:
                            if (answer && answer.length > 10) {
                                return `${answer.slice(0, 10)}...`
                            }
                            return answer
                        default: {
                            if (field === 'CustomAnswers') {
                                answer = answer.map(customAnswer => {
                                    if (
                                        typeof customAnswer.value ===
                                            'string' &&
                                        customAnswer.value.length > 20
                                    ) {
                                        customAnswer.value = `${customAnswer.value.slice(
                                            0,
                                            10,
                                        )}...`
                                    }
                                    return customAnswer
                                })
                            }
                            // TODO This code seems to be returning a value tht is not assigned to anything, it can be removed
                            // else if (
                            //     answer &&
                            //     typeof answer === 'object' &&
                            //     !Array.isArray(answer) &&
                            //     Object.keys(answer).length > 0
                            // ) {
                            //     return _.mapValues(answer, subAnswer => {
                            //         if (
                            //             typeof subAnswer === 'string' &&
                            //             subAnswer.length > 50
                            //         ) {
                            //             return subAnswer.slice(0, 10)
                            //         }
                            //         return subAnswer
                            //     })
                            // }
                            return answer
                        }
                    }
                })
            }
            return reg
        })
    })
}

controller.selfAssignRegistrationsForEvent = (eventId, userId) => {
    return Registration.find({
        rating: null,
        assignedTo: null,
    })
        .sort({ createdAt: 'asc' })
        .limit(10)
        .then(registrations => {
            const registrationIds = registrations.map(r => r._id.toString())
            return Registration.updateMany(
                {
                    event: eventId,
                    _id: {
                        $in: registrationIds,
                    },
                },
                {
                    assignedTo: userId,
                },
            ).then(data => {
                return data.nModified
            })
        })
}

controller.assignRegistrationForEvent = data => {
    if (!data.userId)
        throw new Error('Must pass userId when assigning reviewer')
    return Registration.findByIdAndUpdate(data.registrationId, {
        assignedTo: data.userId,
    })
}

controller.bulkEditRegistrations = (eventId, userIds, edits, user) => {
    const cleanedEdits = _.pick(edits, [
        'status',
        'tags',
        'rating',
        'assignedTo',
        'travelGrant',
    ])
    return Registration.find({
        event: eventId,
        user: {
            $in: userIds,
        },
    }).then(registrations => {
        const updates = registrations
            .map(registration => {
                const edits = _.cloneDeep(cleanedEdits)
                if (edits.hasOwnProperty('status')) {
                    const status =
                        RegistrationStatuses.asObject[registration.status]
                    /*
                    if (!status?.allowEdit) {
                        delete edits.status
                    } */
                }
                if (edits.rating) {
                    edits.ratedBy = user.sub
                }

                if (edits.hasOwnProperty('tags')) {
                    edits.tags = _.uniq(
                        (registration.tags || []).concat(edits.tags),
                    )
                }

                if (Object.keys(edits).length === 0) return null
                return {
                    updateOne: {
                        filter: {
                            _id: registration._id,
                        },
                        update: edits,
                    },
                }
            })
            .filter(edit => edit !== null)

        return Registration.bulkWrite(updates)
    })
}

controller.bulkAssignTravelGrants = (eventId, grants) => {
    const updates = grants.map(({ _id, amount }) => {
        return Registration.findById(_id).then(reg => {
            reg.travelGrant = amount
            return reg.save()
        })
    })

    return Promise.all(updates)
}

controller.rejectPendingTravelGrants = eventId => {
    return Registration.find({
        event: eventId,
        status: {
            $in: ['confirmed', 'checkedIn'],
        },
        travelGrant: {
            $exists: false,
        },
        'answers.needsTravelGrant': true,
    }).then(registrations => {
        const promises = registrations.map(registration => {
            registration.travelGrant = 0
            return registration.save()
        })

        return Promise.all(promises)
    })
}

controller.getFullRegistration = (eventId, registrationId) => {
    const query =
        mongoose.Types.ObjectId.isValid(registrationId) &&
        registrationId.indexOf('|') === -1
            ? { _id: registrationId }
            : { user: registrationId }
    return Registration.findOne(query)
        .and({ event: eventId })
        .then(registration => {
            if (!registration) {
                throw new NotFoundError(
                    `Registration with id ${registrationId} does not exist`,
                )
            }

            return registration
        })
}

controller.editRegistration = (registrationId, event, data, user) => {
    return controller
        .getFullRegistration(event._id.toString(), registrationId)
        .then(registration => {
            const d = _.pick(data, [
                'status',
                'rating',
                'tags',
                'assignedTo',
                'travelGrant',
            ])
            registration.set(d)
            if (d.rating) {
                registration.ratedBy = user.sub
            }
            return registration.save()
        })
}

controller.getFullRegistrationsForEvent = eventId => {
    return Registration.find({
        event: eventId,
    })
}

controller.acceptSoftAccepted = async eventId => {
    const users = await Registration.find({
        event: eventId,
        status: RegistrationStatuses.asObject.softAccepted.id,
    })
    const accepted = await Promise.each(users, user => {
        user.status = RegistrationStatuses.asObject.accepted.id
        user.save()
    })
    return accepted
}

controller.rejectSoftRejected = async eventId => {
    const users = await Registration.find({
        event: eventId,
        status: RegistrationStatuses.asObject.softRejected.id,
    })
    const rejected = await Promise.each(users, user => {
        user.status = RegistrationStatuses.asObject.rejected.id
        user.save()
    })
    return rejected
}

// TODO optimize how gavelData and registrations are matched to avoid O(n^2) complexity
controller.addGavelLoginToRegistrations = async (eventId, gavelData) => {
    let updateCount = 0
    const registrations = await Registration.find({
        event: eventId,
        status: RegistrationStatuses.asObject.checkedIn.id,
    })
    gavelData.forEach(gavel => {
        if (
            typeof gavel.registration !== 'string' ||
            typeof gavel.link !== 'string'
        ) {
            throw new Error('Gavel data is invalid')
        }
        const registration = registrations.find(
            r => r._id.toString() === gavel.registration,
        )
        if (registration) {
            registration.gavelLogin = gavel.link
            updateCount++
            registration.save()
        }
    })
    const registrationCount = registrations.length
}

module.exports = controller

const Promise = require('bluebird')
const { RecruitmentAction } = require('./model')
const MongoUtils = require('../../common/utils/mongoUtils')
const UserController = require('../user-profile/controller')
const Registration = require('../registration/model')
// const EmailTaskController = require('../email-task/controller')
const RegistrationController = require('../registration/controller')
const userProfileUtils = require('../../common/utils/userProfileUtils')
const { NotFoundError } = require('../../common/errors/errors')

const controller = {}

controller.getRecruitmentProfile = async (userId, recruiterId, eventId) => {
    return await RegistrationController.getRegistration(userId, eventId).then(
        userRegistration => {
            return controller.createRecruitmentProfile(
                userRegistration,
                // true,
                recruiterId,
            )
        },
    )
}

//TODO add a query input to get all unpaginated profiles for a specific query
controller.getAllRecruitmentProfilesForEvent = async eventId => {
    // This function is to be used to get all recruitment profiles for an event, currently used to allow recruiters to download all profiles that consented to recruitment
    const consentFilter = { 'answers.recruitmentOptions.consent': true }

    try {
        return RegistrationController.getAllRegistrationsForEventWithRecruitmentConsent(
            eventId,
            consentFilter,
        ).then(results => {
            return Promise.all(
                results.map(profile => {
                    return controller.createRecruitmentProfile(profile)
                }),
            )
                .then(profiles => {
                    return profiles
                })
                .catch(err => {
                    throw new Error(`Error creating recruitment profiles`)
                })
        })
    } catch (err) {
        throw new Error(`Error querying registrations`)
    }
}

controller.queryProfiles = async (query = {}, user) => {
    let userQuery = {}
    let pagination = {}

    if (typeof query.filters === 'string') {
        userQuery = {
            $and: [
                {
                    $text: {
                        $search: query.filters,
                    },
                },
            ],
        }
    } else if (query.filters && query.filters.length) {
        const whereFields = query.filters.map(filter => {
            const formatted = MongoUtils.ensureObjectId(filter.value)
            return {
                [filter.field]: {
                    [MongoUtils.filterOperatorToMongoOperator(filter.operator)]:
                        formatted,
                },
            }
        })
        userQuery = { $and: whereFields }
    }
    if (query.pagination) {
        pagination = {
            skip: query.pagination.page_size * query.pagination.page,
            limit: query.pagination.page_size,
        }
    }

    // TODO include a consent case for when the user has given consent on their profile but not specifically for the event. It must use the user profile instead of the registration
    const consentFilter = { 'answers.recruitmentOptions.consent': true }
    const eventFilter = {
        event: MongoUtils.ensureObjectId(query.eventId),
    }
    userQuery.$and = userQuery.$and.concat(eventFilter)
    userQuery.$and = userQuery.$and.concat(consentFilter)

    try {
        return RegistrationController.getRegistrationsForQuery(
            userQuery,
            pagination,
        ).then(results => {
            return Promise.all(
                results.found.map(profile => {
                    return controller.createRecruitmentProfile(profile)
                }),
            )
                .then(profiles => {
                    return { data: profiles, count: results.count }
                })
                .catch(err => {
                    throw new Error(`Error creating recruitment profiles`)
                })
        })
    } catch (err) {
        throw new Error(`Error querying registrations`)
    }
}

controller.createRecruitmentProfile = async (
    userRegistration,
    // eager = false,
    recruiterId = null,
) => {
    // This function is to be used to create a recruitment profile from a user registration to an event
    // if (userRegistration.user)
    const userProfile = await UserController.getUserProfile(
        userRegistration.user,
    )
        .then(userProfileFound => {
            return userProfileFound
        })
        .catch(err => {
            throw new NotFoundError(`User ${userRegistration.user} not found`)
        })

    if (!userProfile) {
        throw new NotFoundError(`User ${userRegistration.user} not found`)
    }
    const profileComplete = userProfileUtils.recruitmentProfileBuilder(
        userRegistration,
        userProfile,
    )
    // if (eager) {
    // profileComplete.previousEvents = await Registration.find({
    //     user: userRegistration.userId,
    // })
    //     .populate('event')
    //     .then(registrations => {
    //         return registrations.map(reg => {
    //             if (reg.event) {
    //                 return { id: reg.event._id, name: reg.event.name }
    //             }
    //         })
    //     })
    // TODO review if recruitmentActionHistory is needed
    // profileComplete.recruitmentActionHistory = await RecruitmentAction.find({
    //     user: profileComplete.userId,
    //     recruiter: recruiterId
    // });
    // }

    return profileComplete
}

controller.saveRecruiterAction = async (recruiter, actionToSave) => {
    const { organisation, user, type, event } = actionToSave
    if (!organisation || !user || !type || !event) {
        throw new Error('Missing required fields')
    }

    if (type === 'favorite') {
        const actionExists = await RecruitmentAction.exists({
            recruiter: recruiter.sub,
            user,
            organisation,
            type,
            event,
        })
        if (!actionExists) {
            const action = new RecruitmentAction({
                recruiter: recruiter.sub,
                user,
                organisation,
                type,
                event,
            })
            await action.save()
        }
    }
    if (type === 'remove-favorite') {
        // Remove previous favorite
        await RecruitmentAction.deleteMany({
            organisation,
            recruiter: recruiter.sub,
            user,
            type: 'favorite',
            event,
        })
    }
    // TODO implement message action for recruiters
    // if (action.type === 'message') {
    //     await EmailTaskController.createRecruiterMessageTask(action)
    //     await action.save()
    // }

    return controller.getRecruiterActions(recruiter, organisation)
}

//TODO add getRecruiterActions by organisation
controller.getRecruiterActions = async (recruiter, organisation) => {
    // Organisation favorites can be found too if property organisation: organisation, is added to .find query
    return RecruitmentAction.find({
        recruiter: recruiter.sub,
    })
        .lean()
        .then(actions => {
            return Promise.map(actions, async action => {
                action._user = await controller.getRecruitmentProfile(
                    action.user,
                    action.recruiter,
                    action.event,
                )
                return action
            })
        })
}

module.exports = controller

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
                true,
                recruiterId,
            )
        },
    )
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
    eager = false,
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

    const profileComplete = userProfileUtils.recruitmentProfileBuilder(
        userRegistration,
        userProfile,
    )
    if (eager) {
        profileComplete.previousEvents = await Registration.find({
            user: userRegistration.userId,
        })
            .populate('event')
            .then(registrations => {
                return registrations.map(reg => {
                    if (reg.event) {
                        return { id: reg.event._id, name: reg.event.name }
                    }
                })
            })
        // TODO review if recruitmentActionHistory is needed
        // profileComplete.recruitmentActionHistory = await RecruitmentAction.find({
        //     user: profileComplete.userId,
        //     recruiter: recruiterId
        // });
    }

    return profileComplete
}

controller.saveRecruiterAction = async (recruiter, actionToSave) => {
    const action = new RecruitmentAction({
        recruiter: recruiter.sub,
        organisation: actionToSave.organisation,
        ...actionToSave,
    })
    if (action.type === 'favorite') {
        // Nothing todo, just save the action
        await action.save()
    }
    if (action.type === 'remove-favorite') {
        // Remove previous favorite
        await RecruitmentAction.deleteMany({
            organisation: action.organisation,
            user: action.user,
            type: 'favorite',
        })
    }
    // TODO implement message action for recruiters
    // if (action.type === 'message') {
    //     await EmailTaskController.createRecruiterMessageTask(action)
    //     await action.save()
    // }

    return controller.getRecruiterActions(recruiter, actionToSave.organisation)
}

controller.getRecruiterActions = async (recruiter, organisation) => {
    return (
        RecruitmentAction.find({
            organisation: organisation,
        })
            // .populate('_user _recruiter')
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
    )
}

module.exports = controller

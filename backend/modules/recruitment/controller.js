const Promise = require('bluebird')
const { RecruitmentAction } = require('./model')
const MongoUtils = require('../../common/utils/mongoUtils')
const UserController = require('../user-profile/controller')
const Registration = require('../registration/model')
const EmailTaskController = require('../email-task/controller')

const controller = {}

controller.getRecruitmentProfile = (userId, recruiterId) => {
    return UserController.getUserProfile(userId).then(userProfile => {
        return controller.createRecruitmentProfile(
            userProfile,
            true,
            recruiterId,
        )
    })
}

controller.queryProfiles = (query = {}, user) => {
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

    // Set event filters based on recruiter scope
    const consentFilter = {
        'recruitmentOptions.consent': 'true',
    } /* {
        $not: { 'recruitmentOptions.consent': false },
    } */

    /* {
        $or: [
            { 'recruitmentOptions.status': 'actively-looking' },
            { 'recruitmentOptions.status': 'up-for-discussions' },
            { 'recruitmentOptions.consent': true },
        ],
    } */
    const eventFilter = {
        registrations: {
            $elemMatch: {
                event: {
                    $in: MongoUtils.ensureObjectId(user.recruiter_events),
                },
            },
        },
    }

    // console.log('userquery are', JSON.stringify(userQuery))
    /* RegistrationController.getRegistrationsForEvent(
        '61012f8b31dc320049369a96',
    ).then(reg => {
        reg.filter(function (val) {
            /console.log(val.answers.recruitmentOptions)
            if (val.answers.recruitmentOptions)
                return val.answers.recruitmentOptions.consent === true
            return false
        })
        console.log(reg)
    }) */

    // Set default filters (consent & recruiter scope)
    if (userQuery.$and) {
        userQuery.$and = userQuery.$and.concat([consentFilter, eventFilter])
    } else {
        userQuery.$and = [eventFilter]
    }
    console.log('userquery', JSON.stringify(userQuery), user.recruiter_events)
    return UserController.queryProfiles({
        query: userQuery,
        pagination,
    }).then(results => {
        return Promise.all(
            results.found.map(profile => {
                return controller.createRecruitmentProfile(profile, false)
            }),
        ).then(profiles => {
            return { data: profiles, count: results.count }
        })
    })
}

controller.createRecruitmentProfile = async (
    userProfile,
    eager = false,
    recruiterId = null,
) => {
    const profile = {
        userId: userProfile.userId,
        profile: {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            email: userProfile.email,
            gender: userProfile.gender,
            nationality: userProfile.nationality,
            countryOfResidence: userProfile.countryOfResidence,
            dateOfBirth: userProfile.dateOfBirth,
            spokenLanguages: userProfile.spokenLanguages,
            profilePicture: userProfile.avatar || null,
            headline: userProfile.headline,
            biography: userProfile.biography,
        },
        skills: userProfile.skills,
        roles: userProfile.roles,
        industriesOfInterest: userProfile.industriesOfInterest,
        themesOfInterest: userProfile.themesOfInterest,
        education: userProfile.education,
        social: {
            github: userProfile.github,
            linkedin: userProfile.linkedin,
            portfolio: userProfile.portfolio,
            curriculumVitae: userProfile.curriculumVitae,
        },
        recruitmentOptions: userProfile.recruitmentOptions,
        registrations: userProfile.registrations,
    }

    if (eager) {
        profile.previousEvents = await Registration.find({
            user: userProfile.userId,
        })
            .populate('event')
            .then(registrations => {
                return registrations.map(reg => {
                    if (reg.event) {
                        return { id: reg.event._id, name: reg.event.name }
                    }
                    console.log('Missing reg.event in ', reg)
                })
            })

        // profile.recruitmentActionHistory = await RecruitmentAction.find({
        //     user: profile.userId,
        //     recruiter: recruiterId
        // });
    }

    // TODO get profile picture from social

    return profile
}

controller.saveRecruiterAction = async (recruiter, actionToSave) => {
    const action = new RecruitmentAction({
        recruiter: recruiter.sub,
        organisation: recruiter.recruiter_organisation,
        ...actionToSave,
    })

    if (action.type === 'favorite') {
        // Nothing todo, just save the action
        await action.save()
    }
    if (action.type === 'remove-favorite') {
        // Remove previous favorite
        await RecruitmentAction.deleteMany({
            organisation: recruiter.recruiter_organisation,
            user: action.user,
            type: 'favorite',
        })
    }
    if (action.type === 'message') {
        await EmailTaskController.createRecruiterMessageTask(action)
        await action.save()
    }

    return controller.getRecruiterActions(recruiter)
}

controller.getRecruiterActions = async recruiter => {
    return RecruitmentAction.find({
        organisation: recruiter.recruiter_organisation,
    })
        .populate('_user _recruiter')
        .lean()
        .then(actions => {
            return Promise.map(actions, async action => {
                action._user = await controller.createRecruitmentProfile(
                    action._user,
                )
                return action
            })
        })
}

module.exports = controller

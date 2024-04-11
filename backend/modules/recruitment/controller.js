const Promise = require('bluebird')
const { RecruitmentAction } = require('./model')
const MongoUtils = require('../../common/utils/mongoUtils')
const UserController = require('../user-profile/controller')
const Registration = require('../registration/model')
const EmailTaskController = require('../email-task/controller')
const RegistrationController = require('../registration/controller')
const userProfileUtils = require('../../common/utils/userProfileUtils')

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
        console.log(34)
    } else if (query.filters && query.filters.length) {
        const whereFields = query.filters.map(filter => {
            //console.log("query.filter", filter.value)
            const formatted = MongoUtils.ensureObjectId(filter.value)
            return {
                [filter.field]: {
                    [MongoUtils.filterOperatorToMongoOperator(filter.operator)]:
                        formatted,
                },
            }
        })
        userQuery = { $and: whereFields }
        //console.log(45)
    }
    if (query.pagination) {
        pagination = {
            skip: query.pagination.page_size * query.pagination.page,
            limit: query.pagination.page_size,
        }
        //console.log(51)
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
                    $in: MongoUtils.ensureObjectId(new Array(query.eventId)),
                },
            },
        },
    }
    //console.log("eventFilter", eventFilter, user)

    // console.log('userquery are', JSON.stringify(userQuery))
    /* const idsuper = await RegistrationController.getRegistrationsForEvent(
        '62cd62fcfb0cc900455212fb',
    ).then(reg => {
        const ab = reg.filter(function (val) {
            // console.log(val.answers.recruitmentOptions)
            if (val.answers.recruitmentOptions)
                return val.answers.recruitmentOptions.consent === true
            return false
        })
        // console.log(reg)
        return ab
    })
    // console.log(idsuper, idsuper.length)
    function selectuser(paska) {
        const { user } = paska
        return { user }
    }
    const user_list = idsuper.map(selectuser)
    const a = Object.keys(user_list).map(key => user_list[key].user)
    // console.log(a)

    const matcher = {
        userId: {
            $in: a,
        },
    } */
    // Set defaultfilters (consent & recruiter scope)
    if (userQuery.$and) {
        //console.log(107)
        userQuery.$and = userQuery.$and.concat([consentFilter, eventFilter])
    } else {
        userQuery.$and = [eventFilter]
        //console.log(110)
    }
    // userQuery.$and = userQuery.$and.concat([matcher])
    console.log('userquery', JSON.stringify(userQuery), 'pag', pagination)
    //console.log("query", userQuery, "pag", pagination, "reg", JSON.stringify(userQuery.registrations))
    return UserController.queryProfiles({
        query: userQuery,
        pagination,
    }).then(results => {
        return Promise.all(
            results.found.map(profile => {
                return controller.createRecruitmentProfile(profile, false)
            }),
        ).then(profiles => {
            console.log('profiles', profiles)
            return { data: profiles, count: results.count }
        })
    })
}

controller.createRecruitmentProfile = async (
    userProfile,
    eager = false,
    recruiterId = null,
) => {
    //TODO after the recruitmentProfileBuilder is tested, remove the commented code below
    // const profile = {
    //     userId: userProfile.userId,
    //     profile: {
    //         firstName: userProfile.firstName,
    //         lastName: userProfile.lastName,
    //         email: userProfile.email,
    //         gender: userProfile.gender,
    //         nationality: userProfile.nationality,
    //         countryOfResidence: userProfile.countryOfResidence,
    //         dateOfBirth: userProfile.dateOfBirth,
    //         spokenLanguages: userProfile.spokenLanguages,
    //         // TODO remove profilePicture and replace with avatar property
    //         profilePicture: userProfile.avatar || null,
    //         avatar: userProfile.avatar || null,
    //         headline: userProfile.headline,
    //         biography: userProfile.biography,
    //     },
    //     skills: userProfile.skills,
    //     roles: userProfile.roles,
    //     industriesOfInterest: userProfile.industriesOfInterest,
    //     themesOfInterest: userProfile.themesOfInterest,
    //     education: userProfile.education,
    //     social: {
    //         github: userProfile.github,
    //         linkedin: userProfile.linkedin,
    //         portfolio: userProfile.portfolio,
    //         curriculumVitae: userProfile.curriculumVitae,
    //     },
    //     recruitmentOptions: userProfile.recruitmentOptions,
    //     registrations: userProfile.registrations,
    // }
    const profile = userProfileUtils.recruitmentProfileBuilder(userProfile)
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
    if (action.type === 'message') {
        await EmailTaskController.createRecruiterMessageTask(action)
        await action.save()
    }

    return controller.getRecruiterActions(recruiter, actionToSave.organisation)
}

controller.getRecruiterActions = async (recruiter, organisation) => {
    return RecruitmentAction.find({
        organisation: organisation,
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

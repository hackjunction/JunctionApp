const { RecruitmentAction } = require('./model');
const UserController = require('../user-profile/controller');
const Registration = require('../registration/model');
const EmailTaskController = require('../email-task/controller');

const controller = {};

controller.getRecruitmentProfile = (userId, recruiterId) => {
    return UserController.getUserProfile(userId).then(userProfile => {
        return controller.createRecruitmentProfile(userProfile, true, recruiterId);
    });
};

controller.queryProfiles = (query = {}) => {
    let userQuery = {};
    let pagination = {};
    if (query.filters && query.filters.length) {
        const whereFields = query.filters.map(filter => {
            return {
                [filter.field]: {
                    [controller.filterOperatorToMongoOperator(filter.operator)]: filter.value
                }
            };
        });

        console.log(whereFields);
        userQuery = { $and: whereFields };
    }
    if (query.pagination) {
        pagination = {
            skip: query.pagination.page_size * query.pagination.page,
            limit: query.pagination.page_size
        };
    }
    // Set default filters
    userQuery['$and']
        ? userQuery['$and'].push({ 'recruitmentOptions.consent': { $eq: true } })
        : (userQuery = { 'recruitmentOptions.consent': true });

    return UserController.queryProfiles({
        query: userQuery,
        pagination: pagination
    }).then(results => {
        return Promise.all(
            results.found.map(profile => {
                return controller.createRecruitmentProfile(profile, false);
            })
        ).then(profiles => {
            return { data: profiles, count: results.count };
        });
    });
};

controller.filterOperatorToMongoOperator = operator => {
    if (operator == '<') return '$lt';
    if (operator == '<=') return '$lte';
    if (operator == '>') return '$gt';
    if (operator == '>=') return '$gte';
    if (operator == '==') return '$eq';
    if (operator == '!=') return '$ne';
    if (operator == 'array-element-match') return '$elemMatch';
    if (operator == 'contains') return '$in';
    if (operator == 'not-contains') return '$nin';
};

controller.createRecruitmentProfile = async (userProfile, eager = false, recruiterId = null) => {
    const profile = {
        userId: userProfile.userId,
        profile: {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            gender: userProfile.gender,
            nationality: userProfile.nationality,
            countryOfResidence: userProfile.countryOfResidence,
            dateOfBirth: userProfile.dateOfBirth,
            profilePicture: userProfile.avatar || null,
            bio: null // TODO add bio implementation!
        },
        skills: userProfile.skills,
        roles: userProfile.roles,
        industriesOfInterest: userProfile.industriesOfInterest,
        themesOfInterest: userProfile.themesOfInterest,
        education: userProfile.education,
        social: {
            github: userProfile.github,
            linkedin: userProfile.linkedin
        },
        registrations: userProfile.registrations
    };

    if (eager) {
        profile.previousEvents = await Registration.find({
            user: userProfile.userId
        })
            .populate('event')
            .then(registrations => {
                return registrations.map(reg => {
                    return { id: reg.event._id, name: reg.event.name };
                });
            });

        profile.recruitmentActionHistory = await RecruitmentAction.find({
            user: profile.userId,
            recruiter: recruiterId
        });
    }

    // TODO get profile picture from social

    return profile;
};

controller.saveRecruiterAction = async (recruiterId, actionToSave) => {
    const action = new RecruitmentAction({
        recruiter: recruiterId,
        organisation: 'Junction Ltd.',
        ...actionToSave
    });

    if (action.type === 'favorite') {
        // Nothing todo, just save the action
        return action.save();
    }
    if (action.type === 'remove-favorite') {
        // Remove previous favorite
        await RecruitmentAction.deleteMany({
            recruiter: recruiterId,
            user: action.user,
            type: 'favorite'
        });
    }
    if (action.type === 'message') {
        await EmailTaskController.createRecruiterMessageTask(action);
        return action.save();
    }

    return RecruitmentAction.find({ recruiter: recruiterId, user: action.user });
};

controller.getFavorites = async recruiter => {
    return RecruitmentAction.find({ type: 'favorite', recruiter: recruiter })
        .populate('_user')
        .then(actions =>
            Promise.all(
                actions.map(async action => {
                    // Convert profiles so we don't reveal contact data

                    action._user = await controller.createRecruitmentProfile(action._user);
                    return action._user;
                })
            )
        );
};

module.exports = controller;

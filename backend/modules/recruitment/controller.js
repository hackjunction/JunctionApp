const mongoose = require('mongoose');
const Promise = require('bluebird');
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

controller.queryProfiles = (query = {}, user) => {
    let userQuery = {};
    let pagination = {};
    if (typeof query.filters === 'string') {
        userQuery = {
            $and: [
                {
                    $text: {
                        $search: query.filters
                    }
                }
            ]
        };
    } else if (query.filters && query.filters.length) {
        const whereFields = query.filters.map(filter => {
            return {
                [filter.field]: {
                    [controller.filterOperatorToMongoOperator(filter.operator)]: filter.value
                }
            };
        });

        userQuery = { $and: whereFields };
    }
    if (query.pagination) {
        pagination = {
            skip: query.pagination.page_size * query.pagination.page,
            limit: query.pagination.page_size
        };
    }

    // Set event filters based on recruiter scope
    const consentFilter = { 'recruitmentOptions.consent': true };
    const eventFilter = {
        registrations: {
            $elemMatch: {
                event: {
                    $in: [mongoose.Types.ObjectId('5d5a7b2e9b1056002b824ad8')]
                }
            }
        }
    };
    //Set default filters (consent & recruiter scope)
    if (userQuery['$and']) {
        userQuery['$and'] = userQuery['$and'].concat([consentFilter, eventFilter]);
    } else {
        userQuery['$and'] = [consentFilter, eventFilter];
    }

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
            linkedin: userProfile.linkedin,
            portfolio: userProfile.portfolio
        },
        recruitmentOptions: userProfile.recruitmentOptions,
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

        // profile.recruitmentActionHistory = await RecruitmentAction.find({
        //     user: profile.userId,
        //     recruiter: recruiterId
        // });
    }

    // TODO get profile picture from social

    return profile;
};

controller.saveRecruiterAction = async (recruiter, actionToSave) => {
    const action = new RecruitmentAction({
        recruiter: recruiter.sub,
        organisation: recruiter.recruiter_organisation,
        ...actionToSave
    });

    if (action.type === 'favorite') {
        // Nothing todo, just save the action
        await action.save();
    }
    if (action.type === 'remove-favorite') {
        // Remove previous favorite
        await RecruitmentAction.deleteMany({
            recruiter: recruiter.sub,
            user: action.user,
            type: 'favorite'
        });
    }
    if (action.type === 'message') {
        await EmailTaskController.createRecruiterMessageTask(action);
        await action.save();
    }

    return controller.getRecruiterActions(recruiter);
};

controller.getRecruiterActions = async recruiter => {
    return RecruitmentAction.find({
        organisation: recruiter.recruiter_organisation
    })
        .populate('_user _recruiter')
        .lean()
        .then(actions => {
            return Promise.map(actions, async action => {
                action._user = await controller.createRecruitmentProfile(action._user);
                return action;
            });
        });
};

module.exports = controller;

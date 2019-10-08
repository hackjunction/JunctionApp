const _ = require("lodash");
const { RecruitmentAction } = require("./model");
const RegistrationController = require("../registration/controller");
const UserController = require("../user-profile/controller");
const Registration = require("../registration/model");

const controller = {};

controller.getRecruitmentProfile = userId => {
  return UserController.getUserProfile(userId).then(userProfile => {
    return controller.createRecruitmentProfile(userProfile, true);
  });
};

controller.queryProfiles = query => {
  let userQuery = {};
  let pagination = {};
  if (query.filters.length) {
    const whereFields = query.filters.map(filter => {
      return {
        [filter.field]: {
          [controller.filterOperatorToMongoOperator(
            filter.operator
          )]: filter.value
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
  console.log(userQuery);
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
  if (operator == "<") return "$lt";
  if (operator == "<=") return "$lte";
  if (operator == ">") return "$gt";
  if (operator == ">=") return "$gte";
  if (operator == "==") return "$eq";
  if (operator == "!=") return "$ne";
  if (operator == "array-contains") return "$in";
  if (operator == "array-not-contains") return "$nin";
};

controller.createRecruitmentProfile = async (userProfile, eager = false) => {
  const profile = {
    userId: userProfile.userId,
    profile: {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      gender: userProfile.gender,
      nationality: userProfile.nationality,
      countryOfResidence: userProfile.countryOfResidence,
      dateOfBirth: userProfile.dateOfBirth,
      profilePicture: userProfile.profilePicture || null,
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
    }
  };

  if (eager) {
    profile.previousEvents = await Registration.find({
      user: userProfile.userId
    })
      .populate("event")
      .then(registrations => {
        return registrations.map(reg => {
          return { id: reg.event._id, name: reg.event.name };
        });
      });

    profile.recruitmentActionHistory = await RecruitmentAction.find({
      userId: profile.userId
    });
  }

  // TODO get profile picture from social

  return profile;
};

module.exports = controller;

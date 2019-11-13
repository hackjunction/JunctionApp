const _ = require('lodash');
const Project = require('./model');
const Registration = require('../registration/model');
const UserProfileController = require('../user-profile/controller');
const { InsufficientPrivilegesError, ForbiddenError, NotFoundError } = require('../../common/errors/errors');

const controller = {};

controller.getAllProjectsForEvent = () => {
    /*TODO: */
};

controller.getProjectForTeam = team => {};

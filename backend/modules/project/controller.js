const _ = require('lodash');
const yup = require('yup');
const Project = require('./model');
const Registration = require('../registration/model');
const UserProfileController = require('../user-profile/controller');
const { ProjectSchema } = require('@hackjunction/shared');
const { InsufficientPrivilegesError, ForbiddenError, NotFoundError } = require('../../common/errors/errors');

const controller = {};

controller.getAllProjectsForEvent = () => {
    /*TODO: */
};

controller.getProjectByEventAndTeam = (eventId, teamId) => {
    return Project.findOne({
        event: eventId,
        team: teamId
    });
};

controller.createProjectForEventAndTeam = async (event, team, data) => {
    const schema = yup.object().shape(ProjectSchema(event));
    const validatedData = await schema.validate(data, { stripUnknown: true });
    const project = new Project({
        event: event._id,
        team: team._id,
        ...validatedData
    });

    return project.save();
};

controller.updateProjectForEventAndTeam = async (event, team, data) => {
    const schema = yup.object().shape(ProjectSchema(event));
    const validatedData = await schema.validate(data, { stripUnknown: true });
    const project = await controller.getProjectByEventAndTeam(event._id, team._id);
    project.set(validatedData);

    return project.save();
};

module.exports = controller;

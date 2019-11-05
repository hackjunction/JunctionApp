const Team = require('./model');
const { InsufficientPrivilegesError, ForbiddenError, NotFoundError } = require('../../common/errors/errors');

const controller = {};

controller.createTeam = (eventId, userId) => {
    const team = new Team({
        event: eventId,
        owner: userId
    });

    return team.save();
};

controller.deleteTeam = (eventId, userId) => {
    return controller.getTeam(eventId, userId).then(team => {
        if (team.owner !== userId) {
            throw new InsufficientPrivilegesError('Only the team owner can delete a team.');
        }
        return team.remove();
    });
};

controller.editTeam = (eventId, userId, edits) => {
    return controller.getTeam(eventId, userId).then(team => {
        if (team.owner !== userId) {
            throw new InsufficientPrivilegesError('Only the team owner can edit a team.');
        }
        return Team.updateAllowed(team, edits);
    });
};

controller.joinTeam = (eventId, userId, code) => {
    return controller.getTeamByCode(eventId, code).then(team => {
        if (team.members.length >= 4) {
            throw new ForbiddenError('Teams can have at most 5 members');
        }
        team.members = team.members.concat(userId);
        return team.save();
    });
};

controller.leaveTeam = (eventId, userId) => {
    return controller.getTeam(eventId, userId).then(team => {
        team.members = team.members.filter(member => member !== userId);
        return team.save();
    });
};

controller.removeMemberFromTeam = (eventId, userId, userToRemove) => {
    return controller.getTeam(eventId, userId).then(team => {
        if (team.owner !== userId) {
            throw new InsufficientPrivilegesError('Only the team owner can remove members');
        }
        team.members = team.members.filter(member => member !== userToRemove);
        return team.save();
    });
};

controller.getTeamByCode = (eventId, code) => {
    return Team.findOne({
        event: eventId,
        code: code
    }).then(team => {
        if (!team) {
            throw new NotFoundError('No team exists for this code and event');
        }
        return team;
    });
};

controller.getTeam = (eventId, userId) => {
    return Team.findOne({
        event: eventId
    })
        .or([{ owner: userId }, { members: userId }])
        .then(team => {
            if (!team) {
                throw new NotFoundError('No team exists for this user and event');
            }
            return team;
        });
};

controller.getTeamsForEvent = eventId => {
    return Team.find({
        event: eventId
    });
};

controller.getTeamStatsForEvent = async eventId => {
    const numTeams = await Team.countDocuments({
        event: eventId
    });

    return {
        numTeams
    };
};

module.exports = controller;

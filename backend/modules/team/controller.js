const Team = require('./model');
const { InsufficientPrivilegesError, ForbiddenError, NotFoundError } = require('../../common/errors/errors');

const controller = {};

controller.createTeam = (event, user) => {
    const team = new Team({
        event: event._id.toString(),
        owner: user.sub
    });

    return team.save();
};

controller.deleteTeam = (event, user, code) => {
    return controller.getTeamByCode(event, code).then(team => {
        if (team.owner !== user.sub) {
            throw new InsufficientPrivilegesError('Only the team owner can delete team');
        }
        return team.remove();
    });
};

controller.lockTeam = (event, user, code) => {
    return controller.getTeamByCode(event, code).then(team => {
        if (team.owner !== user.sub) {
            throw new InsufficientPrivilegesError('Only the team owner can lock a team');
        }
        team.locked = true;
        return team.save();
    });
};

controller.joinTeam = (event, user, code) => {
    return controller.getTeamByCode(event, code).then(team => {
        if (team.locked) {
            throw new ForbiddenError('Cannot join a locked team');
        }
        if (team.members.length >= 4) {
            throw new ForbiddenError('Teams can have at most 5 members');
        }
        team.members = team.members.concat(user.sub);
        return team.save();
    });
};

controller.leaveTeam = (event, user) => {
    return controller.getTeam(event, user).then(team => {
        if (team.locked) {
            throw new ForbiddenError('Cannot leave a locked team');
        }
        team.members = team.members.filter(member => member !== user.sub);
        return team.save();
    });
};

controller.removeMemberFromTeam = (event, user, userId) => {
    return controller.getTeam(event, user).then(team => {
        if (team.owner !== user.sub) {
            throw new InsufficientPrivilegesError('Only the team owner can remove members');
        }
        if (team.locked) {
            throw new ForbiddenError('Cannot remove members from a locked team');
        }
        team.members = team.members.filter(member => member !== userId);
        return team.save();
    });
};

controller.getTeamByCode = (event, code) => {
    return Team.findOne({
        event: event._id,
        code: code
    }).then(team => {
        if (!team) {
            throw new NotFoundError('No team exists for this code and event');
        }
        return team;
    });
};

controller.getTeam = (event, user) => {
    return Team.findOne({
        event: event._id
    })
        .or([{ owner: user.sub }, { members: user.sub }])
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

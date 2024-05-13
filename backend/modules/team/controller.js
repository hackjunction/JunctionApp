const _ = require('lodash')
const Team = require('./model')
const Registration = require('../registration/model')
const UserProfileController = require('../user-profile/controller')
const {
    InsufficientPrivilegesError,
    ForbiddenError,
    NotFoundError,
} = require('../../common/errors/errors')

const maxTeamSize = 5

const controller = {}

controller.getRoles = (eventId, code) => {
    return controller.getTeamByCode(eventId, code).then(team => {
        return team.roles
    })
}

controller.createTeam = (eventId, userId) => {
    const team = new Team({
        event: eventId,
        owner: userId,
    })

    return team.save()
}

controller.createNewTeam = (data, eventId, userId) => {
    // TODO abstract this deconstruction

    return controller
        .getTeamsForEvent(eventId)
        .then(teams => {
            console.log('Step 1')
            if (userHasTeam(teams.data, userId)) {
                throw new ForbiddenError('You are already in a team')
            }
            return removeCandidateApplications(teams.data, userId)
        })
        .then(teamsToSave => {
            console.log('Step 2')
            console.log('Teams to save: ', teamsToSave)
            const {
                teamRoles,
                name,
                subtitle,
                description,
                challenge,
                ideaTitle,
                ideaDescription,
                email,
                telegram,
                discord,
                slack,
            } = data
            const team = new Team({
                event: eventId,
                owner: userId,
                name,
                subtitle,
                description,
                challenge,
                ideaTitle,
                ideaDescription,
                email,
                telegram,
                discord,
                slack,
            })
            if (teamRoles && teamRoles.length > 0) {
                team.teamRoles = teamRoles.map(role => ({
                    role,
                }))
            } else {
                team.teamRoles = []
            }
            team.save()
            if (teamsToSave.length > 0) {
                Promise.all(teamsToSave.map(team => team.save()))
            }
            console.log('On team creation', team)

            return team
        })
        .catch(err => {
            console.log(err)
            throw new ForbiddenError(`${err}, refresh the page and try again`)
        })
}

controller.deleteTeam = (eventId, userId) => {
    return controller.getTeam(eventId, userId).then(team => {
        if (team.owner !== userId) {
            throw new InsufficientPrivilegesError(
                'Only the team owner can delete a team.',
            )
        }
        return team.remove()
    })
}

controller.deleteTeamByCode = (eventId, code) => {
    return controller.getTeamByCode(eventId, code).then(team => {
        return team.remove()
    })
}

controller.editTeam = (eventId, userId, edits) => {
    return controller.getTeam(eventId, userId).then(team => {
        if (team.owner !== userId && !_.includes(team.members, userId)) {
            throw new InsufficientPrivilegesError(
                'Only the team owner can edit a team.',
            )
        }
        if (edits.teamRoles && edits.teamRoles.length > 0) {
            if (typeof edits.teamRoles[0] === 'object') {
                edits.teamRoles = [...team.teamRoles]
            } else {
                const currentTeamRoles = team.teamRoles.map(role => {
                    return role.role
                })
                const compareRolesToAdd = _.difference(
                    edits.teamRoles,
                    currentTeamRoles,
                )
                const compareRolesToRemove = _.difference(
                    currentTeamRoles,
                    edits.teamRoles,
                )
                edits.teamRoles = [
                    ..._.reject(team.teamRoles, role =>
                        _.includes(compareRolesToRemove, role.role),
                    ),
                    ..._.filter(edits.teamRoles, role =>
                        _.includes(compareRolesToAdd, role),
                    ).map(role => ({ role })),
                ]
            }
        } else {
            edits.teamRoles = []
        }
        return Team.updateAllowed(team, edits)
    })
}

const userHasTeam = (teams, userId) => {
    let hasTeam = false
    const teamMembers = teams.map(team => team.members.concat(team.owner))
    teamMembers.map(team => {
        if (_.includes(team, userId)) {
            hasTeam = true
        }
    })
    console.log('User has team?: ', hasTeam)
    return hasTeam
}
const removeCandidateApplications = (teams, userId) => {
    const teamsToSave = []
    teams.map(team => {
        if (
            _.includes(
                team.candidates.map(candidate => candidate.userId),
                userId,
            )
        ) {
            team.candidates = team.candidates.filter(
                candidate => candidate.userId !== userId,
            )
            teamsToSave.push(team)
        }
    })
    return teamsToSave
}
controller.joinTeam = (eventId, userId, code) => {
    return controller.getTeamByCode(eventId, code).then(team => {
        // TODO HIGH PRIORITY team size defined in event

        if (team.members.length + 1 >= maxTeamSize) {
            throw new ForbiddenError(
                `Teams can have at most ${maxTeamSize} members`,
            )
        }
        return controller
            .getTeamsForEvent(eventId)
            .then(teams => {
                console.log('Step 1')
                if (userHasTeam(teams.data, userId)) {
                    throw new ForbiddenError('You are already in a team')
                }
                return teams.data
            })
            .then(teams => {
                console.log('Step 2')
                team.members = team.members.concat(userId)
                team.candidates = team.candidates.filter(
                    candidate => candidate.userId !== userId,
                )
                team.save()
                console.log('Team saved: ', team)
                return teams
            })
            .then(teams => {
                console.log('Step 3')
                const teamsToSave = removeCandidateApplications(
                    teams,
                    userId,
                ).filter(team => team.code !== code)
                console.log('Teams to save: ', teamsToSave)
                if (teamsToSave.length > 0) {
                    Promise.all(teamsToSave.map(team => team.save())).catch(
                        err => {
                            console.log(err)
                            throw new ForbiddenError(`Save failed`)
                        },
                    )
                }
                console.log('Step 3 - team: ', team)
                return team
            })
            .catch(err => {
                console.log(err)
                throw new ForbiddenError(
                    `${err}, refresh the page and try again`,
                )
            })
    })
}
//TODO: optimize this process, slow with over 200 teams
controller.acceptCandidateToTeam = (eventId, userId, code, candidateId) => {
    let teamToReturn
    return controller
        .getTeamByCode(eventId, code)
        .then(team => {
            if (team.members.length + 1 >= maxTeamSize) {
                throw new ForbiddenError(
                    `Teams can have at most ${maxTeamSize} members`,
                )
            }
            if (!_.includes([team.owner].concat(team.members), userId)) {
                throw new InsufficientPrivilegesError(
                    'Only the team members can accept candidates',
                )
            }
            teamToReturn = team

            return controller.getTeamsForEvent(eventId)
        })
        .then(teams => {
            console.log('Step 1')
            if (userHasTeam(teams.data, candidateId)) {
                teamToReturn.candidates = teamToReturn.candidates.filter(
                    candidate => candidate.userId !== candidateId,
                )
                teamToReturn.save()
                throw new ForbiddenError('Candidate is already in a team')
            }
            return teams.data
        })
        .then(teams => {
            console.log('Step 2')
            teamToReturn.members = teamToReturn.members.concat(candidateId)
            teamToReturn.candidates = teamToReturn.candidates.filter(
                candidate => candidate.userId !== candidateId,
            )
            teamToReturn.save()
            return teams
        })
        .then(teams => {
            console.log('Step 3')
            const teamsToSave = removeCandidateApplications(
                teams,
                candidateId,
            ).filter(team => team.code !== code)
            if (teamsToSave.length > 0) {
                Promise.all(teamsToSave.map(team => team.save())).catch(err => {
                    console.log(err)
                    throw new ForbiddenError(`Save failed`)
                })
            }
            console.log('Step 3 - team: ', teamToReturn)
            return teamToReturn
        })
        .catch(err => {
            console.log(err)
            throw new ForbiddenError(`${err}, refresh the page and try again`)
        })
}

controller.declineCandidateToTeam = (eventId, userId, code, candidateId) => {
    return controller.getTeamByCode(eventId, code).then(team => {
        if (!_.includes([team.owner].concat(team.members), userId)) {
            throw new InsufficientPrivilegesError(
                'Only the team members can reject candidates',
            )
        }
        team.candidates = team.candidates.filter(
            candidate => candidate.userId !== candidateId,
        )
        return team.save()
    })
}

controller.candidateApplyToTeam = (eventId, userId, code, applicationData) => {
    console.log('Validating application data:', applicationData)
    return controller.getTeamByCode(eventId, code).then(team => {
        if (
            !applicationData.roles ||
            applicationData.roles.length === 0 ||
            applicationData.length === 0
        ) {
            console.log(
                'Throwing error because no roles, with:',
                applicationData,
            )
            throw new ForbiddenError(
                'You must select at least one role and write your motivation to join',
            )
        }
        if (
            _.includes(team.members, userId) ||
            _.includes(
                team.candidates.map(candidate => candidate.userId),
                userId,
            ) ||
            team.owner === userId
        ) {
            console.log(
                'Throwing error because user is part of team, with:',
                applicationData,
            )

            throw new NotFoundError('You are already in this team')
        }
        team.candidates = team.candidates.concat(applicationData)
        console.log('Saving team with:', team)
        return team.save()
    })
}

controller.leaveTeam = (eventId, userId) => {
    return controller.getTeam(eventId, userId).then(team => {
        if (team.owner === userId) {
            team.owner = team.members[0]
            team.members = team.members.slice(1)
        } else {
            team.members = team.members.filter(member => member !== userId)
        }
        if (team.members.length === 0 && team.owner === userId) {
            controller.deleteTeam(eventId, userId)
        } else {
            return team.save()
        }
    })
}

controller.removeMemberFromTeam = (eventId, userId, userToRemove) => {
    return controller.getTeam(eventId, userId).then(team => {
        if (team.owner !== userId) {
            throw new InsufficientPrivilegesError(
                'Only the team owner can remove members',
            )
        }
        team.members = team.members.filter(member => member !== userToRemove)
        return team.save()
    })
}

controller.getTeamById = teamId => {
    return Team.findById(teamId).then(team => {
        if (!team) {
            throw new NotFoundError('No team exists for this Id')
        }
        return team
    })
}

controller.getTeamByCode = (eventId, code) => {
    return Team.findOne({
        event: eventId,
        code,
    }).then(team => {
        if (!team) {
            throw new NotFoundError('No team exists for this code and event')
        }
        return team
    })
}

controller.getTeam = (eventId, userId) => {
    return Team.findOne({
        event: eventId,
    })
        .or([{ owner: userId }, { members: userId }])
        .then(team => {
            if (!team) {
                throw new NotFoundError(
                    'No team exists for this user and event',
                )
            }
            return team
        })
}

controller.getTeamMembers = teamId => {
    return Team.findOne({
        _id: teamId,
    }).then(team => {
        if (!team) {
            throw new NotFoundError(`No team found with id ${teamId}`)
        }
        return [team.owner].concat(team.members)
    })
}

controller.attachMeta = async team => {
    const userIds = [team.owner].concat(team.members)
    const [registrations, userProfiles] = await Promise.all([
        Registration.find({ event: team.event, user: { $in: userIds } }),
        UserProfileController.getUserProfilesPublic(userIds),
    ])

    const userIdsToRemove = []
    const meta = userIds.reduce((res, userId) => {
        const registration = _.find(
            registrations,
            registration => registration.user === userId,
        )
        const profile = _.find(
            userProfiles,
            profile => profile.userId === userId,
        )

        if (!registration || !profile) {
            userIdsToRemove.push(userId)
            return res
        }
        res[userId] = {
            registration: {
                status: registration.status,
            },
            profile,
        }
        return res
    }, {})

    let result

    if (userIdsToRemove.length > 0) {
        // For whatever reason, some team members no longer exist -> remove missing team members
        team.members = team.toJSON().members.filter(member => {
            if (userIdsToRemove.indexOf(member) !== -1) {
                return false
            }
            return true
        })

        if (userIdsToRemove.indexOf(team.owner) !== -1) {
            // If the owner no longer exists
            if (team.members.length > 0) {
                // If there are still members left, promote first member to owner
                team.owner = team.members[0]
                team.members = team.members.slice(1)
            } else {
                // If there are no members left either, delete the team
                team.remove()
                // Throw not found error
                throw new NotFoundError(
                    'No team exists for this user and event',
                )
            }
        }
        team.save()
    }

    result = team.toJSON()
    result.meta = meta

    return result
}

controller.attachUserApplicant = (teams, userId) => {
    return teams.map(team => {
        if (
            team.candidates.length > 0 &&
            _.includes(
                team.candidates.map(candidate => candidate.userId),
                userId,
            )
        ) {
            const result = team.toJSON()
            result.userIsApplicant = true
            return result
        } else {
            return team
        }
    })
}

controller.getTeamsForEvent = async (eventId, userId, page, size, filter) => {
    if (page && size) {
        console.log('filter', filter)
        if (filter) {
            const found = await Team.find({
                event: eventId,
                challenge: filter,
            })
                .sort({ createdAt: 'desc' })
                .skip(parseInt(size * page))
                .limit(parseInt(size))
                .then(teams => {
                    if (userId) {
                        return controller.attachUserApplicant(teams, userId)
                    }
                })
            const count = await Team.find({
                event: eventId,
                challenge: filter,
            }).countDocuments()
            console.log('with filter', { data: found, count: count })
            return { data: found, count: count }
        } else {
            const found = await Team.find({
                event: eventId,
            })
                .sort({ createdAt: 'desc' })
                .skip(parseInt(size * page))
                .limit(parseInt(size))
                .then(teams => {
                    if (userId) {
                        return controller.attachUserApplicant(teams, userId)
                    }
                })
            const count = await Team.find({ event: eventId }).countDocuments()
            return { data: found, count: count }
        }
    } else {
        const found = await Team.find({
            event: eventId,
        })
            .sort({ createdAt: 'desc' })
            .then(teams => {
                if (userId) {
                    return controller.attachUserApplicant(teams, userId)
                }
                return teams
            })
        const count = await Team.find({ event: eventId }).countDocuments()
        console.log('getting all teams', count)
        return { data: found, count: count }
    }
    // TODO make the code not visible to participants on Redux store
}

controller.getAllTeamsForEvent = async (eventId, userId, page, size) => {
    return await Team.find({
        event: eventId,
    })
        .sort({ createdAt: 'desc' })
        .then(teams => {
            if (userId) {
                return controller.attachUserApplicant(teams, userId)
            }
            return teams
        })
    // TODO make the code not visible to participants on Redux store
}

controller.getTeamStatsForEvent = async eventId => {
    const numTeams = await Team.countDocuments({
        event: eventId,
    })

    return {
        numTeams,
    }
}

controller.exportTeams = async teamIds => {
    const teams = await Team.find({ _id: { $in: teamIds } })
    const teamsWithMeta = await Promise.all(
        teams.map(team => controller.attachMeta(team)),
    )

    return teamsWithMeta.map(controller.convertToFlatExportData)
}

controller.convertToFlatExportData = teamWithMeta => {
    return {
        teamCode: teamWithMeta.code,
        teamMembers: Object.values(teamWithMeta.meta)
            .map(memberMeta => memberMeta.profile)
            .map(
                memberProfile =>
                    `${memberProfile.firstName} ${memberProfile.lastName} <${memberProfile.email}>`,
            )
            .join(', '),
    }
}

controller.organiserRemoveMemberFromTeam = (
    eventId,
    teamCode,
    userToRemove,
) => {
    console.log('removing ', eventId, teamCode, userToRemove)
    return controller.getTeamByCode(eventId, teamCode).then(team => {
        if (team.members.length === 0 && team.owner === userToRemove) {
            console.log('deleting team')
            controller.deleteTeamByCode(eventId, teamCode)
        } else {
            if (team.owner === userToRemove) {
                console.log('new owner', team.members[0])
                team.owner = team.members[0]
                team.members = team.members.slice(1)
            } else {
                console.log('removing member')
                team.members = team.members.filter(
                    member => member !== userToRemove,
                )
            }
            console.log('deleted ', team.members)
            return team.save()
        }
        console.log('deleted team', team.members)
        return team.save()
    })
}

module.exports = controller

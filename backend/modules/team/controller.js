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
        .getTeamsForEventAsDocument(eventId)
        .then(teams => {
            if (userHasTeam(teams.data, userId)) {
                throw new ForbiddenError('You are already in a team')
            }
            return removeCandidateApplications(teams.data, userId)
        })
        .then(teamsToSave => {
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
                // TODO fix issue preventing save of teams
                Promise.all(teamsToSave.map(team => team.save())).catch(err => {
                    console.log(err)
                    throw new ForbiddenError(`Save failed`)
                })
            }

            return team
        })
        .catch(err => {
            console.log(err)
            throw new ForbiddenError(`${err}, refresh the page and try again`)
        })
}

controller.deleteTeam = (eventId, userId) => {
    return controller.getUserTeam(eventId, userId).then(team => {
        if (team.owner !== userId) {
            throw new InsufficientPrivilegesError(
                'Only the team owner can delete a team.',
            )
        }
        return team.remove()
    })
}

controller.deleteTeamByCode = (eventId, code) => {
    //Not to be user by users, only by organizers. No checks for user privileges so make sure to check if user is organizer before calling this function
    return controller.getTeamByCode(eventId, code).then(team => {
        return team.remove()
    })
}

controller.editTeam = (eventId, userId, edits) => {
    return controller.getUserTeam(eventId, userId).then(team => {
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
            .getTeamsForEventAsDocument(eventId)
            .then(teams => {
                if (userHasTeam(teams.data, userId)) {
                    throw new ForbiddenError('You are already in a team')
                }
                return teams.data
            })
            .then(teams => {
                team.members = team.members.concat(userId)
                team.candidates = team.candidates.filter(
                    candidate => candidate.userId !== userId,
                )
                team.save()
                return teams
            })
            .then(teams => {
                const teamsToSave = removeCandidateApplications(
                    teams,
                    userId,
                ).filter(team => team.code !== code)
                if (teamsToSave.length > 0) {
                    Promise.all(teamsToSave.map(team => team.save())).catch(
                        err => {
                            console.log(err)
                            throw new ForbiddenError(`Save failed`)
                        },
                    )
                }
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

            return controller.getTeamsForEventAsDocument(eventId)
        })
        .then(teams => {
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
            teamToReturn.members = teamToReturn.members.concat(candidateId)
            teamToReturn.candidates = teamToReturn.candidates.filter(
                candidate => candidate.userId !== candidateId,
            )
            teamToReturn.save()
            return teams
        })
        .then(teams => {
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

controller.candidateApplyToTeam = (userId, teamId, applicationData) => {
    return controller.getTeamByIdForApplications(teamId).then(team => {
        if (
            !applicationData.roles ||
            applicationData.roles.length === 0 ||
            applicationData.length === 0
        ) {
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
            throw new NotFoundError('You are already in this team')
        }
        team.candidates = team.candidates.concat(applicationData)
        return team.save()
    })
}

controller.leaveTeam = (eventId, userId) => {
    return controller.getUserTeam(eventId, userId).then(team => {
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
    return controller.getUserTeam(eventId, userId).then(team => {
        if (team.owner !== userId) {
            throw new InsufficientPrivilegesError(
                'Only the team owner can remove members',
            )
        }
        team.members = team.members.filter(member => member !== userToRemove)
        return team.save()
    })
}

controller.getTeamById = (teamId, userId) => {
    return Team.findById(teamId).then(team => {
        if (!team) {
            throw new NotFoundError('No team exists for this Id')
        }
        if (_.includes([team.owner].concat(team.members), userId)) {
            return team
        } else {
            return convertToObjectAndStripProperties(team, ['code'])
        }
    })
}

controller.getTeamByIdForApplications = teamId => {
    // Only to be used for applications, no checks for user privileges so don't use for low privilege end points
    return Team.findById(teamId)
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

controller.getUserTeam = (eventId, userId) => {
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
    try {
        result = team.toJSON()
    } catch (err) {
        console.log(err)
        result = team
    } finally {
        result.meta = meta
        return result
    }
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
            team.userIsApplicant = true
            return team
        } else {
            return team
        }
    })
}

controller.getTeamsForEvent = async (eventId, userId, page, size, filter) => {
    let eventTeams = []
    let teamCount = 0
    if (page && size) {
        if (filter) {
            eventTeams = await Team.find({
                event: eventId,
                challenge: filter,
            })
                .sort({ createdAt: 'desc' })
                .skip(parseInt(size * page))
                .limit(parseInt(size))
            teamCount = await eventTeams.length
        } else {
            eventTeams = await Team.find({
                event: eventId,
            })
                .sort({ createdAt: 'desc' })
                .skip(parseInt(size * page))
                .limit(parseInt(size))
            teamCount = await eventTeams.length
        }
    } else {
        eventTeams = await Team.find({
            event: eventId,
        }).sort({ createdAt: 'desc' })
        teamCount = await eventTeams.length
    }
    const teamsWithoutTeamCode = convertToObjectAndStripProperties(eventTeams, [
        'code',
    ])
    let returnTeams = []
    if (userId) {
        returnTeams = controller.attachUserApplicant(
            teamsWithoutTeamCode,
            userId,
        )
    } else {
        returnTeams = teamsWithoutTeamCode
    }
    return { data: returnTeams, count: teamCount }
}

const convertToObjectAndStripProperties = (doc, arrPropertiesToStrip) => {
    // Convert Mongoose array of documents to objects and strip properties, add properties to strip as array of strings
    if (doc.length > 0) {
        return doc.map(docElement => {
            const obj = docElement.toObject()
            return _.omit(obj, arrPropertiesToStrip)
        })
    } else {
        const obj = doc.toObject()
        return _.omit(obj, arrPropertiesToStrip)
    }
}

controller.getTeamsForEventAsOrganizer = async eventId => {
    let eventTeams = []
    let teamCount = 0
    //Only to be used by organizers, no checks for user privileges so make sure to check if user is organizer before calling this function
    eventTeams = await Team.find({
        event: eventId,
    }).sort({ createdAt: 'desc' })
    if (eventTeams.length > 0) {
        teamCount = await eventTeams.length
    }
    return { data: eventTeams, count: teamCount }
}

controller.getAllTeamsForEventAsPartner = async eventId => {
    //Only to be used by partners, no checks for user privileges so make sure to check if user is partner before calling this function
    let eventTeams = []
    await Team.find({
        event: eventId,
    })
        .sort({ createdAt: 'desc' })
        .then(teams => {
            eventTeams = teams
        })
        .catch(err => {
            console.log(err)
            throw new ForbiddenError('No teams found for this event')
        })
    return eventTeams
}

controller.getTeamsForEventAsDocument = async eventId => {
    let eventTeams = []
    let teamCount = 0
    //Only to be used by functions intended to save the documents updated, use only for private functions and never expose to users
    eventTeams = await Team.find({
        event: eventId,
    })
    if (eventTeams.length > 0) {
        teamCount = await eventTeams.length
    }
    return { data: eventTeams, count: teamCount }
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
    return controller.getTeamByCode(eventId, teamCode).then(team => {
        if (team.members.length === 0 && team.owner === userToRemove) {
            controller.deleteTeamByCode(eventId, teamCode)
        } else {
            if (team.owner === userToRemove) {
                team.owner = team.members[0]
                team.members = team.members.slice(1)
            } else {
                team.members = team.members.filter(
                    member => member !== userToRemove,
                )
            }
            return team.save()
        }
        return team.save()
    })
}

module.exports = controller

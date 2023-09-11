import { push } from 'connected-react-router'

import * as ActionTypes from './actionTypes'
import * as AuthSelectors from '../auth/selectors'
import * as DashboardSelectors from './selectors'
import EventsService from 'services/events'
import ProjectsService from 'services/projects'
import RegistrationsService from 'services/registrations'
import TeamsService from 'services/teams'
import UserProfilesService from 'services/userProfiles'

import ProjectScoresService from 'services/projectScores'

import GavelService from 'services/reviewing/gavel'

export const updateEvent = slug => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_EVENT,
        promise: EventsService.getPublicEventBySlug(slug),
        meta: {
            onFailure: e => console.log('Error updating dashboard event', e),
        },
    })
}

export const updateRegistration = slug => (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_REGISTRATION,
        promise: RegistrationsService.getRegistration(idToken, slug),
        meta: {
            onFailure: () => dispatch(push('/')),
        },
    })
}

export const updateRegistrationChecklist =
    (slug, registrationId, data) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        try {
            const registration = await RegistrationsService.updateChecklist(
                idToken,
                slug,
                registrationId,
                data,
            )

            dispatch({
                type: ActionTypes.EDIT_REGISTRATION,
                payload: registration,
            })
            return
        } catch (err) {
            return err
        }
    }

export const updateRegistrationGrantDetails =
    (slug, data) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        try {
            const registration =
                await RegistrationsService.updateTravelGrantDetails(
                    idToken,
                    slug,
                    data,
                )

            dispatch({
                type: ActionTypes.EDIT_REGISTRATION,
                payload: registration,
            })
            return
        } catch (err) {
            return err
        }
    }

export const confirmRegistration = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const registration = await RegistrationsService.confirmRegistration(
        idToken,
        slug,
    )

    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration,
    })

    return registration
}

export const cancelRegistration = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const registration = await RegistrationsService.cancelRegistration(
        idToken,
        slug,
    )

    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration,
    })

    return registration
}

export const editRegistration = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const registration = await RegistrationsService.updateRegistration(
        idToken,
        slug,
        data,
    )

    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration,
    })

    return registration
}

export const createRegistration =
    (slug, data) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const registration = await RegistrationsService.createRegistration(
            idToken,
            slug,
            data,
        )

        dispatch({
            type: ActionTypes.EDIT_REGISTRATION,
            payload: registration,
        })

        return registration
    }

export const updateTeams = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    if (!slug) return

    dispatch({
        type: ActionTypes.UPDATE_TEAMS,
        promise: TeamsService.getAllTeamsForEventParticipant(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating teams', e),
        },
    })
}

export const updateSelectedTeam =
    (slug, code) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        if (!slug) return

        dispatch({
            type: ActionTypes.UPDATE_SELECTED_TEAM,
            promise: TeamsService.getTeamWithMetaForEventParticipant(
                idToken,
                slug,
                code,
                true,
            ),
            meta: {
                onFailure: e => console.log('Error updating selected team', e),
            },
        })
    }

export const updateTeam = slug => (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_TEAM,
        promise: TeamsService.getTeamForEvent(idToken, slug, true).catch(
            err => {
                if (err.response.status === 404) {
                    return Promise.resolve(null)
                }
                return Promise.reject(err)
            },
        ),
        meta: {
            onFailure: e => console.log('Error updating dashboard team', e),
        },
    })
}

// TODO createTeam action to be depreciated and deleted, replaced by createNewTeam
export const createTeam = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    const team = await TeamsService.createTeamForEvent(idToken, slug, true)

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: team,
    })

    return team
}

export const editTeam = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    const team = await TeamsService.editTeamForEvent(idToken, slug, data, true)

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: team,
    })

    return team
}

//TODO when createTeam is deleted, rename this to createTeam
export const createNewTeam = (slug, data) => async (dispatch, getState) => {
    console.log('createNewTeam action received:', slug, data)
    const idToken = AuthSelectors.getIdToken(getState())
    const team = await TeamsService.createNewTeamForEvent(
        idToken,
        slug,
        data,
        true,
    )

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: team,
    })

    return team
}

export const joinTeam = (slug, code) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const team = await TeamsService.joinTeamForEvent(idToken, slug, code, true)

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: team,
    })

    return team
}

export const getCandidateProfileById = userId => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    const user = await UserProfilesService.getUserPublicProfileById(
        idToken,
        userId,
    )
    dispatch({
        type: ActionTypes.GET_CANDIDATE_PROFILE,
        payload: user,
    })
    return user
}

export const candidateApplyToTeam =
    (slug, code, applicationData) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        console.log('submitted with:', applicationData)
        // if (applicationData.roles)
        const team = await TeamsService.candidateApplyToTeam(
            idToken,
            slug,
            code,
            applicationData,
        )

        dispatch({
            type: ActionTypes.EDIT_TEAM,
            payload: team,
            meta: {
                onFailure: e => console.log('Error applying to team', e),
            },
        })

        return team
    }

export const acceptCandidateToTeam =
    (slug, code, userId) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        // const team = await TeamsService.editTeam(idToken, slug, code, userId)
        const team = await TeamsService.acceptCandidateToTeam(
            idToken,
            slug,
            code,
            userId,
        )

        dispatch({
            type: ActionTypes.EDIT_TEAM,
            payload: team,
        })

        return team
    }

export const declineCandidateToTeam =
    (slug, code, userId) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const team = await TeamsService.declineCandidateToTeam(
            idToken,
            slug,
            code,
            userId,
        )

        dispatch({
            type: ActionTypes.EDIT_TEAM,
            payload: team,
        })

        return team
    }

export const leaveTeam = (slug, code) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const team = await TeamsService.leaveTeamForEvent(idToken, slug, code)

    dispatch({
        type: ActionTypes.CLEAR_TEAM,
    })

    return team
}

export const removeMemberFromTeam =
    (slug, code, userId) => async (dispatch, getState) => {
        const state = getState()
        const idToken = AuthSelectors.getIdToken(state)
        const oldTeam = DashboardSelectors.team(state)
        const team = await TeamsService.removeMemberFromTeam(
            idToken,
            slug,
            code,
            userId,
        )

        dispatch({
            type: ActionTypes.EDIT_TEAM,
            payload: {
                ...team,
                meta: oldTeam.meta,
            },
        })

        return team
    }

export const deleteTeam = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    const team = await TeamsService.deleteTeamForEvent(idToken, slug)

    dispatch({
        type: ActionTypes.CLEAR_TEAM,
    })

    return team
}

export const lockTeam = (slug, code) => async (dispatch, getState) => {
    const state = getState()
    const idToken = AuthSelectors.getIdToken(state)
    const oldTeam = DashboardSelectors.team(state)
    const team = await TeamsService.lockTeamForEvent(idToken, slug, code)

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: {
            ...team,
            meta: oldTeam.meta,
        },
    })

    return team
}

export const updateProjects = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    return dispatch({
        type: ActionTypes.UPDATE_PROJECTS,
        promise: ProjectsService.getProjectsForEventAndTeam(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating dashboard project', e),
        },
    })
}

export const createProject = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    await ProjectsService.createProjectForEventAndTeam(idToken, slug, data)
    return dispatch({
        type: ActionTypes.UPDATE_PROJECTS,
        promise: ProjectsService.getProjectsForEventAndTeam(idToken, slug),
        meta: {
            onFailure: e => console.log('Error creating dashboard project', e),
        },
    })
}

export const editProject = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    console.log('From dashboard actions, edit project data: ', data)
    await ProjectsService.updateProjectForEventAndTeam(idToken, slug, data)
    return dispatch({
        type: ActionTypes.UPDATE_PROJECTS,
        promise: ProjectsService.getProjectsForEventAndTeam(idToken, slug),
        meta: {
            onFailure: e => console.log('Error editing dashboard project', e),
        },
    })
}

export const updateAnnotator = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const { error } = await dispatch({
        type: ActionTypes.UPDATE_ANNOTATOR,
        promise: GavelService.getAnnotator(idToken, slug), //,
        meta: {
            onFailure: e => console.log('Error updating annotator', e),
        },
    })

    return error
}

export const updateProjectScores = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    return dispatch({
        type: ActionTypes.UPDATE_PROJECT_SCORES,
        promise: ProjectScoresService.getScoresByEventAndTeam(idToken, slug),
        meta: {
            onFailure: e =>
                console.log('Error updating dashboard project scores', e),
        },
    })
}

export const beginVoting = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    try {
        const annotator = await GavelService.beginVoting(idToken, slug)
        dispatch({
            type: ActionTypes.EDIT_ANNOTATOR,
            payload: annotator,
        })
        return
    } catch (err) {
        console.log(err)
        return err
    }
}

export const skipProject = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    try {
        const annotator = await GavelService.skipProject(idToken, slug)
        dispatch({
            type: ActionTypes.EDIT_ANNOTATOR,
            payload: annotator,
        })
        return
    } catch (err) {
        console.log(err)
        return err
    }
}

export const setFirstProjectSeen = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    try {
        const annotator = await GavelService.setFirstProjectSeen(idToken, slug)
        dispatch({
            type: ActionTypes.EDIT_ANNOTATOR,
            payload: annotator,
        })
        return
    } catch (err) {
        console.log(err)
        return err
    }
}

export const submitVote = (slug, winnerId) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    try {
        const annotator = await GavelService.submitVote(idToken, slug, winnerId)
        dispatch({
            type: ActionTypes.EDIT_ANNOTATOR,
            payload: annotator,
        })
    } catch (err) {
        console.log(err)
        return err
    }
}

// TODO Create action to fill candidates information dynamically

// export const updateCandidateProfiles =
//     (userIds) => async (dispatch, getState) => {

//         dispatch({
//             type: ActionTypes.UPDATE_ORGANISERS,
//             promise: UserProfilesService.getPublicUserProfiles(userIds),
//             meta: {
//                 onFailure: e =>
//                     console.log('Error updating event organisers', e),
//             },
//         })
//     }

//     export const candidateApplyToTeam =
//     (slug, code, applicationData) => async (dispatch, getState) => {
//         const idToken = AuthSelectors.getIdToken(getState())

//         const team = await TeamsService.candidateApplyToTeam(
//             idToken,
//             slug,
//             code,
//             applicationData,
//         )

//         dispatch({
//             type: ActionTypes.EDIT_TEAM,
//             payload: team,
//         })

//         return team
//     }

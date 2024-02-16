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
import _ from 'lodash'

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

export const updateRecruitersForEvent =
    recruiters => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        const userIds = recruiters?.map(rec => {
            return rec.recruiterId
        })

        dispatch({
            type: ActionTypes.UPDATE_EVENT_RECRUITERS,
            promise: UserProfilesService.getPublicUserProfiles(userIds),
            meta: {
                onFailure: e =>
                    console.log('Error updating recruiters for this event', e),
            },
        })
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

export const createPartnerRegistration =
    (userId, slug) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        const user = await UserProfilesService.getUserPublicProfileById(
            idToken,
            userId,
        )
        console.log('createPartnerRegistration', user)
        const registration = await RegistrationsService.addPartnerToRegistrated(
            idToken,
            user,
            slug,
        )
        console.log('created registration', registration)
        return registration
    }

export const updateTeams =
    (slug, page, size, filter) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        if (!slug) return
        if (filter === 'All challenges') {
            dispatch({
                type: ActionTypes.UPDATE_TEAMS,
                promise: TeamsService.getAllTeamsForEventParticipant(
                    idToken,
                    slug,
                    page,
                    size,
                ),
                meta: {
                    onFailure: e => console.log('Error updating teams', e),
                },
            })
        } else {
            dispatch({
                type: ActionTypes.UPDATE_TEAMS,
                promise: TeamsService.getAllTeamsForEventParticipant(
                    idToken,
                    slug,
                    page,
                    size,
                    filter,
                ),
                meta: {
                    onFailure: e => console.log('Error updating teams', e),
                },
            })
        }
    }

export const updateSelectedTeam =
    (slug, code) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        if (!slug || !code) return
        return new Promise((resolve, reject) => {
            dispatch({
                type: ActionTypes.UPDATE_SELECTED_TEAM,
                promise: TeamsService.getTeamWithMetaForEventParticipant(
                    idToken,
                    slug,
                    code,
                    true,
                ),
                meta: {
                    onSuccess: team => resolve(team),
                    onFailure: e => reject(e),
                },
            })
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

export const organiserRemoveMemberFromTeam =
    (slug, code, userId) => async (dispatch, getState) => {
        const state = getState()
        const idToken = AuthSelectors.getIdToken(state)

        const team = await TeamsService.organiserRemoveMemberFromTeam(
            idToken,
            slug,
            code,
            userId,
        )

        console.log('actions done ', team)

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
    try {
        const idToken = AuthSelectors.getIdToken(getState())
        const fileData = await fileAttachmentFinder(data, idToken)

        if (fileData) {
            await ProjectsService.createProjectForEventAndTeam(
                idToken,
                slug,
                fileData,
            )
        }
        const projects = await ProjectsService.getProjectsForEventAndTeam(
            idToken,
            slug,
        )

        return dispatch({
            type: ActionTypes.UPDATE_PROJECTS,
            promise: Promise.resolve(projects),
            meta: {
                onFailure: e =>
                    console.log('Error creating dashboard project', e),
            },
        })
    } catch (error) {
        throw new Error(error)
    }
}

const fileAttachmentFinder = async (Projectdata, idToken) => {
    console.log('Project data to check for files', Projectdata)
    const fileKeys = []
    _.forOwn(Projectdata, (value, key) => {
        console.log(key, value)
        if (value && Object.getPrototypeOf(value) === File.prototype) {
            console.log('File found: ', value)
            fileKeys.push(key)
        }
    })
    console.log('File keys: ', fileKeys)
    if (fileKeys.length > 0) {
        const fileMetadataArray = await Promise.all(
            fileKeys.map(async key => {
                console.log('File key: ', key)
                const fileMetadata = await handleFile(Projectdata[key], idToken)
                console.log('File metadata: ', fileMetadata)
                if (fileMetadata.toString() === '[object Object]') {
                    return Error('File upload failed')
                }
                Projectdata[key] = fileMetadata.toString()
                const index = Projectdata['submissionFormAnswers'].findIndex(
                    ans => ans['key'] === key,
                )
                Projectdata['submissionFormAnswers'][index].value =
                    fileMetadata.toString()
                return fileMetadata
            }),
        )
        console.log('File metadata array', fileMetadataArray)
    }
    return Projectdata
}

const getFile = async (fileId, filename, token) => {
    console.log('File to download: ', fileId)
    try {
        const response = await fetch(`/api/upload/files/${fileId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.ok) {
            console.log('File download successfully')
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()

            window.URL.revokeObjectURL(url)
        } else {
            throw new Error('Failed to download file')
        }
    } catch (error) {
        throw error
    }
}

const deleteFile = async (fileId, token) => {
    console.log('File to delete: ', fileId)
    try {
        const response = await fetch(`/api/upload/files/${fileId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log('Does this render?')

        if (response.ok) {
            console.log('File deleted successfully')
        } else {
            throw new Error('Failed to delete file')
        }
    } catch (error) {
        throw error
    }
}

const handleFile = async (file, token) => {
    console.log('File handling from dashboard actions', file)
    const formData = new FormData()
    formData.append('file', file)
    console.log('File to upload: ', file)
    console.log('Form data', formData)
    try {
        const response = await fetch('/api/upload/files', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log('File upload response: ', response)
        if (response.ok) {
            const fileMetadata = await response.json()
            console.log('File uploaded successfully')
            console.log('File data', fileMetadata)
            return JSON.stringify(fileMetadata)
        } else {
            throw new Error('Failed to upload file')
        }
    } catch (error) {
        throw error
    }
}

export const getFileForProject =
    (fileId, filename) => async (dispatch, getState) => {
        console.log('Getting files for project', fileId)
        console.log('File name', filename)

        const idToken = AuthSelectors.getIdToken(getState())
        return dispatch({
            type: ActionTypes.GET_FILE,
            promise: getFile(fileId, filename, idToken),
            meta: {
                onFailure: e =>
                    console.log(
                        'Error getting attachment file from project',
                        e,
                    ),
            },
        })
    }

export const deleteFileForProject = fileId => async (dispatch, getState) => {
    console.log('Deleting file', fileId)
    const idToken = AuthSelectors.getIdToken(getState())

    return dispatch({
        type: ActionTypes.DELETE_FILE,
        promise: deleteFile(fileId, idToken),
        meta: {
            onFailure: e =>
                console.log('Error deleting attachment file from project', e),
        },
    })
}

export const editProject = (slug, data) => async (dispatch, getState) => {
    try {
        const idToken = AuthSelectors.getIdToken(getState())
        const fileData = await fileAttachmentFinder(data, idToken)

        if (fileData) {
            await ProjectsService.updateProjectForEventAndTeam(
                idToken,
                slug,
                fileData,
            )
        }
        const projects = await ProjectsService.getProjectsForEventAndTeam(
            idToken,
            slug,
        )

        return dispatch({
            type: ActionTypes.UPDATE_PROJECTS,
            promise: Promise.resolve(projects),
            meta: {
                onFailure: e =>
                    console.log('Error editing dashboard project', e),
            },
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateAnnotator = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    //get idToken for gavel start voting stress test
    console.log(idToken)
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

    //get idToken and winnerId for gavel voting stress test
    console.log(slug, winnerId)
    try {
        const annotator = await GavelService.submitVote(idToken, slug, winnerId)
        console.log(annotator)
        dispatch({
            type: ActionTypes.EDIT_ANNOTATOR,
            payload: annotator,
        })
    } catch (err) {
        console.log(err)
        return err
    }
}
export const activeEvents = activeEvents => dispatch => {
    console.log('action activeEvents', activeEvents)
    dispatch({
        type: ActionTypes.ACTIVE_EVENTS,
        payload: {
            activeEvents,
        },
    })
}

export const pastEvents = pastEvents => dispatch => {
    console.log('action pastEvents', pastEvents)
    dispatch({
        type: ActionTypes.PAST_EVENTS,
        payload: {
            pastEvents,
        },
    })
}

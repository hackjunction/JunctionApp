import * as ActionTypes from './actionTypes'
import * as AuthSelectors from '../auth/selectors'
import * as DashboardSelectors from './selectors'
import EventsService from 'services/events'
import ProjectsService from 'services/projects'
import RegistrationsService from 'services/registrations'
import TeamsService from 'services/teams'
import UserProfilesService from 'services/userProfiles'

import ProjectScoresService from 'services/projectScores'

// import GavelService from 'services/reviewing/gavel'
import { createAsyncThunk } from '@reduxjs/toolkit'
import _ from 'lodash'

export const updateEvent = createAsyncThunk(
    ActionTypes.UPDATE_EVENT,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const event = await EventsService.getPublicEventBySlug(slug)
            return event
        } catch (error) {
            console.error('Error updating event', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const updateRegistration = createAsyncThunk(
    ActionTypes.UPDATE_REGISTRATION,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const registration = await RegistrationsService.getRegistration(
                idToken,
                slug,
            )
            return registration
        } catch (error) {
            console.error('Error updating registration', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

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

export const updateRecruitersForEvent = createAsyncThunk(
    ActionTypes.UPDATE_EVENT_RECRUITERS,
    async (recruiters, { getState, rejectWithValue }) => {
        try {
            if (
                !recruiters ||
                !Array.isArray(recruiters) ||
                recruiters.length < 1
            ) {
                return []
            }
            const userIds = recruiters?.map(rec => {
                return rec.recruiterId
            })
            const RecruiterPublicProfiles =
                await UserProfilesService.getPublicUserProfiles(userIds)
            return RecruiterPublicProfiles
        } catch (error) {
            console.error('Error updating recruiters', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

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
        const registration = await RegistrationsService.addPartnerToRegistrated(
            idToken,
            user,
            slug,
        )
        return registration
    }

export const updateTeams = createAsyncThunk(
    ActionTypes.UPDATE_TEAMS,
    async ({ slug, page, size, filter }, { getState, rejectWithValue }) => {
        try {
            if (!slug) return
            const idToken = AuthSelectors.getIdToken(getState())
            const teams = await TeamsService.getAllTeamsForEventParticipant(
                idToken,
                slug,
                page,
                size,
                filter,
            )
            return teams
        } catch (error) {
            console.error('Error updating event teams', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const updateSelectedTeam = createAsyncThunk(
    ActionTypes.UPDATE_SELECTED_TEAM,
    async ({ slug, teamId }, { getState, rejectWithValue }) => {
        try {
            if (!slug || !teamId) return null
            const idToken = AuthSelectors.getIdToken(getState())
            const team =
                await TeamsService.getTeamWithMetaForEventParticipantByTeamId(
                    idToken,
                    slug,
                    teamId,
                    true,
                )
            return team
        } catch (error) {
            console.error('Error updating selected team', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const updateTeam = createAsyncThunk(
    ActionTypes.UPDATE_TEAM,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const team = await TeamsService.getUserTeamForEvent(
                idToken,
                slug,
                true,
            )
            return team
        } catch (error) {
            console.error('Error updating team', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const editTeam = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    const team = await TeamsService.editTeamForEvent(idToken, slug, data, true)

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: team,
    })

    return team
}

export const createTeam = (slug, data) => async (dispatch, getState) => {
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

export const candidateApplyToTeam = createAsyncThunk(
    ActionTypes.CANDIDATE_APPLY,
    async (
        { slug, teamId, applicationData },
        { getState, rejectWithValue },
    ) => {
        try {
            if (!slug) return
            const idToken = AuthSelectors.getIdToken(getState())
            const team = await TeamsService.candidateApplyToTeam(
                idToken,
                slug,
                teamId,
                applicationData,
            )
            return team
        } catch (error) {
            console.error('Error applying to team', error)
            return rejectWithValue(error.message || 'Error applying to team')
        }
    },
)

export const acceptCandidateToTeam =
    (slug, code, userId) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
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

export const updateProjects = createAsyncThunk(
    ActionTypes.UPDATE_PROJECTS,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const projects = await ProjectsService.getProjectsForEventAndTeam(
                idToken,
                slug,
            )
            return projects
        } catch (error) {
            console.error('Error updating projects', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const createProject = createAsyncThunk(
    ActionTypes.UPDATE_PROJECTS,
    async ({ slug, data }, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            await ProjectsService.createProjectForEventAndTeam(
                idToken,
                slug,
                data,
            )
            const projects = await ProjectsService.getProjectsForEventAndTeam(
                idToken,
                slug,
            )
            return projects
        } catch (error) {
            console.error('Error creating dashboard project', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// TODO delete file upload and file attachement
// const fileAttachmentFinder = async (Projectdata, idToken) => {
//     console.log('Project data to check for files', Projectdata)
//     const fileKeys = []
//     _.forOwn(Projectdata, (value, key) => {
//         console.log(key, value)
//         if (value && Object.getPrototypeOf(value) === File.prototype) {
//             console.log('File found: ', value)
//             fileKeys.push(key)
//         }
//     })
//     console.log('File keys: ', fileKeys)
//     if (fileKeys.length > 0) {
//         const fileMetadataArray = await Promise.all(
//             fileKeys.map(async key => {
//                 console.log('File key: ', key)
//                 const fileMetadata = await handleFile(Projectdata[key], idToken)
//                 console.log('File metadata: ', fileMetadata)
//                 if (fileMetadata.toString() === '[object Object]') {
//                     return Error('File upload failed')
//                 }
//                 Projectdata[key] = fileMetadata.toString()
//                 const index = Projectdata['submissionFormAnswers'].findIndex(
//                     ans => ans['key'] === key,
//                 )
//                 Projectdata['submissionFormAnswers'][index].value =
//                     fileMetadata.toString()
//                 return fileMetadata
//             }),
//         )
//         console.log('File metadata array', fileMetadataArray)
//     }
//     return Projectdata
// }

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

// const handleFile = async (file, token) => {
//     console.log('File handling from dashboard actions', file)
//     const formData = new FormData()
//     formData.append('file', file)
//     console.log('File to upload: ', file)
//     console.log('Form data', formData)
//     try {
//         const response = await fetch('/api/upload/files', {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//         console.log('File upload response: ', response)
//         if (response.ok) {
//             const fileMetadata = await response.json()
//             console.log('File uploaded successfully')
//             console.log('File data', fileMetadata)
//             return JSON.stringify(fileMetadata)
//         } else {
//             throw new Error('Failed to upload file')
//         }
//     } catch (error) {
//         throw error
//     }
// }

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

export const editProject = createAsyncThunk(
    ActionTypes.UPDATE_PROJECTS,
    async ({ slug, data }, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            await ProjectsService.updateProjectForEventAndTeam(
                idToken,
                slug,
                data,
            )
            const projects = await ProjectsService.getProjectsForEventAndTeam(
                idToken,
                slug,
            )
            return projects
        } catch (error) {
            console.error('Error editing dashboard project', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// export const updateAnnotator = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())
//     const { error } = await dispatch({
//         type: ActionTypes.UPDATE_ANNOTATOR,
//         promise: GavelService.getAnnotator(idToken, slug), //,
//         meta: {
//             onFailure: e => console.log('Error updating annotator', e),
//         },
//     })

//     return error
// }

export const updateProjectScores = createAsyncThunk(
    ActionTypes.UPDATE_PROJECT_SCORES,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const projectScores =
                await ProjectScoresService.getScoresByEventAndTeam(
                    idToken,
                    slug,
                )
            return projectScores
        } catch (error) {
            console.error('Error updating project scores', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// export const beginVoting = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     try {
//         const annotator = await GavelService.beginVoting(idToken, slug)
//         dispatch({
//             type: ActionTypes.EDIT_ANNOTATOR,
//             payload: annotator,
//         })
//         return
//     } catch (err) {
//         console.log(err)
//         return err
//     }
// }

// export const skipProject = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     try {
//         const annotator = await GavelService.skipProject(idToken, slug)
//         dispatch({
//             type: ActionTypes.EDIT_ANNOTATOR,
//             payload: annotator,
//         })
//         return
//     } catch (err) {
//         console.log(err)
//         return err
//     }
// }

// export const setFirstProjectSeen = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     try {
//         const annotator = await GavelService.setFirstProjectSeen(idToken, slug)
//         dispatch({
//             type: ActionTypes.EDIT_ANNOTATOR,
//             payload: annotator,
//         })
//         return
//     } catch (err) {
//         console.log(err)
//         return err
//     }
// }

// export const submitVote = (slug, winnerId) => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     try {
//         const annotator = await GavelService.submitVote(idToken, slug, winnerId)
//         console.log(annotator)
//         dispatch({
//             type: ActionTypes.EDIT_ANNOTATOR,
//             payload: annotator,
//         })
//     } catch (err) {
//         console.log(err)
//         return err
//     }
// }
export const activeEvents = activeEvents => dispatch => {
    dispatch({
        type: ActionTypes.ACTIVE_EVENTS,
        payload: {
            activeEvents,
        },
    })
}

export const pastEvents = pastEvents => dispatch => {
    dispatch({
        type: ActionTypes.PAST_EVENTS,
        payload: {
            pastEvents,
        },
    })
}

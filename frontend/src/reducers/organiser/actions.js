import * as ActionTypes from './actionTypes'
import * as AuthSelectors from 'reducers/auth/selectors'
import UserProfilesService from 'services/userProfiles'
import EventsService from 'services/events'
import RegistrationsService from 'services/registrations'
import TeamsService from 'services/teams'
import FilterGroupsService from 'services/filterGroups'
import ProjectsService from 'services/projects'
import GavelService from 'services/reviewing/gavel'
import RankingsService from 'services/rankings'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateEvent = createAsyncThunk(
    ActionTypes.UPDATE_EVENT,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const event = await EventsService.getEventBySlugAsOrganiser(
                idToken,
                slug,
            )
            return event
        } catch (error) {
            console.error('Error updating event', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)
/** Submit edits to an event */
export const editEvent = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const event = await EventsService.updateEventBySlug(idToken, slug, data)
    dispatch({ type: ActionTypes.EDIT_EVENT, payload: event })
    return event
}

export const updateWinners = (slug, winners) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    const event = await EventsService.updateWinners(idToken, slug, winners)
    dispatch({ type: ActionTypes.EDIT_EVENT, payload: event })
    return event
}

/** Update event stats with loading/error data */
export const updateEventStats = createAsyncThunk(
    ActionTypes.UPDATE_STATS,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            return await EventsService.getEventStats(idToken, slug)
        } catch (error) {
            console.error('Error updating event stats', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

/** Update event organisers with loading/error data */
export const updateOrganisersForEvent = createAsyncThunk(
    ActionTypes.UPDATE_ORGANISERS,
    async (ownerAndOrganizers, { rejectWithValue }) => {
        try {
            const { owner, organisers } = ownerAndOrganizers
            const userIds = [owner].concat(organisers)
            const profiles =
                await UserProfilesService.getPublicUserProfiles(userIds)
            console.log(profiles)
            return profiles
        } catch (error) {
            console.error('Error updating organisers', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const removeOrganiserFromEvent =
    (slug, userId) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const organisers = await EventsService.removeOrganiserFromEvent(
            idToken,
            slug,
            userId,
        )
        dispatch({
            type: ActionTypes.REMOVE_ORGANISER,
            payload: userId,
        })

        return organisers
    }

export const addOrganiserToEvent =
    (slug, userId) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const organisers = await EventsService.addOrganiserToEvent(
            idToken,
            slug,
            userId,
        )
        dispatch({
            type: ActionTypes.ADD_ORGANISER,
            payload: userId,
        })

        return organisers
    }

/** Update event recruiters with loading/error data */

export const updateRecruitersForEvent = createAsyncThunk(
    ActionTypes.UPDATE_EVENT_RECRUITERS,
    async (recruiters, { rejectWithValue }) => {
        try {
            let userIds = []
            if (Array.isArray(recruiters)) {
                userIds = recruiters?.map(rec => {
                    return rec.recruiterId
                })
            }
            if (userIds.length < 1) {
                return
            }
            const profiles =
                await UserProfilesService.getPublicUserProfiles(userIds)
            return profiles
        } catch (error) {
            console.error('Error generating rankings', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const addRecruiterToEvent =
    (slug, userId, organization) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        const recruiters = await EventsService.addRecruiterToEvent(
            idToken,
            slug,
            userId,
            organization,
        )
        dispatch({
            type: ActionTypes.ADD_EVENT_RECRUITER,
            payload: recruiters,
        })

        return recruiters
    }

export const removeRecruiterFromEvent =
    (slug, userId) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        const recruiter = await EventsService.removeRecruiterFromEvent(
            idToken,
            slug,
            userId,
        )
        dispatch({
            type: ActionTypes.REMOVE_EVENT_RECRUITER,
            payload: userId,
        })

        return recruiter
    }

/** Update event registrations with loading/error data */
export const updateRegistrationsForEvent = createAsyncThunk(
    ActionTypes.UPDATE_REGISTRATIONS,
    async ({ slug, getFullStrings = false }, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const registrations =
                await RegistrationsService.getRegistrationsForEvent(
                    idToken,
                    slug,
                    getFullStrings,
                )
            return registrations
        } catch (error) {
            console.error('Error updating registrations', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const editRegistration =
    (registrationId, data, slug) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const registration = await RegistrationsService.editRegistration(
            idToken,
            slug,
            registrationId,
            data,
        )
        dispatch({
            type: ActionTypes.EDIT_REGISTRATION,
            payload: registration,
        })

        return registration
    }

export const updateRegistrationTravelGrant =
    (registrationId, data, slug) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const registration =
            await RegistrationsService.adminUpdateTravelGrantDetails(
                idToken,
                slug,
                registrationId,
                data,
            )

        dispatch({
            type: ActionTypes.EDIT_REGISTRATION,
            payload: registration,
        })

        return registration
    }

export const bulkEditRegistrations =
    (userIds, edits, slug) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        await RegistrationsService.bulkEditRegistrationsForEvent(
            idToken,
            slug,
            userIds,
            edits,
        )

        dispatch(updateRegistrationsForEvent(slug))

        return
    }

/** Update event teams with loading/error data */
export const updateTeamsForEvent = createAsyncThunk(
    ActionTypes.UPDATE_TEAMS,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const teams = await TeamsService.getTeamsForEvent(idToken, slug)
            return teams
        } catch (error) {
            console.error('Error updating teams', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

/** Update filter groups with loading/error status */
export const updateFilterGroups = createAsyncThunk(
    ActionTypes.UPDATE_FILTER_GROUPS,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const filterGroups =
                await FilterGroupsService.getFilterGroupsForEvent(idToken, slug)
            return filterGroups
        } catch (error) {
            console.error('Error generating rankings', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const createFilterGroup =
    (slug, label, description, filters) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const filterGroup = await FilterGroupsService.createFilterGroup(
            idToken,
            label,
            description,
            filters,
            slug,
        )

        dispatch({
            type: ActionTypes.CREATE_FILTER_GROUP,
            payload: filterGroup,
        })

        return filterGroup
    }

export const editFilterGroup =
    (slug, label, description, filters) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const filterGroup = await FilterGroupsService.editFilterGroup(
            idToken,
            label,
            description,
            filters,
            slug,
        )

        dispatch({
            type: ActionTypes.EDIT_FILTER_GROUP,
            payload: filterGroup,
        })

        return filterGroup
    }

export const deleteFilterGroup =
    (slug, label) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const filterGroup = await FilterGroupsService.deleteFilterGroup(
            idToken,
            label,
            slug,
        )

        dispatch({
            type: ActionTypes.DELETE_FILTER_GROUP,
            payload: filterGroup,
        })

        return filterGroup
    }

export const updateProjects = createAsyncThunk(
    ActionTypes.UPDATE_PROJECTS,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            return await ProjectsService.getAllProjectsAsOrganiser(
                idToken,
                slug,
            )
        } catch (error) {
            console.error('Error getting projects', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// export const updateGavelProjects = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     dispatch({
//         type: ActionTypes.UPDATE_GAVEL_PROJECTS,
//         promise: GavelService.getAllProjects(idToken, slug),
//         meta: {
//             onFailure: e => console.log('Error getting gavel projects', e),
//         },
//     })
// }

// export const editGavelProject =
//     (slug, projectId, edits) => async (dispatch, getState) => {
//         const idToken = AuthSelectors.getIdToken(getState())

//         const project = await GavelService.editProject(
//             idToken,
//             slug,
//             projectId,
//             edits,
//         )

//         dispatch({
//             type: ActionTypes.EDIT_GAVEL_PROJECT,
//             payload: project,
//         })

//         return
//     }

// export const updateGavelAnnotators = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     dispatch({
//         type: ActionTypes.UPDATE_GAVEL_ANNOTATORS,
//         promise: GavelService.getAllAnnotators(idToken, slug),
//         meta: {
//             onFailure: e => console.log('Error getting gavel annotators'),
//         },
//     })
// }

export const editGavelAnnotator =
    (slug, annotatorId, edits) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const annotator = await GavelService.editAnnotator(
            idToken,
            slug,
            annotatorId,
            edits,
        )

        dispatch({
            type: ActionTypes.EDIT_GAVEL_ANNOTATOR,
            payload: annotator,
        })

        return
    }

export const updateRankings = createAsyncThunk(
    ActionTypes.UPDATE_RANKINGS,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            return await RankingsService.getFullResults(idToken, slug)
        } catch (error) {
            console.error('Error getting rankings', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const generateResults = createAsyncThunk(
    ActionTypes.UPDATE_RANKINGS,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            return await RankingsService.generateResults(idToken, slug)
        } catch (error) {
            console.error('Error generating rankings', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

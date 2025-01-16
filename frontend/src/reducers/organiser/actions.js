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
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/** Update event with loading/error data */

// export const eventApi = createApi({
//     reducerPath: 'eventApi',
//     baseQuery: async ({ queryFn }) => queryFn(),
//     endpoints: builder => ({
//         getEventBySlug: builder.query({
//             queryFn: async (slug, { getState }) => {
//                 try {
//                     const idToken = AuthSelectors.getIdToken(getState())
//                     const response =
//                         await EventsService.getEventBySlugAsOrganiser(
//                             idToken,
//                             slug,
//                         )
//                     return { data: response.data }
//                 } catch (error) {
//                     return {
//                         error: {
//                             status: error.response?.status,
//                             data: error.response?.data,
//                         },
//                     }
//                 }
//             },
//         }),
//     }),
// })

// Export the hook for the mutation
// export const { useGetEventBySlugQuery } = eventApi

export const updateEvent = createAsyncThunk(
    ActionTypes.UPDATE_EVENT,
    async (slug, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const event = await EventsService.getEventBySlugAsOrganiser(
                idToken,
                slug,
            )
            console.log('UPDATE EVENT ACTION>>>>>>>>>>')
            console.log(event)
            return event
        } catch (error) {
            console.error('Error updating event', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// export const updateEvent = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())
//     const promise = await EventsService.getEventBySlugAsOrganiser(idToken, slug)
//     console.log('UPDATE EVENT>>>>>>>>>>')
//     console.log(promise)
//     dispatch({
//         type: ActionTypes.UPDATE_EVENT,
//         promise: promise,
//         meta: {
//             // onFailure: e => console.log('Error updating event', e),
//         },
//     })

//     return promise
// }

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

// export const updateEventStats = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     dispatch({
//         type: ActionTypes.UPDATE_STATS,
//         promise: EventsService.getEventStats(idToken, slug),
//         meta: {
//             onFailure: e => console.log('Error updating event stats', e),
//         },
//     })
// }

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

// export const updateOrganisersForEvent =
//     (owner, organisers) => async (dispatch, getState) => {
//         const userIds = [owner].concat(organisers)

//         dispatch({
//             type: ActionTypes.UPDATE_ORGANISERS,
//             promise: UserProfilesService.getPublicUserProfiles(userIds),
//             meta: {
//                 onFailure: e =>
//                     console.log('Error updating event organisers', e),
//             },
//         })
//     }

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
            console.log('UPDATE RECRUITERS ACTION>>>>>>>>>>')
            console.log(recruiters)
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

// export const updateRecruitersForEvent =
//     recruiters => async (dispatch, getState) => {
//         const idToken = AuthSelectors.getIdToken(getState())
//         const userIds = recruiters?.map(rec => {
//             return rec.recruiterId
//         })

//         dispatch({
//             type: ActionTypes.UPDATE_EVENT_RECRUITERS,
//             promise: UserProfilesService.getPublicUserProfiles(userIds),
//             meta: {
//                 onFailure: e =>
//                     console.log('Error updating recruiters for this event', e),
//             },
//         })
//     }

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

// export const updateRegistrationsForEvent =
//     slug => async (dispatch, getState) => {
//         const idToken = AuthSelectors.getIdToken(getState())

//         if (!slug) return

//         dispatch({
//             type: ActionTypes.UPDATE_REGISTRATIONS,
//             promise: RegistrationsService.getRegistrationsForEvent(
//                 idToken,
//                 slug,
//             ),
//             meta: {
//                 onFailure: e => console.log('Error updating registrations', e),
//             },
//         })
//     }

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

// export const updateTeamsForEvent = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())
//     if (!slug) return

//     dispatch({
//         type: ActionTypes.UPDATE_TEAMS,
//         promise: TeamsService.getTeamsForEvent(idToken, slug),
//         meta: {
//             onFailure: e => console.log('Error updating teams', e),
//         },
//     })
// }

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

// export const updateFilterGroups = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     dispatch({
//         type: ActionTypes.UPDATE_FILTER_GROUPS,
//         promise: FilterGroupsService.getFilterGroupsForEvent(idToken, slug),
//         meta: {
//             onFailure: e => console.log('Error updating filter groups', e),
//         },
//     })

//     return
// }

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

// export const updateProjects = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     dispatch({
//         type: ActionTypes.UPDATE_PROJECTS,
//         promise: ProjectsService.getAllProjectsAsOrganiser(idToken, slug),
//         meta: {
//             onFailure: e => console.log('Error getting projects', e),
//         },
//     })
// }

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

// export const updateRankings = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     dispatch({
//         type: ActionTypes.UPDATE_RANKINGS,
//         promise: RankingsService.getFullResults(idToken, slug),
//         meta: {
//             onFailure: e => console.log('Error getting rankings', e),
//         },
//     })
// }

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

// export const generateResults = slug => async (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())
//     dispatch({
//         type: ActionTypes.UPDATE_RANKINGS,
//         promise: RankingsService.generateResults(idToken, slug),
//         meta: {
//             onFailure: e => console.log('Error generating rankings', e),
//         },
//     })
// }

import * as ActionTypes from './actionTypes'
import * as AuthSelectors from 'reducers/auth/selectors'
import * as RecruitmentSelectors from 'reducers/recruitment/selectors'
import * as DashboardSelectors from 'reducers/dashboard/selectors'
import { buildFilterArray } from './helpers'

import RecruitmentService from 'services/recruitment'
import UserProfilesService from 'services/userProfiles'
import EventsService from 'services/events'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const setFilters = data => dispatch => {
    dispatch({
        type: ActionTypes.SET_FILTERS,
        payload: data,
    })
}

export const setFiltersField = (field, value) => dispatch => {
    dispatch({
        type: ActionTypes.SET_FILTERS_FIELD,
        payload: {
            [field]: value,
        },
    })
}

export const setPageSize = size => ({
    type: ActionTypes.SET_PAGE_SIZE,
    payload: size,
})

export const setPage = page => ({
    type: ActionTypes.SET_PAGE,
    payload: page,
})

export const setPrevPage = () => ({
    type: ActionTypes.SET_PREV_PAGE,
})

export const setNextPage = () => ({
    type: ActionTypes.SET_NEXT_PAGE,
})

// export const updateEvents = () => (dispatch, getState) => {
//     dispatch({
//         type: ActionTypes.UPDATE_EVENTS,
//         promise: EventsService.getPublicEvents(),
//         meta: {
//             onFailure: e => console.log('Error updating events', e),
//         },
//     })
// }

export const updateEvents = createAsyncThunk(
    ActionTypes.UPDATE_EVENTS,
    async (_, { rejectWithValue }) => {
        try {
            return await EventsService.getPublicEvents()
        } catch (error) {
            console.error('Error updating events', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// export const updateActionHistory = organisation => (dispatch, getState) => {
//     const state = getState()
//     const idToken = AuthSelectors.getIdToken(getState())
//     const event = DashboardSelectors.event(state)
//     dispatch({
//         type: ActionTypes.UPDATE_ACTION_HISTORY,
//         promise: RecruitmentService.getActionHistory(
//             idToken,
//             organisation,
//             event._id,
//         ),
//         meta: {
//             onFailure: e => console.log('Error getting action history', e),
//         },
//     })
// }

export const updateActionHistory = createAsyncThunk(
    ActionTypes.UPDATE_ACTION_HISTORY,
    async (organisation, { getState, rejectWithValue }) => {
        try {
            const state = getState()
            const idToken = AuthSelectors.getIdToken(state)
            const event = DashboardSelectors.event(state)
            const actionHistory = await RecruitmentService.getActionHistory(
                idToken,
                organisation,
                event._id,
            )
            return actionHistory
        } catch (error) {
            console.error('Error getting action history', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// export const updateSearchResults = () => (dispatch, getState) => {
//     const state = getState()
//     const idToken = AuthSelectors.getIdToken(state)
//     const page = RecruitmentSelectors.page(state)
//     const pageSize = RecruitmentSelectors.pageSize(state)
//     const event = DashboardSelectors.event(state) //will be needed to get event spesific participants. Comes from dashboard state, first recrytool needs to migrated to be component.
//     const filters = buildFilterArray(RecruitmentSelectors.filters(state), event)
//     dispatch({
//         type: ActionTypes.UPDATE_SEARCH_RESULTS,
//         promise: RecruitmentService.search(
//             idToken,
//             filters,
//             page,
//             pageSize,
//             event._id,
//         ),
//         meta: {
//             onFailure: e => console.log('Error getting search results', e),
//         },
//     })
// }

export const updateSearchResults = createAsyncThunk(
    ActionTypes.UPDATE_SEARCH_RESULTS,
    async (_, { getState, rejectWithValue }) => {
        try {
            console.log('RUNNING SEARCH for RECRUITMENT')
            const state = getState()
            const idToken = AuthSelectors.getIdToken(state)
            const page = RecruitmentSelectors.page(state)
            const pageSize = RecruitmentSelectors.pageSize(state)
            const event = DashboardSelectors.event(state)
            const filters = buildFilterArray(
                RecruitmentSelectors.filters(state),
                event,
            )
            const searchResult = await RecruitmentService.search(
                idToken,
                filters,
                page,
                pageSize,
                event._id,
            )
            return await searchResult
        } catch (error) {
            console.error('Error getting search results', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

//TODO rework messaging for recruitment

// export const sendMessage =
//     (message, userId, organisation) => async (dispatch, getState) => {
//         const idToken = AuthSelectors.getIdToken(getState())

//         const res = await dispatch({
//             type: ActionTypes.UPDATE_ACTION_HISTORY,
//             promise: RecruitmentService.submitAction(
//                 'message',
//                 idToken,
//                 userId,
//                 organisation,
//                 eventId,
//                 message,
//             ),
//             meta: {
//                 onFailure: e => console.log('Error sending message', e),
//             },
//         })

//         return res
//     }

// export const toggleFavorite =
//     (userId, isFavorite, organisation, eventId) =>
//     async (dispatch, getState) => {
//         const idToken = AuthSelectors.getIdToken(getState())

//         let res

//         if (!isFavorite) {
//             res = await dispatch({
//                 type: ActionTypes.UPDATE_ACTION_HISTORY,
//                 promise: RecruitmentService.submitAction(
//                     'favorite',
//                     idToken,
//                     userId,
//                     organisation,
//                     eventId,
//                 ),
//                 meta: {
//                     onFailure: e => console.log('Error adding to favorites', e),
//                 },
//             })
//         } else {
//             res = await dispatch({
//                 type: ActionTypes.UPDATE_ACTION_HISTORY,
//                 promise: RecruitmentService.submitAction(
//                     'remove-favorite',
//                     idToken,
//                     userId,
//                     organisation,
//                     eventId,
//                 ),
//                 meta: {
//                     onFailure: e => console.log('Error adding to favorites', e),
//                 },
//             })
//         }
//         return res
//     }

export const toggleFavorite = createAsyncThunk(
    ActionTypes.UPDATE_ACTION_HISTORY,
    async (
        { userId, isFavorite, organisation, eventId },
        { getState, rejectWithValue },
    ) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const action = isFavorite ? 'remove-favorite' : 'favorite'
            return await RecruitmentService.submitAction(
                action,
                idToken,
                userId,
                organisation,
                eventId,
            )
        } catch (error) {
            console.error('Error updating favorite status', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// export const updateRecruitersEvent = partners => async (dispatch, getState) => {
//     dispatch({
//         type: ActionTypes.UPDATE_RECRUITERS_EVENT,
//         promise: UserProfilesService.getPublicUserProfiles(partners),
//         meta: {
//             onFailure: e =>
//                 console.log('Error getting recruiters for this event', e),
//         },
//     })
// }

export const updateRecruitersEvent = createAsyncThunk(
    ActionTypes.UPDATE_RECRUITERS_EVENT,
    async (partners, { rejectWithValue }) => {
        try {
            const publicUserProfiles =
                await UserProfilesService.getPublicUserProfiles(partners)
            return publicUserProfiles
        } catch (error) {
            console.error('Error getting recruiters for this event', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// (owner, organisers) => async (dispatch, getState) => {
//     const userIds = [owner].concat(organisers)

//     dispatch({
//         type: ActionTypes.UPDATE_ORGANISERS,
//         promise: UserProfilesService.getPublicUserProfiles(userIds),
//         meta: {
//             onFailure: e =>
//                 console.log('Error updating event organisers', e),
//         },
//     })
// }

export const addRecruiterEvent =
    (userId, event, organisation) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        const user = await UserProfilesService.updateRecruiter(
            idToken,
            userId,
            event,
            organisation,
        )
        dispatch({
            type: ActionTypes.ADD_RECRUITERS_EVENT,
            payload: user,
        })
        dispatch(updateAdminRecruiters())
        return user
    }

export const deleteRecruiterEvent =
    (userId, event) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())
        const user = await UserProfilesService.deleteRecruiter(
            idToken,
            userId,
            event,
        )
        dispatch({
            type: ActionTypes.REMOVE_RECRUITERS_EVENT,
            payload: user,
        })

        dispatch(updateAdminRecruiters())

        return user
    }

/* Admin actions */
// export const updateAdminRecruiters = () => (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())

//     dispatch({
//         type: ActionTypes.ADMIN_UPDATE_RECRUITERS,
//         promise: UserProfilesService.getRecruiters(idToken),
//         meta: {
//             onFailure: e => console.log('Error getting recruiters', e),
//         },
//     })
// }
export const updateAdminRecruiters = createAsyncThunk(
    ActionTypes.ADMIN_UPDATE_RECRUITERS,
    async (_, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const recruiters = await UserProfilesService.getRecruiters(idToken)
            console.log('UPDATE ADMIN RECRUITER>>>>>>>>>>')
            console.log(recruiters)
            return recruiters
        } catch (error) {
            console.error('Error updating recruiters', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

// export const updateAdminSearchResults = query => (dispatch, getState) => {
//     const idToken = AuthSelectors.getIdToken(getState())
//     dispatch({
//         type: ActionTypes.ADMIN_UPDATE_SEARCH_RESULTS,
//         promise: UserProfilesService.queryUsers(idToken, query),
//         meta: {
//             onFailure: e => console.log('Error querying users', e),
//         },
//     })
// }

export const updateAdminSearchResults = createAsyncThunk(
    ActionTypes.ADMIN_UPDATE_SEARCH_RESULTS,
    async (query, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const queryUsers = await UserProfilesService.queryUsers(
                idToken,
                query,
            )
            return queryUsers
        } catch (error) {
            console.error('Error querying users', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

export const adminGrantRecruiterAccess =
    (userId, events, organisation) => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const user = await UserProfilesService.updateRecruiterAdmin(
            idToken,
            userId,
            events,
            organisation,
        )
        dispatch({
            type: ActionTypes.ADMIN_UPDATE_USER,
            payload: user,
        })

        dispatch(updateAdminRecruiters())

        return user
    }

export const adminRevokeRecruiterAccess =
    userId => async (dispatch, getState) => {
        const idToken = AuthSelectors.getIdToken(getState())

        const user = await UserProfilesService.deleteRecruitersAdmin(
            idToken,
            userId,
        )
        dispatch({
            type: ActionTypes.ADMIN_UPDATE_USER,
            payload: user,
        })
    }

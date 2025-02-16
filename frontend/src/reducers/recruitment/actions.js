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
export const updateAdminRecruiters = createAsyncThunk(
    ActionTypes.ADMIN_UPDATE_RECRUITERS,
    async (_, { getState, rejectWithValue }) => {
        try {
            const idToken = AuthSelectors.getIdToken(getState())
            const recruiters = await UserProfilesService.getRecruiters(idToken)
            return recruiters
        } catch (error) {
            console.error('Error updating recruiters', error)
            return rejectWithValue(error.message || 'Unknown error')
        }
    },
)

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

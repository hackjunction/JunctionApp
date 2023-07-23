import * as ActionTypes from './actionTypes'
import { buildHandler, buildUpdatePath } from 'redux/utils'

const initialState = {
    events: {
        data: [],
        loading: false,
        error: false,
        updated: 0,
    },
    searchResults: {
        data: [],
        count: 0,
        loading: false,
        error: false,
        updated: 0,
    },
    filters: {},
    pagination: {
        page: 0,
        page_size: 24,
    },
    actionHistory: {
        data: [],
        map: {},
        loading: false,
        error: false,
        updated: 0,
    },
    adminRecruiters: {
        data: [],
        loading: false,
        error: false,
        updated: 0,
    },
    adminSearchResults: {
        data: [],
        loading: false,
        error: false,
        updated: 0,
    },
}

const eventsHandler = buildHandler('events')
const searchResultsHandler = buildHandler('searchResults')
const actionHistoryHandler = buildHandler('actionHistory', 'user', true)
const eventRecruitersHandler = buildHandler('eventRecruiters')
const adminRecruitersHandler = buildHandler('adminRecruiters')
const adminSearchHandler = buildHandler('adminSearchResults')

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENTS: {
            return eventsHandler(state, action)
        }
        case ActionTypes.UPDATE_SEARCH_RESULTS: {
            if (action.payload) {
                const formattedAction = {
                    ...action,
                    payload: action.payload.data,
                }
                const newState = searchResultsHandler(state, formattedAction)
                return {
                    ...newState,
                    searchResults: {
                        ...newState.searchResults,
                        count: action.payload.count,
                    },
                }
            } else {
                return searchResultsHandler(state, action)
            }
        }
        case ActionTypes.UPDATE_RECRUITERS_EVENT: {
            eventRecruitersHandler(state, action)
        }
        case ActionTypes.ADD_RECRUITERS_EVENT: {
            const data = state.events.data.concat(action.payload.recruiterEvents)
            return {
                ...state,
                events: {
                    ...state.events,
                    data: data
                }
            }

        }
        case ActionTypes.REMOVE_RECRUITERS_EVENT: {
            const data = state.events.data.filter(event => {
                return event.eventId !== action.payload
            })

            return {
                ...state,
                events: {
                    ...state.events,
                    data: data
                }
            }
        }
        case ActionTypes.UPDATE_ACTION_HISTORY: {
            return actionHistoryHandler(state, action)
        }
        case ActionTypes.ADMIN_UPDATE_RECRUITERS: {
            return adminRecruitersHandler(state, action)
        }
        case ActionTypes.ADMIN_UPDATE_SEARCH_RESULTS: {
            return adminSearchHandler(state, action)
        }
        case ActionTypes.ADMIN_UPDATE_USER: {
            return {
                ...state,
                adminRecruiters: {
                    ...state.adminRecruiters,
                    data: state.adminRecruiters.data.map(user => {
                        if (user.userId === action.payload.userId)
                            return action.payload
                        return user
                    }),
                },
                adminSearchResults: {
                    ...state.adminSearchResults,
                    data: state.adminSearchResults.data.map(user => {
                        if (user.userId === action.payload.userId)
                            return action.payload
                        return user
                    }),
                },
            }
        }
        case ActionTypes.SET_FILTERS: {
            return {
                ...state,
                filters: action.payload,
                pagination: {
                    ...state.pagination,
                    page: 0,
                },
            }
        }
        case ActionTypes.SET_FILTERS_FIELD: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload,
                },
                pagination: {
                    ...state.pagination,
                    page: 0,
                },
            }
        }
        case ActionTypes.SET_PAGE_SIZE: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page_size: action.payload,
                },
            }
        }
        case ActionTypes.SET_PAGE: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.payload,
                },
            }
        }
        case ActionTypes.SET_PREV_PAGE: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: state.pagination.page - 1,
                },
            }
        }
        case ActionTypes.SET_NEXT_PAGE: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: state.pagination.page + 1,
                },
            }
        }
        default:
            return state
    }
}

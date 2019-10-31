import * as ActionTypes from './actionTypes';
import { buildHandler } from 'redux/utils';

const initialState = {
    searchResults: {
        data: {
            data: [],
            count: 0
        },
        loading: false,
        error: false,
        updated: 0
    },
    filters: {},
    pagination: {
        page: 0,
        page_size: 24
    },
    actionHistory: {
        data: [],
        loading: false,
        error: false,
        updated: 0
    },
    messageValue: ''
};

const searchResultsHandler = buildHandler('searchResults');
const actionHistoryHandler = buildHandler('actionHistory');

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_SEARCH_RESULTS: {
            return searchResultsHandler(state, action);
        }
        case ActionTypes.UPDATE_ACTION_HISTORY: {
            return actionHistoryHandler(state, action);
        }
        case ActionTypes.SET_FILTERS: {
            return {
                ...state,
                filters: action.payload,
                pagination: {
                    ...state.pagination,
                    page: 0
                }
            };
        }
        case ActionTypes.SET_FILTERS_FIELD: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                },
                pagination: {
                    ...state.pagination,
                    page: 0
                }
            };
        }
        case ActionTypes.SET_PAGE_SIZE: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page_size: action.payload
                }
            };
        }
        case ActionTypes.SET_PAGE: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.payload
                }
            };
        }
        case ActionTypes.SET_PREV_PAGE: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: state.pagination.page - 1
                }
            };
        }
        case ActionTypes.SET_NEXT_PAGE: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: state.pagination.page + 1
                }
            };
        }
        case ActionTypes.CHANGE_MESSAGE_VAL: {
            return {
                ...state,
                messageValue: action.payload
            };
        }
        default:
            return state;
    }
}

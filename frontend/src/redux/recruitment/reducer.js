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
    filters: []
};

const searchResultsHandler = buildHandler('searchResults');

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_SEARCH_RESULTS: {
            return searchResultsHandler(state, action);
        }
        case ActionTypes.SET_FILTERS: {
            return {
                ...state,
                filters: action.payload
            };
        }
        default:
            return state;
    }
}

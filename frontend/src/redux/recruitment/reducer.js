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
    }
};

const searchResultsHandler = buildHandler('searchResults');

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_SEARCH_RESULTS: {
            return searchResultsHandler(state, action);
        }
        default:
            return state;
    }
}

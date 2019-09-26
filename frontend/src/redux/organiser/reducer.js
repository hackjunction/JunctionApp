import * as ActionTypes from './actionTypes';
import * as AuthActionTypes from '../auth/actionTypes';
import { buildHandler, buildUpdatePath } from '../utils';
import { concat, filter, find } from 'lodash-es';

const initialState = {
    event: {
        loading: false,
        error: false,
        updated: 0,
        data: {}
    },
    stats: {
        loading: false,
        error: false,
        updated: 0,
        data: {}
    },
    organisers: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
        map: {}
    },
    registrations: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
        map: {}
    },
    teams: {
        loading: false,
        error: false,
        updated: 0,
        data: []
    },
    travelGrants: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
        map: {}
    }
};

/** See redux/utils.js for docs on this */
const eventHandler = buildHandler('event');
const statsHandler = buildHandler('stats');
const organisersHandler = buildHandler('organisers', 'userId');
const registrationsHandler = buildHandler('registrations', 'user');
const travelGrantsHandler = buildHandler('travelGrants', 'user');
const teamsHandler = buildHandler('teams');
const editEvent = buildUpdatePath('event.data');
const editEventOrganisers = buildUpdatePath('event.data.organisers');

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT: {
            return eventHandler(state, action);
        }
        case ActionTypes.EDIT_EVENT: {
            return editEvent(state, action.payload);
        }
        case ActionTypes.UPDATE_STATS: {
            return statsHandler(state, action);
        }
        case ActionTypes.UPDATE_ORGANISERS: {
            return organisersHandler(state, action);
        }
        case ActionTypes.UPDATE_REGISTRATIONS: {
            return registrationsHandler(state, action);
        }
        case ActionTypes.UPDATE_TEAMS: {
            return teamsHandler(state, action);
        }
        case ActionTypes.UPDATE_TRAVEL_GRANTS: {
            return travelGrantsHandler(state, action);
        }
        case ActionTypes.CREATE_TRAVEL_GRANT: {
            return {
                ...state,
                travelGrants: {
                    ...state.travelGrants,
                    data: state.travelGrants.data.concat(action.payload),
                    map: {
                        ...state.travelGrants.map,
                        [action.payload.user]: action.payload
                    }
                }
            };
        }
        case ActionTypes.EDIT_REGISTRATION: {
            const registration = action.payload;
            return {
                ...state,
                registrations: {
                    ...state.registrations,
                    data: state.registrations.data.map(reg => {
                        if (reg.user === registration.user) {
                            return registration;
                        }
                        return reg;
                    }),
                    map: {
                        ...state.registrations.map,
                        [registration.user]: registration
                    }
                }
            };
        }
        case ActionTypes.REMOVE_ORGANISER: {
            const data = filter(state.event.data.organisers, userId => {
                return userId !== action.payload;
            });
            return editEventOrganisers(state, data);
        }
        case ActionTypes.ADD_ORGANISER: {
            const data = concat(state.event.data.organisers, action.payload);
            return editEventOrganisers(state, data);
        }
        /**TODO: Add attendee update actions */
        case AuthActionTypes.CLEAR_SESSION: {
            return initialState;
        }
        default:
            return state;
    }
}

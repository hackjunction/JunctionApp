import * as ActionTypes from './actionTypes'
import * as AuthActionTypes from '../auth/actionTypes'
import { buildHandler, buildUpdatePath } from '../utils'
import { concat, filter } from 'lodash-es'

const initialState = {
    event: {
        loading: false,
        error: false,
        updated: 0,
        data: {},
    },
    stats: {
        loading: false,
        error: false,
        updated: 0,
        data: {},
    },
    organisers: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
        map: {},
    },
    recruiters: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
        map: {},
    },
    organizations: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
        map: {},
    },
    registrations: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
        map: {},
    },
    teams: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
        map: {},
    },
    projects: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
        map: {},
    },
    gavelProjects: {
        data: [],
        loading: false,
        error: false,
        updated: 0,
    },
    gavelAnnotators: {
        data: [],
        loading: false,
        error: false,
        updated: 0,
    },
    filterGroups: {
        loading: false,
        error: false,
        updated: 0,
        data: [],
    },
    rankings: {
        loading: false,
        error: false,
        updated: 0,
        data: {},
    },
}

/** See redux/utils.js for docs on this */
const eventHandler = buildHandler('event')
const statsHandler = buildHandler('stats')
const organisersHandler = buildHandler('organisers', 'userId')
const eventRecruitersHandler = buildHandler('recruiters', 'userId')
const registrationsHandler = buildHandler('registrations', 'user')
const filterGroupsHandler = buildHandler('filterGroups')
const teamsHandler = buildHandler('teams')
const projectsHandler = buildHandler('projects', '_id')
const gavelProjectsHandler = buildHandler('gavelProjects')
const gavelAnnotatorsHandler = buildHandler('gavelAnnotators')
const rankingsHandler = buildHandler('rankings')
const editEvent = buildUpdatePath('event.data')
const editEventOrganisers = buildUpdatePath('event.data.organisers')
const editEventRecruitres = buildUpdatePath('event.data.recruiters')

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT: {
            return eventHandler(state, action)
        }
        case ActionTypes.EDIT_EVENT: {
            return editEvent(state, action.payload)
        }
        case ActionTypes.UPDATE_STATS: {
            return statsHandler(state, action)
        }
        case ActionTypes.UPDATE_ORGANISERS: {
            return organisersHandler(state, action)
        }
        case ActionTypes.UPDATE_EVENT_RECRUITERS: {
            return eventRecruitersHandler(state, action)
        }
        case ActionTypes.UPDATE_REGISTRATIONS: {
            return registrationsHandler(state, action)
        }
        case ActionTypes.UPDATE_TEAMS: {
            const newState = teamsHandler(state, action)
            if (action.payload) {
                const byUser = action.payload.reduce((map, team) => {
                    map[team.owner] = team
                    team.members.forEach(member => {
                        map[member] = team
                    })
                    return map
                }, {})
                return {
                    ...newState,
                    teams: {
                        ...newState.teams,
                        map: byUser,
                    },
                }
            } else {
                return newState
            }
        }
        case ActionTypes.UPDATE_PROJECTS: {
            return projectsHandler(state, action)
        }
        case ActionTypes.UPDATE_FILTER_GROUPS: {
            return filterGroupsHandler(state, action)
        }
        case ActionTypes.UPDATE_GAVEL_PROJECTS: {
            return gavelProjectsHandler(state, action)
        }
        case ActionTypes.UPDATE_GAVEL_ANNOTATORS: {
            return gavelAnnotatorsHandler(state, action)
        }
        case ActionTypes.UPDATE_RANKINGS: {
            return rankingsHandler(state, action)
        }
        case ActionTypes.EDIT_GAVEL_PROJECT: {
            return {
                ...state,
                gavelProjects: {
                    ...state.gavelProjects,
                    data: state.gavelProjects.data.map(item => {
                        if (item._id === action.payload._id) {
                            return action.payload
                        }
                        return item
                    }),
                },
            }
        }
        case ActionTypes.EDIT_GAVEL_ANNOTATOR: {
            return {
                ...state,
                gavelAnnotators: {
                    ...state.gavelAnnotators,
                    data: state.gavelAnnotators.data.map(item => {
                        if (item._id === action.payload._id) {
                            return action.payload
                        }
                        return item
                    }),
                },
            }
        }
        case ActionTypes.CREATE_FILTER_GROUP: {
            return {
                ...state,
                filterGroups: {
                    ...state.filterGroups,
                    data: state.filterGroups.data.concat(action.payload),
                },
            }
        }
        case ActionTypes.EDIT_FILTER_GROUP: {
            return {
                ...state,
                filterGroups: {
                    ...state.filterGroups,
                    data: state.filterGroups.data.map(filterGroup => {
                        if (filterGroup.label === action.payload.label) {
                            return action.payload
                        }
                        return filterGroup
                    }),
                },
            }
        }
        case ActionTypes.DELETE_FILTER_GROUP: {
            return {
                ...state,
                filterGroups: {
                    ...state.filterGroups,
                    data: state.filterGroups.data.filter(filterGroup => {
                        if (filterGroup.label === action.payload.label) {
                            return false
                        }
                        return true
                    }),
                },
            }
        }
        case ActionTypes.EDIT_REGISTRATION: {
            const registration = action.payload
            return {
                ...state,
                registrations: {
                    ...state.registrations,
                    data: state.registrations.data.map(reg => {
                        if (reg.user === registration.user) {
                            return registration
                        }
                        return reg
                    }),
                    map: {
                        ...state.registrations.map,
                        [registration.user]: registration,
                    },
                },
            }
        }
        case ActionTypes.REMOVE_ORGANISER: {
            const data = filter(state.event.data.organisers, userId => {
                return userId !== action.payload
            })
            return editEventOrganisers(state, data)
        }
        case ActionTypes.ADD_ORGANISER: {
            const data = concat(state.event.data.organisers, action.payload)
            return editEventOrganisers(state, data)
        }
        case ActionTypes.REMOVE_EVENT_RECRUITER: {
            const data = filter(state.event.data.recruiters, userId => {
                return userId.recruiterId !== action.payload
            })

            return editEventRecruitres(state, data)
        }
        case ActionTypes.ADD_EVENT_RECRUITER: {
            //const data = state.event.data.recruiters.concat(action.payload)
            return editEventRecruitres(state, action.payload)
        }
        /**TODO: Add attendee update actions */
        case AuthActionTypes.CLEAR_SESSION: {
            return initialState
        }
        default:
            return state
    }
}

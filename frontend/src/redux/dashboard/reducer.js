import * as ActionTypes from './actionTypes'
import { buildHandler, buildUpdatePath } from '../utils'

const initialState = {
    event: {
        data: null,
        loading: true,
        error: false,
        updated: 0,
    },
    registration: {
        data: null,
        loading: true,
        error: false,
        updated: 0,
    },
    team: {
        data: null,
        loading: true,
        error: false,
        updated: 0,
    },
    projects: {
        data: [],
        loading: true,
        error: false,
        updated: 0,
    },
    annotator: {
        data: null,
        loading: true,
        error: false,
        updated: 0,
    },
}

const updateEventHandler = buildHandler('event')
const updateRegistrationHandler = buildHandler('registration')
const updateTeamHandler = buildHandler('team')
const updateProjectsHandler = buildHandler('projects', '_id')
const updateAnnotatorHandler = buildHandler('annotator')
const editRegistration = buildUpdatePath('registration.data')
const editTeam = buildUpdatePath('team.data')
const editAnnotator = buildUpdatePath('annotator.data')

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT: {
            return updateEventHandler(state, action)
        }
        case ActionTypes.UPDATE_REGISTRATION: {
            return updateRegistrationHandler(state, action)
        }
        case ActionTypes.UPDATE_TEAM: {
            return updateTeamHandler(state, action)
        }
        case ActionTypes.UPDATE_PROJECTS: {
            return updateProjectsHandler(state, action)
        }
        case ActionTypes.UPDATE_ANNOTATOR: {
            return updateAnnotatorHandler(state, action)
        }
        case ActionTypes.EDIT_REGISTRATION: {
            return editRegistration(state, action.payload)
        }
        case ActionTypes.EDIT_TEAM: {
            return editTeam(state, action.payload)
        }
        case ActionTypes.EDIT_ANNOTATOR: {
            return editAnnotator(state, action.payload)
        }
        case ActionTypes.CLEAR_TEAM: {
            return editTeam(state, initialState.team.data)
        }
        default:
            return state
    }
}

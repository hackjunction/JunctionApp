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
    teams: {
        data: [],
        loading: true,
        error: false,
        updated: 0,
    },
    selected_team: {
        data: null,
        loading: true,
        error: false,
        updated: 0,
    },
    // selected_candidate: {
    //     data: null,
    //     loading: true,
    //     error: false,
    //     updated: 0,
    // },
    projects: {
        data: null,
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
    project_scores: {
        data: [],
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
const updateProjectScoresHandler = buildHandler('project_scores')
const updateTeamsHandler = buildHandler('teams')
const updateSeletecTeamHandler = buildHandler('selected_team')
// const updateSeletecUserHandler = buildHandler('selected_candidate')

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
        case ActionTypes.UPDATE_PROJECT_SCORES: {
            return updateProjectScoresHandler(state, action)
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
        case ActionTypes.UPDATE_TEAMS: {
            return updateTeamsHandler(state, action)
        }
        case ActionTypes.UPDATE_SELECTED_TEAM: {
            return updateSeletecTeamHandler(state, action)
        }
        // case ActionTypes.GET_CANDIDATE_PROFILE: {
        //     return updateSeletecUserHandler(state, action)
        // }
        default:
            return state
    }
}

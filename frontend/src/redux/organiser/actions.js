import * as ActionTypes from './actionTypes'
import * as AuthSelectors from 'redux/auth/selectors'
import UserProfilesService from 'services/userProfiles'
import EventsService from 'services/events'
import RegistrationsService from 'services/registrations'
import TeamsService from 'services/teams'
import FilterGroupsService from 'services/filterGroups'
import ProjectsService from 'services/projects'
import GavelService from 'services/reviewing/gavel'
import RankingsService from 'services/rankings'

/** Update event with loading/error data */
export const updateEvent = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_EVENT,
        promise: EventsService.getEventBySlugAsOrganiser(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating event', e),
        },
    })
}

/** Submit edits to an event */
export const editEvent = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const event = await EventsService.updateEventBySlug(idToken, slug, data)
    dispatch({ type: ActionTypes.EDIT_EVENT, payload: event })
    return event
}

export const updateWinners = (slug, winners) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    const event = await EventsService.updateWinners(idToken, slug, winners)
    dispatch({ type: ActionTypes.EDIT_EVENT, payload: event })
    return event
}

/** Update event stats with loading/error data */
export const updateEventStats = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_STATS,
        promise: EventsService.getEventStats(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating event stats', e),
        },
    })
}

/** Update event organisers with loading/error data */
export const updateOrganisersForEvent = (owner, organisers) => async (
    dispatch,
    getState
) => {
    const userIds = [owner].concat(organisers)

    dispatch({
        type: ActionTypes.UPDATE_ORGANISERS,
        promise: UserProfilesService.getPublicUserProfiles(userIds),
        meta: {
            onFailure: e => console.log('Error updating event organisers', e),
        },
    })
}

export const removeOrganiserFromEvent = (slug, userId) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const organisers = await EventsService.removeOrganiserFromEvent(
        idToken,
        slug,
        userId
    )
    dispatch({
        type: ActionTypes.REMOVE_ORGANISER,
        payload: userId,
    })

    return organisers
}

export const addOrganiserToEvent = (slug, userId) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const organisers = await EventsService.addOrganiserToEvent(
        idToken,
        slug,
        userId
    )
    dispatch({
        type: ActionTypes.ADD_ORGANISER,
        payload: userId,
    })

    return organisers
}

/** Update event registrations with loading/error data */
export const updateRegistrationsForEvent = slug => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    if (!slug) return

    dispatch({
        type: ActionTypes.UPDATE_REGISTRATIONS,
        promise: RegistrationsService.getRegistrationsForEvent(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating registrations', e),
        },
    })
}

export const editRegistration = (registrationId, data, slug) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const registration = await RegistrationsService.editRegistration(
        idToken,
        slug,
        registrationId,
        data
    )
    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration,
    })

    return registration
}

export const updateRegistrationTravelGrant = (
    registrationId,
    data,
    slug
) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const registration = await RegistrationsService.adminUpdateTravelGrantDetails(
        idToken,
        slug,
        registrationId,
        data
    )

    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration,
    })

    return registration
}

export const bulkEditRegistrations = (userIds, edits, slug) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    await RegistrationsService.bulkEditRegistrationsForEvent(
        idToken,
        slug,
        userIds,
        edits
    )

    dispatch(updateRegistrationsForEvent(slug))

    return
}

/** Update event teams with loading/error data */
export const updateTeamsForEvent = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    if (!slug) return

    dispatch({
        type: ActionTypes.UPDATE_TEAMS,
        promise: TeamsService.getTeamsForEvent(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating teams', e),
        },
    })
}

/** Update filter groups with loading/error status */
export const updateFilterGroups = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_FILTER_GROUPS,
        promise: FilterGroupsService.getFilterGroupsForEvent(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating filter groups', e),
        },
    })

    return
}

export const createFilterGroup = (slug, label, description, filters) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const filterGroup = await FilterGroupsService.createFilterGroup(
        idToken,
        label,
        description,
        filters,
        slug
    )

    dispatch({
        type: ActionTypes.CREATE_FILTER_GROUP,
        payload: filterGroup,
    })

    return filterGroup
}

export const editFilterGroup = (slug, label, description, filters) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const filterGroup = await FilterGroupsService.editFilterGroup(
        idToken,
        label,
        description,
        filters,
        slug
    )

    dispatch({
        type: ActionTypes.EDIT_FILTER_GROUP,
        payload: filterGroup,
    })

    return filterGroup
}

export const deleteFilterGroup = (slug, label) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const filterGroup = await FilterGroupsService.deleteFilterGroup(
        idToken,
        label,
        slug
    )

    dispatch({
        type: ActionTypes.DELETE_FILTER_GROUP,
        payload: filterGroup,
    })

    return filterGroup
}

export const updateProjects = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_PROJECTS,
        promise: ProjectsService.getAllProjectsAsOrganiser(idToken, slug),
        meta: {
            onFailure: e => console.log('Error getting projects', e),
        },
    })
}

export const updateGavelProjects = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_GAVEL_PROJECTS,
        promise: GavelService.getAllProjects(idToken, slug),
        meta: {
            onFailure: e => console.log('Error getting gavel projects', e),
        },
    })
}

export const editGavelProject = (slug, projectId, edits) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const project = await GavelService.editProject(
        idToken,
        slug,
        projectId,
        edits
    )

    dispatch({
        type: ActionTypes.EDIT_GAVEL_PROJECT,
        payload: project,
    })

    return
}

export const updateGavelAnnotators = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_GAVEL_ANNOTATORS,
        promise: GavelService.getAllAnnotators(idToken, slug),
        meta: {
            onFailure: e => console.log('Error getting gavel annotators'),
        },
    })
}

export const editGavelAnnotator = (slug, annotatorId, edits) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const annotator = await GavelService.editAnnotator(
        idToken,
        slug,
        annotatorId,
        edits
    )

    dispatch({
        type: ActionTypes.EDIT_GAVEL_ANNOTATOR,
        payload: annotator,
    })

    return
}

export const updateRankings = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_RANKINGS,
        promise: RankingsService.getFullResults(idToken, slug),
        meta: {
            onFailure: e => console.log('Error getting rankings', e),
        },
    })
}

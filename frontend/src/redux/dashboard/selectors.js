import { createSelector } from 'reselect'
import { isEmpty } from 'lodash-es'
import moment from 'moment'
import {
    EventHelpers,
    EventStatuses,
    EventTypes,
    RegistrationStatuses,
    ReviewingMethods,
    // RegistrationTravelGrantStatuses as TravelGrantStatuses
} from '@hackjunction/shared'

export const event = state => state.dashboard.event.data
export const eventLoading = state => state.dashboard.event.loading
export const eventError = state => state.dashboard.event.error
export const eventUpdated = state => state.dashboard.event.updated

export const registration = state => state.dashboard.registration.data
export const registrationLoading = state => state.dashboard.registration.loading
export const registrationError = state => state.dashboard.registration.error
export const registrationUpdated = state => state.dashboard.registration.updated

export const team = state => state.dashboard.team.data
export const teamLoading = state => state.dashboard.team.loading
export const teamError = state => state.dashboard.team.error
export const teamUpdated = state => state.dashboard.team.updated

export const teams = state => state.dashboard.teams.data
export const teamsLoading = state => state.dashboard.teams.loading
export const teamsError = state => state.dashboard.teams.error
export const teamsUpdated = state => state.dashboard.teams.updated

export const selectedTeam = state => state.dashboard.selected_team.data
export const selectedTeamLoading = state =>
    state.dashboard.selected_team.loading
export const selectedTeamError = state => state.dashboard.selected_team.error
export const selectedTeamUpdated = state =>
    state.dashboard.selected_team.updated

// export const selectedCandidate = state => state.dashboard.selected_user.data
// export const selectedCandidateLoading = state =>
//     state.dashboard.selected_user.loading
// export const selectedCandidateError = state =>
//     state.dashboard.selected_user.error
// export const selectedCandidateUpdated = state =>
//     state.dashboard.selected_user.updated

export const projects = state => state.dashboard.projects.data
export const projectsLoading = state => state.dashboard.projects.loading
export const projectsError = state => state.dashboard.projects.error
export const projectsUpdated = state => state.dashboard.projects.updated

export const annotator = state => state.dashboard.annotator.data
export const annotatorLoading = state => state.dashboard.annotator.loading
export const annotatorError = state => state.dashboard.annotator.error
export const annotatorUpdated = state => state.dashboard.annotator.updated

export const projectScores = state => state.dashboard.project_scores.data
export const projectScoresLoading = state =>
    state.dashboard.project_scores.loading
export const projectScoresError = state => state.dashboard.project_scores.error
export const projectScoresUpdated = state =>
    state.dashboard.project_scores.updated

export const annotatorVoteCount = createSelector(annotator, annotator => {
    if (!annotator) return 0
    return Math.max(annotator.ignore.length - annotator.skipped.length - 1, 0)
})

export const eventStatus = createSelector(event, event =>
    EventHelpers.getEventStatus(event, moment),
)

export const isRegistrationOpen = createSelector(
    eventStatus,
    status => status === EventStatuses.REGISTRATION_OPEN.id,
)
export const isSubmissionsUpcoming = createSelector(event, event =>
    EventHelpers.isSubmissionsUpcoming(event, moment),
)
export const isSubmissionsPast = createSelector(event, event =>
    EventHelpers.isSubmissionsPast(event, moment),
)

export const isAcceptancePending = createSelector(
    registration,
    registration => {
        return (
            [
                RegistrationStatuses.asObject.pending.id,
                RegistrationStatuses.asObject.softAccepted.id,
                RegistrationStatuses.asObject.softRejected.id,
            ].indexOf(registration.status) !== -1
        )
    },
)

export const appliedAsTeam = createSelector(registration, registration => {
    if (
        !registration ||
        !registration.hasOwnProperty('answers') ||
        !registration.answers.hasOwnProperty('teamOptions')
    ) {
        return false
    } else {
        return registration.answers.teamOptions.applyAsTeam
    }
})

export const hasTeam = createSelector(team, team => {
    return !isEmpty(team)
})

export const isTeamComplete = createSelector(team, team => {
    if (isEmpty(team)) {
        return false
    } else {
        return team.complete
    }
})

export const isTeamValid = createSelector(team, team => {
    if (!team) return false
    return (
        [team.owner]
            .concat(team.members)
            .map(userId => {
                return team.meta[userId]
            })
            .filter(member => {
                if (
                    member.registration.status !==
                    RegistrationStatuses.asObject.checkedIn.id
                ) {
                    return true
                }
                return false
            }).length === 0
    )
})

export const lockedPages = createSelector(event, event => {
    return {
        submissions: !EventHelpers.isSubmissionsOpen(event, moment),
        reviewing: EventHelpers.isVotingPast(event, moment),
        team: EventHelpers.isSubmissionsPast(event, moment),
        finalistVoting: !EventHelpers.isFinalistVotingOpen(event, moment),
    }
})

export const shownPages = createSelector(
    event,
    registration,
    (event, registration) => {
        const STATUSES = RegistrationStatuses.asObject

        return {
            submissions: registration?.status === STATUSES.checkedIn.id,
            eventID:
                event?.eventType === EventTypes.physical.id &&
                [
                    STATUSES.confirmed.id,
                    STATUSES.confirmedToHub.id,
                    STATUSES.checkedIn.id,
                ].indexOf(registration?.status) !== -1,
            reviewing:
                registration?.status === STATUSES.checkedIn.id &&
                event?.reviewMethod === ReviewingMethods.gavelPeerReview.id,
            travelGrant:
                registration?.status === STATUSES.checkedIn.id &&
                (registration?.travelGrant ?? 0) > 0,
            finalistVoting:
                registration?.status === STATUSES.checkedIn.id &&
                event?.overallReviewMethod !== 'noOverallWinner',
            hackerPack:
                [
                    STATUSES.checkedIn.id,
                    STATUSES.confirmed.id,
                    STATUSES.confirmedToHub.id,
                ].indexOf(registration?.status) !== -1,
            meetings: EventHelpers.areMeetingsEnabled(event),
        }
    },
)

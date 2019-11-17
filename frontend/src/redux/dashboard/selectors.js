import { createSelector } from 'reselect';
import { isEmpty } from 'lodash-es';
import moment from 'moment';
import { EventHelpers, EventStatuses, EventTypes, RegistrationStatuses, ReviewingMethods } from '@hackjunction/shared';

export const event = state => state.dashboard.event.data;
export const eventLoading = state => state.dashboard.event.loading;
export const eventError = state => state.dashboard.event.error;
export const eventUpdated = state => state.dashboard.event.updated;

export const registration = state => state.dashboard.registration.data;
export const registrationLoading = state => state.dashboard.registration.loading;
export const registrationError = state => state.dashboard.registration.error;
export const registrationUpdated = state => state.dashboard.registration.updated;

export const team = state => state.dashboard.team.data;
export const teamLoading = state => state.dashboard.team.loading;
export const teamError = state => state.dashboard.team.error;
export const teamUpdated = state => state.dashboard.team.updated;

export const project = state => state.dashboard.project.data;
export const projectLoading = state => state.dashboard.project.loading;
export const projectError = state => state.dashboard.project.error;
export const projectUpdated = state => state.dashboard.project.updated;

export const annotator = state => state.dashboard.annotator.data;
export const annotatorLoading = state => state.dashboard.annotator.loading;
export const annotatorError = state => state.dashboard.annotator.error;
export const annotatorUpdated = state => state.dashboard.annotator.updated;

export const eventStatus = createSelector(event, event => EventHelpers.getEventStatus(event, moment));

export const isRegistrationOpen = createSelector(eventStatus, status => status === EventStatuses.REGISTRATION_OPEN.id);
export const isSubmissionsUpcoming = createSelector(event, event => EventHelpers.isSubmissionsUpcoming(event, moment));
export const isSubmissionsPast = createSelector(event, event => EventHelpers.isSubmissionsPast(event, moment));

export const isAcceptancePending = createSelector(registration, registration => {
    return (
        [
            RegistrationStatuses.asObject.pending.id,
            RegistrationStatuses.asObject.softAccepted.id,
            RegistrationStatuses.asObject.softRejected.id
        ].indexOf(registration.status) !== -1
    );
});

export const appliedAsTeam = createSelector(registration, registration => {
    if (
        !registration ||
        !registration.hasOwnProperty('answers') ||
        !registration.answers.hasOwnProperty('teamOptions')
    ) {
        return false;
    } else {
        return registration.answers.teamOptions.applyAsTeam;
    }
});

export const hasTeam = createSelector(team, team => {
    return !isEmpty(team);
});

export const isTeamComplete = createSelector(team, team => {
    if (isEmpty(team)) {
        return false;
    } else {
        return team.complete;
    }
});

export const isTeamValid = createSelector(team, team => {
    if (!team) return false;
    return (
        [team.owner]
            .concat(team.members)
            .map(userId => {
                return team.meta[userId];
            })
            .filter(member => {
                if (member.registration.status !== RegistrationStatuses.asObject.checkedIn.id) {
                    return true;
                }
                return false;
            }).length === 0
    );
});

export const showEventID = createSelector(event, registration, (event, registration) => {
    if (!event) return false;
    if (event.eventType !== EventTypes.physical.id) return false;

    const validStatuses = [RegistrationStatuses.asObject.confirmed.id, RegistrationStatuses.asObject.checkedIn.id];
    if (!registration || validStatuses.indexOf(registration.status) === -1) {
        return false;
    }

    return true;
});

export const showSubmission = createSelector(registration, registration => {
    if (!registration || registration.status !== RegistrationStatuses.asObject.checkedIn.id) {
        return false;
    }

    return true;
});

export const isSubmissionsLocked = createSelector(event, event => {
    return !EventHelpers.isSubmissionsOpen(event, moment);
});

export const showReviewing = createSelector(event, registration, (event, registration) => {
    if (!registration || registration.status !== RegistrationStatuses.asObject.checkedIn.id) return false;
    if (!event || event.reviewMethod !== ReviewingMethods.gavelPeerReview.id) return false;
    return true;
});

export const isReviewingLocked = createSelector(event, event => {
    return EventHelpers.isVotingPast(event, moment);
});

export const isTeamPageLocked = createSelector(event, event => {
    return EventHelpers.isSubmissionsPast(event, moment);
});

export const showTravelGrant = createSelector(event, registration, (event, registration) => {
    if (!registration || registration.status !== RegistrationStatuses.asObject.checkedIn.id) return false;
    if (!registration.travelGrant || registration.travelGrant === 0) return false;
    return true;
});

export const showHackerPack = createSelector(event, registration, (event, registration) => {
    if (!registration || ['checkedIn', 'confirmed'].indexOf(registration.status) === -1) return false;
    if (!event) return false;
    return true;
});

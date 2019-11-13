import { createSelector } from 'reselect';
import { isEmpty } from 'lodash-es';
import moment from 'moment';
import { EventHelpers, EventStatuses, RegistrationStatuses } from '@hackjunction/shared';

export const event = state => state.dashboard.event.data;
export const eventLoading = state => state.dashboard.event.loading;
export const eventError = state => state.dashboard.event.error;
export const eventUpdated = state => state.dashboard.event.updated;

export const eventStatus = createSelector(event, event => EventHelpers.getEventStatus(event, moment));

export const isRegistrationOpen = createSelector(eventStatus, status => status === EventStatuses.REGISTRATION_OPEN.id);

export const registration = state => state.dashboard.registration.data;
export const registrationLoading = state => state.dashboard.registration.loading;
export const registrationError = state => state.dashboard.registration.error;
export const registrationUpdated = state => state.dashboard.registration.updated;

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

export const team = state => state.dashboard.team.data;
export const teamLoading = state => state.dashboard.team.loading;
export const teamError = state => state.dashboard.team.error;

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

import { createSelector } from 'reselect';
import { meanBy, countBy, groupBy, mapValues, sumBy } from 'lodash-es';
import { RegistrationStatuses } from '@hackjunction/shared';
import * as AuthSelectors from 'redux/auth/selectors';
import moment from 'moment';

export const event = state => state.organiser.event.data;
export const eventLoading = state => state.organiser.event.loading;
export const eventError = state => state.organiser.event.error;
export const eventUpdated = state => state.organiser.event.updated;

export const stats = state => state.organiser.stats.data;
export const statsLoading = state => state.organiser.stats.loading;
export const statsError = state => state.organiser.stats.error;
export const statsUpdated = state => state.organiser.stats.updated;

export const organisers = state => state.organiser.organisers.data;
export const organisersMap = state => state.organiser.organisers.map;
export const organisersLoading = state => state.organiser.organisers.loading;
export const organisersError = state => state.organiser.organisers.error;
export const organisersUpdated = state => state.organiser.organisers.updated;

export const registrations = state => state.organiser.registrations.data;
export const registrationsMap = state => state.organiser.registrations.map;
export const registrationsLoading = state => state.organiser.registrations.loading;
export const registrationsError = state => state.organiser.registrations.error;
export const registrationsUpdated = state => state.organiser.registrations.updated;

export const teams = state => state.organiser.teams.data;
export const teamsLoading = state => state.organiser.teams.loading;
export const teamsError = state => state.organiser.teams.error;
export const teamsUpdated = state => state.organiser.teams.updated;

export const filterGroups = state => state.organiser.filterGroups.data;
export const filterGroupsLoading = state => state.organiser.filterGroups.loading;
export const filterGroupsError = state => state.organiser.filterGroups.error;
export const filterGroupsUpdated = state => state.organiser.filterGroups.updated;

export const registrationsAssigned = createSelector(
    AuthSelectors.getCurrentUser,
    registrations,
    (user, registrations) => {
        return registrations.filter(registration => {
            return registration.assignedTo === user.sub;
        });
    }
);

export const registrationsReviewed = createSelector(
    registrations,
    registrations => {
        return registrations.filter(registration => {
            return !!registration.rating;
        });
    }
);

export const registrationsConfirmed = createSelector(
    registrations,
    registrations => {
        const validStatuses = [RegistrationStatuses.asObject.confirmed.id, RegistrationStatuses.asObject.checkedIn.id];
        return registrations.filter(registration => {
            return validStatuses.indexOf(registration.status) !== -1;
        });
    }
);

export const teamsPopulated = createSelector(
    registrationsMap,
    teams,
    (map, teams) => {
        console.log('MAP', map);
        return teams.map(team => {
            team.members = team.members.map(member => {
                return map[member];
            });
            return team;
        });
    }
);

/** Stats selectors */
export const registrationsCount = createSelector(
    registrations,
    registrations => registrations.length
);

export const teamsCount = createSelector(
    teams,
    teams => teams.length
);

export const percentReviewed = createSelector(
    registrations,
    registrations => {
        const { reviewed, total } = registrations.reduce(
            (res, registration) => {
                res.total += 1;
                if (registration.rating) {
                    res.reviewed += 1;
                }
                return res;
            },
            {
                reviewed: 0,
                total: 0
            }
        );
        return (reviewed * 100) / total;
    }
);

export const averageRating = createSelector(
    registrationsReviewed,
    registrations => {
        return meanBy(registrations, 'rating');
    }
);

export const registrationsLast24h = createSelector(
    registrations,
    registrations => {
        return registrations.filter(registration => {
            return registration.createdAt > Date.now() - 1000 * 60 * 60 * 24;
        }).length;
    }
);

export const registrationsByDay = createSelector(
    registrations,
    registrations => {
        return countBy(registrations, r => moment(r.createdAt).format('YYYY-MM-DD'));
    }
);

export const registrationsByRating = createSelector(
    registrationsReviewed,
    registrations => {
        return countBy(registrations, 'rating');
    }
);

export const registrationsByReviewer = createSelector(
    registrationsReviewed,
    registrations => {
        return countBy(registrations, 'ratedBy');
    }
);

export const registrationsBySecretCode = createSelector(
    registrations,
    registrations => {
        return countBy(registrations, 'answers.secretCode');
    }
);

export const reviewAverageByReviewer = createSelector(
    registrationsReviewed,
    registrations => {
        const grouped = groupBy(registrations, 'ratedBy');
        return mapValues(grouped, registrations => {
            return meanBy(registrations, 'rating');
        });
    }
);
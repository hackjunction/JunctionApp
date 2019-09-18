import { createSelector } from 'reselect';
import * as FilterUtils from 'utils/filters';
import * as AuthSelectors from 'redux/auth/selectors';

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
export const registrationsFilters = state => state.organiser.registrations.filters;

export const registrationsFiltered = createSelector(
    registrations,
    registrationsFilters,
    (registrations, filters) => {
        return FilterUtils.applyFilters(registrations, filters);
    }
);

export const registrationsAssigned = createSelector(
    AuthSelectors.getCurrentUser,
    registrations,
    (user, registrations) => {
        return registrations.filter(registration => {
            return registration.assignedTo === user.sub;
        });
    }
);

export const teams = state => state.organiser.teams.data;
export const teamsLoading = state => state.organiser.teams.loading;
export const teamsError = state => state.organiser.teams.error;
export const teamsUpdated = state => state.organiser.teams.updated;

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

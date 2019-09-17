import { createSelector } from 'reselect';
import { isEmpty } from 'lodash-es';
import * as AuthSelectors from 'redux/auth/selectors';
import { qualifiedTypeIdentifier } from '@babel/types';

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
    AuthSelectors.getCurrentUser,
    (registrations, filters, user) => {
        if (filters.selfAssignedOnly) {
        }
        return registrations.filter(registration => {
            if (filters.selfAssignedOnly) {
                if (registration.assignedTo !== user.sub) return false;
            }
            if (filters.notRatedOnly) {
                if (!isEmpty(registration.rating)) return false;
            }
            if (filters.notAssignedOnly) {
                if (!isEmpty(registration.assignedTo)) return false;
            }
            if (filters.ratingMin && registration.rating < filters.ratingMin) return false;
            if (filters.ratingMax && registration.rating > filters.ratingMax) return false;

            if (filters.searchField && filters.searchValue) {
                if (registration.answers[filters.searchField] !== filters.searchValue) return false;
            }

            if (filters.hasTags && filters.hasTags.length) {
                //TODO: Filtering by the tags
            }

            if (filters.hasFields && filters.hasFields.length) {
                //TODO: Filtering by the fields
            }

            return true;
        });
    }
);

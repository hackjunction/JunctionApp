import { createSelector } from 'reselect';

export const events = state => state.events.data;
export const eventsLoading = state => state.events.loading;
export const eventsError = state => state.events.error;
export const eventsUpdated = state => state.events.updated;

export const highlightedEvent = createSelector(
    events,
    events => {
        //TODO: Some better logic for deciding the highlighted event
        if (!Array.isArray(events) || events.length === 0) {
            return null;
        } else {
            return events[0];
        }
    }
);

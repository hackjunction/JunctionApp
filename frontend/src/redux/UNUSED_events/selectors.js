import { createSelector } from 'reselect'
import { find, sortBy } from 'lodash-es'
import moment from 'moment-timezone'

export const events = state => state.events.data
export const eventsLoading = state => state.events.loading
export const eventsError = state => state.events.error
export const eventsUpdated = state => state.events.updated

export const upcomingEvents = createSelector(events, events => {
    return events.filter(event => {
        return moment(event.endTime)
            .tz(event.timezone)
            .isAfter()
    })
})

export const pastEvents = createSelector(events, events => {
    return events.filter(event => {
        return moment(event.endTime)
            .tz(event.timezone)
            .isBefore()
    })
})

export const highlightedEvent = createSelector(upcomingEvents, events => {
    return sortBy(events, 'startTime')?.[0]
})

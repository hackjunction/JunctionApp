import moment from 'moment'
import { createSelector } from 'reselect'
import { EventHelpers, EventStatuses } from '@hackjunction/shared'

export const event = state => state.eventdetail.event.data
export const eventLoading = state => state.eventdetail.event.loading
export const eventError = state => state.eventdetail.event.error
export const eventUpdated = state => state.eventdetail.event.updated

export const registration = state => state.eventdetail.registration.data
export const registrationLoading = state =>
    state.eventdetail.registration.loading
export const registrationError = state => state.eventdetail.registration.error
export const registrationUpdated = state =>
    state.eventdetail.registration.updated

export const hasRegistration = createSelector(
    registration,
    registration => registration && registration.hasOwnProperty('_id')
)

export const eventStatus = createSelector(event, event =>
    EventHelpers.getEventStatus(event, moment)
)

export const isRegistrationOpen = createSelector(
    eventStatus,
    status => status === EventStatuses.REGISTRATION_OPEN.id
)

export const isRegistrationUpcoming = createSelector(
    eventStatus,
    status => status === EventStatuses.PUBLISHED.id
)

export const isRegistrationClosed = createSelector(
    isRegistrationOpen,
    isRegistrationUpcoming,
    (open, upcoming) => !open && !upcoming
)

import React, { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useRouteMatch } from 'react-router'
import { useSelector } from 'react-redux'
import { EventStatuses } from '@hackjunction/shared'

import * as AuthSelectors from 'redux/auth/selectors'
import RegistrationsService from 'services/registrations'

//TODO move to queries
const eventQuery = gql`
    query Event($slug: String!) {
        eventBySlug(slug: $slug) {
            name
            slug
            description
            coverImage {
                url
                publicId
            }
            timezone
            startTime
            endTime
            registrationStartTime
            registrationEndTime
            registrationConfig {
                optionalFields
                requiredFields
            }
            customQuestions {
                label
                name
                description
                questions {
                    settings {
                        options
                        default
                    }
                    hint
                    placeholder
                    fieldRequired
                    label
                    fieldType
                    name
                }
            }
            demoLabel
            demoHint
            demoPlaceholder
            _eventStatus
            _eventTimeFormatted
            _eventLocationFormatted
        }
    }
`

const registrationQuery = gql`
    query Registration($eventSlug: String!) {
        myRegistration(eventSlug: $eventSlug) {
            status
            answers: _fullAnswers
        }
    }
`
const EventDetailContext = React.createContext({})
export const EventDetailProvider = ({ children }) => {
    const match = useRouteMatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const { slug } = match.params
    const {
        data: eventData,
        loading: eventLoading,
        error: eventError,
        refetch: refetchEvent,
    } = useQuery(eventQuery, {
        variables: {
            slug: slug,
        },
    })

    const {
        data: registrationData,
        loading: registrationLoading,
        error: registrationError,
        refetch: refetchRegistration,
    } = useQuery(registrationQuery, {
        variables: {
            eventSlug: slug,
        },
    })
    const createRegistration = useCallback(
        formData => {
            return RegistrationsService.createRegistration(
                idToken,
                slug,
                formData
            ).then(res => {
                refetchRegistration()
                return res
            })
        },
        [idToken, refetchRegistration, slug]
    )

    const editRegistration = useCallback(
        formData => {
            return RegistrationsService.updateRegistration(
                idToken,
                slug,
                formData
            ).then(res => {
                refetchRegistration()
                return res
            })
        },
        [idToken, refetchRegistration, slug]
    )
    const event = eventData?.eventBySlug
    const registration = registrationData?.myRegistration
    const isRegistrationOpen =
        event?._eventStatus === EventStatuses.REGISTRATION_OPEN.id

    return (
        <EventDetailContext.Provider
            value={{
                slug,
                event,
                eventLoading,
                eventError,
                refetchEvent,
                registration,
                registrationLoading,
                registrationError,
                refetchRegistration,
                createRegistration,
                editRegistration,
                hasRegistration: !!registration,
                isRegistrationOpen,
            }}
        >
            {children}
        </EventDetailContext.Provider>
    )
}

export default EventDetailContext

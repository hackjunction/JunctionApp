import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { EventStatuses } from '@hackjunction/shared'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useRouteMatch, useLocation } from 'react-router'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import EventDetail from './default'
import EventRegister from './register'

const eventQuery = gql`
    query Event($slug: String!) {
        eventBySlug(slug: $slug) {
            name
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

            _eventStatus
            _eventTimeFormatted
            _eventLocationFormatted

            _myRegistration {
                _id
            }
        }
    }
`

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    const { slug } = match.params

    const { data, loading, error } = useQuery(eventQuery, {
        variables: {
            slug,
        },
    })

    const event = data?.eventBySlug
    const registration = event?._myRegistration
    const isRegistrationOpen =
        event?._eventStatus === EventStatuses.REGISTRATION_OPEN.id

    // //TODO: Remove this
    // useEffect(() => {
    //     dispatch(EventDetailActions.updateEvent(slug))
    //     if (isAuthenticated) {
    //         dispatch(EventDetailActions.updateRegistration(slug))
    //     }
    // }, [slug, isAuthenticated, dispatch])

    return (
        <PageWrapper
            loading={loading}
            error={error}
            errorText={`Oops, something went wrong`}
            errorDesc={`Please refresh the page to try again.`}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => {
                return (
                    <AnimatePresence>
                        <Switch location={location} key={location.pathname}>
                            <Route
                                exact
                                path={`${match.url}`}
                                component={() => (
                                    <EventDetail
                                        event={event}
                                        loading={loading}
                                        error={error}
                                        registration={registration}
                                    />
                                )}
                            />
                            {isRegistrationOpen && (
                                <Route
                                    exact
                                    path={`${match.url}/register`}
                                    component={() => (
                                        <EventRegister
                                            event={event}
                                            registration={registration}
                                        />
                                    )}
                                />
                            )}
                            <Redirect to={`${match.url}`} />
                        </Switch>
                    </AnimatePresence>
                )
            }}
        />
    )
}

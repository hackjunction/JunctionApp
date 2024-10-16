import React, { useState, useEffect } from 'react'

import { useRouteMatch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from 'components/layouts/PageWrapper'

import PartnerDashboard from './partner'
import ParticipantDashboard from './participant'
import OrganizerDashboard from './organiser'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as UserSelectors from 'redux/user/selectors'

import { useLazyQuery, useSubscription } from '@apollo/client'
import { ALERTS_QUERY } from 'graphql/queries/alert'
import { NEW_ALERTS_SUBSCRIPTION } from 'graphql/subscriptions/alert'

export default role => {
    const match = useRouteMatch()
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const eventLoading = useSelector(DashboardSelectors.eventLoading)
    const registrationLoading = useSelector(
        DashboardSelectors.registrationLoading,
    )
    const lockedPages = useSelector(DashboardSelectors.lockedPages)
    const shownPages = useSelector(DashboardSelectors.shownPages)
    const userAccessRight = useSelector(UserSelectors.userAccessRight)
    const { slug } = match.params

    const [alerts, setAlerts] = useState([])
    const [alertCount, setAlertCount] = useState(0)
    const { data: newAlert } = useSubscription(NEW_ALERTS_SUBSCRIPTION, {
        variables: { slug },
    })

    /** Update when slug changes */
    useEffect(() => {
        dispatch(DashboardActions.updateEvent(slug))
        dispatch(DashboardActions.updateRegistration(slug))
        dispatch(DashboardActions.updateTeam(slug))
        dispatch(DashboardActions.updateProjects(slug))
    }, [slug])

    // Must use lazy query because event is fetched asynchnronously
    const [getAlerts, { loading: alertsLoading, data: alertsData }] =
        useLazyQuery(ALERTS_QUERY)

    useEffect(() => {
        if (event) {
            getAlerts({ variables: { eventId: event._id } })
            dispatch(
                DashboardActions.updateRecruitersForEvent(event.recruiters),
            )
        }
    }, [event, getAlerts])

    // Set alerts when data is fetched or recieved through websocket
    useEffect(() => {
        if (alertsData) {
            setAlerts(old => {
                const newArray = [...old, ...alertsData.alerts]
                newArray.sort(
                    (a, b) => +new Date(a.sentAt) - +new Date(b.sentAt),
                )
                return old.length === 0 ? newArray : old
            })
        }
        if (newAlert) {
            if (
                'Notification' in window &&
                Notification.permission === 'granted'
            ) {
                new Notification('Announcement', {
                    body: newAlert.newAlert.content,
                })
            }
            setAlertCount(alertCount + 1)
            setAlerts(old => {
                const newArray = [...old, newAlert.newAlert]
                newArray.sort(
                    (a, b) => +new Date(a.sentAt) - +new Date(b.sentAt),
                )
                return newArray
            })
        }
    }, [alertsData, setAlerts, newAlert, setAlertCount])

    //TODO: reconstruct to contain partner, organizer & participnat pages
    switch (userAccessRight) {
        case 'partner': {
            return (
                <PageWrapper
                    loading={
                        eventLoading || registrationLoading || alertsLoading
                    }
                    wrapContent={false}
                >
                    <PartnerDashboard
                        event={event}
                        originalAlertCount={alertCount}
                        originalAlerts={alerts}
                        shownPages={shownPages}
                        lockedPages={lockedPages}
                    />
                </PageWrapper>
            )
        }
        case 'organizer': {
            return (
                <PageWrapper
                    loading={
                        eventLoading || registrationLoading || alertsLoading
                    }
                    wrapContent={false}
                >
                    <OrganizerDashboard />
                </PageWrapper>
            )
        }
        case 'participant': {
            return (
                <PageWrapper
                    loading={
                        eventLoading || registrationLoading || alertsLoading
                    }
                    wrapContent={false}
                >
                    <ParticipantDashboard
                        event={event}
                        originalAlertCount={alertCount}
                        originalAlerts={alerts}
                        shownPages={shownPages}
                        lockedPages={lockedPages}
                    />
                </PageWrapper>
            )
        }
        default:
            return <>error</>
    }
}

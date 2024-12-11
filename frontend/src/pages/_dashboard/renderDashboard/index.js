import React, { useEffect, useState } from 'react'

import { useParams, useResolvedPath } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from 'components/layouts/PageWrapper'

import PartnerDashboard from './partner'
import ParticipantDashboard from './participant'
import OrganizerDashboard from './organiser'

import * as DashboardSelectors from 'reducers/dashboard/selectors'
import * as DashboardActions from 'reducers/dashboard/actions'
import * as AuthSelectors from 'reducers/auth/selectors'
import * as UserSelectors from 'reducers/user/selectors'
import * as UserActions from 'reducers/user/actions'

import { useLazyQuery, useSubscription } from '@apollo/client'
import { ALERTS_QUERY } from 'graphql/queries/alert'
import { NEW_ALERTS_SUBSCRIPTION } from 'graphql/subscriptions/alert'
import {
    useMyEvents,
    useActiveEvents,
    usePastEvents,
} from 'graphql/queries/events'
// import { Chat } from 'components/messaging/chat'

export default role => {
    const url = useResolvedPath('').pathname
    const dispatch = useDispatch()

    const event = useSelector(DashboardSelectors.event)

    const [organizerEvents, loading] = useMyEvents()
    const [activeEvents, loadingActive] = useActiveEvents({}) //active events, from these we select where to rediret, or default
    const [pastEvents, loadingPast] = usePastEvents({ limit: 3 }) //TODO: is undefined, fix

    const eventLoading = useSelector(DashboardSelectors.eventLoading)
    const registrationLoading = useSelector(
        DashboardSelectors.registrationLoading,
    )
    const team = useSelector(DashboardSelectors.team)
    const lockedPages = useSelector(DashboardSelectors.lockedPages)
    const shownPages = useSelector(DashboardSelectors.shownPages)
    const userAccessRight = useSelector(UserSelectors.userAccessRight)
    const { eventSlug } = useParams()

    console.log('URL AND SLUG FROM RENDERDASHBOARD>>>>>>')
    console.log(url)
    console.log(eventSlug)

    const [alerts, setAlerts] = useState([])
    const [alertCount, setAlertCount] = useState(0)
    const { data: newAlert } = useSubscription(NEW_ALERTS_SUBSCRIPTION, {
        variables: { eventSlug },
    })

    const isPartner =
        useSelector(AuthSelectors.idTokenData)?.roles?.includes('Recruiter') &&
        !useSelector(AuthSelectors.idTokenData)?.roles?.includes(
            'SuperAdmin',
        ) &&
        useSelector(UserSelectors.userProfileRecruiterEvents)
            ?.map(e => e.eventId)
            .includes(event?._id)

    const isOrganizer =
        useSelector(AuthSelectors.idTokenData)?.roles?.some(r =>
            ['Organiser', 'AssistantOrganiser', 'SuperAdmin'].includes(r),
        ) && organizerEvents?.map(e => e._id).includes(event?._id)

    // Set up browser notifications
    useEffect(() => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission()
        }
    }, [])

    /** Update when eventSlug changes */
    useEffect(() => {
        console.log(
            'Updating EVENT, Registration and Team from renderDashboard>>>>>>>>>>>>>>>>>>>>>',
        )
        dispatch(DashboardActions.updateEvent(eventSlug))
        dispatch(DashboardActions.updateRegistration(eventSlug))
        dispatch(DashboardActions.updateTeam(eventSlug))
    }, [eventSlug])

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

    useEffect(() => {
        dispatch(UserActions.organizerEvents(organizerEvents))
        if (!loadingActive) {
            dispatch(DashboardActions.activeEvents(activeEvents))
        }
        if (!loadingPast) {
            dispatch(DashboardActions.pastEvents(pastEvents))
        }
    }, [organizerEvents, activeEvents, pastEvents])

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

    /** Update project when team changes */
    useEffect(() => {
        dispatch(DashboardActions.updateProjects(eventSlug))
        dispatch(DashboardActions.updateProjectScores(eventSlug))
    }, [eventSlug, team, dispatch])

    useEffect(() => {
        //does not take multiple roles into a count
        if (isPartner) {
            dispatch(UserActions.setAccessRight('partner'))
        } else if (isOrganizer) {
            dispatch(UserActions.setAccessRight('organizer'))
        }
    }, [])

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

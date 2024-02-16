import React, { useEffect, useState } from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import PageWrapper from 'components/layouts/PageWrapper'

import PartnerDashboard from './partner'
import ParticipantDashboard from './participant'
import OrganizerDashboard from './organiser'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as OrganiserActions from 'redux/organiser/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'
import * as UserActions from 'redux/user/actions'

import { useTranslation } from 'react-i18next'
import { useLazyQuery, useSubscription } from '@apollo/client'
import { ALERTS_QUERY } from 'graphql/queries/alert'
import { NEW_ALERTS_SUBSCRIPTION } from 'graphql/subscriptions/alert'
import {
    useMyEvents,
    useActiveEvents,
    usePastEvents,
} from 'graphql/queries/events'
// import { Chat } from 'components/messaging/chat'

const useStyles = makeStyles(theme => ({
    sidebarTop: {
        padding: theme.spacing(3),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidebarLogo: {
        width: '100%',
        objectFit: 'contain',
    },
}))

export default role => {
    const match = useRouteMatch()
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
    const { slug } = match.params

    const [alerts, setAlerts] = useState([])
    const [alertCount, setAlertCount] = useState(0)
    const { data: newAlert } = useSubscription(NEW_ALERTS_SUBSCRIPTION, {
        variables: { slug },
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

    console.log(isPartner, 'user is partner', isOrganizer, 'user is organizer')

    // Set up browser notifications
    useEffect(() => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission()
        }
    }, [])

    /** Update when slug changes */
    useEffect(() => {
        dispatch(DashboardActions.updateEvent(slug))
        dispatch(DashboardActions.updateRegistration(slug))
        dispatch(DashboardActions.updateTeam(slug))

        //TODO dont use OrganiserSelectors here
        dispatch(OrganiserActions.updateProjects(slug))
        dispatch(OrganiserActions.updateGavelProjects(slug))
        dispatch(OrganiserActions.updateRankings(slug))
        dispatch(OrganiserActions.generateResults(slug)) // TODO do we need to get results always?
    }, [slug, dispatch])

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
        console.log(' dispatch(UserActions.organizerEvents)')
        console.log(loadingActive, loadingPast)
        if (!loadingActive) {
            dispatch(DashboardActions.activeEvents(activeEvents))
        }
        console.log('dipatch past?', loadingPast, pastEvents)
        if (!loadingPast) {
            console.log('dipatch past', pastEvents)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertsData, setAlerts, newAlert, setAlertCount])

    /** Update project when team changes */
    useEffect(() => {
        dispatch(DashboardActions.updateProjects(slug))
        dispatch(DashboardActions.updateProjectScores(slug))
    }, [slug, team, dispatch])

    useEffect(() => {
        //does not take multiple roles into a count
        console.log('setting access', isPartner, isOrganizer)
        if (isPartner) {
            dispatch(UserActions.setAccessRight('partner'))
            console.log('partner', userAccessRight)
        } else if (isOrganizer) {
            dispatch(UserActions.setAccessRight('organizer'))
            console.log('organizer', userAccessRight)
        }
    }, [])

    console.log('userAccess', userAccessRight)
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

import React, { useEffect } from 'react'
import { useResolvedPath } from 'react-router'
import { Route, Routes, Navigate } from 'react-router-dom'
// import SlugPage from './renderDashboard'
import DefaultPage from './renderDashboard/default'
import {
    useMyEvents,
    useActiveEvents,
    usePastEvents,
} from 'graphql/queries/events'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'
import * as UserActions from 'redux/user/actions'

export default () => {
    const url = useResolvedPath('').pathname
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)

    // Set up browser notifications
    useEffect(() => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission()
        }
    }, [])

    //SET EVENTS TO DISPLAY
    const [organizerEvents, loading] = useMyEvents()
    const [activeEvents, loadingActive] = useActiveEvents({}) //active events, from these we select where to rediret, or default
    const [pastEvents, loadingPast] = usePastEvents({ limit: 3 })

    //FIND ROLES AVAILABLE FOR USER
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

    useEffect(() => {
        //does not take multiple roles into a count
        if (isPartner) {
            dispatch(UserActions.setAccessRight('partner'))
        } else if (isOrganizer) {
            dispatch(UserActions.setAccessRight('organizer'))
        }
    }, [])

    useEffect(() => {
        if (!loading) {
            dispatch(UserActions.organizerEvents(organizerEvents))
        }
        if (!loadingActive) {
            dispatch(DashboardActions.activeEvents(activeEvents))
        }
        if (!loadingPast) {
            dispatch(DashboardActions.pastEvents(pastEvents))
        }
    }, [organizerEvents, activeEvents, pastEvents])

    //redirect to right event page, default, or out
    return (
        <Routes>
            <Route path="default/*" element={<DefaultPage />} />
            {/* For all other routes, redirect outta here */}
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}

//<Route
//                  exact={false}
//                path={
//                  `${url}/event/:slug` /*TODO: pass correct event and role and create default case*/
//            }
//          component={SlugPage}
//    />

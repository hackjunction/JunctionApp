import React, { useEffect, useState } from 'react'

import { useRouteMatch, useLocation } from 'react-router'
// import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles'

import SidebarLayout from 'components/layouts/SidebarLayout' //TODO: make normal sidepar work with default view
import BasicNavBar from 'components/navbars/BasicNavBar'
import PageWrapper from 'components/layouts/PageWrapper'
import defaultImage from 'assets/images/dashboardDefault.jpg'

// import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'
import * as UserActions from 'redux/user/actions'

import { useTranslation } from 'react-i18next'
import {
    useMyEvents,
    useActiveEvents,
    usePastEvents,
} from 'graphql/queries/events'
// import { Chat } from 'components/messaging/chat'

// const useStyles = makeStyles(theme => ({
//     sidebarTop: {
//         padding: theme.spacing(3),
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     sidebarLogo: {
//         width: '100%',
//         objectFit: 'contain',
//     },
// }))

export default () => {
    // const classes = useStyles()
    const match = useRouteMatch()
    const location = useLocation()

    const dispatch = useDispatch()

    const recruiterEvents = useSelector(
        UserSelectors.userProfileRecruiterEvents,
    )
    const [organizerEvents, loadingEvents] = useMyEvents() //TODO: move to user state
    const participantEvents = useSelector(
        UserSelectors.userProfileRegistrations,
    )
    const [activeEvents, loadingActive] = useActiveEvents({}) //active events, from these we select where to rediret, or default
    const [pastEvents, loadingPast] = usePastEvents({ limit: 3 }) //TODO: is undefined, fix
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(UserActions.organizerEvents(organizerEvents))
        if (!loadingActive) {
            dispatch(DashboardActions.activeEvents(activeEvents))
        }
        if (!loadingPast) {
            dispatch(DashboardActions.pastEvents(pastEvents))
        }
        if (!(loadingActive || loadingEvents || loadingPast)) {
            setLoading(false)
        }
    }, [organizerEvents, activeEvents, pastEvents])

    const isPartner = useSelector(AuthSelectors.idTokenData)?.roles?.includes(
        'Recruiter',
    )

    const isOrganizer = useSelector(AuthSelectors.idTokenData)?.roles?.some(r =>
        ['Organiser', 'AssistantOrganiser', 'SuperAdmin'].includes(r),
    )

    let page = ''
    let accessRight = ''

    useEffect(() => {
        if (page === '') {
            const partnerPage = activeEvents?.find(active =>
                recruiterEvents?.some(e => e.eventId === active._id),
            )?.slug

            if (partnerPage && isPartner) {
                page = partnerPage
                accessRight = 'partner'
            }
        }

        if (page === '') {
            const orgPage = activeEvents?.find(active =>
                organizerEvents?.some(e => e._id === active._id),
            )?.slug

            if (orgPage && isOrganizer) {
                page = orgPage
                accessRight = 'organizer'
            }
        }

        if (page === '') {
            const participantPage = activeEvents?.find(active => {
                return participantEvents?.some(e => e.event === active._id)
            })?.slug

            if (participantPage) {
                page = participantPage
                accessRight = 'participant'
            }
        }

        if (page !== '' && accessRight !== '') {
        }
    }, [loading])

    const { t } = useTranslation()

    return (
        <PageWrapper wrapContent={false} loading={loadingActive || loadingPast}>
            <SidebarLayout
                baseRoute={match.url}
                location={location}
                sidebarTopContent={
                    <img src={defaultImage} width={250} height={250}></img>
                }
                topContent={<BasicNavBar text={''} />}
                routes={[]}
            />
        </PageWrapper>
    )
}

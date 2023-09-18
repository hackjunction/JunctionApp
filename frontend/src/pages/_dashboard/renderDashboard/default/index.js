import React, { useEffect, useState } from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'


import SidebarLayout from 'components/layouts/SidebarLayout' //TODO: make normal sidepar work with default view
import BasicNavBar from 'components/navbars/BasicNavBar'
import PageWrapper from 'components/layouts/PageWrapper'
import defaultImage from 'assets/images/dashboardDefault.jpg'



import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'
import * as UserActions from 'redux/user/actions'

import { useTranslation } from 'react-i18next'
import { useMyEvents, useActiveEvents, usePastEvents } from 'graphql/queries/events'
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

export default () => {

    const classes = useStyles()
    const match = useRouteMatch()
    const location = useLocation()

    const dispatch = useDispatch()

    const recruiterEvents = useSelector(UserSelectors.userProfileRecruiterEvents)
    const [organizerEvents, loadingEvents] = useMyEvents()//TODO: move to user state
    const participantEvents = useSelector(UserSelectors.userProfileRegistrations)
    const [activeEvents, loadingActive] = useActiveEvents({}) //active events, from these we select where to rediret, or default
    const [pastEvents, loadingPast] = usePastEvents({ limit: 3 })//TODO: is undefined, fix
    const userAccessRight = useSelector(UserSelectors.userAccessRight)
    const stateActiveEvents = useSelector(DashboardSelectors.activeEvents)
    const statePastEvents = useSelector(DashboardSelectors.pastEvents)



    console.log("activeEvents", activeEvents)
    console.log("recruiterEvents", recruiterEvents)
    console.log("organizerEvents", organizerEvents)
    console.log("participantEvents", participantEvents)
    console.log("userAccessRight", userAccessRight)

    useEffect(() => {
        dispatch(UserActions.organizerEvents(organizerEvents))
        console.log(" dispatch(UserActions.organizerEvents)")
        console.log(loadingActive, loadingPast)
        if (!loadingActive) {
            dispatch(DashboardActions.activeEvents(activeEvents))
        }
        console.log("dipatch past?", loadingPast, pastEvents)
        if (!loadingPast) {
            console.log("dipatch past", pastEvents)
            dispatch(DashboardActions.pastEvents(pastEvents))
        }
    }, [organizerEvents, activeEvents, pastEvents])



    const isPartner = useSelector(AuthSelectors.idTokenData)?.roles?.includes(
        'Recruiter'
    )

    const isOrganizer = useSelector(AuthSelectors.idTokenData)?.roles?.some(r =>
        ["Organiser", "AssistantOrganiser", "SuperAdmin"].includes(r)
    )


    let page = ""
    let accessRight = ""

    useEffect(() => {
        //TODO: needs more testing
        if (page === "") {
            const partnerPage = activeEvents?.find(active => recruiterEvents?.some(e => e.eventId === active._id))?.slug
            console.log("partnerPage", partnerPage)

            console.log("page", page)
            if (partnerPage && isPartner) {
                page = partnerPage
                accessRight = 'partner'

                dispatch(UserActions.setAccessRight('partner'))
                console.log("redirect", partnerPage)
                //dispatch(push(`/dashboard/event/${partnerPage}`))
            }
        }

        if (page === "") {
            const orgPage = activeEvents?.find(active => organizerEvents?.some(e => e._id === active._id))?.slug
            console.log("orgPage", orgPage)

            console.log("page orgPage", page)
            if (orgPage && isOrganizer) {
                page = orgPage
                accessRight = 'organizer'


                // dispatch(UserActions.setAccessRight('organizer'))
                // console.log("redirect", orgPage)
                //dispatch(push(`/dashboard/event/${orgPage}`))
            }


        }

        if (page === "") {
            const participantPage = activeEvents?.find(active => {
                console.log("active._id", active._id, participantEvents?.some(e => e.event === active._id))
                return participantEvents?.some(e => e.event === active._id)
            })?.slug
            console.log("participantPage", participantPage)

            console.log("page participantPage", page)

            if (participantPage) {
                page = participantPage
                accessRight = 'participant'


                // dispatch(UserActions.setAccessRight('participant'))
                // console.log("redirect", participantPage)
                // dispatch(push(`/dashboard/event/${participantPage}`))
            }


        }





        if (page !== "" && accessRight !== "") {
            console.log(`dispatch(UserActions.setAccessRight(${accessRight})`)
            console.log(`/dashboard/event/${page}`)

            dispatch(UserActions.setAccessRight(accessRight))
            dispatch(push(`/dashboard/event/${page}`))
        }

    }, [activeEvents, recruiterEvents, organizerEvents, participantEvents])


    //TODO: fix all `/dashboard/${ calls

    console.log("DEFAULT PAGE")

    const { t } = useTranslation()


    return (
        <PageWrapper
            wrapContent={false}
            loading={loadingActive || loadingPast}
        >
            <SidebarLayout
                baseRoute={match.url}
                location={location}
                sidebarTopContent={<img src={defaultImage} width={250} height={250} ></img>
                    // <div className={classes.sidebarTop}>
                    //     <Image
                    //         className={classes.sidebarLogo || waves}
                    //         publicId={
                    //             defaultPage && defaultPage['logo'] ? defaultPage['logo']['publicId'] : ''
                    //         }
                    //         transformation={{
                    //             width: 200,
                    //         }}
                    //     />
                    // </div>
                }
                topContent={<BasicNavBar text={""} />}
                routes={[
                    // {
                    //     key: 'events',
                    //     path: '',
                    //     exact: true,
                    //     icon: <ExitToAppIcon />,
                    //     label: 'Events',
                    //     component: EventsPage,
                    // },
                    // {
                    //     key: 'profile',
                    //     path: '/profile',
                    //     exact: true,
                    //     icon: <ExitToAppIcon />,
                    //     label: t('Log_out_'),
                    //     component: ProfilePage,
                    // },
                    // {
                    //     key: 'logout',
                    //     path: '/logout',
                    //     exact: true,
                    //     icon: <ExitToAppIcon />,
                    //     label: t('Log_out_'),
                    //     component: LogoutPage,
                    // },
                ]}
            />
        </PageWrapper>

    )
}

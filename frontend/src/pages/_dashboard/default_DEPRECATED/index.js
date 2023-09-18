import React, { useEffect, useState } from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import GroupIcon from '@material-ui/icons/Group'
import DashboardIcon from '@material-ui/icons/Dashboard'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import AmpStoriesIcon from '@material-ui/icons/AmpStories'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import StarRateIcon from '@material-ui/icons/StarRate'
import HowToVoteIcon from '@material-ui/icons/HowToVote'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import { QuestionAnswerSharp } from '@material-ui/icons'
import EventIcon from '@material-ui/icons/Event'

import SidebarLayout from 'components/layouts/SidebarLayout/default' //TODO: make normal sidepar work with default view
import Image from 'components/generic/Image'
import BasicNavBar from 'components/navbars/BasicNavBar'
import PageWrapper from 'components/layouts/PageWrapper'
import Footer from 'components/layouts/Footer'
import defaultImage from 'assets/images/dashboardDefault.jpg'


// import DefaultPage from './default'
// import FinalistVotingPage from './finalist-voting'
// import TeamPage from './team'
// import ProjectPage from './project'
// import ReviewingPage from './reviewing'
// import TravelGrantPage from './travel-grant'
// import EventIDPage from './event-id'
import HackerpackPage from '../slug/hackerpack'
import LogoutPage from './logout'
import EventsPage from './events'
import ProfilePage from './profile'
// import ChallengesIndex from './challenges'
// import CalendarPage from './calendar'
// import ChecklistPage from './checklist'
// import MapPage from './map'
// import RecruitmentPage from './partnerrecruitment'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as OrganiserActions from 'redux/organiser/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'

import { useTranslation } from 'react-i18next'
import { CheckBox } from '@material-ui/icons'
import { Alerts } from 'components/messaging/alerts'
import Badge from '@material-ui/core/Badge'
import { useLazyQuery, useSubscription } from '@apollo/client'
import { ALERTS_QUERY } from 'graphql/queries/alert'
import { NEW_ALERTS_SUBSCRIPTION } from 'graphql/subscriptions/alert'
import { useMyEvents, useActiveEvents } from 'graphql/queries/events'
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
    const [activeEvents] = useActiveEvents({}) //active events, from these we select where to rediret, or default

    console.log("activeEvents", activeEvents)
    console.log("recruiterEvents", recruiterEvents)
    console.log("organizerEvents", organizerEvents)
    console.log("participantEvents", participantEvents)

    const [page, setPage] = useState("")

    useEffect(() => {
        if (page === "") {
            const partnerPage = activeEvents?.find(active => recruiterEvents?.some(e => e.eventId === active._id))?.slug || ""
            setPage(partnerPage)
            console.log("defaultPage?", page)

            if (partnerPage !== "") {
                console.log(`/dashboard/event/${partnerPage}`)
                dispatch(push(`/dashboard/event/${partnerPage}`))
            }
        }
        //abstract equality
        if (page === "") {
            const orgPage = activeEvents?.find(active => organizerEvents?.some(e => e._id === active._id))?.slug || ""
            setPage(orgPage)
            console.log("defaultPage organizerEvents", page)//TODO: fix organizer side

            if (orgPage !== "") {
                console.log(`/dashboard/event/${orgPage}`)
                dispatch(push(`/dashboard/event/${orgPage}`))
            }
        }
        if (page === "") {
            console.log(activeEvents?.map(e => e._id), participantEvents?.map(e => e.event))
            const participantPage = activeEvents?.find(active => {
                console.log("active._id", active._id, participantEvents?.some(e => e.event === active._id))
                return participantEvents?.some(e => e.event === active._id)
            })?.slug || ""
            console.log("redirect", participantPage)
            setPage(participantPage?.toString())
            console.log("defaultPage participantEvents", page)

            if (participantPage !== "") {
                console.log(`/dashboard/event/${participantPage}`)
                //dispatch(push(`/dashboard/event/${participantPage}`))
            }
        }
        setPage('') //TODO: remove
        console.log("defaultPage", page)

        if (page !== "") {
            console.log(`/dashboard/event/${page}`)
            dispatch(push(`/dashboard/event/${page}`))
        }
    }, [activeEvents, recruiterEvents, organizerEvents, participantEvents])


    //TODO: fix all `/dashboard/${ calls

    console.log("DEFAULT PAGE")

    const { t } = useTranslation()


    return (
        <PageWrapper
            wrapContent={false}
        >
            <SidebarLayout
                baseRoute={match.url}
                location={location}
                sidebarTopContent={<img src={defaultImage}></img>
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
            <div >

                <p>DEFAULT</p>
            </div>
        </PageWrapper>

    )
}

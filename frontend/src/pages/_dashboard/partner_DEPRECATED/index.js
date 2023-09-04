import React, { useEffect, useState } from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import GroupIcon from '@material-ui/icons/Group'
import DashboardIcon from '@material-ui/icons/Dashboard'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import AmpStoriesIcon from '@material-ui/icons/AmpStories'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import StarRateIcon from '@material-ui/icons/StarRate'
import HowToVoteIcon from '@material-ui/icons/HowToVote'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import { QuestionAnswerSharp } from '@material-ui/icons'
import EventIcon from '@material-ui/icons/Event'

import SidebarLayout from 'components/layouts/SidebarLayout'
import Image from 'components/generic/Image'
import BasicNavBar from 'components/navbars/BasicNavBar'
import PageWrapper from 'components/layouts/PageWrapper'
import DefaultImage from 'assets/images/dashboardDefault.jpg'

import DefaultPage from '../generalPages/default'
import FinalistVotingPage from '../generalPages/finalist-voting'
import TeamPage from '../generalPages/team'
import ProjectPage from '../generalPages/project'
import ReviewingPage from '../generalPages/reviewing'
import TravelGrantPage from '../generalPages/travel-grant'
import EventIDPage from '../generalPages/event-id'
import HackerpackPage from '../generalPages/hackerpack'
import ChallengesIndex from '../generalPages/challenges'
import CalendarPage from './calendar'
import ChecklistPage from '../generalPages/checklist'
import MapPage from '../generalPages/map'
import RecruitmentPage from './partnerrecruitment'
import EventsPage from '../default/events'

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

export default ({ originalAlertCount, originalAlerts, shownPages }) => {
    const { t } = useTranslation()
    const match = useRouteMatch()
    const location = useLocation()
    const [alertCount, setAlertCount] = useState(originalAlertCount)
    const [alerts, setAlerts] = useState(originalAlerts)

    console.log("props", originalAlertCount, originalAlerts, shownPages)
    console.log(originalAlertCount, alertCount)

    return (
        <SidebarLayout
            baseRoute={match.url}
            location={location}
            sidebarTopContent={<img src={DefaultImage}></img>
                //TODO: Remove default image

                // <div className={classes.sidebarTop}>
                //     <Image
                //         className={classes.sidebarLogo}
                //         publicId={
                //             event && event.logo ? event.logo.publicId : ''
                //         }
                //         transformation={{
                //             width: 200,
                //         }}
                //     />
                // </div>
            }
            topContent={<BasicNavBar />}
            routes={[
                {
                    key: 'dashboard',
                    path: '',
                    exact: true,
                    icon: (
                        <Badge badgeContent={alertCount} color="primary">
                            <DashboardIcon />
                        </Badge>
                    ),
                    label: t('Dashboard_'),
                    component: () => {
                        setAlertCount(0)
                        return DefaultPage({ alerts })
                    },
                },
                {
                    key: 'hackerpack',
                    path: '/hackerpack',
                    exact: true,
                    icon: <AmpStoriesIcon />,
                    hidden: !shownPages?.hackerPack,
                    label: t('Hackerpack_'),
                    component: HackerpackPage,
                },
                {
                    key: 'challenges',
                    path: '/challenges',
                    exact: true,
                    icon: <FormatListBulletedIcon />,
                    label: 'Challenges',
                    component: ChallengesIndex,
                },
                /*
                {
                    key: 'chat',
                    path: '/chat',
                    exact: true,
                    icon: <QuestionAnswerSharp />,
                    label: 'Chat',
                    component: Chat,
                }, */
                {
                    key: 'calendar',
                    path: '/calendar',
                    exact: true,
                    hidden: !shownPages?.meetings,
                    icon: <EventIcon />,
                    label: 'Meetings',
                    component: CalendarPage,
                },
                {//TODO: wtf is this? move recrytool to be part of the app, not some useles framing
                    key: 'recruitment',
                    path: '/recruitment',
                    exact: true,
                    label: 'Recruitment',
                    component: RecruitmentPage,
                },
            ]}
        />
    )
}
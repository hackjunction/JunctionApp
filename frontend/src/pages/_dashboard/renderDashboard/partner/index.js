import React, { useState } from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AmpStoriesIcon from '@material-ui/icons/AmpStories'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import EventIcon from '@material-ui/icons/Event'
import WorkIcon from '@material-ui/icons/Work'
import PlaceIcon from '@material-ui/icons/Place'
import RateReviewIcon from '@material-ui/icons/RateReview'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import SidebarLayout from 'components/layouts/SidebarLayout'
import BasicNavBar from 'components/navbars/BasicNavBar'
import DefaultImage from 'assets/images/dashboardDefault.jpg'

import Image from 'components/generic/Image'
import DefaultPage from '../generalPages/default'
import HackerpackPage from '../generalPages/hackerpack'
import ChallengesIndex from '../generalPages/challenges'
import CalendarPage from './calendar'
import RecruitmentPage from './partnerrecruitment'
import MapPage from '../generalPages/map'


import { useTranslation } from 'react-i18next'
import Badge from '@material-ui/core/Badge'

import ProjectsPage from './projects'
import * as DashboardSelectors from 'redux/dashboard/selectors'
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

export default ({ event, originalAlertCount, originalAlerts, shownPages }) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const match = useRouteMatch()
    const location = useLocation()
    const [alertCount, setAlertCount] = useState(originalAlertCount)
    const [alerts, setAlerts] = useState(originalAlerts)

    // const event = useSelector(DashboardSelectors.event)

    console.log('props', originalAlertCount, originalAlerts, shownPages)
    console.log(originalAlertCount, alertCount)

    return (
        <SidebarLayout
            baseRoute={match.url}
            location={location}
            sidebarTopContent={
                <div className={classes.sidebarTop}>
                    <Image
                        className={classes.sidebarLogo}
                        // publicId={
                        //     event && event.logo ? event.logo.publicId : ''
                        // }
                        transformation={{
                            width: 200,
                        }}
                        defaultImage={DefaultImage}
                    />
                    <Typography variant="button" style={{ color: 'white' }}>
                        Partner
                    </Typography>
                </div>
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
                    key: 'map',
                    path: '/map',
                    exact: false,
                    icon: <PlaceIcon />,
                    label: 'Map',
                    component: MapPage,
                },
                {
                    key: 'Review',
                    path: '/Review',
                    exact: false,
                    icon: <RateReviewIcon />,
                    label: 'Review',
                    component: () => {
                        return <ProjectsPage event={event} />
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
                {
                    key: 'recruitment',
                    path: '/recruitment',
                    exact: false,
                    icon: <WorkIcon />,
                    label: 'Recruitment',
                    component: RecruitmentPage,
                },
            ]}
        />
    )
}

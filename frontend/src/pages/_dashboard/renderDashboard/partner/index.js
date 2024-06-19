import React, { useEffect, useState } from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AmpStoriesIcon from '@mui/icons-material/AmpStories'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import EventIcon from '@mui/icons-material/Event'
import WorkIcon from '@mui/icons-material/Work'
import PlaceIcon from '@mui/icons-material/Place'
import RateReviewIcon from '@mui/icons-material/RateReview'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'

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

import Badge from '@mui/material/Badge'

import ProjectsPage from './projects'
import { QuestionAnswerSharp } from '@mui/icons-material'
import { Chat } from 'components/messaging/chat'
// import PartnerReviewingBlock from '../generalPages/default/Blocks/PartnerReviewingBlock'

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

export default ({
    event,
    originalAlertCount,
    originalAlerts,
    shownPages,
    lockedPages,
}) => {
    const classes = useStyles()
    const match = useRouteMatch()
    const location = useLocation()
    const [alertCount, setAlertCount] = useState(originalAlertCount)
    const [alerts, setAlerts] = useState(originalAlerts)

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
                    label: 'Dashboard',
                    component: () => {
                        setAlertCount(0)
                        if (shownPages?.experimental) {
                            return <p>Experimental enabled</p>
                        }
                        return DefaultPage({ alerts })
                    },
                },
                {
                    key: 'Review',
                    path: '/review',
                    // hidden: !shownPages?.reviewingByScoreCriteria,
                    locked: lockedPages.reviewing,
                    lockedDescription: 'Reviewing closed',
                    exact: false,
                    icon: <RateReviewIcon />,
                    label: 'Review',
                    component: () => {
                        return <ProjectsPage event={event} />
                    },
                },
                {
                    key: 'meetings',
                    path: '/calendar',
                    exact: true,
                    hidden: !shownPages?.meetings,
                    icon: <EventIcon />,
                    label: 'Meetings',
                    component: CalendarPage,
                },
                {
                    key: 'hackerpack',
                    path: '/hackerpack',
                    exact: true,
                    icon: <AmpStoriesIcon />,
                    hidden: !shownPages?.hackerPack,
                    label: 'Hackerpack',
                    component: HackerpackPage,
                },
                {
                    key: 'recruitment',
                    path: '/recruitment',
                    exact: false,
                    icon: <WorkIcon />,
                    label: 'Recruitment',
                    component: RecruitmentPage,
                    locked: true,
                    lockedDescription: 'Currently unavailable',
                },
                //Experimental
                {
                    key: 'map',
                    path: '/map',
                    exact: false,
                    icon: <PlaceIcon />,
                    hidden: !shownPages?.experimental,
                    label: 'Map',
                    component: MapPage,
                },
                {
                    key: 'challenges',
                    path: '/challenges',
                    hidden: !shownPages?.experimental,
                    exact: true,
                    icon: <FormatListBulletedIcon />,
                    label: 'Challenges',
                    component: ChallengesIndex,
                },
                {
                    key: 'chat',
                    path: '/chat',
                    hidden: !shownPages?.experimental,
                    exact: true,
                    icon: <QuestionAnswerSharp />,
                    label: 'Chat',
                    component: Chat,
                },
            ]}
        />
    )
}

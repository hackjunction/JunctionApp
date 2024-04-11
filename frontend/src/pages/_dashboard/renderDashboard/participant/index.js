import React, { useEffect, useState } from 'react'

import { useRouteMatch, useLocation } from 'react-router'

import { makeStyles } from '@material-ui/core/styles'
import GroupIcon from '@material-ui/icons/Group'
import DashboardIcon from '@material-ui/icons/Dashboard'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import AmpStoriesIcon from '@material-ui/icons/AmpStories'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import StarRateIcon from '@material-ui/icons/StarRate'
import HowToVoteIcon from '@material-ui/icons/HowToVote'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'

import EventIcon from '@material-ui/icons/Event'
import PlaceIcon from '@material-ui/icons/Place'

import SidebarLayout from 'components/layouts/SidebarLayout'
import Image from 'components/generic/Image'
import BasicNavBar from 'components/navbars/BasicNavBar'

import DefaultPage from '../generalPages/default'
import FinalistVotingPage from './finalist-voting'
import TeamPage from './team'
import ProjectPage from './project'
import ReviewingPage from './reviewing'
import TravelGrantPage from './travel-grant'
import EventIDPage from './event-id'
import HackerpackPage from '../generalPages/hackerpack'
import ChallengesIndex from '../generalPages/challenges'
import CalendarPage from './calendar'
import MapPage from '../generalPages/map'
import ChecklistPage from './checklist'

import { useTranslation } from 'react-i18next'

import Badge from '@material-ui/core/Badge'
import {
    CheckBox,
    EmojiEventsRounded,
    LocalAirportRounded,
    LocalPlayRounded,
    QuestionAnswerSharp,
} from '@material-ui/icons'

import { Chat } from 'components/messaging/chat'
import { Grid, Paper } from '@material-ui/core'

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
    const { t } = useTranslation()
    const match = useRouteMatch()
    const location = useLocation()
    const [alertCount, setAlertCount] = useState(originalAlertCount)
    const [alerts, setAlerts] = useState(originalAlerts)

    useEffect(() => {
        setAlerts(originalAlerts)
        setAlertCount(originalAlertCount)
    }, [originalAlerts, originalAlertCount])

    return (
        <SidebarLayout
            baseRoute={match.url}
            location={location}
            sidebarTopContent={
                <div className={classes.sidebarTop}>
                    <Image
                        className={classes.sidebarLogo}
                        publicId={
                            event && event.logo ? event.logo.publicId : '' //TODO: if no logo, use default
                        }
                        transformation={{
                            width: 200,
                        }}
                    />
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
                    key: 'finals',
                    path: '/finalist-voting',
                    exact: true,
                    hidden: !shownPages.finalistVoting,
                    locked: lockedPages.finalistVoting,
                    lockedDescription:
                        'Finalist voting closed until peer review is done',
                    icon: <HowToVoteIcon />,
                    label: 'Finalist voting',
                    component: FinalistVotingPage,
                },
                {
                    key: 'team',
                    path: '/team',
                    exact: false,
                    icon: <GroupIcon />,
                    label: t('Team_'),
                    locked: lockedPages.team,
                    lockedDescription: 'Team editing not open',
                    component: TeamPage,
                },
                {
                    key: 'project',
                    path: '/project',
                    exact: true,
                    locked: lockedPages.submissions,
                    lockedDescription: 'Submissions not open',
                    hidden: !shownPages.submissions,
                    icon: <AssignmentOutlinedIcon />,
                    label: t('Project_submissions_'),
                    component: ProjectPage,
                },
                {
                    key: 'reviewing',
                    path: '/reviewing',
                    exact: true,
                    hidden: !shownPages.reviewing,
                    locked: lockedPages.reviewing,
                    lockedDescription: 'Reviewing closed',
                    icon: <StarRateIcon />,
                    label: t('Reviewing_'),
                    component: ReviewingPage,
                },
                {
                    key: 'eventid',
                    path: '/event-id',
                    exact: true,
                    hidden: !shownPages.eventID,
                    icon: <FingerprintIcon />,
                    label: 'Event ID',
                    component: EventIDPage,
                },
                {
                    key: 'hackerpack',
                    path: '/hackerpack',
                    exact: true,
                    icon: <AmpStoriesIcon />,
                    hidden: !shownPages.hackerPack,
                    label: t('Hackerpack_'),
                    component: HackerpackPage,
                },
                {
                    key: 'challenges',
                    path: '/challenges',
                    exact: true,
                    hidden: !shownPages.challengesEnabled,
                    icon: <FormatListBulletedIcon />,
                    label: 'Challenges',
                    component: ChallengesIndex,
                },
                {
                    key: 'calendar',
                    path: '/calendar',
                    exact: true,
                    hidden: !shownPages.meetings,
                    icon: <EventIcon />,
                    label: 'Meetings',
                    component: CalendarPage,
                },
                // Experimental
                {
                    key: 'map',
                    hidden: !shownPages.experimental,
                    path: '/map',
                    exact: false,
                    icon: <PlaceIcon />,
                    label: 'Map',
                    component: MapPage,
                },
                {
                    key: 'chat',
                    hidden: !shownPages.experimental,
                    path: '/chat',
                    exact: true,
                    icon: <QuestionAnswerSharp />,
                    label: 'Chat',
                    component: Chat,
                },
                {
                    key: 'checklist',
                    hidden: !shownPages.experimental,
                    path: '/checklist',
                    exact: false,
                    icon: <CheckBox />,
                    label: 'Checklist',
                    component: ChecklistPage,
                },
                {
                    key: 'travel-grant',
                    path: '/travel-grant',
                    hidden: !shownPages.experimental,
                    exact: true,
                    icon: <LocalAirportRounded />,
                    // hidden: !shownPages.travelGrant,
                    label: 'Travel grant',
                    component: TravelGrantPage,
                },
                {
                    key: 'bazaar',
                    path: '/bazaar',
                    hidden: !shownPages.experimental,
                    exact: true,
                    icon: <LocalPlayRounded />,
                    // hidden: !shownPages.travelGrant,
                    label: 'Bazaar',
                    component: TravelGrantPage,
                },
                {
                    key: 'treasure',
                    path: '/treasure',
                    hidden: !shownPages.experimental,
                    exact: true,
                    icon: <EmojiEventsRounded />,
                    // hidden: !shownPages.treasure,
                    label: 'Loot & Treasure',
                    component: () => (
                        <>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item>
                                    <Paper
                                        elevation={0}
                                        className=" tw-bg-indigo-600 tw-h-20 tw-w-20"
                                    />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        elevation={0}
                                        className="tw-bg-pink-500 tw-h-20 tw-w-20"
                                    />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        elevation={0}
                                        className="tw-bg-purple-500 tw-h-20 tw-w-20"
                                    />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        elevation={0}
                                        className="tw-bg-yellow-100 tw-h-20 tw-w-20"
                                    />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        elevation={0}
                                        className="tw-bg-green-100 tw-h-20 tw-w-20"
                                    />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        elevation={0}
                                        className="tw-bg-red-800 tw-h-20 tw-w-20"
                                    />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        elevation={0}
                                        className="tw-bg-gray-800 tw-h-20 tw-w-20"
                                    />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        elevation={0}
                                        className="tw-bg-gray-100 tw-h-20 tw-w-20"
                                    />
                                </Grid>
                                <Grid item>
                                    <Paper
                                        elevation={0}
                                        className="tw-bg-gray-400 tw-h-20 tw-w-20"
                                    />
                                </Grid>
                                <h2>Test loot</h2>
                            </Grid>
                        </>
                    ),
                },
            ]}
        />
    )
}

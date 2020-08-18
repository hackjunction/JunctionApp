import React, { useEffect } from 'react'

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

import SidebarLayout from 'components/layouts/SidebarLayout'
import Image from 'components/generic/Image'
import BasicNavBar from 'components/navbars/BasicNavBar'
import PageWrapper from 'components/layouts/PageWrapper'

import DefaultPage from './default'
import FinalistVotingPage from './finalist-voting'
import TeamPage from './team'
import ProjectPage from './project'
import ReviewingPage from './reviewing'
import TravelGrantPage from './travel-grant'
import EventIDPage from './event-id'
import HackerpackPage from './hackerpack'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'

import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

    const classes = useStyles()
    const match = useRouteMatch()
    const location = useLocation()
    const dispatch = useDispatch()

    const event = useSelector(DashboardSelectors.event)
    const eventLoading = useSelector(DashboardSelectors.eventLoading)
    const registrationLoading = useSelector(
        DashboardSelectors.registrationLoading
    )
    const team = useSelector(DashboardSelectors.team)
    const lockedPages = useSelector(DashboardSelectors.lockedPages)
    const shownPages = useSelector(DashboardSelectors.shownPages)

    const { slug } = match.params

    /** Update when slug changes */
    useEffect(() => {
        dispatch(DashboardActions.updateEvent(slug))
        dispatch(DashboardActions.updateRegistration(slug))
        dispatch(DashboardActions.updateTeam(slug))
    }, [slug, dispatch])

    /** Update project when team changes */
    useEffect(() => {
        dispatch(DashboardActions.updateProjects(slug))
        dispatch(DashboardActions.updateProjectScores(slug))
    }, [slug, team, dispatch])

    return (
        <PageWrapper
            loading={eventLoading || registrationLoading}
            wrapContent={false}
        >
            <SidebarLayout
                baseRoute={match.url}
                location={location}
                sidebarTopContent={
                    <div className={classes.sidebarTop}>
                        <Image
                            className={classes.sidebarLogo}
                            publicId={
                                event && event.logo ? event.logo.publicId : ''
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
                        icon: <DashboardIcon />,
                        label: t('Dashboard_'),
                        component: DefaultPage,
                    },
                    {
                        key: 'finals',
                        path: '/finalist-voting',
                        exact: true,
                        hidden: !shownPages.finalistVoting,
                        locked: true,
                        lockedDescription: 'Finalist voting closed',
                        icon: <HowToVoteIcon />,
                        label: 'Finalist voting',
                        component: FinalistVotingPage,
                    },
                    {
                        key: 'team',
                        path: '/team',
                        exact: true,
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
                        label: 'Project submission',
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
                        label: 'Reviewing',
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
                        key: 'travelgrant',
                        path: '/travel-grant',
                        exact: true,
                        icon: <FlightTakeoffIcon />,
                        hidden: !shownPages.travelGrant,
                        label: 'Travel grant',
                        component: TravelGrantPage,
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
                ]}
            />
        </PageWrapper>
    )
}

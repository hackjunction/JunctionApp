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

import DefaultPage from './default'
import FinalistVotingPage from './finalist-voting'
import TeamPage from './team'

import ProjectPage from './project'
import ReviewingPage from './reviewing'
import TravelGrantPage from './travel-grant'
import EventIDPage from './event-id'
import HackerpackPage from './hackerpack'
import ChallengesIndex from './challenges'
import CalendarPage from './calendar'
import RecruitmentPage from './partnerrecruitment'
import ApplyPage from '../../../components/Team/Apply'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as OrganiserActions from 'redux/organiser/actions'
import * as AuthSelectors from 'redux/auth/selectors'

import { useTranslation } from 'react-i18next'
import { CheckBox } from '@material-ui/icons'
import { Alerts } from 'components/messaging/alerts'
import Badge from '@material-ui/core/Badge'
import { useLazyQuery, useSubscription } from '@apollo/client'
import { ALERTS_QUERY } from 'graphql/queries/alert'
import { NEW_ALERTS_SUBSCRIPTION } from 'graphql/subscriptions/alert'
import hackerpack from './hackerpack'
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
    const { t } = useTranslation()

    const classes = useStyles()
    const match = useRouteMatch()
    const location = useLocation()
    const dispatch = useDispatch()

    const event = useSelector(DashboardSelectors.event)

    const isPartner =
        useSelector(AuthSelectors.idTokenData)?.roles?.includes('Recruiter') &&
        !useSelector(AuthSelectors.idTokenData)?.roles?.includes('SuperAdmin')
    console.log(isPartner, 'user is partner')
    const eventLoading = useSelector(DashboardSelectors.eventLoading)
    const registrationLoading = useSelector(
        DashboardSelectors.registrationLoading,
    )
    const team = useSelector(DashboardSelectors.team)
    const lockedPages = useSelector(DashboardSelectors.lockedPages)
    const shownPages = useSelector(DashboardSelectors.shownPages)

    const { slug } = match.params

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
        // dispatch(DashboardActions.updateTeams(slug))
        //TODO dont use OrganiserSelectors here
        dispatch(OrganiserActions.updateProjects(slug))
        dispatch(OrganiserActions.updateGavelProjects(slug))
        dispatch(OrganiserActions.updateRankings(slug))
        dispatch(OrganiserActions.generateResults(slug)) // TODO do we need to get results always?
    }, [slug, dispatch])

    const [alerts, setAlerts] = useState([])
    const [alertCount, setAlertCount] = useState(0)
    const { data: newAlert } = useSubscription(NEW_ALERTS_SUBSCRIPTION, {
        variables: { slug },
    })

    // Must use lazy query because event is fetched asynchnronously
    const [getAlerts, { loading: alertsLoading, data: alertsData }] =
        useLazyQuery(ALERTS_QUERY)
    useEffect(() => {
        if (event) {
            getAlerts({ variables: { eventId: event._id } })
        }
    }, [event, getAlerts])

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

    return (
        <PageWrapper
            loading={eventLoading || registrationLoading || alertsLoading}
            wrapContent={false}
        >
            {isPartner ? (
                <SidebarLayout
                    baseRoute={match.url}
                    location={location}
                    sidebarTopContent={
                        <div className={classes.sidebarTop}>
                            <Image
                                className={classes.sidebarLogo}
                                publicId={
                                    event && event.logo
                                        ? event.logo.publicId
                                        : ''
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
                                <Badge
                                    badgeContent={alertCount}
                                    color="primary"
                                >
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
                            hidden: !shownPages.hackerPack,
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
                            hidden: !shownPages.meetings,
                            icon: <EventIcon />,
                            label: 'Meetings',
                            component: CalendarPage,
                        },
                        {
                            key: 'recruitment',
                            path: '/recruitment',
                            exact: true,
                            label: 'Recruitment',
                            component: RecruitmentPage,
                        },
                    ]}
                />
            ) : (
                <SidebarLayout
                    baseRoute={match.url}
                    location={location}
                    sidebarTopContent={
                        <div className={classes.sidebarTop}>
                            <Image
                                className={classes.sidebarLogo}
                                publicId={
                                    event && event.logo
                                        ? event.logo.publicId
                                        : ''
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
                                <Badge
                                    badgeContent={alertCount}
                                    color="primary"
                                >
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
                        {
                            key: 'challenges',
                            path: '/challenges',
                            exact: true,
                            icon: <FormatListBulletedIcon />,
                            label: 'Challenges',
                            component: ChallengesIndex,
                        },
                        /*{
                            key: 'checklist',
                            path: '/checklist',
                            exact: true,
                            icon: <CheckBox />,
                            hidden: !shownPages.hackerPack,
                            label: 'Checklist',
                            component: ChecklistPage,
                        },*/
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
                            hidden: !shownPages.meetings,
                            icon: <EventIcon />,
                            label: 'Meetings',
                            component: CalendarPage,
                        },
                    ]}
                />
            )}
        </PageWrapper>
    )
}

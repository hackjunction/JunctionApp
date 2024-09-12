import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, useLocation } from 'react-router'
import { Typography, Box } from '@material-ui/core'
import { EventTypes } from '@hackjunction/shared'
import TuneIcon from '@material-ui/icons/Tune'
import SettingsIcon from '@material-ui/icons/Settings'
// import EqualizerIcon from '@material-ui/icons/Equalizer'
import PeopleIcon from '@material-ui/icons/People'
import CropFreeIcon from '@material-ui/icons/CropFree'
import CodeIcon from '@material-ui/icons/Code'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import AssessmentIcon from '@material-ui/icons/Assessment'
import Alert from '@material-ui/lab/Alert'

import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import PageWrapper from 'components/layouts/PageWrapper'
import Image from 'components/generic/Image'
import BasicNavBar from 'components/navbars/BasicNavBar'

import SidebarLayout from 'components/layouts/SidebarLayout'

import CheckinPage from './checkin'
import EditPage from './edit'
import ManagePage from './manage'
import ParticipantsPage from './participants'
import ProjectsPage from './projects'
import ResultsPage from './results'
// import StatsPage from './stats'
import TravelGrantsPage from './travel-grants'
import AlertsPage from './alerts'
import { QuestionAnswerSharp } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    const dispatch = useDispatch()
    const { slug } = match.params
    const { t } = useTranslation()

    const event = useSelector(OrganiserSelectors.event)
    const loading = useSelector(OrganiserSelectors.eventLoading)
    const error = useSelector(OrganiserSelectors.eventError)

    useEffect(() => {
        dispatch(OrganiserActions.updateEvent(slug))
    }, [dispatch, slug])

    useEffect(() => {
        if (event) {
            dispatch(
                OrganiserActions.updateRecruitersForEvent(event.recruiters),
            )
            dispatch(OrganiserActions.updateFilterGroups(slug))
        }
    }, [dispatch, slug, event])
    return (
        <PageWrapper loading={loading} error={error}>
            <SidebarLayout
                sidebarTopContent={
                    <Box
                        p={2}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {event?.logo?.publicId ? (
                            <Image
                                publicId={event?.logo?.publicId}
                                transformation={{
                                    width: 200,
                                }}
                            />
                        ) : (
                            <Typography style={{ color: 'white' }} variant="h6">
                                {event.name}
                            </Typography>
                        )}
                        <Typography variant="button" style={{ color: 'white' }}>
                            Admin
                        </Typography>
                    </Box>
                }
                topContent={
                    <>
                        {event.published && !event.approved ? (
                            <Alert
                                variant="filled"
                                severity="warning"
                                style={{
                                    left: '25%',
                                    width: '50%',
                                    position: 'fixed',
                                    zIndex: 100,
                                }}
                            >
                                {t('Event_waiting_approval_')}
                            </Alert>
                        ) : null}
                        <BasicNavBar />
                    </>
                }
                baseRoute={match.url}
                location={location}
                routes={[
                    {
                        key: 'edit',
                        path: '/edit',
                        icon: <TuneIcon />,
                        label: t('Edit_event_'),
                        component: EditPage,
                    },
                    // {
                    //     key: 'stats',
                    //     path: '/stats',
                    //     exact: true,
                    //     icon: <EqualizerIcon />,
                    //     label: 'Stats',
                    //     component: StatsPage,
                    // },
                    {
                        key: 'participants',
                        path: '/participants',
                        icon: <PeopleIcon />,
                        label: t('Participants_'),
                        component: ParticipantsPage,
                    },
                    {
                        key: 'projects',
                        path: '/projects',
                        icon: <CodeIcon />,
                        label: t('Projects_'),
                        component: ProjectsPage,
                    },
                    {
                        key: 'checkin',
                        path: '/check-in',
                        exact: true,
                        hidden: event.eventType === EventTypes.online.id,
                        locked: event.eventType === EventTypes.online.id,
                        lockedDescription:
                            'Only for physical and hybrid events',
                        icon: <CropFreeIcon />,
                        label: t('Check_in_'),
                        component: CheckinPage,
                    },
                    {
                        key: 'manage',
                        path: '/manage',
                        exact: true,
                        icon: <SettingsIcon />,
                        label: t('Manage_staff_and_partners_'),
                        component: ManagePage,
                    },
                    {
                        key: 'alerts',
                        path: '/alerts',
                        exact: true,
                        icon: <QuestionAnswerSharp />,
                        label: t('Send_announcements_'),
                        component: AlertsPage,
                    },
                    //Experimental

                    {
                        key: 'results',
                        path: '/results',
                        hidden: !event?.experimental,
                        icon: <AssessmentIcon />,
                        label: 'Results',
                        component: ResultsPage,
                    },
                    {
                        key: 'travel-grants',
                        path: '/travel-grants',
                        exact: true,
                        hidden: !event?.experimental,
                        // locked: event?.travelGrantConfig?.enabled ?? true,
                        lockedDescription: 'Travel grants disabled',
                        icon: <FlightTakeoffIcon />,
                        label: 'Travel grants',
                        component: TravelGrantsPage,
                    },
                ]}
            />
        </PageWrapper>
    )
}

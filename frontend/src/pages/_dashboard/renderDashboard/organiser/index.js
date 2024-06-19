import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, useLocation } from 'react-router'
import { Typography, Box } from '@mui/material'
import { EventTypes } from '@hackjunction/shared'
import TuneIcon from '@mui/icons-material/Tune'
import SettingsIcon from '@mui/icons-material/Settings'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import PeopleIcon from '@mui/icons-material/People'
import CropFreeIcon from '@mui/icons-material/CropFree'
import CodeIcon from '@mui/icons-material/Code'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import AssessmentIcon from '@mui/icons-material/Assessment'
import Alert from '@mui/material/Alert'

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
import { QuestionAnswerSharp } from '@mui/icons-material'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    const dispatch = useDispatch()
    const { slug } = match.params

    const event = useSelector(OrganiserSelectors.event)
    const loading = useSelector(OrganiserSelectors.eventLoading)
    const error = useSelector(OrganiserSelectors.eventError)

    useEffect(() => {
        dispatch(OrganiserActions.updateEvent(slug))
    }, [dispatch, slug])

    useEffect(() => {
        if (event) {
            // dispatch(
            //     OrganiserActions.updateOrganisersForEvent(
            //         event.owner,
            //         event.organisers,
            //     ),
            // )
            dispatch(
                OrganiserActions.updateRecruitersForEvent(event.recruiters),
            )
            // dispatch(OrganiserActions.updateRegistrationsForEvent(slug))
            // dispatch(OrganiserActions.updateTeamsForEvent(slug))
            dispatch(OrganiserActions.updateFilterGroups(slug))
            // dispatch(OrganiserActions.updateProjects(slug))
            // dispatch(OrganiserActions.updateGavelProjects(slug))
            // dispatch(OrganiserActions.updateRankings(slug))
            // dispatch(OrganiserActions.generateResults(slug)) // TODO do we need to get results always?
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
                                <>
                                    The event will be published once approved by
                                    admins. Questions about the approval process
                                    can be directed to hello@hackjunction.com
                                </>
                            </Alert>
                        ) : null}
                        <BasicNavBar text={event.name} />
                    </>
                }
                baseRoute={match.url}
                location={location}
                routes={[
                    {
                        key: 'edit',
                        path: '/edit',
                        icon: <TuneIcon />,
                        label: 'Edit',
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
                        label: 'Participants',
                        component: ParticipantsPage,
                    },
                    {
                        key: 'projects',
                        path: '/projects',
                        icon: <CodeIcon />,
                        label: 'Projects',
                        component: ProjectsPage,
                    },
                    {
                        key: 'checkin',
                        path: '/check-in',
                        exact: true,
                        locked: event.eventType === EventTypes.online.id,
                        lockedDescription:
                            'Only for physical and hybrid events',
                        icon: <CropFreeIcon />,
                        label: 'Check-in',
                        component: CheckinPage,
                    },
                    {
                        key: 'manage',
                        path: '/manage',
                        exact: true,
                        icon: <SettingsIcon />,
                        label: 'Manage',
                        component: ManagePage,
                    },
                    {
                        key: 'alerts',
                        path: '/alerts',
                        exact: true,
                        icon: <QuestionAnswerSharp />,
                        label: 'Send announcements',
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

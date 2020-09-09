import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, useLocation } from 'react-router'
import { Typography, Box } from '@material-ui/core'
import { EventTypes } from '@hackjunction/shared'
import TuneIcon from '@material-ui/icons/Tune'
import SettingsIcon from '@material-ui/icons/Settings'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import PeopleIcon from '@material-ui/icons/People'
import CropFreeIcon from '@material-ui/icons/CropFree'
import CodeIcon from '@material-ui/icons/Code'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import AssessmentIcon from '@material-ui/icons/Assessment'

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
import StatsPage from './stats'
import TravelGrantsPage from './travel-grants'

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
            dispatch(
                OrganiserActions.updateOrganisersForEvent(
                    event.owner,
                    event.organisers
                )
            )
            dispatch(OrganiserActions.updateRegistrationsForEvent(slug))
            dispatch(OrganiserActions.updateTeamsForEvent(slug))
            dispatch(OrganiserActions.updateFilterGroups(slug))
            dispatch(OrganiserActions.updateProjects(slug))
            dispatch(OrganiserActions.updateGavelProjects(slug))
            dispatch(OrganiserActions.updateRankings(slug))
            dispatch(OrganiserActions.generateResults(slug)) // TODO do we need to get results always?
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
                topContent={<BasicNavBar text={event.name} />}
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
                    {
                        key: 'stats',
                        path: '/stats',
                        exact: true,
                        icon: <EqualizerIcon />,
                        label: 'Stats',
                        component: StatsPage,
                    },
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
                        key: 'results',
                        path: '/results',
                        icon: <AssessmentIcon />,
                        label: 'Results',
                        component: ResultsPage,
                    },
                    {
                        key: 'checkin',
                        path: '/check-in',
                        exact: true,
                        locked: event.eventType !== EventTypes.physical.id,
                        lockedDescription: 'Only for physical events',
                        icon: <CropFreeIcon />,
                        label: 'Check-in',
                        component: CheckinPage,
                    },
                    {
                        key: 'travel-grants',
                        path: '/travel-grants',
                        exact: true,
                        locked: event?.travelGrantConfig?.enabled ?? true,
                        lockedDescription: 'Travel grants disabled',
                        icon: <FlightTakeoffIcon />,
                        label: 'Travel grants',
                        component: TravelGrantsPage,
                    },
                    {
                        key: 'manage',
                        path: '/manage',
                        exact: true,
                        icon: <SettingsIcon />,
                        label: 'Manage',
                        component: ManagePage,
                    },
                ]}
            />
        </PageWrapper>
    )
}

import React, { useEffect } from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import PageWrapper from 'components/layouts/PageWrapper'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'

import DefaultTab from './default'
import TeamsTab from './teams'
import AssignedTab from './assigned'
// import TravelTab from './travel'
import AdminTab from './admin'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import { useDispatch, useSelector } from 'react-redux'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const location = useLocation()
    const registrationsLoading = useSelector(
        OrganiserSelectors.registrationsLoading,
    )

    useEffect(() => {
        if (event) {
            dispatch(
                OrganiserActions.updateRegistrationsForEvent(event.slug, true),
            )
            dispatch(OrganiserActions.updateTeamsForEvent(event.slug))
        }
    }, [event, location])
    return (
        <PageWrapper
            loading={!event || registrationsLoading}
            loadingText="Fetching all registration data"
        >
            <PageHeader
                heading="Participants"
                subheading="Search participants"
            />
            <MaterialTabsLayout
                transparent
                baseRoute={match.url}
                location={location}
                tabs={[
                    {
                        label: 'Participants',
                        path: '',
                        key: 'participants',
                        component: DefaultTab,
                    },
                    {
                        path: '/teams',
                        key: 'teams',
                        label: 'Teams',
                        component: TeamsTab,
                    },
                    {
                        path: '/assigned',
                        key: 'assigned',
                        label: 'Assigned to you',
                        component: AssignedTab,
                    },
                    // {
                    //     path: '/travel',
                    //     key: 'travel',
                    //     label: 'Travel',
                    //     component: TravelTab,
                    // },
                    {
                        path: '/admin',
                        key: 'admin',
                        label: 'Admin & Tools',
                        component: AdminTab,
                    },
                ]}
            />
        </PageWrapper>
    )
}

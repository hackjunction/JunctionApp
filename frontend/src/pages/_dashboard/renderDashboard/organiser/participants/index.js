import React from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import PageWrapper from 'components/layouts/PageWrapper'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'

import DefaultTab from './default'
import TeamsTab from './teams'
import AssignedTab from './assigned'
import TravelTab from './travel'
import AdminTab from './admin'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    return (
        <PageWrapper>
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
                    {
                        path: '/travel',
                        key: 'travel',
                        label: 'Travel',
                        component: TravelTab,
                    },
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

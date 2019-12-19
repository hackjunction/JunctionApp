import React from 'react'

import { useRouteMatch, useLocation } from 'react-router'

import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import AccountNavBar from 'components/navbars/AccountNavBar'
import CenteredContainer from 'components/generic/CenteredContainer'
import Dashboard from './dashboard'
import Profile from './profile'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    return (
        <CenteredContainer>
            <AccountNavBar />
            <MaterialTabsLayout
                transparent
                tabs={[
                    {
                        label: 'Dashboard',
                        key: 'dashboard',
                        path: '',
                        component: Dashboard,
                    },
                    {
                        label: 'Profile',
                        key: 'profile',
                        path: '/profile',
                        content: Profile,
                    },
                ]}
                baseRoute={match.url}
                location={location}
            />
        </CenteredContainer>
    )
}

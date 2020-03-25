import React from 'react'

import { useRouteMatch, useLocation } from 'react-router'

import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import AccountNavBar from 'components/navbars/AccountNavBar'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import Dashboard from './dashboard'
import Profile from './profile'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    return (
        <PageWrapper
            header={() => <AccountNavBar />}
            footer={() => <Footer />}
            render={() => (
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
                            component: Profile,
                        },
                    ]}
                    baseRoute={match.url}
                    location={location}
                />
            )}
        />
    )
}

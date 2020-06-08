import React from 'react'

import { useRouteMatch, useLocation } from 'react-router'

import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import AccountNavBar from 'components/navbars/AccountNavBar'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import Dashboard from './dashboard'
import Profile from './profile'

import { useTranslation } from 'react-i18next'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    const { t, i18n } = useTranslation() // eslint-disable-line
    return (
        <PageWrapper
            header={() => <AccountNavBar />}
            footer={() => <Footer />}
            render={() => (
                <MaterialTabsLayout
                    transparent
                    tabs={[
                        {
                            label: t('Dashboard_'),
                            key: 'dashboard',
                            path: '',
                            component: Dashboard,
                        },
                        {
                            label: t('Profile_'),
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

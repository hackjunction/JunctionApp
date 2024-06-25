import React from 'react'

import { useResolvedPath, useLocation } from 'react-router'

import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
// import AccountNavBar from 'components/navbars/AccountNavBar'
import GlobalNavBar from 'components/navbars/GlobalNavBar'

import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import Dashboard from './dashboard'
import Profile from './profile'

import { useTranslation } from 'react-i18next'

export default () => {
    const url = useResolvedPath("").pathname;
    const location = useLocation()
    const { t } = useTranslation()
    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
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

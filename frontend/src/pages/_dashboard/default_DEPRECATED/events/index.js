import React from 'react'

import { useRouteMatch, useLocation } from 'react-router'

import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
// import AccountNavBar from 'components/navbars/AccountNavBar'
import GlobalNavBar from 'components/navbars/GlobalNavBar'

import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import Organizer from './Organizer'
import Participant from './Participant'
import Partner from './Partner'

import { useTranslation } from 'react-i18next'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    const { t } = useTranslation()
    console.log("base", match.url)
    return (
        <PageWrapper
            render={() => (
                <MaterialTabsLayout
                    transparent
                    tabs={[
                        {
                            label: 'Your Events',
                            key: 'YourEvents',
                            path: '',
                            component: Participant,
                        },
                        {
                            label: 'Organize',
                            key: 'organize',
                            path: '/organize',
                            component: Organizer,
                        },
                        {
                            label: 'Partner',
                            key: 'partner',
                            path: '/partner',
                            component: Partner,
                        },
                    ]}
                    baseRoute={match.url}
                    location={location}
                />
            )}
        />
    )
}

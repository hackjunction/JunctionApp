import React from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import { useSelector } from 'react-redux'

import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageWrapper from 'components/layouts/PageWrapper'
import * as AuthSelectors from 'redux/auth/selectors'

import Organizer from './Organizer'
import Participant from './Participant'
import Partner from './Partner'
import { useTranslation } from 'react-i18next'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    const { t } = useTranslation()

    const isPartner = useSelector(AuthSelectors.idTokenData)?.roles?.some(r =>
        ['Recruiter', 'SuperAdmin'].includes(r),
    )

    const tabs = [
        {
            label: t('Your_events_'),
            key: 'events',
            path: '',
            component: Participant,
        },
        {
            label: t('Organize_'),
            key: 'organize',
            path: '/organize',
            component: Organizer,
        },
    ]

    if (isPartner) {
        tabs.push({
            label: t('Partner_'),
            key: 'partner',
            path: '/partner',
            component: Partner,
        })
    }

    return (
        <PageWrapper
            render={() => (
                <MaterialTabsLayout
                    transparent
                    tabs={tabs}
                    baseRoute={match.url}
                    location={location}
                />
            )}
        />
    )
}

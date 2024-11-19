import React from 'react'

import { useResolvedPath, useLocation } from 'react-router'
import { useSelector } from 'react-redux'

import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageWrapper from 'components/layouts/PageWrapper'
import * as AuthSelectors from 'reducers/auth/selectors'

import Organizer from './Organizer'
import Participant from './Participant'
import Partner from './Partner'

export default () => {
    console.log('FROM EVENTS PAGE')
    const url = useResolvedPath('').pathname
    const location = useLocation()
    console.log('location from events page>>>>>>', location)
    console.log('url from events page>>>>>>', url)

    const isPartner = useSelector(AuthSelectors.idTokenData)?.roles?.some(r =>
        ['Recruiter', 'SuperAdmin'].includes(r),
    )

    const tabs = [
        {
            label: 'Your Events',
            key: 'events',
            path: '',
            component: Participant,
        },
        {
            label: 'Organize',
            key: 'organize',
            path: '/organize',
            component: Organizer,
        },
    ]

    if (isPartner) {
        tabs.push({
            label: 'Partner',
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
                    baseRoute={url}
                    location={location}
                />
            )}
        />
    )
}

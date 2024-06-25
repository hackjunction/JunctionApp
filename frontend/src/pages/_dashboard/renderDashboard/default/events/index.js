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
    const url = useResolvedPath("").pathname;
    const location = useLocation()

    const isPartner = useSelector(AuthSelectors.idTokenData)?.roles?.some(r =>
        ["Recruiter", "SuperAdmin"].includes(r)
    )




    return isPartner ? (
        <PageWrapper
            render={() => (
                <MaterialTabsLayout
                    transparent
                    tabs={[
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
        :
        (
            <PageWrapper
                render={() => (
                    <MaterialTabsLayout
                        transparent
                        tabs={[
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
                        ]}
                        baseRoute={match.url}
                        location={location}
                    />
                )}
            />
        )
}

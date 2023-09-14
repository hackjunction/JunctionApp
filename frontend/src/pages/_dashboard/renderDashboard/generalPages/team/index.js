import React from 'react'
import { useRouteMatch, useLocation } from 'react-router'
import CandidatesPage from './candidates'
import ProfilePage from './profile'
import Container from 'components/generic/Container'
import TeamsPage from './teams'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    return (
        <Container>
            <PageHeader heading="Team management" />
            <MaterialTabsLayout
                transparent
                tabs={[
                    {
                        label: 'Join a team',
                        key: 'teams',
                        path: '',
                        component: TeamsPage,
                    },
                    {
                        label: 'Your team',
                        key: 'profile',
                        path: '/profile',
                        component: ProfilePage,
                    },
                    {
                        label: 'Team candidates',
                        key: 'candidates',
                        path: '/candidates',
                        component: CandidatesPage,
                    },
                ]}
                baseRoute={match.url}
                location={location}
            />
        </Container>
    )
}

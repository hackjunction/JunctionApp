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

    // const hasTeam = useSelector(DashboardSelectors.hasTeam)
    // TODO make tab "my team" and "Team candidates" visible only if user has a team
    return (
        <Container>
            <PageHeader heading="Team management" />
            <MaterialTabsLayout
                transparent
                tabs={[
                    {
                        label: 'All teams',
                        key: 'teams',
                        path: '',
                        component: TeamsPage,
                    },
                    {
                        label: 'My team',
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

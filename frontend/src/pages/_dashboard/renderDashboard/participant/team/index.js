import React from 'react'
import { useResolvedPath, useLocation } from 'react-router'
import CandidatesPage from './candidates'
import ProfilePage from './profile'
import Container from 'components/generic/Container'
import TeamsPage from './teams'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'
import * as DashboardSelectors from 'reducers/dashboard/selectors'
import { useSelector } from 'react-redux'

export default () => {
    const url = useResolvedPath("").pathname;
    const location = useLocation()
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const enabledTabs = [
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
    ]

    if (hasTeam) {
        enabledTabs.push({
            label: 'Team candidates',
            key: 'candidates',
            path: '/candidates',
            component: CandidatesPage,
        })
    }
    // const hasTeam = useSelector(DashboardSelectors.hasTeam)
    // TODO make tab "my team" and "Team candidates" visible only if user has a team
    return (
        <Container>
            <PageHeader heading="Team management" />
            <MaterialTabsLayout
                transparent
                tabs={enabledTabs}
                baseRoute={match.url}
                location={location}
            />
        </Container>
    )
}

import React from 'react'
import { useRouteMatch, useLocation } from 'react-router'
import CandidatesPage from './candidates'
import ProfilePage from './profile'
import Container from 'components/generic/Container'
import TeamsPage from './teams'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const teamHasCandidates = useSelector(DashboardSelectors.teamHasCandidates)
    const { t } = useTranslation()

    const enabledTabs = [
        {
            label: t('All_teams_'),
            key: 'teams',
            path: '',
            component: TeamsPage,
        },
        {
            label: t('My_team_'),
            key: 'profile',
            path: '/profile',
            component: ProfilePage,
        },
    ]

    if (hasTeam && teamHasCandidates) {
        enabledTabs.push({
            label: t('Team_candidates_'),
            key: 'candidates',
            path: '/candidates',
            component: CandidatesPage,
        })
    }
    // TODO make tab "my team" and "Team candidates" visible only if user has a team
    return (
        <Container>
            <PageHeader heading={t('Team_management_')} />
            <MaterialTabsLayout
                transparent
                tabs={enabledTabs}
                baseRoute={match.url}
                location={location}
            />
        </Container>
    )
}

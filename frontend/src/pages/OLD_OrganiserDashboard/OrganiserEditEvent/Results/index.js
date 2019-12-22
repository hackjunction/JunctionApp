import React, { useMemo } from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PageWrapper from 'components/layouts/PageWrapper'
import PageHeader from 'components/generic/PageHeader'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'

import OverviewTab from './OverviewTab'
import OverallTab from './OverallTab'
import TracksTab from './TracksTab'
import ChallengesTab from './ChallengesTab'

import * as OrganiserSelectors from 'redux/organiser/selectors'

const ResultsPage = ({ event, location, match }) => {
    const tabs = useMemo(() => {
        const data = [
            {
                path: '',
                key: 'overview',
                label: 'Overview',
                component: OverviewTab,
            },
            {
                path: '/overall',
                key: 'overall',
                label: 'Overall',
                component: OverallTab,
            },
        ]

        if (event?.tracksEnabled) {
            data.push({
                path: '/tracks',
                key: 'tracks',
                label: 'Tracks',
                component: TracksTab,
            })
        }

        if (event?.challengesEnabled) {
            data.push({
                path: '/challenges',
                key: 'challenges',
                label: 'Challenges',
                component: ChallengesTab,
            })
        }

        return data
    }, [event])

    return (
        <PageWrapper>
            <PageHeader
                heading="Results"
                subheading="View and configure the rankings of projects"
            />
            <MaterialTabsLayout
                transparent
                tabs={tabs}
                location={location}
                baseRoute={match.url}
            />
        </PageWrapper>
    )
}

const mapState = state => ({
    event: OrganiserSelectors.event(state),
})

export default withRouter(connect(mapState)(ResultsPage))

import React, { useMemo } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import PageWrapper from 'components/layouts/PageWrapper'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'

import SearchTab from './Search'
import ChallengesTab from './Challenges'
import TracksTab from './Tracks'
import GavelTab from './Gavel'
import AnnotatorsTab from './Annotators'
import WinnersTab from './Winners'

import * as OrganiserSelectors from 'redux/organiser/selectors'

const Projects = ({ event, projectsLoading, location, match }) => {
    const tabs = useMemo(() => {
        const data = [
            {
                path: '',
                key: 'all-projects',
                label: 'All projects',
                component: SearchTab,
            },
        ]
        if (event?.challengesEnabled && event?.challenges?.length > 0) {
            data.push({
                path: '/by-challenge',
                key: 'by-challenge',
                label: 'By challenge',
                component: ChallengesTab,
            })
        }

        if (event?.tracksEnabled && event?.tracks?.length > 0) {
            data.push({
                path: '/by-track',
                key: 'by-track',
                label: 'By track',
                component: TracksTab,
            })
        }

        data.push({
            path: '/gavel',
            key: 'gavel',
            label: 'Gavel voting',
            content: GavelTab,
        })

        data.push({
            path: '/annotators',
            key: 'annotators',
            label: 'Gavel annotators',
            content: AnnotatorsTab,
        })

        data.push({
            path: '/winners',
            key: 'winners',
            label: 'Winners',
            content: WinnersTab,
        })

        return data
    }, [event])

    if (!event || projectsLoading) return <PageWrapper loading />

    return (
        <PageWrapper>
            <PageHeader
                heading="Projects"
                subheading="All of the cool stuff people have made"
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
    projectsLoading: OrganiserSelectors.projectsLoading(state),
})

export default withRouter(connect(mapState)(Projects))

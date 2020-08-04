import React, { useMemo } from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import { useSelector } from 'react-redux'

import PageWrapper from 'components/layouts/PageWrapper'
import PageHeader from 'components/generic/PageHeader'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'

import DefaultTab from './default'
import OverallTab from './overall'
import TracksTab from './tracks'
import ChallengesTab from './challenges'

import * as OrganiserSelectors from 'redux/organiser/selectors'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const location = useLocation()
    const match = useRouteMatch()

    const tabs = useMemo(() => {
        const data = [
            {
                path: '',
                key: 'overview',
                label: 'Overview',
                component: DefaultTab,
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

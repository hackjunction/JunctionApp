import React, { useMemo } from 'react'

import { useSelector } from 'react-redux'
import { useRouteMatch, useLocation } from 'react-router'
import { OverallReviewingMethods } from '@hackjunction/shared'

import PageWrapper from 'components/layouts/PageWrapper'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'

import DefaultTab from './default'
import ChallengesTab from './by-challenge'
import TracksTab from './by-track'
// import GavelTab from './gavel'
// import AnnotatorsTab from './annotators'
import WinnersTab from './winners'
import FinalistSelectionTab from './finalist-selection'
import VotingTokensTab from './votingTokens'
import * as OrganiserSelectors from 'redux/organiser/selectors'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const projectsLoading = useSelector(OrganiserSelectors.projectsLoading)
    const match = useRouteMatch()
    const location = useLocation()

    const tabs = useMemo(() => {
        const data = [
            {
                path: '',
                key: 'all-projects',
                label: 'All projects',
                component: DefaultTab,
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

        // data.push({
        //     path: '/gavel',
        //     key: 'gavel',
        //     label: 'Gavel voting',
        //     component: GavelTab,
        // })

        // data.push({
        //     path: '/annotators',
        //     key: 'annotators',
        //     label: 'Gavel annotators',
        //     component: AnnotatorsTab,
        // })

        if (
            event?.overallReviewMethod ===
            OverallReviewingMethods.finalsManualSelection.id
        ) {
            data.push({
                path: '/finalist-selection',
                key: 'finalist-selection',
                label: 'Finalist selection',
                component: FinalistSelectionTab,
            })
        }

        data.push({
            path: '/winners',
            key: 'winners',
            label: 'Winners',
            component: WinnersTab,
        })
        data.push({
            path: '/votingTokens',
            key: 'votingTokens',
            label: 'Voting Tokens',
            component: VotingTokensTab,
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

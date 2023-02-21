import React, { useState, useEffect } from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import * as DashboardSelectors from 'redux/dashboard/selectors'

import ChallengeDetail from 'components/challenges/ChallengeDetail'
import { useSelector } from 'react-redux'
import ChallengePage from './ChallengePage'
export default () => {
    const event = useSelector(DashboardSelectors.event)
    const [openChallenge, setOpenChallenge] = useState(null)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const challenges = event.challenges
    if (openChallenge !== null) {
        return (
            <ChallengePage
                onClose={() => setOpenChallenge(null)}
                {...challenges[openChallenge]}
            />
        )
    }
    return (
        <>
            <Helmet>
                <title>Junction App || Dashboard</title>
            </Helmet>
            <PageHeader
                heading="Challenges"
                subheading="Get to know the exciting Challenges and the wonderful Partners providing them!"
            />
            <PageWrapper loading={false}>
                {challenges.map((c, index) => (
                    <div
                        onClick={() => setOpenChallenge(index)}
                        onMouseOver={() => setActiveChallenge(index)}
                        onMouseLeave={() => setActiveChallenge(null)}
                    >
                        <ChallengeDetail
                            isFocused={activeChallenge === index}
                            {...c}
                        />
                    </div>
                ))}

            </PageWrapper>
        </>
    )
}

import React from 'react'
import { useRouteMatch, useLocation } from 'react-router'

import PageWrapper from 'components/layouts/PageWrapper'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'

import GradientBox from 'components/generic/GradientBox'
import { Box, Link, Typography } from '@material-ui/core'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    const mapFloorNeg1 =
        'https://res.cloudinary.com/hackjunction/image/upload/v1731052748/event-specific/Junction%202024/Map/basement-floor.png'
    const mapFloor1 =
        'https://res.cloudinary.com/hackjunction/image/upload/v1731052754/event-specific/Junction%202024/Map/first-floor.png'
    const mapFloor2 =
        'https://res.cloudinary.com/hackjunction/image/upload/v1731052751/event-specific/Junction%202024/Map/second-floor.png'

    const FloorMap = ({ mapSrc, altText }) => (
        <GradientBox color="theme_white" p={3}>
            <Link target="_blank" rel="noreferrer" href={mapSrc}>
                Open on new tab
            </Link>
            <img src={mapSrc} alt={altText} width="100%" />
        </GradientBox>
    )

    return (
        <>
            <PageWrapper loading={false}>
                <PageHeader
                    heading="Venue map"
                    subheading="Check what is happening where"
                />
                <Typography variant="h6">Need more help?</Typography>
                <Link
                    target="_blank"
                    rel="noreferrer"
                    href="https://junctionhq.notion.site/Participant-Guidebook-Junction-2024-10559a11813780389e0fc382f7ec6ea8?pvs=74"
                >
                    Click here to review the Guidebook
                </Link>
                <Box p={4} />
                <MaterialTabsLayout
                    transparent
                    tabs={[
                        {
                            path: '/1',
                            key: '1',
                            label: 'Floor 1',
                            component: () => (
                                <FloorMap
                                    mapSrc={mapFloor1}
                                    altText="Venue map floor 1"
                                />
                            ),
                        },
                        {
                            path: '/2',
                            key: '2',
                            label: 'Floor 2',
                            component: () => (
                                <FloorMap
                                    mapSrc={mapFloor2}
                                    altText="Venue map floor 2"
                                />
                            ),
                        },
                        {
                            path: '/basement',
                            key: 'basement',
                            label: 'Basement',
                            component: () => (
                                <FloorMap
                                    mapSrc={mapFloorNeg1}
                                    altText="Venue map basement"
                                />
                            ),
                        },
                    ]}
                    location={location}
                    baseRoute={match.url}
                />
            </PageWrapper>
        </>
    )
}

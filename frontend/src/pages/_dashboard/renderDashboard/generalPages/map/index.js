import React, { useEffect, useRef } from 'react'
import { useRouteMatch, useLocation } from 'react-router'

import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from 'components/layouts/PageWrapper'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'
import Image from 'components/generic/Image'

import GradientBox from 'components/generic/GradientBox'
import LayoutMap1 from 'assets/images/venueMap2023/LayoutMap-venue-01.png'
import LayoutMap2 from 'assets/images/venueMap2023/LayoutMap-venue-02.jpg'
import LayoutMap3 from 'assets/images/venueMap2023/LayoutMap-venue-03.jpg'
import { Grid, Typography } from '@material-ui/core'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()


    const floorNeg1 = () => {
        return (
            <GradientBox color="theme_white" p={3}>
                <img
                    src={LayoutMap1}
                    alt={"Venue map floor 1"}
                    width={'100%'}
                />
            </GradientBox>
        )
    }

    const floor1 = () => {
        return (
            <GradientBox color="theme_white" p={3}>
                <img
                    src={LayoutMap2}
                    alt={"Venue map floor -1"}
                    width={'100%'}
                />
            </GradientBox>
        )
    }


    const floor2 = () => {
        return (
            <GradientBox color="theme_white" p={3}>
                <img
                    src={LayoutMap3}
                    alt={"Venue map floor 2"}
                    width={'100%'}
                />
            </GradientBox>
        )
    }



    return (
        <>
            {/* button for DEV to swithc between participant / partner view */}
            {/* <Button
                onClick={() => setIsPartner(!isPartner)}
                color="primary"
                variant="contained"
            >
                Switch between participant / partner view (only for dev)
            </Button> */}

            {/* <div className="App">
                <h3>Map of dipoli</h3>
                <iframe
                    src="https://junction.desk.me"
                    width="100%;"
                    height="600px;"
                    frameborder="0"
                    scrolling="no"
                ></iframe>
            </div> */}
            <PageWrapper loading={false}>
                <PageHeader
                    heading="Venue map"
                    subheading="Check what is happening where"
                />

                <MaterialTabsLayout
                    transparent
                    tabs={[
                        {
                            path: '/1',
                            key: '1',
                            label: 'Floor 1',
                            component: () => floorNeg1()
                        },
                        {
                            path: '/-1',
                            key: '-1',
                            label: 'Floor -1',
                            component: () => floor1()
                        },
                        {
                            path: '/2',
                            key: '2',
                            label: 'Floor 2',
                            component: () => floor2()
                        },

                    ]}
                    location={location}
                    baseRoute={match.url}
                />
            </PageWrapper>
        </>
    )
}

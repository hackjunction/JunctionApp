import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'

import { useSelector } from 'react-redux'
import PageWrapper from 'components/layouts/PageWrapper'
import PageHeader from 'components/generic/PageHeader'

import GradientBox from 'components/generic/GradientBox'
import * as DashboardSelectors from '../../../../../redux/dashboard/selectors'

export default () => {
    const match = useRouteMatch()
    const { slug } = match.params

    const event = useSelector(DashboardSelectors.event)
    const [venueMap, setVenueMap] = useState([])

    const VenueMap = () => {
        return (
            <GradientBox color="theme_white" p={3}>
                <img src={venueMap.url} alt={'Venue Map'} width={'100%'} />
            </GradientBox>
        )
    }

    useEffect(() => {
        if (event) {
            setVenueMap(event.map)
        }
    }, [event, slug])

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
                <div class="tw-flex tw-flex-col tw-gap-5">
                    <PageHeader
                        heading="Venue map"
                        subheading="Check what is happening where"
                    />
                    <VenueMap />
                </div>


            </PageWrapper>
        </>
    )
}

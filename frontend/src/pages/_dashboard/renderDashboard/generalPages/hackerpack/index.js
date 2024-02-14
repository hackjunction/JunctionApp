import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import HackerpackDetail from 'components/hackerpack/HackerpackDetail'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import { useRouteMatch, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'

import HackerpackService from 'services/hackerpack'
import config from 'constants/config'
import EventsService from 'services/events'

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: '5px',
        marginBottom: '15px'
    },
}))


export default () => {
    const match = useRouteMatch()
    const classes = useStyles()
    const { slug } = match.params
    const event = useSelector(DashboardSelectors.event)

    const [hackerpack, setHackerpack] = useState([])

    useEffect(() => {
        if (event) {
            setHackerpack(event.hackerpacks)
        }
    }, [event, slug])

    //console.log("hackerpack", hackerpack)

    return (
        <>
            <Helmet>
                <title>Junction App || Dashboard</title>
                <meta
                    name="keywords"
                    content={`Redeem hackepack, junction, hackjunction, hackerpack`}
                />
                <meta name="title" content="Junction App || Hackerpack" />
                <meta
                    property="og:title"
                    content="Junction App || Hackerpack"
                />

                <meta
                    name="twitter:title"
                    content="Junction App || Hackerpack"
                />
                <meta
                    name="description"
                    content="Log in to check out Europe's leading hackerpack!"
                />
                <meta
                    property="og:description"
                    content="Log in to check out Europe's leading hackerpack!"
                />
                <meta
                    name="twitter:description"
                    content="Log in to check out Europe's leading hackerpack!"
                />

                <meta name="og:type" content="website" />
                <meta property="og:image" content={config.SEO_IMAGE_URL} />
                <meta name="twitter:image" content={config.SEO_IMAGE_URL} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={config.SEO_TWITTER_HANDLE} />
                <meta
                    name="twitter:creator"
                    content={config.SEO_TWITTER_HANDLE}
                />
            </Helmet>
            <div className={classes.wrapper}>
                <PageHeader
                    heading="Hackerpack"
                    subheading="We want you to be able to fully focus on making your hackathon project as cool as possible! These software provided by our partners will help you unleash your creativity and maximize your learning during our events."

                />
            </div>
            <PageWrapper loading={false}>
                <Divider variant="middle" />
                {hackerpack.map(hackerpack => (
                    <HackerpackDetail
                        hackerpack={hackerpack}
                        redeemable={true}
                    />
                ))}
            </PageWrapper>
        </>
    )
}

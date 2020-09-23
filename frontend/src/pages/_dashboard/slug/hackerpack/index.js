import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import HackerpackDetail from 'components/hackerpack/HackerpackDetail'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'

import HackerpackService from 'services/hackerpack'
import config from 'constants/config'
export default () => {
    const [hackerpack, setHackerpack] = useState([])

    useEffect(() => {
        HackerpackService.getFullHackerpack().then(pack => {
            if (pack) setHackerpack(pack)
        })
    }, [])

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
            <PageHeader
                heading="Hackerpack"
                subheading="We want you to be able to fully focus on making your hackathon project as cool as possible! These software provided by our partners will help you unleash your creativity and maximize your learning during our events."
            />
            <PageWrapper loading={false}>
                <Divider variant="middle" />
                {hackerpack.map(company => (
                    <HackerpackDetail partner={company} redeemable={true} />
                ))}
                <Box p={2}>
                    <Typography color="textSecondary" variant="subtitle1">
                        Anything you would like to see here in the future?
                        Contact us at partnerships@hackjunction.com with your
                        suggestion.
                    </Typography>
                </Box>
            </PageWrapper>
        </>
    )
}

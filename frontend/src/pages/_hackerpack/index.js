import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import HackerpackDetail from 'components/hackerpack/HackerpackDetail'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Container from 'components/generic/Container'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Helmet } from 'react-helmet'
import config from 'constants/config'
import * as DashboardSelectors from 'reducers/dashboard/selectors'
import { useSelector } from 'react-redux'

//  Updated PageHeader components
const PageHeader = ({ heading, subheading }) => {
    return (
        <Box textAlign="center" my={1}>
            <Typography variant="h3" component="h1" fontWeight="bold">
                {heading}
            </Typography>
            <Typography variant="subtitle1" color="black" mt={2}>
                {subheading}
            </Typography>
        </Box>
    )
}

export default () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const event = useSelector(DashboardSelectors.event)

    const [hackerpacks, setHackerpacks] = useState([])

    useEffect(() => {
        if (event) {
            setHackerpacks(event.hackerpacks)
        }
    }, [event, slug])

    return (
        <PageWrapper
            loading={false}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
        >
            <Helmet>
                <title>{config.PLATFORM_OWNER_NAME}</title>
                <meta
                    name="keywords"
                    content="Hackathon, hackathon platform, Junction, hackerpack, hackjunction"
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
                    content="Login to redeem our awesome hackerpack offers!"
                />
                <meta
                    property="og:description"
                    content="Login to redeem our awesome hackerpack offers!"
                />
                <meta
                    name="twitter:description"
                    content="Login to redeem our awesome hackerpack offers!"
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

            <Container center wrapperClass={'classes.backButtonWrapper'}>
                <Button onClick={() => navigate('/')}>
                    <ArrowBackIosIcon style={{ color: 'black' }} />
                    <Typography variant="button" style={{ color: 'black' }}>
                        Back
                    </Typography>
                </Button>
            </Container>

            <Container center>
                <PageHeader
                    heading="Hackerpack"
                    subheading="We want you to be able to fully focus on making your hackathon project as cool as possible! These software provided by our partners will help you unleash your creativity and maximize your learning during our events."
                />
                <Divider variant="middle" />
                {hackerpacks.map(hackerpack => (
                    <HackerpackDetail
                        key={hackerpack.id}
                        hackerpack={hackerpack}
                    />
                ))}
                <Box p={2}>
                    <Typography color="textSecondary" variant="subtitle1">
                        Anything you would like to see here in the future?
                        Contact us at{' '}
                        <a href="mailto:partnerships@hackjunction.com">
                            partnerships@hackjunction.com
                        </a>{' '}
                        with your suggestion.
                    </Typography>
                </Box>
            </Container>
        </PageWrapper>
    )
}

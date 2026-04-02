import React from 'react'

import { Helmet } from 'react-helmet'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useActiveEvents, usePastEvents } from 'graphql/queries/events'

import config from 'constants/config'
import { useTranslation } from 'react-i18next'

import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import BannerCarousel from 'components/generic/BannerCarousel'
import Button from 'components/generic/Button'
import Container from 'components/generic/Container'
import Divider from 'components/generic/Divider'
import ExternalLink from 'components/generic/ExternalLink'
import Footer from 'components/layouts/Footer'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import PageWrapper from 'components/layouts/PageWrapper'

import EventsGrid from './EventsGrid'

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(180deg, rgba(82,151,119,0.15) 0%, #001d24 30%)',
        minHeight: '100vh',
    },
    heroSection: {
        textAlign: 'center',
        padding: theme.spacing(8, 2),
    },
    heroTitle: {
        fontFamily: '"Pixelify Sans", sans-serif',
        color: '#4dffd1',
        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
        fontWeight: 700,
        marginBottom: theme.spacing(2),
    },
    heroSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
        maxWidth: '680px',
        margin: '0 auto',
        fontFamily: '"IBM Plex Mono", monospace',
    },
    sectionTitle: {
        color: '#4dffd1',
        fontFamily: '"Pixelify Sans", sans-serif',
    },
    bodyText: {
        color: 'rgba(255,255,255,0.85)',
    },
}))

export default () => {
    //TODO these shouldn't be queried. Events and organizations should be in the state
    const [activeEvents] = useActiveEvents({ limit: 3 })
    const [pastEvents] = usePastEvents({ limit: 3 })
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const classes = useStyles()

    return (
        <PageWrapper header={() => <GlobalNavBar />} footer={() => <Footer />}>
            <div className={classes.root}>
                <Helmet>
                    <title>{config.PLATFORM_OWNER_NAME}</title>
                    <meta
                        name="keywords"
                        content="Hackathon, hackathon platform, crypto, web3, That Crypto Hackathon"
                    />
                    <meta name="title" content={config.SEO_PAGE_TITLE} />
                    <meta property="og:title" content={config.SEO_PAGE_TITLE} />
                    <meta
                        name="twitter:title"
                        content={config.SEO_PAGE_TITLE}
                    />
                    <meta
                        name="description"
                        content={config.SEO_PAGE_DESCRIPTION}
                    />
                    <meta
                        property="og:description"
                        content={config.SEO_PAGE_DESCRIPTION}
                    />
                    <meta
                        name="twitter:description"
                        content={config.SEO_PAGE_DESCRIPTION}
                    />

                    <meta name="og:type" content="website" />
                    <meta property="og:image" content={config.SEO_IMAGE_URL} />
                    <meta name="twitter:image" content={config.SEO_IMAGE_URL} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        name="twitter:site"
                        content={config.SEO_TWITTER_HANDLE}
                    />
                    <meta
                        name="twitter:creator"
                        content={config.SEO_TWITTER_HANDLE}
                    />
                </Helmet>
                <BannerCarousel />
                <Divider size={4} />

                <Container center>
                    <Divider size={2} />
                    <EventsGrid title={t('Upcoming_')} events={activeEvents} />

                    <EventsGrid title={t('Past_events_')} events={pastEvents} />
                    <Box textAlign="center">
                        <Button
                            variant="outlinedNew"
                            color="theme_lightgray"
                            onClick={() => dispatch(push('/events'))}
                        >
                            {t('Past_events_all_')}
                        </Button>
                    </Box>
                </Container>
                <Divider size={20} />
                <Container center small>
                    <Grid>
                        <Typography variant="h4" align="center" className={classes.sectionTitle}>
                            {t('Platform_organise_hack_', {
                                owner: config.PLATFORM_OWNER_NAME,
                            })}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                        <Button
                            color="theme_lightgray"
                            variant="outlinedNew"
                            strong
                            onClick={() => dispatch(push('/contact'))}
                        >
                            {t('Contact_us_')}
                        </Button>
                        <Button
                            color="theme_lightgray"
                            variant="outlinedNew"
                            strong
                            onClick={() => dispatch(push('/pricing'))}
                        >
                            {t('Pricing_')}
                        </Button>
                    </Grid>
                    <Divider size={4} />
                </Container>
                <Divider size={20} />
                <Container center small>
                    <Divider size={1} />
                    <Typography variant="h3" align="center" className={classes.sectionTitle}>
                        {t('New_to_', {
                            owner: config.PLATFORM_OWNER_NAME_CAPS,
                        })}
                    </Typography>
                    <Divider size={3} />

                    <Typography
                        variant="body1"
                        align="center"
                        className={classes.bodyText}
                        style={{ fontSize: '24px' }}
                    >
                        {t('Junction_info_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                    </Typography>
                    <Divider size={3} />
                    <Typography
                        variant="body1"
                        align="center"
                        className={classes.bodyText}
                        style={{ fontSize: '24px' }}
                    >
                        {t('More_info_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                        <ExternalLink href={config.PLATFORM_OWNER_WEBSITE}>
                            {t('More_info_link_')}
                        </ExternalLink>
                    </Typography>
                </Container>
                <Divider size={20} />
                <Container center>
                    <Typography variant="h4" align="center" className={classes.sectionTitle}>
                        {t('Join_hackerpack_')}
                    </Typography>
                    <Button
                        color="theme_lightgray"
                        variant="outlinedNew"
                        strong
                        onClick={() => dispatch(push('/hackerpack'))}
                    >
                        {t('To_hackerpack_')}
                    </Button>
                </Container>
                <Divider size={20} />
            </div>
        </PageWrapper>
    )
}

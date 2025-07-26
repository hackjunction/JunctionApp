import React from 'react'

import { Helmet } from 'react-helmet'

import { useActiveEvents, usePastEvents } from 'graphql/queries/events'

import config from 'constants/config'
import { useTranslation } from 'react-i18next'

import { Box, Grid, Typography } from '@mui/material'

import BannerCarousel from 'components/generic/BannerCarousel'
import Button from 'components/generic/Button'
import Container from 'components/generic/Container'
import Divider from 'components/generic/Divider'
import ExternalLink from 'components/generic/ExternalLink'
import Footer from 'components/layouts/Footer'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Image from 'components/generic/Image'
import PageWrapper from 'components/layouts/PageWrapper'

import EventsGrid from './EventsGrid'
import { useNavigate } from 'react-router-dom'
// import { styled } from '@mui/system'

// const useStyles = styled(theme => ({
//     root: {
//         background: theme.palette.theme_white.main, //`linear-gradient(to right bottom, ${theme.palette.secondary.contrastText}, ${theme.palette.success.contrastText}, ${theme.palette.primary.contrastText})`,

//         //'linear-gradient(to bottom right, blue, pink)',
//         //`linearGradient(${theme.palette.primary}, ${theme.palette.secondary})`,
//     },
// }))

export default () => {
    //TODO these shouldn't be queried. Events and organizations should be in the state
    const [activeEvents] = useActiveEvents({ limit: 3 })
    const [pastEvents] = usePastEvents({ limit: 3 })
    const navigate = useNavigate()
    const { t } = useTranslation()
    // const classes = useStyles()
    console.log('activeEvents', activeEvents)

    return (
        <PageWrapper header={() => <GlobalNavBar />} footer={() => <Footer />}>
            {/* <div className={classes.root}> */}
            <div>
                <Helmet>
                    <title>{config.PLATFORM_OWNER_NAME}</title>
                    <meta
                        name="keywords"
                        content="Hackathon, hackathon platform, Junction"
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
                            onClick={() => navigate('/events')} // TODO: Add past events page
                        >
                            {t('Past_events_all_')}
                        </Button>
                    </Box>
                </Container>
                <Divider size={20} />
                <Container center small>
                    {/* Logo Centered */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 2,
                        }}
                    >
                        <Image
                            defaultImage={require('assets/logos/emblem_black.png')}
                            transformation={{ width: 150 }}
                        />
                    </Box>

                    {/* Heading Centered */}
                    <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                        {t('Platform_organise_hack_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                    </Typography>

                    {/* Buttons Centered Horizontally with Spacing */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            mb: 4,
                        }}
                    >
                        <Button
                            color="theme_lightgray"
                            variant="outlinedNew"
                            strong
                            onClick={() => navigate('/contact')}
                        >
                            {t('Contact_us_')}
                        </Button>
                        <Button
                            color="theme_lightgray"
                            variant="outlinedNew"
                            strong
                            onClick={() => navigate('/pricing')}
                        >
                            {t('Pricing_')}
                        </Button>
                    </Box>

                    <Divider size={4} />
                </Container>

                <Divider size={20} />

                <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h3" gutterBottom>
                        {t('New_to_', {
                            owner: config.PLATFORM_OWNER_NAME_CAPS,
                        })}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ fontSize: '20px', mb: 3 }}
                    >
                        {t('Junction_info_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ fontSize: '20px', mb: 5 }}
                    >
                        {t('More_info_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}{' '}
                        <ExternalLink href={config.PLATFORM_OWNER_WEBSITE}>
                            {t('More_info_link_')}
                        </ExternalLink>
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 3 }}>
                        {t('Join_hackerpack_')}
                    </Typography>

                    <Button
                        color="theme_lightgray"
                        variant="outlinedNew"
                        strong
                        size="large"
                        onClick={() => navigate('/hackerpack')}
                    >
                        {t('To_hackerpack_')}
                    </Button>
                </Container>
            </div>
        </PageWrapper>
    )
}

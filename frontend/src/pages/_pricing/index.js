import React from 'react'

import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import Button from 'components/generic/Button'

import Container from 'components/generic/Container'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import PricingCard from 'components/generic/PricingCard'

import { Grid2 as Grid, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default () => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <>
                    <Container center sx={{ pt: 1 }}>
                        <Button
                            sx={{
                                borderRadius: '10px',
                            }}
                            onClick={() => navigate('/')}
                        >
                            <ArrowBackIosIcon style={{ color: 'black' }} />
                            <Typography
                                variant="button"
                                style={{ color: 'black' }}
                            >
                                {t('Back_')}
                            </Typography>
                        </Button>
                    </Container>
                    <Container center sx={{ pt: '0.5em', pb: '1.5em' }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            spacing={2}
                        >
                            <PricingCard
                                topic="What we offer"
                                price="Ask: hello@hackjunction.com"
                            />
                            <Typography variant="body1">
                                Our expertise of organising hackathons combined
                                with the power of a highly-customizable platform
                                for events makes hosting diverse events
                                possible.
                            </Typography>
                            <Button
                                variant="outlined"
                                color="theme_lightgray"
                                strong
                                onClick={() => navigate('/contact')}
                            >
                                {t('Contact_us_')}
                            </Button>
                        </Grid>
                    </Container>
                </>
            )}
        />
    )
}

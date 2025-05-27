import React from 'react'
import { useTranslation } from 'react-i18next'
import config from 'constants/config'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

import Footer from '../Footer'
import Button from 'components/generic/Button'

const EventFooter = props => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const EventFooterWrapper = styled(Box)(({ theme }) => ({
        background: theme.palette.theme_black.main,
        padding: theme.spacing(2),
    }))

    const InnerWrapper = styled(Box)(({ theme }) => ({
        width: '100%',
        maxWidth: '1120px',
        margin: '2.5em auto 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
        color: 'white',
    }))

    const ContactPrompt = styled(Box)(({ theme }) => ({
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
    }))

    const Buttons = styled(Box)(({ theme }) => ({
        display: 'flex',
        gap: '1.5em',
        margin: '1.5em 0',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start',
        },
    }))

    const Hackerpack = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        },
    }))

    return (
        <>
            <EventFooterWrapper>
                <InnerWrapper>
                    <ContactPrompt>
                        <Typography variant="h4">
                            {t('Platform_organise_hack_', {
                                owner: config.PLATFORM_OWNER_NAME,
                            })}
                        </Typography>
                        <Buttons>
                            <Button
                                color="theme_lightgrayDark"
                                variant="outlinedNew"
                                strong
                                onClick={() => navigate('/contact')}
                            >
                                {t('Contact_us_')}
                            </Button>
                            <Button
                                color="theme_lightgrayDark"
                                variant="outlinedNew"
                                strong
                                onClick={() => navigate('/pricing')}
                            >
                                {t('Pricing_')}
                            </Button>
                        </Buttons>
                    </ContactPrompt>
                    <Hackerpack>
                        <Typography variant="h4">
                            {t('Join_hackerpack_')}
                        </Typography>
                        <Button
                            color="theme_lightgrayDark"
                            variant="outlinedNew"
                            strong
                            sx={{ my: 3 }}
                            onClick={() => navigate('/hackerpack')}
                        >
                            {t('To_hackerpack_')}
                        </Button>
                    </Hackerpack>
                </InnerWrapper>
            </EventFooterWrapper>
            <Footer />
        </>
    )
}

export default EventFooter

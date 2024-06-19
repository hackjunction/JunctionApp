import React, { useState, useCallback } from 'react'

import { makeStyles } from '@mui/styles'
import { Typography, Button, Box } from '@mui/material'
import { motion } from 'framer-motion'

import NewsletterService from 'services/newsletter'
import config from 'constants/config'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
    },
    title: {
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: 'bold',
    },
    description: {
        color: 'white',
        maxWidth: '600px',
        textAlign: 'center',
    },
    cancelButton: {
        color: 'white',
    },
}))

const NewsLetterButton = ({
    email = 'juuso.lappalainen@hackjunction.com',
    country,
    onHidden,
}) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const [hidden, setHidden] = useState(false)
    const [loading, setLoading] = useState(false)

    const isHidden = hidden || !email

    const handleSubscribe = useCallback(() => {
        setLoading(true)
        NewsletterService.subscribe(email, country)
            .catch(err => {
                setLoading(false)
            })
            .finally(() => {
                setHidden(true)
            })
    }, [country, email])

    React.useEffect(() => {
        if (hidden) {
            onHidden()
        }
    }, [hidden])

    return (
        <motion.div
            variants={{
                hidden: {
                    height: 100,
                    opacity: 0,
                },
                visible: {
                    height: 'auto',
                    opacity: 1,
                },
            }}
            animate={isHidden ? 'hidden' : 'visible'}
            className={classes.wrapper}
        >
            <Typography className={classes.title} variant="button" paragraph>
                {t('While_here_')}
            </Typography>
            <Typography
                className={classes.description}
                variant="subtitle1"
                paragraph
            >
                {t('Join_newsletter_', { owner: config.PLATFORM_OWNER_NAME })}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubscribe}
                disabled={loading}
            >
                {t('Sign_me_up_')}
            </Button>
            <Box p={1} />
            <Button
                className={classes.cancelButton}
                onClick={() => setHidden(true)}
                disabled={loading}
            >
                {t('Not_now_')}
            </Button>
        </motion.div>
    )
}

export default NewsLetterButton

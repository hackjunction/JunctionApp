import React, { useState, useCallback, useEffect } from 'react'
import { Typography, Button, Box } from '@mui/material'
import { motion } from 'framer-motion'
import NewsletterService from 'services/newsletter'
import config from 'constants/config'
import { useTranslation } from 'react-i18next'

const NewsLetterButton = ({
    email = 'juuso.lappalainen@hackjunction.com',
    country,
    onHidden,
}) => {
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

    useEffect(() => {
        if (hidden) {
            onHidden()
        }
    }, [hidden, onHidden])

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
            className="flex flex-col items-center overflow-hidden"
        >
            <Typography
                className="text-white text-xl font-bold"
                variant="button"
                paragraph
            >
                {t('While_here_')}
            </Typography>
            <Typography
                className="text-white max-w-xl text-center"
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
                className="text-white"
                onClick={() => setHidden(true)}
                disabled={loading}
            >
                {t('Not_now_')}
            </Button>
        </motion.div>
    )
}

export default NewsLetterButton

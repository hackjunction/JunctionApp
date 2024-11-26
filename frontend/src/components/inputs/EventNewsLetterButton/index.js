import React, { useState, useCallback } from 'react'
import { Typography, Button, Box } from '@mui/material'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const EventNewsLetterButton = ({ signupUrl, initiallyHidden }) => {
    const { t } = useTranslation()
    const [hidden, setHidden] = useState(false)
    const [loading, setLoading] = useState(false)

    const isHidden = hidden || !signupUrl || initiallyHidden

    const handleClick = useCallback(() => {
        setLoading(true)
        window.open(signupUrl, '_blank')
        window.setTimeout(() => {
            setLoading(false)
            setHidden(true)
        }, 2000)
    }, [signupUrl])

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
                {t('Event_newsletter_')}
            </Typography>
            <Typography
                className="text-white max-w-xl text-center"
                variant="subtitle1"
                paragraph
            >
                {t('Join_event_newsletter_')}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
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

export default EventNewsLetterButton

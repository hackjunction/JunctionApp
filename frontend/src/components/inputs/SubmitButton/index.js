import React, { useState } from 'react'
import {
    Box,
    Checkbox,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import ExternalLink from 'components/generic/ExternalLink'
import config from 'constants/config'

const SubmitButton = ({ hasErrors, loading, onSubmit, event }) => {
    const [confirmed1, setConfirmed1] = useState(false)
    const [confirmed2, setConfirmed2] = useState(false)
    const [confirmed3, setConfirmed3] = useState(false)
    const { t } = useTranslation()
    const confirmed = confirmed1 && confirmed2 && confirmed3

    return (
        <Box className="flex flex-col items-center">
            <Box className="bg-white p-4 mb-1 w-full max-w-xl flex flex-row items-center">
                <Checkbox
                    color="primary"
                    checked={confirmed1}
                    onChange={e => setConfirmed1(e.target.checked)}
                />
                <Typography variant="subtitle1">
                    {t('Consent_privacy_')}
                    <ExternalLink href={config.PRIVACY_URL}>
                        {t('Privacy_policy_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}{' '}
                    </ExternalLink>
                    {event.eventPrivacy ? (
                        <>
                            {' and Privacy Policy of the '}
                            <ExternalLink href={event.eventPrivacy}>
                                event organiser
                            </ExternalLink>
                        </>
                    ) : null}
                </Typography>
            </Box>
            <Box className="bg-white p-4 mb-1 w-full max-w-xl flex flex-row items-center">
                <Checkbox
                    color="primary"
                    checked={confirmed2}
                    onChange={e => setConfirmed2(e.target.checked)}
                />
                <Typography variant="subtitle1">
                    {t('Read_agree_terms_')}
                    <ExternalLink href={config.TERMS_URL}>
                        {t('Terms_and_conditions_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                    </ExternalLink>
                    {event.eventTerms ? (
                        <>
                            {' and Terms and Conditions of the '}
                            <ExternalLink href={event.eventTerms}>
                                event organiser
                            </ExternalLink>
                        </>
                    ) : null}
                </Typography>
            </Box>
            <Box className="bg-white p-4 mb-1 w-full max-w-xl flex flex-row items-center">
                <Checkbox
                    color="primary"
                    checked={confirmed3}
                    onChange={e => setConfirmed3(e.target.checked)}
                />
                <Typography variant="subtitle1">
                    {t('Confirm_info_')}
                </Typography>
            </Box>
            <Box className="w-full max-w-xl mt-4 flex flex-row items-center justify-center">
                {loading ? (
                    <CircularProgress size={24} />
                ) : (
                    <Button
                        onClick={onSubmit}
                        fullWidth
                        color="primary"
                        variant="contained"
                        className="disabled:opacity-60 disabled:bg-primary"
                        disabled={hasErrors || !confirmed || loading}
                    >
                        {t('Submit_')}
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default SubmitButton

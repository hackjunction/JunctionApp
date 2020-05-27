import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Box,
    Checkbox,
    Typography,
    Button,
    CircularProgress,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ExternalLink from 'components/generic/ExternalLink'
import config from 'constants/config'

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: 'rgba(255,255,255,1)',
        padding: theme.spacing(2),
        marginBottom: '2px',
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        '&.Mui-disabled': {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.6,
        },
    },
}))

const SubmitButton = ({ hasErrors, loading, onSubmit }) => {
    const classes = useStyles()
    const [confirmed1, setConfirmed1] = useState(false)
    const [confirmed2, setConfirmed2] = useState(false)
    const [confirmed3, setConfirmed3] = useState(false)
    const { t, i18n } = useTranslation() // eslint-disable-line
    const confirmed = confirmed1 && confirmed2 && confirmed3

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box className={classes.wrapper}>
                <Checkbox
                    color="primary"
                    className={classes.checkbox}
                    checked={confirmed1}
                    onChange={e => setConfirmed1(e.target.checked)}
                />
                <Typography variant="subtitle1" className={classes.label}>
                    {t('Consent_privacy_')}
                    <ExternalLink href={config.PRIVACY_URL}>
                        {t('Privacy_policy_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                    </ExternalLink>
                </Typography>
            </Box>
            <Box className={classes.wrapper}>
                <Checkbox
                    color="primary"
                    className={classes.checkbox}
                    checked={confirmed2}
                    onChange={e => setConfirmed2(e.target.checked)}
                />
                <Typography variant="subtitle1" className={classes.label}>
                    {t('Read_agree_terms_')}
                    <ExternalLink href={config.TERMS_URL}>
                        {t('Terms_and_conditions_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                    </ExternalLink>
                </Typography>
            </Box>
            <Box className={classes.wrapper}>
                <Checkbox
                    color="primary"
                    className={classes.checkbox}
                    checked={confirmed3}
                    onChange={e => setConfirmed3(e.target.checked)}
                />
                <Typography variant="subtitle1" className={classes.label}>
                    {t('Confirm_info_')}
                </Typography>
            </Box>
            <Box
                width="100%"
                maxWidth={600}
                mt={2}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
            >
                {loading ? (
                    <CircularProgress size={24} />
                ) : (
                    <Button
                        onClick={onSubmit}
                        fullWidth
                        color="primary"
                        variant="contained"
                        className={classes.button}
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

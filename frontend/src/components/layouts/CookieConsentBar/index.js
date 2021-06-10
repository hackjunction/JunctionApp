import React from 'react'
import CookieConsent from 'react-cookie-consent'
import { makeStyles } from '@material-ui/core'
import config from 'constants/config'

const useStyles = makeStyles(theme => ({
    primary: {
        color: theme.palette.primary.main,
    },
}))

export default () => {
    const classes = useStyles()
    return (
        <CookieConsent
            buttonText="Accept"
            declineButtonText="Decline"
            enableDeclineButton
        >
            We use necessary cookies to make our site work. We'd also like to
            set analytics cookies that help us make improvements by measuring
            how you use the site. These will be set only if you accept. For more
            detailed information about the cookies we use, see our{' '}
            <a
                href={config.PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.primary}
            >
                Privacy Policy
            </a>
        </CookieConsent>
    )
}

import React from 'react'
import CookieConsent from 'react-cookie-consent'
import config from 'constants/config'

export default () => {
    return (
        <CookieConsent
            buttonText="Accept"
            declineButtonText="Decline"
            enableDeclineButton
            buttonClasses="bg-blue-500 text-white py-2 px-4 rounded"
            declineButtonClasses="bg-gray-500 text-white py-2 px-4 rounded"
            containerClasses="bg-gray-900 text-white p-4"
            contentClasses="text-center"
        >
            We use necessary cookies to make our site work. We'd also like to
            set analytics cookies that help us make improvements by measuring
            how you use the site. These will be set only if you accept. For more
            detailed information about the cookies we use, see our{' '}
            <a
                href={config.PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
            >
                Privacy Policy
            </a>
        </CookieConsent>
    )
}

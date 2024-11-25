import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'
import config from 'constants/config'
import posthog from 'posthog-js'

const AnalyticsService = {}

AnalyticsService.init = () => {
    if (config.POSTHOG_API_KEY) {
        posthog.init(config.POSTHOG_API_KEY, { api_host: config.POSTHOG_API_HOST })
    }
}

AnalyticsService.pageView = location => {
    if (config.POSTHOG_API_KEY) {
        posthog.capture('$pageview', { path: location.pathname })
    }
}

AnalyticsService.events = {
    LOG_IN: () => {
        posthog.capture('CompleteRegistration', {
            value: 0.1,
            currency: 'EUR',
        })
    },
    VIEW_EVENT: slug => {
        posthog.capture('ViewContent', {
            value: 0.1,
            currency: 'EUR',
            content_ids: slug,
            content_type: 'product',
        })
    },
    BEGIN_REGISTRATION: slug => {
        posthog.capture('AddToCart', {
            value: 0.5,
            currency: 'EUR',
            contents: [
                {
                    id: slug,
                    quantity: 1,
                },
            ],
            content_ids: slug,
        })
    },
    COMPLETE_REGISTRATION: slug => {
        posthog.capture('Purchase', {
            value: 1,
            currency: 'EUR',
            contents: [
                {
                    id: slug,
                    quantity: 1,
                },
            ],
            content_ids: slug,
        })
    },
}

export default AnalyticsService

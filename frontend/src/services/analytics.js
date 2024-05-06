import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'
import config from 'constants/config'

const AnalyticsService = {}

AnalyticsService.init = () => {
    if (config.GOOGLE_ANALYTICS_ID) {
        ReactGA.initialize(config.GOOGLE_ANALYTICS_ID)
    }

    if (config.FACEBOOK_PIXEL_ID) {
        ReactPixel.init(
            config.FACEBOOK_PIXEL_ID,
            {
                autoConfig: true,
                debug: false,
            },
            {},
        )
    }
}

AnalyticsService.pageView = location => {
    if (config.GOOGLE_ANALYTICS_ID) {
        ReactGA.pageview(location.pathname)
    }
}

AnalyticsService.events = {
    LOG_IN: () => {
        ReactPixel.track('CompleteRegistration', {
            value: 0.1,
            currency: 'EUR',
        })
    },
    VIEW_EVENT: slug => {
        ReactPixel.track('ViewContent', {
            value: 0.1,
            currency: 'EUR',
            content_ids: slug,
            content_type: 'product',
        })
    },
    BEGIN_REGISTRATION: slug => {
        ReactPixel.track('AddToCart', {
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
        ReactPixel.track('Purchase', {
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

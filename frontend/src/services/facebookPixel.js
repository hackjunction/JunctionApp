import ReactPixel from 'react-facebook-pixel'
import config from 'constants/config'

const advancedMatching = {}
const options = {
    autoConfig: true,
    debug: false,
}

ReactPixel.init(config.FACEBOOK_PIXEL_ID, advancedMatching, options)

const FacebookPixel = {
    pageView: () => {
        ReactPixel.pageView()
    },
    viewEvent: slug => {
        ReactPixel.track('ViewContent', {
            value: 0.1,
            currency: 'EUR',
            content_ids: slug,
            content_type: 'product',
        })
    },
    loggedIn: () => {
        ReactPixel.track('CompleteRegistration', {
            value: 0.1,
            currency: 'EUR',
        })
    },
    beginRegistration: slug => {
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
    completeRegistration: slug => {
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

export default FacebookPixel

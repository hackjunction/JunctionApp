import { forOwn } from 'lodash-es'

const settings = {
    AUTH0_CLIENT_ID: {
        required: true,
        value: process.env.REACT_APP_AUTH0_CLIENT_ID,
    },
    AUTH0_DOMAIN: {
        required: true,
        value: process.env.REACT_APP_AUTH0_DOMAIN,
    },
    BASE_URL: {
        required: true,
        value: process.env.REACT_APP_BASE_URL,
    },
    WEB_SOCKET_URL: {
        required: false,
        value: process.env.REACT_APP_WEB_SOCKET_URL,
    },
    CALENDAR_URL: {
        required: false,
        value:
            process.env.REACT_APP_CALENDAR_URL ||
            'https://thatcryptohackathon.com/calendar',
    },
    CLOUDINARY_CLOUD_NAME: {
        required: true,
        value: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    },
    FACEBOOK_PIXEL_ID: {
        required: false,
        value: process.env.REACT_APP_FACEBOOK_PIXEL_ID,
    },
    GOOGLE_ANALYTICS_ID: {
        required: false,
        value: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
    },
    ID_TOKEN_NAMESPACE: {
        required: true,
        value:
            process.env.REACT_APP_ID_TOKEN_NAMESPACE ||
            'https://thatcryptohackathon.com/',
    },
    IS_DEBUG: {
        default: false,
        required: true,
        value: process.env.REACT_APP_IS_DEBUG === 'true',
    },
    LOGO_DARK_URL: {
        required: false,
        value: process.env.REACT_APP_LOGO_DARK_URL,
    },
    LOGO_LIGHT_URL: {
        required: false,
        value: process.env.REACT_APP_LOGO_LIGHT_URL,
    },
    EMBLEM_DARK_URL: {
        required: false,
        value: process.env.REACT_APP_EMBLEM_DARK_URL,
    },
    LOGROCKET_ID: {
        required: false,
        value: process.env.REACT_APP_LOGROCKET_ID,
    },
    PLATFORM_OWNER_NAME: {
        required: true,
        value: process.env.REACT_APP_PLATFORM_OWNER_NAME || 'That Crypto Hackathon',
    },
    PLATFORM_OWNER_NAME_CAPS: {
        required: true,
        value: process.env.REACT_APP_PLATFORM_OWNER_NAME || 'THAT CRYPTO HACKATHON',
    },
    PLATFORM_OWNER_WEBSITE: {
        required: true,
        value:
            process.env.REACT_APP_PLATFORM_OWNER_WEBSITE ||
            'https://thatcryptohackathon.com',
    },
    PRIVACY_URL: {
        required: false,
        value:
            process.env.REACT_APP_PRIVACY_URL ||
            'https://www.thatcryptohackathon.com/privacy-policy',
    },
    SEO_IMAGE_URL: {
        required: false,
        value:
            process.env.REACT_APP_SEO_IMAGE_URL ||
            '',
    },
    SEO_PAGE_DESCRIPTION: {
        required: true,
        value:
            process.env.REACT_APP_SEO_PAGE_DESCRIPTION ||
            'That Crypto Hackathon is where builders, developers, and crypto enthusiasts come together to hack, create, and innovate with the latest web3 technology.',
    },
    SEO_PAGE_TITLE: {
        required: true,
        value:
            process.env.REACT_APP_SEO_PAGE_TITLE ||
            'That Crypto Hackathon',
    },
    SEO_TWITTER_HANDLE: {
        required: false,
        value: process.env.REACT_APP_SEO_TWITTER_HANDLE || '@thatcryptohack',
    },
    TERMS_URL: {
        required: false,
        value:
            process.env.REACT_APP_TERMS_URL ||
            'https://www.thatcryptohackathon.com/terms-conditions',
    },
    SEO_PAGE_LOGIN_DESCRIPTION: {
        required: true,
        value: 'Login to see something',
    },
    METABASE_SECRET_KEY: {
        required: false,
        value: process.env.REACT_APP_METABASE_SECRET_KEY,
    },
    METABASE_SITE_URL: {
        required: false,
        value: process.env.REACT_APP_METABASE_SITE_URL,
    },
}
const buildConfig = () => {
    const config = {}
    forOwn(settings, (obj, key) => {
        if (!obj.value) {
            if (typeof obj.default !== 'undefined') {
                config[key] = obj.default
            } else {
                if (obj.required) {
                    throw new Error(
                        `Invalid configuration: ${key} must be provided a value from .env, or a default value. See config.js`,
                    )
                }
            }
        } else {
            config[key] = obj.value
        }
    })

    return config
}

const config = buildConfig()

export default config

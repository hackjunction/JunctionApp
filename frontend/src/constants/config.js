import { forOwn } from 'lodash-es'

const settings = {
    CLOUDINARY_CLOUD_NAME: {
        value: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        required: true,
    },
    AUTH0_DOMAIN: {
        value: process.env.REACT_APP_AUTH0_DOMAIN,
        required: true,
    },
    AUTH0_CLIENT_ID: {
        value: process.env.REACT_APP_AUTH0_CLIENT_ID,
        required: true,
    },
    ID_TOKEN_NAMESPACE: {
        value: process.env.REACT_APP_ID_TOKEN_NAMESPACE,
        required: true,
    },
    BASE_URL: {
        value: process.env.REACT_APP_BASE_URL,
        required: true,
    },
    FACEBOOK_PIXEL_ID: {
        value: process.env.REACT_APP_FACEBOOK_PIXEL_ID,
        required: false,
    },
    GOOGLE_ANALYTICS_ID: {
        value: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
        required: false,
    },
    LOGROCKET_ID: {
        value: process.env.REACT_APP_LOGROCKET_ID,
        required: false,
    },
    IS_DEBUG: {
        value: process.env.IS_DEBUG,
        default: process.env.NODE_ENV === 'development',
        required: true,
    },
    PLATFORM_OWNER_NAME: {
        value: process.env.REACT_APP_PLATFORM_OWNER_NAME || 'Junction',
        required: true,
    },
    PLATFORM_OWNER_WEBSITE: {
        value:
            process.env.REACT_APP_PLATFORM_OWNER_WEBSITE ||
            'https://hackjunction.com',
        required: true,
    },
    SEO_PAGE_TITLE: {
        value: process.env.REACT_APP_SEO_PAGE_TITLE,
        required: true,
    },
    SEO_PAGE_DESCRIPTION: {
        value: process.env.REACT_APP_SEO_PAGE_DESCRIPTION,
        required: true,
    },
    SEO_IMAGE_URL: {
        value: process.env.REACT_APP_SEO_IMAGE_URL || '',
        required: false,
    },
    SEO_TWITTER_HANDLE: {
        value: process.env.REACT_APP_SEO_TWITTER_HANDLE || '',
        required: false,
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
                        `Invalid configuration: ${key} must be provided a value from .env, or a default value. See config.js`
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

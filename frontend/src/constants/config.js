import { forOwn, isEmpty } from 'lodash-es';

const settings = {
    CLOUDINARY_CLOUD_NAME: {
        value: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        required: true
    },
    AUTH0_DOMAIN: {
        value: process.env.REACT_APP_AUTH0_DOMAIN,
        required: true
    },
    AUTH0_CLIENT_ID: {
        value: process.env.REACT_APP_AUTH0_CLIENT_ID,
        required: true
    },
    BASE_URL: {
        value: process.env.REACT_APP_BASE_URL,
        required: true
    },
    FACEBOOK_PIXEL_ID: {
        value: process.env.REACT_APP_FACEBOOK_PIXEL_ID,
        required: false
    },
    GOOGLE_ANALYTICS_ID: {
        value: process.env.GOOGLE_ANALYTICS_ID,
        required: false
    },
    IS_DEBUG: {
        value: process.env.IS_DEBUG,
        default: process.env.NODE_ENV === 'development',
        required: true
    }
};

const buildConfig = () => {
    const config = {};
    forOwn(settings, (obj, key) => {
        if (!obj.value) {
            if (typeof obj.default !== 'undefined') {
                config[key] = obj.default;
            } else {
                if (obj.required) {
                    throw new Error(
                        `Invalid configuration: ${key} must be provided a value from .env, or a default value. See config.js`
                    );
                }
            }
        } else {
            config[key] = obj.value;
        }
    });

    return config;
};

const config = buildConfig();

export default config;

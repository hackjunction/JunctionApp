require('dotenv').config();
const _ = require('lodash');

const settings = {
    PORT: {
        value: process.env.PORT,
        required: true
    },
    AUTH0_DOMAIN: {
        value: process.env.AUTH0_DOMAIN,
        required: true
    },
    AUTH0_CLIENT_ID: {
        value: process.env.AUTH0_CLIENT_ID,
        required: true
    },
    AUTH0_CLIENT_SECRET: {
        value: process.env.AUTH0_CLIENT_SECRET,
        required: true
    },
    AUTH0_AUTHORIZATION_EXTENSION_URL: {
        value: process.env.AUTH0_AUTHORIZATION_EXTENSION_URL,
        required: true
    },
    ID_TOKEN_NAMESPACE: {
        value: process.env.ID_TOKEN_NAMESPACE,
        required: true
    },
    MONGODB_URI: {
        value: process.env.MONGODB_URI,
        required: true
    },
    CLOUDINARY_CLOUD_NAME: {
        value: process.env.CLOUDINARY_CLOUD_NAME,
        required: true
    },
    CLOUDINARY_API_KEY: {
        value: process.env.CLOUDINARY_API_KEY,
        required: true
    },
    CLOUDINARY_API_SECRET: {
        value: process.env.CLOUDINARY_API_SECRET,
        required: true
    },
    CLOUDINARY_FOLDER: {
        value: process.env.CLOUDINARY_FOLDER,
        required: true
    },
    SENDGRID_API_KEY: {
        value: process.env.SENDGRID_API_KEY,
        required: true
    },
    SENDGRID_FROM_EMAIL: {
        value: process.env.SENDGRID_FROM_EMAIL || 'noreply@hackjunction.com',
        required: true
    },
    SENDGRID_FROM_NAME: {
        value: process.env.SENDGRID_FROM_NAME || 'Junction',
        required: true
    },
    SENDGRID_ACCEPTED_TEMPLATE: {
        value: process.env.SENDGRID_ACCEPTED_TEMPLATE,
        required: true
    },
    SENDGRID_REJECTED_TEMPLATE: {
        value: process.env.SENDGRID_REJECTED_TEMPLATE,
        required: true
    },
    SENDGRID_GENERIC_TEMPLATE: {
        value: process.env.SENDGRID_GENERIC_TEMPLATE,
        required: true
    },
    FRONTEND_URL: {
        value: process.env.FRONTEND_URL,
        default: '',
        required: true
    },
    ENVIRONMENT_TAG: {
        value: process.env.ENVIRONMENT_TAG,
        default: 'none'
    },
    DEVTOOLS_ENABLED: {
        value: process.env.DEVTOOLS_ENABLED === 'true',
        default: false
    },
    DISCORD_BOT_TOKEN: {
        value: process.env.DISCORD_BOT_TOKEN,
        required: false,
        default: 'asdasd'
    }
};

const buildConfig = () => {
    const config = {};
    _.forOwn(settings, (obj, key) => {
        if (!obj.value) {
            if (obj.default || obj.default === false) {
                config[key] = obj.default;
            } else {
                throw new Error(
                    `Invalid configuration: ${key} must be provided a value from .env, or a default value. See config.js`
                );
            }
        } else {
            config[key] = obj.value;
        }
    });

    console.log('Running app with config', config);

    return config;
};

const config = buildConfig();

global.gConfig = config;

module.exports = config;

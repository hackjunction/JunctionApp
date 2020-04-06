require('dotenv').config()
const _ = require('lodash')
const logger = require('./logger')

const settings = {
    ADMIN_TOKEN: {
        required: true,
        value: process.env.ADMIN_TOKEN,
    },
    AUTH0_AUTHORIZATION_EXTENSION_URL: {
        required: true,
        value: process.env.AUTH0_AUTHORIZATION_EXTENSION_URL,
    },
    AUTH0_CLIENT_ID: {
        required: true,
        value: process.env.AUTH0_CLIENT_ID,
    },
    AUTH0_CLIENT_SECRET: {
        required: true,
        value: process.env.AUTH0_CLIENT_SECRET,
    },
    AUTH0_DOMAIN: {
        required: true,
        value: process.env.AUTH0_DOMAIN,
    },
    CALENDAR_URL: {
        required: false,
        value: process.env.CALENDAR_URL || 'https://hackjunction.com/calendar',
    },
    CLOUDINARY_API_KEY: {
        required: true,
        value: process.env.CLOUDINARY_API_KEY,
    },
    CLOUDINARY_API_SECRET: {
        required: true,
        value: process.env.CLOUDINARY_API_SECRET,
    },
    CLOUDINARY_CLOUD_NAME: {
        required: true,
        value: process.env.CLOUDINARY_CLOUD_NAME,
    },
    CLOUDINARY_FOLDER: {
        required: true,
        value: process.env.CLOUDINARY_FOLDER,
    },
    DEVTOOLS_ENABLED: {
        default: false,
        value: process.env.DEVTOOLS_ENABLED === 'true',
    },
    DISCORD_BOT_TOKEN: {
        default: 'asdasd',
        required: false,
        value: process.env.DISCORD_BOT_TOKEN,
    },
    ENVIRONMENT_TAG: {
        default: 'none',
        value: process.env.ENVIRONMENT_TAG,
    },
    FRONTEND_URL: {
        default: '',
        required: true,
        value: process.env.FRONTEND_URL,
    },
    HASH_SALT: {
        required: true,
        value: process.env.HASH_SALT,
    },
    ID_TOKEN_NAMESPACE: {
        required: true,
        value: process.env.ID_TOKEN_NAMESPACE,
    },
    MONGODB_URI: {
        required: true,
        value: process.env.MONGODB_URI,
    },
    PLATFORM_OWNER_NAME: {
        required: true,
        value: process.env.PLATFORM_OWNER_NAME || 'Junction',
    },
    PORT: {
        required: true,
        value: process.env.PORT,
    },
    SENDGRID_API_KEY: {
        required: true,
        value: process.env.SENDGRID_API_KEY,
    },
    SENDGRID_FROM_EMAIL: {
        required: true,
        value: process.env.SENDGRID_FROM_EMAIL || 'noreply@hackjunction.com',
    },
    SENDGRID_FROM_NAME: {
        required: true,
        value: process.env.SENDGRID_FROM_NAME || 'Junction',
    },
    SENDGRID_GENERIC_TEMPLATE: {
        required: true,
        value: process.env.SENDGRID_GENERIC_TEMPLATE,
    },
    SENDGRID_MAILING_LIST_ID: {
        required: false,
        value: process.env.SENDGRID_MAILING_LIST_ID || '7150117',
    },
    WEBHOOK_API_KEY: {
        required: false,
        value: process.env.WEBHOOK_API_KEY || 'NotVerySafeWebhookApiKey',
    },
}

const buildConfig = () => {
    const config = {}
    _.forOwn(settings, (obj, key) => {
        if (!obj.value) {
            if (obj.default || obj.default === false) {
                config[key] = obj.default
            } else {
                throw new Error(
                    `Invalid configuration: ${key} must be provided a value from .env, or a default value. See config.js`
                )
            }
        } else {
            config[key] = obj.value
        }
    })

    return config
}

const config = buildConfig()

logger.info({
    message: 'Running app with config',
    data: config,
})

global.gConfig = config

module.exports = config

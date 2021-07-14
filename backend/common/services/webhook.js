const axios = require('axios')
const mongoose = require('mongoose')
const logger = require('../../misc/logger')

const WebhookService = {
    triggerWebhooks: async (
        triggerResource,
        triggerAction,
        triggerData,
        eventId,
    ) => {
        try {
            const webhooks = await WebhookService._loadEventWebhooks(eventId)
                .then(hooks => hooks.filter(hook =>
                    hook.enabled &&
                    hook.action === triggerAction &&
                    hook.resource === triggerResource,
            ))

            if (!webhooks || !webhooks.length) {
                return
            }

            webhooks.forEach(async webhook => {
                try {
                    await axios.post(webhook.url, triggerData)
                    logger.info(`Triggered webhook: ${webhook.name}: ${triggerResource}-${triggerAction}-${eventId}`)
                } catch (e) {
                    logger.error(
                        `Error triggering webhook: ${webhook.name}: ${triggerResource}-${triggerAction}-${eventId}: `,
                        e.message,
                    )
                }
            })
        } catch (e) {
            console.error(e);
            logger.error(
                `Error triggering webhooks for ${triggerResource}-${triggerAction}-${eventId}: `,
                e.message,
            )
        }
    },

    _loadEventWebhooks: async eventId => {
        const event = await mongoose.model('Event').findById(eventId)
        return event.webhooks
    },
}
module.exports = WebhookService

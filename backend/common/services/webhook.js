const axios = require('axios')
const logger = require('../../misc/logger')

const WebhookService = {
    actionTypes: ['save', 'remove'],

    handleProjectWebhook: (project, action, event) => {
        if (!event.webhooks || !event.webhooks.length) return

        const webhooks = event.webhooks.filter(
            hook =>
                hook.enabled &&
                hook.action === action &&
                hook.resource === 'Project'
        )

        webhooks.forEach(async webhook => {
            try {
                await axios.post(webhook.url, project)
            } catch (e) {
                logger.error('Error triggering webhook: ', e.message)
            }
        })
    },
}
module.exports = WebhookService

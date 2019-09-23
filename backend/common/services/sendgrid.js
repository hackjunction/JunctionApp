const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');
const _ = require('lodash');
sgMail.setApiKey(global.gConfig.SENDGRID_API_KEY);
sgClient.setApiKey(global.gConfig.SENDGRID_API_KEY);

const sendgridAddRecipients = (email, country) => {
    const request = {
        body: [
            {
                email,
                country
            }
        ],
        method: 'POST',
        url: '/v3/contactdb/recipients'
    };

    return sgClient.request(request).then(([response, body]) => {
        return body.persisted_recipients;
    });
};

const sendgridAddRecipientsToList = (list_id, recipient_ids) => {
    const request = {
        data: recipient_ids,
        method: 'POST',
        url: `/v3/contactdb/lists/${list_id}/recipients/${recipient_ids}`
    };

    return sgClient.request(request).then(([response, body]) => {
        return body;
    });
};

const SendgridService = {
    sendAcceptanceEmail: (event, user) => {
        const msg = SendgridService.buildTemplateMessage(user.email, global.gConfig.SENDGRID_ACCEPTED_TEMPLATE, {
            event_name: event.name,
            first_name: user.firstName,
            dashboard_link: `${global.gConfig.FRONTEND_URL}/dashboard/${event.slug}`,
            website_link: 'https://2019.hackjunction.com',
            fb_event_link: 'https://facebook.com',
            contact_email: 'participants@hackjunction.com'
        });
        return SendgridService.send(msg);
    },
    sendGenericEmail: (to, params) => {
        const msg = SendgridService.buildTemplateMessage(to, global.gConfig.SENDGRID_GENERIC_TEMPLATE, {
            subject: params.subject,
            subtitle: params.subtitle,
            header_image: params.header_image,
            body: params.body,
            cta_text: params.cta_text,
            cta_link: params.cta_link
        });

        return SendgridService.send(msg);
    },

    buildRejectionEmail: (to, { event_name }) => {
        return SendgridService.buildTemplateMessage(to, global.gConfig.SENDGRID_REJECTED_TEMPLATE, {
            event_name
        });
    },
    buildTemplateMessage: (to, templateId, data) => {
        return {
            to,
            from: {
                name: global.gConfig.SENDGRID_FROM_NAME,
                email: global.gConfig.SENDGRID_FROM_EMAIL
            },
            templateId,
            dynamic_template_data: data
        };
    },
    send: msg => {
        const originalMsg = _.cloneDeep(msg);
        return sgMail.send(msg).catch(err => {
            console.log('ERROR SENDING EMAIL', err);
            return Promise.reject(originalMsg);
        });
    },
    subscribeToMailingList: async (email, country, mailingListId) => {
        if (!email) return;

        try {
            const addedRecipients = await sendgridAddRecipients(email, country);
            if (mailingListId) {
                await sendgridAddRecipientsToList(mailingListId, addedRecipients);
            }
        } catch (e) {
            console.log('ERROR SUBBING TO EMAIL LIST', e);
        }
        return;
    }
};

module.exports = SendgridService;

const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');
const _ = require('lodash');
const moment = require('moment');
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
            dashboard_link: `${global.gConfig.FRONTEND_URL}/dashboard/${event.slug}`
        });
        return SendgridService.send(msg);
    },
    sendRejectionEmail: (event, user) => {
        return Promise.resolve();
    },
    sendRegisteredEmail: (event, user) => {
        const msg = SendgridService.buildTemplateMessage(user.email, global.gConfig.SENDGRID_GENERIC_TEMPLATE, {
            header_image: event.coverImage.url,
            subject: `Thanks for registering to ${event.name}!`,
            subtitle: 'Awesome! Now just sit back and relax.',
            body: `The application period ends <b>${moment(event.registrationEndTime).format(
                'MMMM Do'
            )}</b>, and we'll process all applications by <b>${moment(event.registrationEndTime)
                .add(5, 'days')
                .format(
                    'MMMM Do'
                )}</b>. <br /> <br /> We'll send you an email once we've made the decision, but in the meantime you can click the link below to access your event dashboard, where you'll be able to see your registration status in real-time. If you're applying as a team, the event dashboard is where you can create and manage your team as well.`,
            cta_text: 'Event dashboard',
            cta_link: `${global.gConfig.FRONTEND_URL}/dashboard/${event.slug}`
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

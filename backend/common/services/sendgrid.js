const sgMail = require('@sendgrid/mail')
const sgClient = require('@sendgrid/client')
const { EventTypes } = require('@hackjunction/shared')
const _ = require('lodash')
const moment = require('moment-timezone')
const logger = require('../../misc/logger')

sgMail.setApiKey(global.gConfig.SENDGRID_API_KEY)
sgClient.setApiKey(global.gConfig.SENDGRID_API_KEY)

const sendgridAddRecipients = (email, country) => {
    const request = {
        body: [
            {
                email,
                country,
            },
        ],
        method: 'POST',
        url: '/v3/contactdb/recipients',
    }

    return sgClient.request(request).then(([response, body]) => {
        return body.persisted_recipients
    })
}

const sendgridAddRecipientsToList = (listId, recipientIds) => {
    const request = {
        data: recipientIds,
        method: 'POST',
        url: `/v3/contactdb/lists/${listId}/recipients/${recipientIds}`,
    }

    return sgClient.request(request).then(([response, body]) => {
        return body
    })
}

// A function that takes in the email body as a string and replaces the tags with corresponding dynamic information
const replaceBodyTags = (str, event, user) => {
    if (typeof str !== 'string' || !str.length) {
        throw new Error("Expected body ('str') to be a string")
    }

    if (!event || typeof event !== 'object') {
        throw new Error("Expected 'event' to be an object")
    }

    if (!user || typeof user !== 'object') {
        throw new Error("User object is missing or not an object")
    }

    const data = {
        "{USER_ID}": user.userId,
        "{FIRST_NAME}": user.firstName,
        "{LAST_NAME}": user.lastName,
        "{EVENT_NAME}": event.name,
        "{REGISTRATION_START_TIME}": moment(event.registrationStartTime).format('MMMM Do YYYY, h:mm:ss a'),
        "{REGISTRATION_END_TIME}": moment(event.registrationEndTime).format('MMMM Do YYYY, h:mm:ss a'),
        "{SUBMISSION_START_TIME}": moment(event.submissionStartTime).format('MMMM Do YYYY, h:mm:ss a'),
        "{SUBMISSION_END_TIME}": moment(event.submissionEndTime).format('MMMM Do YYYY, h:mm:ss a'),
        "{REVIEW_START_TIME}": moment(event.reviewStartTime).format('MMMM Do YYYY, h:mm:ss a'),
        "{REVIEW_END_TIME}": moment(event.reviewEndTime).format('MMMM Do YYYY, h:mm:ss a'),
        "{EVENT_START_TIME}": moment(event.startTime).format('MMMM Do YYYY, h:mm:ss a'),
        "{EVENT_END_TIME}": moment(event.endTime).format('MMMM Do YYYY, h:mm:ss a'),
        "{CURRENT_TIME}": moment().format('MMMM Do YYYY, h:mm:ss a'),
    }
    try {
        for (const key in data) {
            if (data[key] === null || data[key] === undefined) {
                console.error(`Data for key ${key} is missing or undefined`)
                continue    // We skip this replacement if the data is missing
            }
            str = str.replace(new RegExp(key, 'g'), data[key]) // Replace all instances of the tag with the corresponding data
        }
    } catch (err) {
        console.error("Error replacing body tags:", err)
        return str
    }

    return str
}

const SendgridService = {
    sendAcceptanceEmail: (event, user) => {


        var header_image_url = null
        if (typeof event.coverImage !== "undefined") {
            header_image_url = event.coverImage.url
        }
        const msg = SendgridService.buildTemplateMessage(
            user.email,
            global.gConfig.SENDGRID_GENERIC_TEMPLATE,
            {
                header_image: header_image_url,
                subject: event.emailConfig.acceptanceEmail.title || `Congratulations!`,
                subtitle: event.emailConfig.acceptanceEmail.subtitle || `You've been accepted to ${event.name}!`,
                body: replaceBodyTags(event.emailConfig.acceptanceEmail.body, event, user),
                cta_text: 'Event dashboard',
                cta_link: `${global.gConfig.FRONTEND_URL}/dashboard/${event.slug}`,
            },
        )
        return SendgridService.send(msg)
    },
    sendRejectionEmail: (event, user) => {
        var header_image_url = null
        if (typeof event.coverImage !== "undefined") {
            header_image_url = event.coverImage.url
        }
        const msg = SendgridService.buildTemplateMessage(
            user.email,
            global.gConfig.SENDGRID_GENERIC_TEMPLATE,
            {
                header_image_url: header_image_url,
                subject: event.emailConfig.rejectionEmail.title || `Oh-oh, bad news...`,
                subtitle: event.emailConfig.rejectionEmail.subtitle || `We couldn't give you a spot at ${event.name}.`,
                body: replaceBodyTags(event.emailConfig.rejectionEmail.body, event, user),
            },
        )
        return SendgridService.send(msg)
    },
    sendRegisteredEmail: (event, user) => {
        var header_image_url = null
        if (typeof event.coverImage !== "undefined") {
            header_image_url = event.coverImage.url
        }
        let msg
        if (event.eventType === EventTypes.physical.id) {
            msg = SendgridService.buildTemplateMessage(
                user.email,
                global.gConfig.SENDGRID_GENERIC_TEMPLATE,
                {
                    header_image: header_image_url,
                    subject: event.emailConfig.registrationEmail.title || `Thanks for registering to ${event.name}!`,
                    subtitle: event.emailConfig.registrationEmail.subtitle || 'Awesome! Now just sit back and relax.',
                    body: replaceBodyTags(event.emailConfig.registrationEmail.body, event, user),
                    cta_text: 'Event dashboard',
                    cta_link: `${global.gConfig.FRONTEND_URL}/dashboard/${event.slug}`,
                },
            )
        } else {
            msg = SendgridService.buildTemplateMessage(
                user.email,
                global.gConfig.SENDGRID_GENERIC_TEMPLATE,
                {
                    header_image: header_image_url,
                    subject: event.emailConfig.registrationEmail.title || `Thanks for registering to ${event.name}!`,
                    subtitle: event.emailConfig.registrationEmail.subtitle || `Thank you for registering to ${event.name}!`,
                    body: `You can modify your registration until the registration period ends <b>${moment(
                        event.registrationEndTime,
                    ).format(
                        'MMMM Do',
                    )}</b> <br /> <br /> Save the dates for the event: <b>${moment(
                        event.startTime,
                    ).format('MMMM Do')} - ${moment(event.endTime).format(
                        'MMMM Do',
                    )}</b>`,
                },
            )
        }
        return SendgridService.send(msg)
    },

    sendTravelGrantAcceptedEmail: (event, user, params) => {
        const msg = SendgridService.buildTemplateMessage(
            user.email,
            global.gConfig.SENDGRID_GENERIC_TEMPLATE,
            {
                header_image: event.coverImage.url,
                subject: `Your travel grant for ${event.name} has been confirmed`,
                subtitle: `You have been granted a travel grant of up to ${params.amount}€`,
                body: `This means that we will assist you with your travel costs to ${event.name}, up to the amount above. Please note that the following conditions apply:
                <ul>
                    <li>
                        The travel grant is valid for travel from ${params.countryOfTravel} to ${event.name}. If you are travelling from somewhere else, 
                        ${event.name} reserves the right to change your travel grant class and/or amount.
                    </li>
                    <li>
                        Travel grants are only available to participants who have checked in at the venue. 
                    </li>
                    <li>    
                        You will need to supply receipt(s) of your travel to ${event.name}, which clearly shows the total cost of your trip, per traveller. You may provide additional details in the travel receipt file.
                    </li>
                    <li>
                        You have to submit the travel receipt file and additional required information before 24th November 23:59 Finnish Time.
                    </li>
                </ul>

                You will be able to submit your receipts and other information required for receiving the travel grant via the registration platform once you have checked in to the event. See you soon!

                Psst, please note that the transaction will be made in Euros, so please make sure you have a bank account able to receive Euro payments available.
            `,
                cta_text: 'Event dashboard',
                cta_link: `${global.gConfig.FRONTEND_URL}/dashboard/${event.slug}`,
            },
        )

        return SendgridService.send(msg)
    },
    sendTravelGrantRejectedEmail: (event, user) => {
        const msg = SendgridService.buildTemplateMessage(
            user.email,
            global.gConfig.SENDGRID_GENERIC_TEMPLATE,
            {
                header_image: event.coverImage.url,
                subject: `Your travel grant status for ${event.name}`,
                subtitle: `Unfortunately we we're unable to give you a travel grant this time...`,
                body: `
                We would have loved to give everyone a travel grant, but unfortunately we have a limited budget and you 
                didn't quite make the cut this time.
                <br/>
                <br/>
                Don't worry, it's nothing personal – we want to give out travel 
                grants as evenly as possible to our participants, and thus we divided the travel grant applicants to 
                geographical areas by the country of travel – these are called travel grant classes. We then gave out 
                the travel grants for confirmed participants in order of registration time within that travel grant class. 
                This time there were more people applying for travel grants in your travel grant class than we had budget 
                for and the travel grants were given to those who applied to ${event.name} before you. 
                <br/>
                <br/>
                Hopefully you can still make it to ${event.name} despite this - it's going to be awesome!
                <br/>
                <br/>
                If you won't be able to travel to the event due to not receiving a travel grant, or won't be able to make 
                it for some other reason, please be so kind and cancel your registration via the Event Dashboard so we can 
                accept someone from the waitlist.
            `,
                cta_text: 'Event dashboard',
                cta_link: `${global.gConfig.FRONTEND_URL}/dashboard/${event.slug}`,
            },
        )

        return SendgridService.send(msg)
    },
    sendTravelGrantDetailsAcceptedEmail: (event, user, params) => {
        const msg = SendgridService.buildTemplateMessage(
            user.email,
            global.gConfig.SENDGRID_GENERIC_TEMPLATE,
            {
                header_image: event.coverImage.url,
                subject: `Your travel grant status for ${event.name} has been updated`,
                subtitle: 'Your travel grant receipts have been processed',
                body: `
                This email is to update you on the progress of your travel grant. We have reviewed the receipts you have 
                submitted via the travel grant form. Your travel grant receipts have been accepted, and you will receive
                a payment of ${params.amount}€.
                <br/>
                <br/>
                Now the processing moves on to the next step, confirming your payment information. There is no more action
                required from you, and we are currently on track to be able to initiate the transactions on 15 December. 
                Please reach out to finance@hackjunction.com (by replying to this email) with any further questions on the matter.
            `,
            },
        )

        return SendgridService.send(msg)
    },
    sendTravelGrantDetailsRejectedEmail: (event, user, params) => {
        const msg = SendgridService.buildTemplateMessage(
            user.email,
            global.gConfig.SENDGRID_GENERIC_TEMPLATE,
            {
                header_image: event.coverImage.url,
                subject: `Your travel grant status for ${event.name} has been updated`,
                subtitle:
                    'Action required regarding your travel grant receipts',
                body: `
                This email is to update you on the progress of your travel grant. We have reviewed the receipts and other
                information you have submitted via the travel grant form, but there was something wrong with the information
                provided and we weren't yet able to accept your travel grant. Please see below for more details on what 
                needs to be corrected:
                <br />
                <br />
                <div style="padding: 1rem; background: lightgray;">
                ${params.comment}
                </div>
                <br />
                <br />
                Please update your travel grant details as soon as possible on the Event Dashboard (link below), so that
                we can confirm your final travel grant amount. <strong>The deadline for this is this Friday, December 6th 11:55PM.</strong> 
                If you don't do this, we will not be able to pay your travel grant.
                <br />
                <br />
                Please refer to finance@hackjunction.com (by replying to this email) with any further questions on the matter.
            `,
                cta_link: `${global.gConfig.FRONTEND_URL}/dashboard/${event.slug}/travel-grant`,
                cta_text: 'Edit your details',
                reply_to: 'finance@hackjunction.com',
            },
        )

        return SendgridService.send(msg)
    },
    sendRecruiterMessageEmail: (recruiter, user, organization, message) => {
        const params = {
            header_image:
                'https://res.cloudinary.com/hackjunction/image/upload/c_scale,w_600/v1573050918/wordmark_black.png',
            subject: `${global.gConfig.PLATFORM_OWNER_NAME}: You have a message from a recruiter!`,
            subtitle: `${recruiter.firstName} ${recruiter.lastName} messaged you on ${global.gConfig.SENDGRID_FROM_NAME} Recruitment.`,
            body: `
                ${organization} has just sent you a message via the ${global.gConfig.SENDGRID_FROM_NAME} Recruitment platform:
                <br/>
                <br/>
                <div style="padding: 1rem; background: lightgray;">
                ${message}
                </div>
                <br/>
                <br/>
            `,
            reply_to: recruiter.email,
        }

        return SendgridService.sendGenericEmail(user.email, params)
    },
    sendGenericEmail: (to, params, from = {}, event, user) => {
        const msg = SendgridService.buildTemplateMessage(
            to,
            global.gConfig.SENDGRID_GENERIC_TEMPLATE,
            {
                subject: params.subject,
                subtitle: params.subtitle,
                header_image: params.header_image,
                body: replaceBodyTags(params.body, event, user),
                cta_text: params.cta_text,
                cta_link: params.cta_link,
                reply_to: params.reply_to,
            },
            from
        )
        console.log('sending', msg)
        return SendgridService.send(msg)
    },
    sendContactEmail: (to, params) => {
        const msg = SendgridService.buildTemplateMessage(
            to,
            global.gConfig.SENDGRID_CONTACT_TEMPLATE,
            {
                subject: params.subject,
                subtitle: params.subtitle,
                body: params.body,
                reply_to: params.reply_to,
            },
        )
        return SendgridService.send(msg)
    },
    buildTemplateMessage: (to, templateId, data, from = {}) => {
        return {
            to,
            from: {
                name: from.name || global.gConfig.SENDGRID_FROM_NAME,
                email: from.email || global.gConfig.SENDGRID_FROM_EMAIL,
            },
            body: data.body,
            replyTo: data.reply_to,
            templateId,
            dynamic_template_data: data,
        }
    },
    send: msg => {
        const originalMsg = _.cloneDeep(msg)
        return sgMail.send(msg).catch(err => {
            logger.error({
                message: 'Error sending email',
                data: originalMsg,
                error: {
                    message: err.message,
                    stack: err.stack,
                },
            })
            return Promise.reject(originalMsg)
        })
    },
    subscribeToMailingList: async (email, country, mailingListId) => {
        if (!email) return

        try {
            const addedRecipients = await sendgridAddRecipients(email, country)
            if (mailingListId) {
                await sendgridAddRecipientsToList(
                    mailingListId,
                    addedRecipients,
                )
            }
        } catch (e) {
            logger.error({
                message: 'Error subscribing to email list',
                data: {
                    email,
                    country,
                    mailingListId,
                },
                error: {
                    message: e.message,
                    stack: e.stack,
                },
            })
        }
    },
}

module.exports = SendgridService

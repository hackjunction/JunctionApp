module.exports = {
    $id: '/EmailParameters',
    title: 'Email Parameters',
    description: 'Parameters that can be supplied to a custom email',
    type: 'object',
    properties: {
        subject: {
            type: 'string',
            description: 'The subject line of the email',
            maxLength: 200,
        },
        header_image: {
            type: 'string',
            description: 'A URL to a header image for the email'
        },
        subtitle: {
            type: 'string',
            description: 'The main title of the email, above the body and below the header image',
            maxLength: 200,
        },
        body: {
            type: 'string',
            description: 'The body text of the email (accepts HTML)',
        },
        cta_text: {
            type: 'string',
            description: 'The text to show as a call-to-action at the bottom of the email',
            maxLength: 100,
        },
        cta_link: {
            type: 'string',
            format: 'uri',
            description: 'The URL of the call-to-action',
        },
        reply_to: {
            type: 'string',
            format: 'email',
            description: 'The reply-to address of the email'
        }
    },
    required: ['subject', 'body']
};


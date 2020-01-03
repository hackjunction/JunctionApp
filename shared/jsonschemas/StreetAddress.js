const Countries = require('../constants/countries')

module.exports = {
    $id: '/StreetAddress',
    title: 'Street Address',
    description:
        'A full street address, including a venue name where applicable',
    type: 'object',
    properties: {
        country: {
            description: 'Country',
            type: 'string',
            enum: Countries.asArrayOfName,
        },
        addressLine: {
            description: 'Address line 1',
            type: 'string',
        },
        addressLine2: {
            description: 'Address line 2',
            type: 'string',
        },
        city: {
            description: 'City',
            type: 'string',
        },
        postalCode: {
            description: 'Postal code',
            type: 'string',
        },
        venueName: {
            description: 'The name of the venue, if applicable',
            type: 'string',
        },
    },
    required: ['country', 'addressLine', 'city', 'postalCode'],
}

const StreetAddress = require('./StreetAddress')
const IbanAccount = require('./IbanAccount')
const CloudinaryImage = require('./CloudinaryImage')

module.exports = {
    $id: '/TravelGrantDetails',
    title: 'Travel Grant Details',
    description: `Travel grant details which a user has submitted for review`,
    type: 'object',
    properties: {
        legalName: {
            description: `The user's full legal name`,
            type: 'object',
            properties: {
                firstName: {
                    description: 'First name',
                    type: 'string',
                },
                middleName: {
                    description: 'Middle name(s)',
                    type: 'string',
                },
                lastName: {
                    description: 'Last name',
                    type: 'string',
                },
            },
            required: ['firstName', 'lastName'],
        },
        email: {
            description: `The user's email address`,
            type: 'string',
            format: 'email',
        },
        gender: {
            description: `The user's legal gender`,
            type: 'string',
        },
        dateOfBirth: {
            description: `The user's date of birth`,
            type: 'string',
            format: 'date',
        },
        address: {
            description: `The user's home address`,
            type: 'object',
            properties: {
                ...StreetAddress.properties,
            },
        },
        hasSSN: {
            description:
                'Whether the user has a valid Social Security Number or not',
            type: 'boolean',
        },
        SSN: {
            description: `The user's Social Security Number`,
            type: 'string',
        },
        hasIBAN: {
            description: `Whether the user has an IBAN bank account or not`,
            type: 'boolean',
        },
        IBAN: {
            description: `The user's IBAN bank account number`,
            type: 'object',
            properties: {
                ...IbanAccount.properties,
            },
        },
        receiptsPdf: {
            description: `A PDF upload containing the user's travel receipts`,
            type: 'object',
            properties: {
                ...CloudinaryImage.properties,
            },
        },
        receiptsSum: {
            description:
                'The total sum of the travel receipts, as submitted by the user',
            type: 'number',
        },
    },
    required: [
        'legalName',
        'email',
        'gender',
        'dateOfBirth',
        'address',
        'hasSSN',
        'hasIBAN',
        'receiptsPDF',
        'receiptsSum',
    ],
}

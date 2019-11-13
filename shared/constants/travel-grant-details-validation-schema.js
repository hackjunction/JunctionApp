const yup = require('yup');
const Countries = require('../constants/countries');

const schema = {
    gender: yup
        .string()
        .required()
        .label('Gender'),
    legalName: yup.object().shape({
        firstName: yup
            .string()
            .max(12)
            .required()
            .label('First name'),
        middleName: yup.string().max(12),
        lastName: yup
            .string()
            .max(12)
            .required()
            .label('Last name')
    }),
    dateOfBirth: yup
        .date()
        .min(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 120))
        .max(new Date(Date.now() - 1000 * 60 * 60 * 24 * 364 * 16))
        .required()
        .label('Date of birth'),
    socialSecurityNumber: yup.object().shape({
        issuingCountry: yup
            .string()
            .required()
            .label('Issuing country'),
        number: yup
            .string()
            .required()
            .label('Social security number')
    }),
    address: yup.object().shape({
        country: yup
            .string()
            .oneOf(Countries.asArrayOfName)
            .required()
            .label('Country'),
        addressLine: yup
            .string()
            .required()
            .label('Street adress'),
        addressLine2: yup.string(),
        city: yup
            .string()
            .required()
            .label('City'),
        postalCode: yup
            .string()
            .required()
            .label('Postal code')
    }),
    bankDetails: yup.object().shape({
        // required: true,
        accountNumber: yup
            .string()
            .required()
            .label('Account number'),
        swift: yup
            .string()
            .required()
            .label('Swift'),
        bankName: yup
            .string()
            .required()
            .label('Bank name'),
        email: yup
            .string()
            .email()
            .required()
            .label('Email')
    }),
    travelReceipt: yup.object().shape({
        url: yup
            .string()
            .url()
            .required()
            .label('Travel receipt URL'),
        publicId: yup
            .string()
            .required()
            .label('Public ID')
    }),
    sumOfReceipts: yup
        .number()
        .required()
        .label('Sum of receipts')
};
module.exports = schema;

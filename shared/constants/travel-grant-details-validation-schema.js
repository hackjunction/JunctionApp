const yup = require('yup')
const Countries = require('./countries')

const schema = {
    legalName: yup.object().shape({
        firstName: yup.string().required().max(100).label('First name'),
        middleName: yup.string().max(100).label('Middle name'),
        lastName: yup.string().required().max(100).label('Last name'),
    }),
    email: yup.string().email().required().label('Email'),
    dateOfBirth: yup.date().required(),
    gender: yup.string().oneOf(['Male', 'Female']).required().label('Gender'),
    address: yup.object().shape({
        country: yup
            .string()
            .oneOf(Countries.asArrayOfName)
            .required()
            .label('Country'),
        addressLine: yup.string().required().label('Street address'),
        addressLine2: yup.string(),
        city: yup.string().required().label('City'),
        postalCode: yup.string().required().label('Postal code'),
    }),
    hasSSN: yup.boolean().required().label('Has social security number'),
    SSN: yup.string().max(100).label('Social security number'),
    hasIBAN: yup.boolean().required().label('Has IBAN account'),
    IBAN: yup.object().shape({
        accountNumber: yup.string().max(100).label('Account Number'),
        swift: yup.string().max(100).label('SWIFT/BIC'),
        bankName: yup.string().max(100).label('Bank name'),
    }),
    receiptsPdf: yup.object().shape({
        url: yup.string().url().required().label('Travel receipts'),
        publicId: yup.string().max(200).label('PublicId'),
    }),
    receiptsSum: yup
        .number()
        .min(1)
        .max(10000)
        .required()
        .label('Sum of receipts'),
}

module.exports = schema

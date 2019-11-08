const yup = require("yup");
const Countries = require("../constants/countries");

const schema = {
  legalName: {
    firstName: yup.string().required(),
    middleName: yup.string(),
    lastName: yup.string().required()
  },
  dateOfBirth: yup
    .date()
    .min(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 120))
    .max(new Date(Date.now() - 1000 * 60 * 60 * 24 * 364 * 16))
    .required(),
  socialSecurityNumber: {
    issuingCountry: yup.string().required(),
    number: yup.string().required()
  },
  address: {
    country: yup
      .string()
      .oneOf(Countries.asArrayOfName)
      .required(),
    addressLine: yup.string().required(),
    addressLine2: yup.string(),
    city: yup.string().required(),
    postalCode: yup.string().required()
  },
  bankDetails: {
    required: true,
    accountNumber: yup.string(),
    swift: yup.string(),
    bankName: yup.string(),
    email: yup.string().email()
  },
  travelReceipt: {
    url: yup
      .string()
      .url()
      .required(),
    publicId: yup.string().required()
  },
  sumOfReceipts: yup.number().required()
};
export default schema;

import * as yup from 'yup'

const cloudinaryImage = yup.object().shape({
    url: yup.string().required(),
    publicId: yup.string().required(),
})

const address = yup.object().shape({
    country: yup.string().required(),
    addressLine: yup.string().required(),
    addressLine2: yup.string(),
    city: yup.string.required(),
    postalCode: yup
        .string()
        .matches(/^[0-9]+$/, 'Invalid zipcode')
        .min(5, 'Invalid zipcode')
        .max(5, 'Invalid zipcode')
        .required(),
    venueName: yup.string(),
})

const track = yup.object().shape({
    name: yup.string().required(),
    slug: yup.string().required(),
    winner: yup.string(),
})

const challenge = yup.object().shape({
    name: yup.string().required(),
    partner: yup.string(),
    slug: yup.string().required(),
})

const travelGrantConfig = yup.object().shape({
    enabled: yup.boolean().required(),
    budget: yup.number().integer().required(),
    currency: yup.string(),
})

const registrationQuestionSettings = yup.object().shape({
    options: yup.array().of(yup.string()),
    default: yup.boolean(),
})

const registrationQuestion = yup.object().shape({
    label: yup.string().required(),
    name: yup.string().required(),
    hint: yup.string(),
    placeholder: yup.string(),
    fieldType: yup.string().required(),
    fieldRequired: yup.boolean(),
    settings: registrationQuestionSettings,
})

const registrationSection = yup.object().shape({
    label: yup.string().required(),
    name: yup.string().required(),
    description: yup.string(),
    conditional: yup.string(),
    questions: yup.array.of(registrationQuestion),
})

export default yup.object().shape({
    name: yup.string().required('Event name is required'),
    slug: yup.string().required('Event must have a unique slug'),
    timezone: yup.string(),
    coverImage: cloudinaryImage,
    eventType: yup.string(),
    description: yup.string(),
    registrationStartTime: yup.date(),
    registrationEndTime: yup.date(),
    reviewingStartTime: yup.date(),
    reviewingEndTime: yup.date(),
    finalsActive: yup.boolean(),
    eventLocation: address,
    tracksEnabled: yup.boolean(),
    tracks: yup.array().of(track),
    challengesEnabled: yup.boolean(),
    challenges: yup.array().of(challenge),
    travelGrantConfig,
    reviewMethod: yup.string(),
    overallReviewMethod: yup.string(),
    customQuestions: yup.array().of(registrationSection),
    tags: yup.object().shape({
        label: yup.string(),
        color: yup.string(),
        description: yup.string(),
    }),
    published: yup.boolean().required(),
    galleryOpen: yup.boolean(),
    owner: yup.string(),
    organisers: yup.array().of(yup.string()),
    organizations: yup.array().of(yup.string().uuid()),
})

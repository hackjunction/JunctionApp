import * as yup from 'yup'

const cloudinaryImage = yup.object().shape({
    url: yup.string().required(),
    publicId: yup.string().required(),
})

const address = yup.object().shape({
    country: yup.string().required(),
    addressLine: yup.string().required(),
    addressLine2: yup.string(),
    city: yup.string().required(),
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
    questions: yup.array().of(registrationQuestion),
})

const registrationConfig = yup.object().shape({
    optionalFields: yup.array().of(yup.string()),
    requiredFields: yup.array().of(yup.string()),
})

const eventTimeline = yup.object().shape({
    items: yup.array().of(
        yup.object().shape({
            title: yup.string().required(),
            startTime: yup.date().required(),
        }),
    ),
})

const eventTheme = yup.object().shape({
    headerBackgroundColor: yup.string().required(),
    headerTextColor: yup.string().required(),
    bodyBackgroundColor: yup.string().required(),
    detailsBackgroundColor: yup.string().required(),
    detailsTextColor: yup.string().required(),
    sidebarBackgroundColor: yup.string().required(),
    sidebarTextColor: yup.string().required(),
    accentColor: yup.string().required(),
    linkColor: yup.string().required(),
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
    eventLocation: address.nullable(),
    tracksEnabled: yup.boolean(),
    tracks: yup.array().of(track),
    challengesEnabled: yup.boolean(),
    challenges: yup.array().of(challenge),
    travelGrantConfig,
    reviewMethod: yup.string(),
    overallReviewMethod: yup.string(),
    customQuestions: yup.array().of(registrationSection),
    tags: yup.array().of(
        yup.object().shape({
            label: yup.string(),
            color: yup.string(),
            description: yup.string(),
        }),
    ),
    published: yup.boolean().required(),
    galleryOpen: yup.boolean(),
    owner: yup.string(),
    organisers: yup.array().of(yup.string()),
    organizations: yup.array().of(yup.string()),
    registrationConfig,
    demoLabel: yup.string(),
    demoHint: yup.string(),
    eventPrivacy: yup.string(),
    eventTerms: yup.string(),
    eventTimeline,
    demoPlaceholder: yup.string(),
    metaDescription: yup.string(),
    finalists: yup.array().of(yup.string()),
    frontPagePriority: yup.number().integer(),
    approved: yup.boolean(),
    theme: eventTheme,
})

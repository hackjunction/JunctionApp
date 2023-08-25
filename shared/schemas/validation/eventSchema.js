import * as yup from 'yup'

const cloudinaryImage = yup
    .object()
    .shape({
        url: yup.string().required(),
        publicId: yup.string().required(),
    })
    .default(null)
    .nullable()

const address = yup
    .object()
    .shape({
        country: yup.string().required(),
        addressLine: yup.string().required(),
        addressLine2: yup.string().required(),
        city: yup.string().required(),
        postalCode: yup.string().required(),
        venueName: yup.string(),
    })
    .default(null)
    .nullable()

const track = yup.object().shape({
    name: yup.string().required(),
    slug: yup.string().required(),
    winner: yup.string(),
})

const challenge = yup.object().shape({
    name: yup.string().required(),
    partner: yup.string(),
    slug: yup.string(),
    title: yup.string(),
    subtitle: yup.string(),
    description: yup.string(),
    insights: yup.string(),
    resources: yup.string(),
    prizes: yup.string(),
    criteria: yup.string(),
    companyInfo: yup.string(),
    logo: cloudinaryImage,
})

const hackerpack = yup.object().shape({
    name: yup.string().required(),
    slug: yup.string(),
    partner: yup.string(),
    title: yup.string(),
    description: yup.string(),
    logo: cloudinaryImage,
    link: yup.string(),
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
            title: yup.string().min(2).required(),
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

const meetingRoom = yup.object().shape({
    name: yup.string().required(),
    capacity: yup.number().integer().required(),
    timeSlots: yup.array().of(
        yup.object().shape({
            start: yup.date().required(),
            end: yup.date().required(),
            reserved: yup.boolean().required(),
        }),
    ),
})

const emailTemplate = yup.object().shape({
    title: yup.string().max(100, 'Must be less than 100 characters'),
    subtitle: yup.string().max(100, 'Must be less than 100 characters'),
    body: yup.string().max(5000, 'Must be less than 5000 characters'),
})

const emailConfig = yup.object().shape({
    senderEmail: yup.string().email('Must be a valid email'),
    senderName: yup.string().max(100, 'Must be less than 100 characters'),
    acceptanceEmail: emailTemplate,
    rejectionEmail: emailTemplate,
    registrationEmail: emailTemplate,
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
    challenges: yup.array().of(challenge).min(0),
    hackerpacksEnabled: yup.boolean(),
    hackerpacks: yup.array().of(hackerpack).min(0),
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
    emailConfig,
    demoPlaceholder: yup.string(),
    metaDescription: yup.string(),
    finalists: yup.array().of(yup.string()),
    frontPagePriority: yup.number().integer(),
    approved: yup.boolean(),
    theme: eventTheme,
    meetingRooms: yup.array().of(meetingRoom),
    // DELETE AFTER: Testing area
    submissionFormQuestions: yup.array().of(registrationSection),
})

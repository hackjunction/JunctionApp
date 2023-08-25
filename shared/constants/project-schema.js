const yup = require('yup')
const EventTypes = require('./event-types')
const ProjectStatuses = require('./project-statuses')

/** The user editable fields and their validation rules for a Project */
// TODO: Add tracks and challenges
// TODO make fields optional based on event project fields
const ProjectSchema = {
    name: yup.string().required().max(100).label('Project name'),
    punchline: yup.string().required().max(300).label('Punchline'),
    description: yup.string().required().max(3000).label('Description'),
    source: yup.string().url().label('Source code'),
    sourcePublic: yup.boolean().default(true).label('Source code public'),
    technologies: yup.array().of(yup.string()).label('Technologies'),
    hiddenMembers: yup.array().of(yup.string()).label('Hidden members'),
    demo: yup.string().url().label('Demo link'),
    video: yup.string().url().label('Video link'),
    images: yup
        .array()
        .of(
            yup.object().shape({
                publicId: yup.string(),
                url: yup.string().url(),
            }),
        )
        .max(5)
        .ensure()
        .label('Images'),
    status: yup
        .string()
        .oneOf(ProjectStatuses)
        .default('draft')
        .label('Status'),
    // DELETE AFTER testing area
    submissionFormAnswers: yup.array().of(
        yup
            .object()
            .shape({
                section: yup.string(),
                key: yup.string(),
                value: yup.string(),
            })
            .label('Submission form answers'),
    ),
}

const buildProjectSchema = event => {
    const schema = { ...ProjectSchema }

    if (
        event.submissionFormQuestions &&
        event.submissionFormQuestions.length > 0
    ) {
        event.submissionFormQuestions.map(section => {
            section.questions.map(question => {
                if (question.fieldRequired && !section.conditional) {
                    schema[question.name] = yup
                        .string()
                        .required()
                        .label(question.label)
                } else {
                    schema[question.name] = yup.string().label(question.label)
                }
            })
        })
    }

    if (event.tracksEnabled) {
        schema.track = yup
            .string()
            .oneOf(event.tracks.map(track => track.slug))
            .required()
            .label('Track')
    }

    if (event.challengesEnabled) {
        schema.challenges = yup
            .array()
            .of(
                yup
                    .string()
                    .oneOf(event.challenges.map(challenge => challenge.slug)),
            )
            .max(5)
            .ensure()
            .label('Challenges')
    }

    if (event.hackerpacksEnabled) {
        schema.hackerpacks = yup.array().of(
            yup
                .string()
                .oneOf(event.hackerpacks.map(hackerpack => hackerpack.slug))
                .ensure()
                .label('Hackerpacks'),
        )
    }

    if (event.eventType === EventTypes.physical.id) {
        schema.location = yup
            .string()
            .max(100)
            .label('Table location')
    }

    return schema
}

module.exports = buildProjectSchema

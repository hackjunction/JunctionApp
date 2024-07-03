const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLInputObjectType,
} = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

const moment = require('moment-timezone')
const { EventHelpers } = require('@hackjunction/shared')
const { OrganizationType } = require('../organization/graphql')
const dateUtils = require('../../common/utils/dateUtils')

const {
    CloudinaryImage,
    CloudinaryImageInput,
    Address,
    AddressInput,
    Track,
    TrackInput,
    Challenge,
    ChallengeInput,
    Hackerpack,
    HackerpackInput,
    TravelGrantConfig,
    TravelGrantConfigInput,
    // MongoFile,
    // MongoFileInput,
    RegistrationSection,
    RegistrationSectionInput,
    EventTag,
    EventTagInput,
    EventRecruiters,
    EventRecruitersInput,
    RegistrationConfig,
    RegistrationConfigInput,
    EventTheme,
    EventThemeInput,
    EventTimeline,
    EventTimelineInput,
    Webhook,
    WebhookInput,
    MeetingRoom,
    MeetingRoomInput,
    EventPageScript,
    SubmissionDefaultFieldsInput,
    SubmissionDefaultFields,
    EventPageScriptInput,
    ScoreCriteriaSettings,
    ScoreCriteriaSettingsInput,
    Certificate,
    CertificateInput,
} = require('../graphql-shared-types')

const Organization = require('../organization/model')

// A function to generate the fields for the email template
function emailTemplateFields() {
    return {
        title: {
            type: GraphQLString,
        },
        subtitle: {
            type: GraphQLString,
        },
        body: {
            type: GraphQLString,
        },
    }
}

const EmailTemplateInput = new GraphQLInputObjectType({
    name: 'EmailTemplateInput',
    fields: emailTemplateFields,
})

const EmailTemplateType = new GraphQLObjectType({
    name: 'EmailTemplateType',
    fields: emailTemplateFields,
})

const EmailConfigInput = new GraphQLInputObjectType({
    name: 'EmailConfigInput',
    fields: {
        senderName: {
            type: GraphQLString,
        },
        senderEmail: {
            type: GraphQLString,
        },
        acceptanceEmail: {
            type: EmailTemplateInput,
        },
        rejectionEmail: {
            type: EmailTemplateInput,
        },
        registrationEmail: {
            type: EmailTemplateInput,
        },
    },
})

const EmailConfigType = new GraphQLObjectType({
    name: 'EmailConfigType',
    fields: {
        senderName: {
            type: GraphQLString,
        },
        senderEmail: {
            type: GraphQLString,
        },
        acceptanceEmail: {
            type: EmailTemplateType,
        },
        rejectionEmail: {
            type: EmailTemplateType,
        },
        registrationEmail: {
            type: EmailTemplateType,
        },
    },
})

const EventInput = new GraphQLInputObjectType({
    name: 'EventInput',
    fields: {
        name: {
            type: GraphQLString,
        },
        slug: {
            type: GraphQLString,
        },
        timezone: {
            type: GraphQLString,
        },
        coverImage: {
            type: CloudinaryImageInput,
        },
        logo: {
            type: CloudinaryImageInput,
        },
        eventType: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        /** Times */
        registrationStartTime: {
            type: GraphQLDateTime,
        },
        registrationEndTime: {
            type: GraphQLDateTime,
        },
        startTime: {
            type: GraphQLDateTime,
        },
        endTime: {
            type: GraphQLDateTime,
        },
        submissionsStartTime: {
            type: GraphQLDateTime,
        },
        submissionsEndTime: {
            type: GraphQLDateTime,
        },
        reviewingStartTime: {
            type: GraphQLDateTime,
        },
        reviewingEndTime: {
            type: GraphQLDateTime,
        },
        finalsActive: {
            type: GraphQLBoolean,
        },
        eventLocation: {
            type: AddressInput,
        },
        tracksEnabled: {
            type: GraphQLBoolean,
        },
        tracks: {
            type: new GraphQLList(TrackInput),
        },
        challengesEnabled: {
            type: GraphQLBoolean,
        },
        challenges: {
            type: new GraphQLList(ChallengeInput),
        },
        hackerpacksEnabled: {
            type: GraphQLBoolean,
        },
        hackerpacks: {
            type: new GraphQLList(HackerpackInput),
        },
        travelGrantConfig: {
            type: TravelGrantConfigInput,
        },
        reviewMethod: {
            type: GraphQLString,
        },
        overallReviewMethod: {
            type: GraphQLString,
        },
        customQuestions: {
            type: new GraphQLList(RegistrationSectionInput),
        },
        tags: {
            type: new GraphQLList(EventTagInput),
        },
        /** System metadata */
        published: {
            type: GraphQLBoolean,
        },
        galleryOpen: {
            type: GraphQLBoolean,
        },
        allowProjectSubmissionsPerChallenge: {
            type: GraphQLBoolean,
        },
        allowVoteOnOwnProject: {
            type: GraphQLBoolean,
        },
        owner: {
            type: GraphQLString,
        },
        organisers: {
            type: new GraphQLList(GraphQLString),
        },
        recruiters: {
            type: new GraphQLList(EventRecruitersInput),
        },
        organizations: {
            type: new GraphQLList(GraphQLID),
        },
        registrationConfig: {
            type: RegistrationConfigInput,
        },
        demoLabel: {
            type: GraphQLString,
        },
        demoHint: {
            type: GraphQLString,
        },
        challenge_instructions: {
            type: GraphQLString,
        },
        faq: {
            type: GraphQLString,
        },
        demoInstructions: {
            type: GraphQLString,
        },
        eventPrivacy: {
            type: GraphQLString,
        },
        eventTerms: {
            type: GraphQLString,
        },
        eventNewsletter: {
            type: GraphQLString,
        },
        eventTimeline: {
            type: EventTimelineInput,
        },
        emailConfig: {
            type: EmailConfigInput,
        },
        demoPlaceholder: {
            type: GraphQLString,
        },
        metaDescription: {
            type: GraphQLString,
        },
        finalists: {
            type: new GraphQLList(GraphQLString),
        },
        frontPagePriority: {
            type: GraphQLInt,
        },
        approved: {
            type: GraphQLBoolean,
        },
        theme: {
            type: EventThemeInput,
        },
        webhooks: {
            type: new GraphQLList(WebhookInput),
        },
        pageScripts: {
            type: new GraphQLList(EventPageScriptInput),
        },
        meetingsEnabled: {
            type: GraphQLBoolean,
        },
        meetingRooms: {
            type: new GraphQLList(MeetingRoomInput),
        },
        // map: {
        //     type: MongoFileInput,
        // },
        /** DELETE LATER: test area */
        submissionFormQuestions: {
            type: new GraphQLList(RegistrationSectionInput),
        },
        submissionFormEnabledFields: {
            type: new GraphQLList(GraphQLString),
        },
        submissionFormDefaultFields: {
            type: SubmissionDefaultFieldsInput,
        },
        scoreCriteriaSettings: {
            type: ScoreCriteriaSettingsInput,
        },
        experimental: {
            type: GraphQLBoolean,
        },
        certificate: {
            type: CertificateInput,
        },
    },
})

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => {
        return {
            /** Fields from DB Model */
            _id: {
                type: GraphQLID,
            },
            name: {
                type: GraphQLString,
            },
            slug: {
                type: GraphQLString,
            },
            timezone: {
                type: GraphQLString,
            },
            coverImage: {
                type: CloudinaryImage,
            },
            logo: {
                type: CloudinaryImage,
            },
            eventType: {
                type: GraphQLString,
            },
            description: {
                type: GraphQLString,
            },
            /** Times */
            registrationStartTime: {
                type: GraphQLDateTime,
            },
            registrationEndTime: {
                type: GraphQLDateTime,
            },
            startTime: {
                type: GraphQLDateTime,
            },
            endTime: {
                type: GraphQLDateTime,
            },
            submissionsStartTime: {
                type: GraphQLDateTime,
            },
            submissionsEndTime: {
                type: GraphQLDateTime,
            },
            reviewingStartTime: {
                type: GraphQLDateTime,
            },
            reviewingEndTime: {
                type: GraphQLDateTime,
            },
            finalsActive: {
                type: GraphQLBoolean,
            },
            eventLocation: {
                type: Address,
            },
            tracksEnabled: {
                type: GraphQLBoolean,
            },
            tracks: {
                type: new GraphQLList(Track),
            },
            challengesEnabled: {
                type: GraphQLBoolean,
            },
            challenges: {
                type: new GraphQLList(Challenge),
            },
            hackerpacksEnabled: {
                type: GraphQLBoolean,
            },
            hackerpacks: {
                type: new GraphQLList(Hackerpack),
            },
            travelGrantConfig: {
                type: TravelGrantConfig,
            },
            reviewMethod: {
                type: GraphQLString,
            },
            overallReviewMethod: {
                type: GraphQLString,
            },
            customQuestions: {
                type: new GraphQLList(RegistrationSection),
            },
            tags: {
                type: new GraphQLList(EventTag),
            },
            /** System metadata */
            published: {
                type: GraphQLBoolean,
            },
            galleryOpen: {
                type: GraphQLBoolean,
            },
            owner: {
                type: new GraphQLNonNull(GraphQLString),
            },
            organisers: {
                type: new GraphQLList(GraphQLString),
            },
            recruiters: {
                type: new GraphQLList(EventRecruiters),
            },
            organizations: {
                type: new GraphQLList(OrganizationType),
            },
            registrationConfig: {
                type: RegistrationConfig,
            },
            demoLabel: {
                type: GraphQLString,
            },
            demoHint: {
                type: GraphQLString,
            },
            challenge_instructions: {
                type: GraphQLString,
            },
            faq: {
                type: GraphQLString,
            },
            demoInstructions: {
                type: GraphQLString,
            },
            eventPrivacy: {
                type: GraphQLString,
            },
            eventTerms: {
                type: GraphQLString,
            },
            eventNewsletter: {
                type: GraphQLString,
            },
            eventTimeline: {
                type: EventTimeline,
            },
            emailConfig: {
                type: EmailConfigType,
            },
            demoPlaceholder: {
                type: GraphQLString,
            },
            metaDescription: {
                type: GraphQLString,
            },
            finalists: {
                type: new GraphQLList(GraphQLString),
            },
            frontPagePriority: {
                type: GraphQLInt,
            },
            approved: {
                type: GraphQLBoolean,
            },
            theme: {
                type: EventTheme,
            },
            webhooks: {
                type: new GraphQLList(Webhook),
            },
            pageScripts: {
                type: new GraphQLList(EventPageScript),
            },
            meetingsEnabled: {
                type: GraphQLBoolean,
            },
            meetingRooms: {
                type: new GraphQLList(MeetingRoom),
            },
            // map: {
            //     type: MongoFile,
            // },
            // Implement userprofile in graphql
            // TODO: Figure this stuff out
            // winners: {
            //     type: mongoose.Mixed,
            //     default: {},
            // },

            /** Custom fields */
            _eventLocationFormatted: {
                type: GraphQLString,
            },
            _eventTimeFormatted: {
                type: GraphQLString,
            },
            _eventStatus: {
                type: GraphQLString,
            },
            /**
            registrations: {
                type: require('../registration/graphql').Types.RegistrationType,
            },
            // TODO figure out why this breaks resolvers for Registartion
            // TODO tests
            _myRegistration: {
                type: require('../registration/graphql').Types.RegistrationType,
            },
            */
            /** DELETE LATER: test area */
            submissionFormQuestions: {
                type: new GraphQLList(RegistrationSection),
            },
            submissionFormEnabledFields: {
                type: new GraphQLList(GraphQLString),
            },
            submissionFormDefaultFields: {
                type: SubmissionDefaultFields,
            },
            scoreCriteriaSettings: {
                type: ScoreCriteriaSettings,
            },
            experimental: {
                type: GraphQLBoolean,
            },
            Certificate: {
                type: Certificate,
            },
        }
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        eventById: {
            type: EventType,
            args: {
                _id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
        },
        eventBySlug: {
            type: EventType,
            args: {
                slug: {
                    type: new GraphQLNonNull(GraphQLString),
                },
            },
        },
        events: {
            type: new GraphQLList(EventType),
        },
        myEvents: {
            type: new GraphQLList(EventType),
        },
        highlightedEvents: {
            type: new GraphQLList(EventType),
            args: {
                limit: {
                    type: GraphQLInt,
                },
            },
        },
        activeEvents: {
            type: new GraphQLList(EventType),
            args: {
                limit: {
                    type: GraphQLInt,
                },
            },
        },
        pastEvents: {
            type: new GraphQLList(EventType),
            args: {
                limit: {
                    type: GraphQLInt,
                },
            },
        },
        roomsByEvent: {
            type: new GraphQLList(MeetingRoom),
            args: {
                eventId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
        },
        eventScoreCriteriaSettings: {
            type: ScoreCriteriaSettings,
            args: {
                eventId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
        },
        allowExperimental: {
            type: GraphQLBoolean,
            args: {
                eventId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
        },
    },
})

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        updateEvent: {
            type: EventType,
            args: {
                _id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
                event: {
                    type: new GraphQLNonNull(EventInput),
                },
            },
        },
        setTimeslotReserved: {
            type: GraphQLBoolean,
            args: {
                timeSlotId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
                reserved: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                },
            },
        },
    },
})

const Resolvers = {
    Query: {
        myEvents: async (parent, args, context) => {
            // TODO possible vulnerability to be able a provide roles with SuperAdmin?
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null
            if (context.req.user.roles.includes('SuperAdmin')) {
                return context.controller('Event').getAll()
            }
            return context.controller('Event').getByOrganiser(userId)
        },
        eventById: async (parent, args, context) => {
            return context.controller('Event').getById(args._id)
        },
        eventBySlug: async (parent, args, context) => {
            return context.controller('Event').getBySlug(args.slug)
        },
        events: (parent, args, context) => {
            return context.controller('Event').getAll()
        },
        highlightedEvents: async (parent, args, context) => {
            let events = await context.controller('Event').getHighlighted()

            if (args.limit) {
                events = events.slice(0, args.limit)
            }

            return events
        },
        activeEvents: async (parent, args, context) => {
            let events = await context.controller('Event').getActive()
            if (args.limit) {
                events = events.slice(0, args.limit)
            }
            return events
        },
        pastEvents: async (parents, args, context) => {
            let events = await context.controller('Event').getPast()
            if (args.limit) {
                events = events.slice(0, args.limit)
            }
            return events
        },
        roomsByEvent: async (parent, args, context) => {
            return context.controller('Event').getRoomsByEvent(args.eventId)
        },
    },
    Mutation: {
        updateEvent: async (parent, args, context) => {
            return context.controller('Event').update(args._id, args.event)
        },
        setTimeslotReserved: async (parent, args, context) => {
            return context
                .controller('Event')
                .setTimeslotReserved(args.timeSlotId, args.reserved)
        },
    },
    Event: {
        organizations: parent => {
            return parent.organizations.map(orgId =>
                Organization.findById(orgId),
            )
        },
        _eventLocationFormatted: parent => {
            if (
                parent.eventType === 'physical' ||
                parent.eventType === 'hybrid'
            ) {
                return `${parent.eventLocation.city}, ${parent.eventLocation.country}`
            }
            return 'Online'
        },
        _eventTimeFormatted: parent => {
            return dateUtils.formatDateInterval(
                parent.startTime,
                parent.endTime,
            )
        },
        _eventStatus: parent => {
            return EventHelpers.getEventStatus(parent, moment)
        },
        /**
        // TODO figure out why this breaks
        _myRegistration: (parent, args, context) => {
            return context
                .controller('Registration')
                .getByIdAndUser(parent._id, context.userId)
        },
 
         */
    },
}

module.exports = {
    QueryType,
    MutationType,
    Resolvers,
    Types: {
        EventType,
    },
}

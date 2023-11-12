const mongoose = require('mongoose')
const _ = require('lodash')
const moment = require('moment-timezone')
const { EventHelpers } = require('@hackjunction/shared')
const Settings = require('./settings')
const Maths = require('./maths')

const Event = require('../../event/model')
const Team = require('../../team/model')

const { ForbiddenError } = require('../../../common/errors/errors')

const GavelAnnotatorSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    track: {
        type: String,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    onboarded: {
        type: Boolean,
        required: true,
        default: true,
    },
    viewedAll: {
        type: Boolean,
        default: false,
    },
    next: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GavelProject',
    },
    prev: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GavelProject',
    },
    ignore: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GavelProject',
        },
    ],
    skipped: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GavelProject',
        },
    ],
    alpha: {
        type: Number,
        default: Settings.ALPHA_PRIOR,
        required: true,
    },
    beta: {
        type: Number,
        default: Settings.BETA_PRIOR,
        required: true,
    },
})

GavelAnnotatorSchema.virtual('userDetails', {
    ref: 'UserProfile',
    localField: 'user',
    foreignField: 'userId',
})

/** Note .methods. functions can't be arrow functions */
/** Check if the annotator can vote */
GavelAnnotatorSchema.methods.canVote = async function () {
    if (!this.next) {
        return Promise.reject(
            new ForbiddenError(
                'Cannot submit votes without a project assigned',
            ),
        )
    }

    if (!this.active) {
        return Promise.reject(
            new ForbiddenError('Cannot submit votes while disabled'),
        )
    }

    if (!this.onboarded) {
        return Promise.reject(
            new ForbiddenError('Cannot submit votes before being onboarded'),
        )
    }

    const event = await Event.findById(this.event)
    if (!event) {
        return Promise.reject(
            new ForbiddenError('Annotator belongs to no event'),
        )
    }

    if (!EventHelpers.isVotingOpen(event, moment)) {
        return Promise.reject(
            new ForbiddenError('Cannot submit votes while voting is not open'),
        )
    }

    const now = moment()
    const nextVoteEarliest = moment(this.updatedAt)
    const diffSeconds = now.diff(nextVoteEarliest) / 1000

    if (diffSeconds < Settings.ANNOTATOR_WAIT_SECONDS) {
        return Promise.reject(
            new ForbiddenError(
                `Must wait ${
                    Settings.ANNOTATOR_WAIT_SECONDS - diffSeconds
                } more seconds before voting again`,
            ),
        )
    }

    return Promise.resolve()
}

/** Get the preferred candidates for a next project for the annotator */
GavelAnnotatorSchema.methods.getPreferredProjects = async function () {
    const event = await Event.findById(this.event)

    const projectsConditions = {
        active: true,
        event: this.event,
        _id: {
            $nin: _.concat(this.ignore, this.next || []),
        },
        team: {
            $ne: this.team,
        },
    }
    if (this.track) {
        projectsConditions.track = this.track
    }
    const availableProjectsQuery = mongoose
        .model('GavelProject')
        .find(projectsConditions)
        .lean()

    const activeAnnotatorsQuery = mongoose
        .model('GavelAnnotator')
        .find({
            active: true,
            event: this.event,
            next: {
                $exists: true,
            },
            updatedAt: {
                $exists: true,
            },
        })
        .lean()

    const [allProjects, activeAnnotators] = await Promise.all([
        availableProjectsQuery,
        activeAnnotatorsQuery,
    ])

    // Helper function
    const asyncFilter = async (arr, predicate) => {
        const results = await Promise.all(arr.map(predicate))
        return arr.filter((_v, index) => results[index])
    }
    // TODO figure out how to do this with a query
    const availableProjects = await asyncFilter(
        allProjects,
        async gavelProject => {
            if (!event.allowVoteOnOwnProject) {
                const project = await mongoose
                    .model('Project')
                    .findById(gavelProject.project)
                if (project) {
                    const team = await Team.findById(project.team)
                    if (team) {
                        console.log(this.user, team.owner, !team.members)
                        console.log(
                            this.user !== team.owner &&
                                !team.members.includes(this.user),
                        )
                        return (
                            this.user !== team.owner &&
                            !team.members.includes(this.user)
                        )
                    }
                    console.log('no team for', project)
                    return false
                }
                // TOOD these should be removed
                console.log('orpahn gavelproject', gavelProject)
                return false
            }
            return true
        },
    )
    /** If an annotator has been assigned to a project before this time, consider the project free for review */
    const cutoff = moment().subtract(Settings.ANNOTATOR_TIMEOUT_MINS, 'minutes')

    // /** Get all projects that are not currently being reviewed by someone, by the above definition */
    // TODO busy projects aonly apply to physical events, skip this on events that don't have active project presentation
    const nonBusyProjects = availableProjects.filter(project => {
        const assignedAnnotator = _.find(activeAnnotators, annotator => {
            return annotator.next === project._id
        })

        return (
            !assignedAnnotator ||
            moment(assignedAnnotator.updatedAt).isBefore(cutoff)
        )
    })

    /** Prioritize the projects which are not busy, if there are any */
    const preferredProjects =
        nonBusyProjects.length > 0 ? nonBusyProjects : availableProjects

    /** Prioritize the projects which have not received enough views yet */
    const lessSeenProjects = preferredProjects.filter(project => {
        return project.viewedBy.length < Settings.ITEM_MIN_VIEWS
    })

    return lessSeenProjects.length > 0 ? lessSeenProjects : preferredProjects
}

GavelAnnotatorSchema.methods.getNextProject = async function () {
    // Remove projects that are by the person reviewing
    const preferredProjects = await this.getPreferredProjects()
    console.log('preferredProjects', preferredProjects)
    console.log(preferredProjects.length)

    /** If there are no projects available, return null */
    if (preferredProjects.length === 0) {
        return null
    }

    /** If this is the annotators first project, assign a random project. Also sometimes do this at random. */
    if (!this.next || Math.random() < Settings.EPSILON) {
        return _.shuffle(preferredProjects)[0]
    }

    /** Default to assigning them a project with the highest expected information gain */
    const current = await mongoose.model('GavelProject').findById(this.next)
    if (!current) {
        return _.shuffle(preferredProjects)[0]
    }

    return _.maxBy(preferredProjects, prospect => {
        return Maths.expectedInformationGain(
            this.alpha,
            this.beta,
            current.mu,
            current.sigmaSq,
            prospect.mu,
            prospect.sigmaSq,
        )
    })
}

GavelAnnotatorSchema.methods.assignNextProject = async function () {
    console.log('assigning')
    console.log(this.getNextProject, 'exists?')
    console.log(this, 'even this?')
    const nextProject = await this.getNextProject()
    console.log('nextProject', nextProject)

    if (!this.next) {
        if (nextProject) {
            this.next = nextProject._id
        } else {
            this.next = null
        }
    } else {
        this.prev = this.next
        this.ignore.push(this.next)
        if (nextProject) {
            this.next = nextProject._id
        } else {
            this.next = null
        }
    }

    return this.save()
}

GavelAnnotatorSchema.methods.skipCurrentProject = async function () {
    const project = await mongoose.model('GavelProject').findById(this.next)
    project.setSkippedBy(this._id)

    const nextProject = await this.getNextProject()
    if (!this.next) {
        return Promise.reject(
            new ForbiddenError(
                'Cannot skip current project when there is no project assigned',
            ),
        )
    }
    this.ignore.push(this.next)
    this.skipped.push(this.next)
    this.next = nextProject._id

    return this.save()
}

GavelAnnotatorSchema.set('timestamps', true)

/** Index by user and event as we will be querying by these often. Event/user combinations must also be unique */
GavelAnnotatorSchema.index(
    {
        user: 1,
        event: 1,
        active: 1,
    },
    {
        unique: true,
    },
)

const GavelAnnotator = mongoose.model('GavelAnnotator', GavelAnnotatorSchema)

module.exports = GavelAnnotator

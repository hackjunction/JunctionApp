const mongoose = require('mongoose')
const shortid = require('shortid')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')
const TeamRole = require('@hackjunction/shared/schemas/TeamRole')
const Candidate = require('@hackjunction/shared/schemas/Candidate')

const TeamSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    members: {
        type: [String],
        default: [],
    },
    code: {
        type: String,
        unique: true,
        // default: generateUniqueCode,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    // new
    teamRoles: {
        type: [TeamRole.mongoose],
        required: false,
        default: [],
    },
    candidates: {
        type: [Candidate.mongoose],
        required: false,
        default: [],
    },
    name: {
        type: String,
        required: true,
        unique: true,
        length: 30,
        default: `Team ${() => shortid.generate()}`,
    },
    tagline: {
        type: String,
        required: true,
        length: 60,
        default: `Team tagline`,
    },
    description: {
        type: String,
        required: true,
        length: 300,
        default: `Team description`,
    },
    challenge: {
        type: String,
        required: false,
        default: '',
    },
    ideaTitle: {
        type: String,
        required: true,
        length: 30,
        default: `Idea title`,
    },
    ideaDescription: {
        type: String,
        required: true,
        length: 300,
        default: `Idea description`,
    },
    email: {
        type: String,
        required: true,
        length: 30,
        default: 'test@test.com',
    },
    telegram: {
        type: String,
        required: false,
    },
    discord: {
        type: String,
        required: false,
    },
})

TeamSchema.pre('save', async function (next) {
    if (this.code) return next()
    let code = shortid.generate()
    let isCodeUnique = false

    while (!isCodeUnique) {
        // Check if the generated code already exists in the database
        const existingTeam = await mongoose.model('Team').findOne({ code })

        if (!existingTeam) {
            isCodeUnique = true
        } else {
            // If code is not unique, generate a new one and repeat the process
            code = shortid.generate()
        }
    }

    this.code = code

    next()
})

/** Removed locked property and added complete */

TeamSchema.set('timestamps', true)
TeamSchema.index({ event: 1, owner: 1, code: 1, members: 1 })

TeamSchema.plugin(updateAllowedPlugin, {
    blacklisted: [
        '__v',
        '_id',
        'createdAt',
        'updatedAt',
        'code',
        'event',
        'owner',
        'members',
    ],
})

TeamSchema.statics.getMembers = function (teamId) {
    return Team.findById(teamId).then(team => {
        if (!team) return []
        return [team.owner].concat(team.members)
    })
}

const Team = mongoose.model('Team', TeamSchema)

module.exports = Team

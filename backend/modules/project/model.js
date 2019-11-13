const mongoose = require('mongoose');
const CloudinaryImageSchema = require('../../common/schemas/CloudinaryImage');
const updateAllowedPlugin = require('../../common/plugins/updateAllowed');

const ProjectSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    punchline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    sourcePublic: {
        type: Boolean,
        required: true,
        default: true
    },
    demo: {
        type: String
    },
    images: {
        type: [CloudinaryImageSchema]
    },
    challenges: {
        type: [String]
    },
    track: {
        type: String
    },
    location: {
        type: String
    }
});

ProjectSchema.set('timestamps', true);

/* Only allow a single project per team per event */
ProjectSchema.index(
    {
        event: 1,
        team: 1
    },
    {
        unique: true
    }
);

/* We'll commonly query projects by track and event, so create a compound index for that */
ProjectSchema.index({
    track: 1,
    event: 1
});

ProjectSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'createdAt', 'updatedAt', 'team', 'event']
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

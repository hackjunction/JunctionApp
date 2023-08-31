const mongoose = require('mongoose')
const Promise = require('bluebird')
const shortid = require('shortid')

module.exports = {
    index: 20,
    name: '20-add-new-fields-to-teams-info',
    description: 'Add new fields to teams info',
    run: async () => {
        const teamRolesField = await mongoose
            .model('Team')
            .updateMany(
                { teamRoles: { $exists: false } },
                { $set: { teamRoles: [] } },
            )
        console.log(
            'Done updating teamRoles field',
            teamRolesField.n,
            teamRolesField.nModified,
        )
        const teamNameField = await mongoose
            .model('Team')
            .updateMany(
                { name: { $exists: false } },
                { $set: { name: `Team ${shortid.generate()}` } },
            )
        console.log(
            'Done updating name field',
            teamNameField.n,
            teamNameField.nModified,
        )
        const teamTaglineField = await mongoose
            .model('Team')
            .updateMany(
                { tagline: { $exists: false } },
                { $set: { tagline: `Generic tagline` } },
            )
        console.log(
            'Done updating tagline field',
            teamTaglineField.n,
            teamTaglineField.nModified,
        )
        const teamDescriptionField = await mongoose
            .model('Team')
            .updateMany(
                { description: { $exists: false } },
                { $set: { description: `Generic description` } },
            )
        console.log(
            'Done updating description field',
            teamDescriptionField.n,
            teamDescriptionField.nModified,
        )
        const teamChallengeField = await mongoose
            .model('Team')
            .updateMany(
                { challenge: { $exists: false } },
                { $set: { challenge: '' } },
            )
        console.log(
            'Done updating challenge field',
            teamChallengeField.n,
            teamChallengeField.nModified,
        )
        const teamIdeaTitleField = await mongoose
            .model('Team')
            .updateMany(
                { ideaTitle: { $exists: false } },
                { $set: { ideaTitle: `Generic idea title` } },
            )
        console.log(
            'Done updating ideaTitle field',
            teamIdeaTitleField.n,
            teamIdeaTitleField.nModified,
        )
        const teamIdeaDescriptionField = await mongoose
            .model('Team')
            .updateMany(
                { ideaDescription: { $exists: false } },
                { $set: { ideaDescription: `Generic idea description` } },
            )
        console.log(
            'Done updating ideaDescription field',
            teamIdeaDescriptionField.n,
            teamIdeaDescriptionField.nModified,
        )
        const teamEmailField = await mongoose
            .model('Team')
            .updateMany(
                { email: { $exists: false } },
                { $set: { email: `noemail@example.com` } },
            )
        console.log(
            'Done updating email field',
            teamEmailField.n,
            teamEmailField.nModified,
        )
        const teamTelegramField = await mongoose
            .model('Team')
            .updateMany(
                { telegram: { $exists: false } },
                { $set: { telegram: '' } },
            )
        console.log(
            'Done updating telegram field',
            teamTelegramField.n,
            teamTelegramField.nModified,
        )
        const teamDiscordField = await mongoose
            .model('Team')
            .updateMany(
                { discord: { $exists: false } },
                { $set: { discord: '' } },
            )
        console.log(
            'Done updating discord field',
            teamDiscordField.n,
            teamDiscordField.nModified,
        )
        console.log('Done with migration 20')
        return Promise.resolve()
    },
}

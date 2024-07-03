const mongoose = require('mongoose')
const Promise = require('bluebird')

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
            teamRolesField.matchedCount,
            teamRolesField.modifiedCount,
        )
        const teamNameField = await mongoose
            .model('Team')
            .updateMany(
                { name: { $exists: false } },
                { $set: { name: 'Default Team Name' } },
            )
        console.log(
            'Done updating name field',
            teamNameField.matchedCount,
            teamNameField.modifiedCount,
        )
        const teamTaglineField = await mongoose
            .model('Team')
            .updateMany(
                { tagline: { $exists: false } },
                { $set: { tagline: '' } },
            )
        console.log(
            'Done updating tagline field',
            teamTaglineField.matchedCount,
            teamTaglineField.modifiedCount,
        )
        const teamDescriptionField = await mongoose
            .model('Team')
            .updateMany(
                { description: { $exists: false } },
                { $set: { description: '' } },
            )
        console.log(
            'Done updating description field',
            teamDescriptionField.matchedCount,
            teamDescriptionField.modifiedCount,
        )
        const teamChallengeField = await mongoose
            .model('Team')
            .updateMany(
                { challenge: { $exists: false } },
                { $set: { challenge: '' } },
            )
        console.log(
            'Done updating challenge field',
            teamChallengeField.matchedCount,
            teamChallengeField.modifiedCount,
        )
        const teamIdeaTitleField = await mongoose
            .model('Team')
            .updateMany(
                { ideaTitle: { $exists: false } },
                { $set: { ideaTitle: '' } },
            )
        console.log(
            'Done updating ideaTitle field',
            teamIdeaTitleField.matchedCount,
            teamIdeaTitleField.modifiedCount,
        )
        const teamIdeaDescriptionField = await mongoose
            .model('Team')
            .updateMany(
                { ideaDescription: { $exists: false } },
                { $set: { ideaDescription: '' } },
            )
        console.log(
            'Done updating ideaDescription field',
            teamIdeaDescriptionField.matchedCount,
            teamIdeaDescriptionField.modifiedCount,
        )
        const teamEmailField = await mongoose
            .model('Team')
            .updateMany(
                { email: { $exists: false } },
                { $set: { email: `noemail@example.com` } },
            )
        console.log(
            'Done updating email field',
            teamEmailField.matchedCount,
            teamEmailField.modifiedCount,
        )
        const teamTelegramField = await mongoose
            .model('Team')
            .updateMany(
                { telegram: { $exists: false } },
                { $set: { telegram: '' } },
            )
        console.log(
            'Done updating telegram field',
            teamTelegramField.matchedCount,
            teamTelegramField.modifiedCount,
        )
        const teamDiscordField = await mongoose
            .model('Team')
            .updateMany(
                { discord: { $exists: false } },
                { $set: { discord: '' } },
            )
        console.log(
            'Done updating discord field',
            teamDiscordField.matchedCount,
            teamDiscordField.modifiedCount,
        )
        console.log('Done with migration 20')
        return Promise.resolve()
    },
}

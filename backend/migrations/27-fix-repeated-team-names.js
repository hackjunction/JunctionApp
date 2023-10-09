const mongoose = require('mongoose')
const Promise = require('bluebird')
const shortid = require('shortid')

module.exports = {
    index: 27,
    name: '27-add-new-fields-to-teams-info',
    description: 'Add new fields to teams info',
    run: async () => {
        const teams = await mongoose
            .model('Team')
            .find({ name: /^Team \w{9}$/ })

        for (const team of teams) {
            const newSlug = `Team ${shortid.generate()}`
            team.name = newSlug
            await team.save()
        }

        console.log('Done with migration 27')
        console.log('Updated', teams.length, 'teams')
        return Promise.resolve()
    },
}

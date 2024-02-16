const mongoose = require('mongoose')
const Promise = require('bluebird')
const shortid = require('shortid')

module.exports = {
    index: 22,
    name: '22-renamed-team-tagline-to-subtitle',
    description: 'Rename tagline to subtitle inside of the team model',
    run: async () => {
        const renameTaglineToSubtitle = await mongoose
            .model('Team')
            .updateMany(
                { tagline: { $exists: true } },
                { $rename: { tagline: 'subtitle' } },
            )
        console.log(
            'Done renaming tagline to subtitle',
            renameTaglineToSubtitle.n,
            renameTaglineToSubtitle.nModified,
        )

        console.log('Done with migration 21')
        return Promise.resolve()
    },
}

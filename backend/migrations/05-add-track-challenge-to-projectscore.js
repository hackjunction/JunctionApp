const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 5,
    name: '05-add-track-challenge-to-projectscore',
    description: 'Add track and challenge to projectscores',
    run: async () => {
        const res = await mongoose
            .model('ProjectScore')
            .updateMany(
                { track: { $exists: false } },
                { $set: { track: null } },
            )
        const pres = await mongoose
            .model('ProjectScore')
            .updateMany(
                { challenge: { $exists: false } },
                { $set: { challenge: null } },
            )

        console.log(
            'Done with ProjectScore',
            res.n,
            res.nModified,
            pres.n,
            pres.nModified,
        )
        /*         const PS = mongoose.model('ProjectScore')
        await PS.collection.createIndex(
            {
                project: 1,
                event: 1,
                challenge: 1,
                track: 1,
            },
            {
                unique: true,
            },
        )
        await PS.syncIndexes() */

        return Promise.resolve()
    },
}

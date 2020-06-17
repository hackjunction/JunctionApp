const mongoose = require('mongoose')
const Promise = require('bluebird')

const GavelController = require('../modules/reviewing/gavel/controller')

module.exports = {
    index: 2,
    name: '02-rename-sigma_sq-to-sigmaSq',
    description: 'Rename sigma_sq in GaveProject to sigmaSq',
    run: async () => {
        /*
        // in case you do an oopsie and delete all gavelprojects
        const cursor = mongoose.model('Project').find().cursor()
        await cursor.eachAsync(async function (doc) {
            GavelController.ensureGavelProject(doc)
        })
        */

        const res = await mongoose
            .model('GavelProject')
            .updateMany(
                {},
                { $rename: { sigma_sq: 'sigmaSq' } },
                { multi: true }
            )
        console.log('Done with gavelproject', res.n, res.nModified)

        const psres = await mongoose
            .model('ProjectScore')
            .updateMany(
                {},
                { $rename: { max_score: 'maxScore' } },
                { multi: true }
            )

        console.log('Done with ProjectScore', psres.n, psres.nModified)

        return Promise.resolve()
    },
}

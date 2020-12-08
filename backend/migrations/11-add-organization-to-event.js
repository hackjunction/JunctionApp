const mongoose = require('mongoose')
const Promise = require('bluebird')

const OrganizationControlller = require('../modules/organization/controller')

module.exports = {
    index: 11,
    name: '11-add-organization-to-event',
    description: 'add add org',
    run: async () => {
        const nres = await mongoose
            .model('Event')
            .updateMany(
                { organizations: { $exists: false } },
                { $set: { organizations: [] } },
            )

        const cursor = mongoose
            .model('Event')
            .find({ organizations: { $exists: true } })
            .cursor()
        await cursor.eachAsync(async function (event) {
            Promise.all(
                event.organizations.map(org =>
                    OrganizationControlller.getOrganizationBySlug(org).then(
                        data => {
                            if (data) {
                                return data._id
                            }
                            return false
                        },
                    ),
                ),
            ).then(values => {
                event.organizations = values.filter(value => value)
                event.save()
            })
        })
        console.log('Done with event organization', nres.n, nres.nModified)
        return Promise.resolve()
    },
}

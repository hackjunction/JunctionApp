const mongoose = require('mongoose')
const Promise = require('bluebird')

const OrganizationControlller = require('../modules/organization/controller')

module.exports = {
    index: 19,
    name: '19-add-organization-to-event',
    description: 'add add org',
    run: async () => {
        // const nres = await mongoose
        //     .model('Event')
        //     .updateMany(
        //         { organizations: { $exists: false } },
        //         { $set: { organizations: [] } },
        //     )
        // const bres = await mongoose
        //     .model('Event')
        //     .updateMany(
        //         { organizations: null },
        //         { $set: { organizations: [] } },
        //     )
        // const cursor = mongoose
        //     .model('Event')
        //     .find({ organizations: { $exists: true } })
        //     .cursor()
        // await cursor.eachAsync(async function (event) {
        //     Promise.all(
        //         event.organizations.map(org =>
        //             OrganizationControlller.getOrganizationBySlug(org).then(
        //                 data => {
        //                     if (data) {
        //                         return data._id
        //                     }
        //                     return null
        //                 },
        //             ),
        //         ),
        //     ).then(values => {
        //         event.organizations = values.filter(value => value !== null)
        //         event.save()
        //     })
        // })
        // console.log('Done with event organization', nres.matchedCount, nres.modifiedCount)
        // return Promise.resolve()
    },
}

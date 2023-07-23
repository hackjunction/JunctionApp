const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 16,
    name: '16-add-recruiters-to-event',
    description: 'Add recruiters in to event, add recruiter events to user profioles and removo recruiter organisations',

    run: async () => {
        var ObjectId = require('mongodb').ObjectID
        const ares = await mongoose
            .model('Event')
            .updateMany(
                { recruiters: { $exists: false } },
                { $set: { recruiters: [] } },//TODO: add recruiters from userprofiles here
            )
        console.log('Done with recruiters to event', ares.n, ares.nModified)

        const bres = await mongoose
            .model('UserProfile')
            .updateMany(
                { 'recruiterEvents.0': { $exists: true }, recruiterEvents: { $elemMatch: { $type: "string" } } }, // array has at least one element and element type is string, not object
                [{
                    $set: {
                        recruiterEvents: {
                            $map: {
                                input: "$recruiterEvents",
                                as: "current",
                                in: {
                                    _id: ObjectId().toString(),
                                    eventId: "$$current",
                                    organisation: {
                                        $getField: "recruiterOrganisation"
                                    }
                                }
                            }
                        }
                    }
                }])

        console.log('Done with events to userprofiles', bres.n, bres.nModified)

        const cres = await mongoose
            .model('UserProfile')
            .updateMany(
                { "recruiterOrganisation": { $exists: true } },
                { $unset: { recruiterOrganisation: "" } }
            )
        console.log('Done with removing recruiterOrganisations from userprofiles', cres.n, cres.nModified)

        return Promise.resolve()
    },
}


const mongoose = require('mongoose')
const Promise = require('bluebird')
const { checklistItemsPhysical } = require('../modules/registration/checklists')
const { checklistItemsOnline } = require('../modules/registration/checklists')

module.exports = {
    index: 14,
    name: '14-add-checklist-to-registration',
    description: 'add checklist',
    run: async () => {
        const physicalChecklist = checklistItemsPhysical()
        const onlineChecklist = checklistItemsOnline()
        const nres = await mongoose.model('Registration').updateMany(
            { checklist: { $exists: false } },
            {
                $set: {
                    checklist: {
                        items: [],
                    },
                },
            },
        )

        const mres = await mongoose.model('Registration').updateMany(
            { checklist: null },
            {
                $set: {
                    checklist: {
                        items: [],
                    },
                },
            },
        )

        const bres = await mongoose
            .model('Registration')
            .find({
                'checklist.items': {
                    $eq: [],
                },
            })
            .populate('event')
            .then(registrations => {
                const promises = registrations.map(registration => {
                    const variable = registration.event
                        ? registration.event.eventType
                        : 'noEventType'

                    if (variable === 'physical') {
                        registration.checklist.items = physicalChecklist
                    } else {
                        registration.checklist.items = onlineChecklist
                    }
                    return registration.save()
                })

                return Promise.all(promises)
            })

        console.info('Done with registration checklist', nres.n, nres.nModified)
        return Promise.resolve()
    },
}

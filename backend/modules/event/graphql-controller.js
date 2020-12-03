const mongoose = require('mongoose')
const { Auth } = require('@hackjunction/shared')
const DataLoader = require('dataloader')
const Event = require('./model')
const PermissionUtils = require('../../utils/permissions')

async function batchGetEventsByIds(eventIds) {
    const objectIds = eventIds.map(id => new mongoose.Types.ObjectId(id))
    const results = await Event.find({
        _id: {
            $in: objectIds,
        },
    }).lean()
    const resultsMap = results.reduce((map, current) => {
        map[current._id.toString()] = current
        return map
    }, {})
    return eventIds.map(_id => resultsMap[_id] || null)
}

async function batchGetEventsBySlugs(eventSlugs) {
    const results = await Event.find({
        slug: {
            $in: eventSlugs,
        },
    }).lean()
    const resultsMap = results.reduce((map, current) => {
        map[current.slug] = current
        return map
    }, {})
    return eventSlugs.map(slug => resultsMap[slug] || null)
}

class EventController {
    constructor(requestingUser, overrideChecks) {
        this.requestingUser = requestingUser
        this.overrideChecks = overrideChecks
        this.isAdmin =
            overrideChecks ||
            PermissionUtils.userHasPermission(
                requestingUser,
                Auth.Permissions.MANAGE_EVENT,
            )

        this.eventIdLoader = new DataLoader(batchGetEventsByIds)
        this.eventSlugLoader = new DataLoader(batchGetEventsBySlugs)
    }

    getById(eventId) {
        return this._clean(this.eventIdLoader.load(eventId))
    }

    getBySlug(eventSlug) {
        return this._clean(this.eventSlugLoader.load(eventSlug))
    }

    getByOrganiser(userId) {
        return this._clean(
            Event.find()
                .or([{ owner: userId }, { organisers: userId }])
                .lean(),
        )
    }

    getByOrganization(slug) {
        return this._clean(Event.find({ organizations: slug }).lean())
    }

    getHighlighted() {
        return this._clean(
            Event.find({
                published: true,
                startTime: {
                    $gte: new Date(),
                },
            })
                .sort([['startTime', 1]])
                .lean(),
        )
    }

    getActive() {
        return this._clean(
            Event.find({
                published: true,
                endTime: {
                    $gte: new Date(),
                },
            })
                .sort([['startTime', 1]])
                .lean(),
        )
    }

    getPast() {
        return this._clean(
            Event.find({
                published: true,
                endTime: {
                    $lt: new Date(),
                },
            })
                .sort([['frontPagePriority', -1]])
                .sort([['endTime', -1]])
                .lean(),
        )
    }

    async getAll() {
        return this._clean(Event.find().lean())
    }

    async _clean(promise) {
        const result = await promise
        if (Array.isArray(result)) {
            const results = result.map(item => {
                return this._cleanOne(item)
            })
            return results.filter(item => item !== null)
        }
        return this._cleanOne(result)
    }

    _cleanOne(event) {
        if (!event) return null

        /** If it's a public event, anyone can see it */
        if (event.published && event.approved) {
            // TODO: Maybe strip some fields from the response if necessary?
            return event
        }

        if (this.isAdmin) {
            return event
        }

        /** If the user is an organiser or admin, they can see it */
        const isOwner =
            this.requestingUser && this.requestingUser.sub === event.owner
        const isOrganiser =
            this.requestingUser &&
            event.organisers.indexOf(this.requestingUser.sub) !== -1
        if (isOwner || isOrganiser) {
            return event
        }

        /** Otherwise return null for now */
        return null
    }
}

module.exports = EventController

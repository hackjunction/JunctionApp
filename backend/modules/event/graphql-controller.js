const { Auth } = require('@hackjunction/shared')
const Event = require('./model')
const PermissionUtils = require('../../utils/permissions')

class EventController {
    constructor(requestingUser, overrideChecks) {
        this.requestingUser = requestingUser
        this.overrideChecks = overrideChecks
        this.isAdmin =
            overrideChecks ||
            PermissionUtils.userHasPermission(
                requestingUser,
                Auth.Permissions.MANAGE_EVENT
            )
    }

    getById(eventId) {
        return this._clean(Event.findById(eventId))
    }

    getAll() {
        return this._clean(Event.find())
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
        if (event.published) {
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

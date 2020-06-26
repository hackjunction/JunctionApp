const { Auth } = require('@hackjunction/shared')
const DataLoader = require('dataloader')
const PermissionUtils = require('../../utils/permissions')
const Registration = require('./model')

async function batchGetRegistrationsById(ids) {
    const results = await Registration.find({
        _id: {
            $in: ids,
        },
    })
    const resultsMap = results.reduce((map, current) => {
        map[current._id] = current
        return map
    }, {})

    return ids.map(id => resultsMap[id] || null)
}

class RegistrationController {
    constructor(requestingUser, overrideChecks) {
        this.requestingUser = requestingUser
        this.overrideChecks = overrideChecks

        // TODO: How should this be defined here
        // Event organisers should only be able to access their own event's registrations,
        // but maybe that's a step too far in this case.
        this.isAdmin =
            overrideChecks ||
            PermissionUtils.userHasPermission(
                requestingUser,
                Auth.Permissions.MANAGE_EVENT
            )

        this.registrationIdLoader = new DataLoader(batchGetRegistrationsById)
    }

    getById(id) {
        return this._clean(this.registrationIdLoader.load(id))
    }

    getAll() {
        if (!this.isAdmin) return []
        return this._clean(Registration.find())
    }

    getByIdAndUser(eventId, userId) {
        return this._clean(
            Registration.findOne({
                event: eventId,
                user: userId,
            })
        )
    }

    getByEventId(eventId) {
        if (!this.isAdmin) return []
        return this._clean(Registration.find({ event: eventId }))
    }

    getByUserId(userId) {
        return this._clean(Registration.find({ user: userId }))
    }

    /** Utilities for enforcing what items & fields are visible to the requestingUser */
    async _clean(promise) {
        const result = await promise
        if (Array.isArray(result)) {
            const mapped = result.map(item => {
                return this._cleanOne(item)
            })
            return mapped.filter(item => item !== null)
        }

        return this._cleanOne(result)
    }

    /** Different scenarios:
     * - Requesting user is admin
     *      -> Return unmodified result
     * - Requesting user is requesting their own registrations
     *      -> If the registration is their own, return it
     *      -> If it is not, return null
     * - Requesting user is unauthenticated
     *      -> Always return null
     */
    _cleanOne(registration) {
        console.log('regiclean', registration)
        if (this.isAdmin) {
            return registration
        }
        const isSelf =
            this.requestingUser && registration.user === this.requestingUser.sub
        if (isSelf) {
            // TODO: Apply modifications to fields such as status
            return registration
        }

        return null
    }
}

module.exports = RegistrationController

const { Auth } = require('@hackjunction/shared')
const _ = require('lodash')
const PermissionUtils = require('../../utils/permissions')
const { UserProfile } = require('./model')

class UserProfileController {
    constructor(requestingUser, overrideChecks = false) {
        this.requestingUser = requestingUser
        this.overrideChecks = overrideChecks
        this.isAdmin =
            overrideChecks ||
            PermissionUtils.userHasPermission(
                requestingUser,
                Auth.Permissions.MANAGE_EVENT // TODO: Should be Auth.Permissions.VIEW_FULL_PROFILE etc.
            )
    }

    /** Controller functions */
    getByUserId(userId) {
        return this._clean(UserProfile.findOne({ userId }))
    }

    getAll() {
        return this._clean(UserProfile.find())
    }

    /** Utilities for enforcing what fields are visible to the requestingUser */
    async _clean(promise) {
        const result = await promise
        if (Array.isArray(result)) {
            return result.map(item => {
                return this._cleanOne(item)
            })
        }

        return this._cleanOne(result)
    }

    _cleanOne(user) {
        const isSelf =
            this.requestingUser && user.userId === this.requestingUser.sub
        if (isSelf || this.isAdmin) {
            return user
        }
        // TODO: These should be user-defineable
        const publicFields = ['firstName', 'lastName', 'avatar']
        return _.pick(user, publicFields)
    }
}

module.exports = UserProfileController

const { Auth } = require('@hackjunction/shared')
const { v4: uuid } = require('uuid')
const PermissionUtils = require('../../utils/permissions')
const { Alert } = require('./model')

class AlertController {
    constructor(requestingUser, overrideChecks) {
        this.requestingUser = requestingUser
        this.overrideChecks = overrideChecks
        this.isAdmin =
            overrideChecks ||
            PermissionUtils.userHasPermission(
                requestingUser,
                Auth.Permissions.MANAGE_EVENT,
            )
    }

    async find({ eventId }) {
        const query = {
            eventId: { $eq: eventId },
        }

        return this._clean(Alert.find(query))
    }

    async send(input, requesterId) {
        const newAlert = new Alert({
            id: uuid(),
            content: input.content,
            eventId: input.eventId,
            sender: requesterId,
            sentAt: new Date(),
        })

        return this._cleanOne(newAlert.save())
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

    _cleanOne(message) {
        if (!message) return null

        if (this.isAdmin) {
            return message
        }

        /** If the user is an organiser or admin, they can see it */
        const isSender =
            this.requestingUser && this.requestingUser.sub === message.sender
        const isRecipient =
            this.requestingUser &&
            message.recipients.indexOf(this.requestingUser.sub) !== -1
        if (isSender || isRecipient) {
            return message
        }

        return null
    }
}

module.exports = AlertController

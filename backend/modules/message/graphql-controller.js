const { Auth } = require('@hackjunction/shared')
const { v4: uuid } = require('uuid')
const PermissionUtils = require('../../utils/permissions')
const { Message } = require('./model')

class MessageController {
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

    async find({ recipients, read }, requesterId) {
        const query = {
            ...(recipients
                ? {
                      recipients: {
                          $size: recipients.length,
                          $all: recipients,
                      },
                  }
                : { recipients: requesterId }),
            ...(read && { readAt: { $ne: null } }),
        }
        return this._clean(Message.find(query))
    }

    async send(input, requesterId) {
        const recipients = [...input.recipients, requesterId]

        const newMessage = new Message({
            id: uuid(),
            content: input.content,
            recipients,
            sender: requesterId,
            sentAt: new Date(),
        })

        return this._cleanOne(newMessage.save())
    }

    async read(messageId, requesterId) {
        const message = await Message.findOne({
            id: messageId,
            recipients: requesterId,
        })

        if (!message) {
            return null
        }

        message.readAt = new Date()

        return this._cleanOne(message.save())
    }

    async readMany(messageIds, requesterId) {
        const messages = await Message.find({
            id: { $in: messageIds },
            recipients: requesterId,
        })

        if (messages.length < 1) {
            return null
        }

        const date = new Date()

        messages.forEach(m => {
            // eslint-disable-next-line no-param-reassign
            m.readAt = date
        })

        return this._clean(Promise.all(messages.map(m => m.save())))
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

module.exports = MessageController

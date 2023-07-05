// const { Auth } = require('@hackjunction/shared')
// const _ = require('lodash')
// const DataLoader = require('dataloader')

// const PermissionUtils = require('../../utils/permissions')
// const { UserProfile } = require('../user-profile/model')
// const { Event } = require('../event/model')
// const { Team } = require('./model')

// async function batchUsersByUserId(userIds) {
//     const results = await UserProfile.find({ userId: { $in: userIds } })
//     const resultsMap = results.reduce((map, current) => {
//         map[current.userId] = current
//         return map
//     }, {})
//     return userIds.map(userId => resultsMap[userId] || null)
// }

// async function batchGetEventsByIds(ids) {
//     const results = await Event.find({
//         _id: {
//             $in: ids,
//         },
//     }).lean()
//     const resultsMap = results.reduce((map, current) => {
//         map[current._id] = current
//         return map
//     }, {})
//     return ids.map(_id => resultsMap[_id] || null)
// }

// class TeamController {
//     constructor(requestingUser, overrideChecks = false) {
//         this.requestingUser = requestingUser
//         this.overrideChecks = overrideChecks
//         this.isAdmin =
//             overrideChecks ||
//             PermissionUtils.userHasPermission(
//                 requestingUser,
//                 Auth.Permissions.MANAGE_EVENT, // TODO: Should be Auth.Permissions.VIEW_FULL_PROFILE etc.
//             )

//         this.eventIdLoader = new DataLoader(batchGetEventsByIds)
//         this.userIdLoader = new DataLoader(batchUsersByUserId)
//     }

//     /** Controller functions */
//     getTeam(eventId, userId) {
//         // if (!userId) return null
//         return Event.findOne({ eventId: eventId, userId: userId })
//     }

//     /** Utilities for enforcing what fields are visible to the requestingUser */
//     // async _clean(promise) {
//     //     const result = await promise
//     //     if (Array.isArray(result)) {
//     //         return result.map(item => {
//     //             return this._cleanOne(item)
//     //         })
//     //     }

//     //     return this._cleanOne(result)
//     // }

//     // _cleanOne(user) {
//     //     const isSelf =
//     //         this.requestingUser && user.userId === this.requestingUser.sub
//     //     if (isSelf || this.isAdmin) {
//     //         return user
//     //     }
//     //     // TODO: These should be user-defineable
//     //     const publicFields = ['userId', 'firstName', 'lastName', 'avatar']
//     //     return _.pick(user, publicFields)
//     // }
// }

// module.exports = TeamController

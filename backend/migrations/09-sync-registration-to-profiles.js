const mongoose = require('mongoose')
const Promise = require('bluebird')

const UserProfileControlller = require('../modules/user-profile/controller')

module.exports = {
    index: 9,
    name: '09-sync-registration-to-profiles',
    description: 'Sync registrationa and profile data',
    run: async () => {
        /*
        const cursor = mongoose.model('Registration').find({}).cursor()
        await cursor.eachAsync(async function (registration) {
            UserProfileControlller.getUserProfile(registration.user).then(
                async user => {
                    Object.entries(registration.toObject().answers).forEach(
                        ([key, value], index) => {
                            if (
                                user[key] === null ||
                                user[key] === undefined ||
                                (Array.isArray(user[key]) &&
                                    user[key].length === 0)
                            ) {
                                console.log('doing ', key, value)

                                user[key] = value
                            }
                        },
                    )
                    user.save()
                },
            )
        }) */
        return Promise.resolve()
    },
}
/*
{
                        // console.log('before', user)
                        if (!registration) {
                            console.log(
                                'null registration',
                                registration,
                                user.userId,
                                index,
                            )
                        } else {
                            user.registrations[index].status =
                                registration.status
                            Object.entries(
                                registration.toObject().answers,
                            ).forEach(([key, value], index) => {
                                if (
                                    user[key] === null ||
                                    user[key] === undefined ||
                                    (Array.isArray(user[key]) &&
                                        user[key].length === 0)
                                ) {
                                    user[key] = value
                                }
                            })
                        }
                    }
*/

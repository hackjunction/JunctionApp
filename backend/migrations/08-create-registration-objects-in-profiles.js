const mongoose = require('mongoose')
const Promise = require('bluebird')

const UserProfileControlller = require('../modules/user-profile/controller')

module.exports = {
    index: 8,
    name: '08-create-registration-objects-in-profiles',
    description: 'Sync registrationa and profile data',
    run: async () => {
        /*
        const cursor = mongoose.model('Registration').find({}).cursor()
        await cursor.eachAsync(async function (registration) {
            UserProfileControlller.syncRegistration(registration)
        }) */

        return Promise.resolve()
    },
}

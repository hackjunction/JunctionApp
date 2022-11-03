const mongoose = require('mongoose')
const Promise = require('bluebird')

const UserProfileControlller = require('../modules/user-profile/controller')
// event":ObjectId("61012f8b31dc320049369a96"
module.exports = {
    index: 8,
    name: '08-create-registration-objects-in-profiles',
    description: 'Sync registrationa and profile data',
    run: async () => {
        const cursor = mongoose
            .model('Registration')
            .find({ event: '62cd62fcfb0cc900455212fb' })
            .cursor()

        await cursor.eachAsync(async function (registration) {
            UserProfileControlller.syncRegistration(registration)
        })

        return Promise.resolve()
    },
}

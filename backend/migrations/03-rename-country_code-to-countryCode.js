const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 3,
    name: '03-rename-country_code-to-countryCode',
    description: 'Rename country_code in to countryCode',
    run: async () => {
        // REMINDER!!!!
        // WHEN MIGRATING FIELD A INTO FIELD B, BOTH A AND B MUST EXIST IN THE SCHEMA
        const res = await mongoose.model('Registration').updateMany(
            { 'answers.phoneNumber.country_code': { $exists: true } },
            {
                $rename: {
                    'answers.phoneNumber.country_code':
                        'answers.phoneNumber.countryCode',
                },
            },
        )
        console.log('Done with countryCode', res.n, res.nModified)
        const psres = await mongoose.model('UserProfile').updateMany(
            { 'phoneNumber.country_code': { $exists: true } },
            {
                $rename: {
                    'phoneNumber.country_code': 'phoneNumber.countryCode',
                },
            },
            { multi: true },
        )
        console.log('Done with countryCode', psres.n, psres.nModified)

        return Promise.resolve()
    },
}

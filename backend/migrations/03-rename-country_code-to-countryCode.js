const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 3,
    name: '03-rename-country_code-to-countryCode',
    description: 'Rename country_code in GaveProject to countryCode',
    run: async () => {
        const res = await mongoose.model('Registration').updateMany(
            {},
            {
                $rename: {
                    'answers.phoneNumber.country_code':
                        'answers.phoneNumber.countryCode',
                },
            },
            { multi: true },
        )
        console.log('Done with countryCodeo', res.n, res.nModified)

        const psres = await mongoose.model('UserProfile').updateMany(
            {},
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

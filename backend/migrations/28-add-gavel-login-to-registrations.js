const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 28,
    name: '28-add-gavel-login-to-registrations',
    description: 'Add gavel login link to registrations',
    run: async () => {
        const addGavelLogin = await mongoose.model('Registration').updateMany(
            { gavelLogin: { $exists: false } },
            {
                $set: {
                    gavelLogin: '',
                },
            },
        )

        console.log(
            'Done adding gavel login link to registrations',
            addGavelLogin.n,
            addGavelLogin.nModified,
        )

        return Promise.resolve()
    },
}

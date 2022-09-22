const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 12,
    name: '12-rename-country_code-to-countryCode',
    description: 'Rename country_code in to countryCode',
    run: async () => {
        // REMINDER!!!!
        // WHEN MIGRATING FIELD A INTO FIELD B, BOTH A AND B MUST EXIST IN THE SCHEMA
        const res = await mongoose
            .model('Registration')
            .updateMany(
                { ref: { $exists: false } },
                { $set: { ref: 0 } },
                { multi: true },
            )
        const res2 = await mongoose
            .model('Registration')
            .updateMany(
                { minted: { $exists: false } },
                { $set: { minted: '' } },
                { multi: true },
            )
    },
}

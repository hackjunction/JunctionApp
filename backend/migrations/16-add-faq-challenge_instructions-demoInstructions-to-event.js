const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 16,
    name: '16-add-faq-challenge_instructions-demoInstructions-to-event',
    description: 'Add faq, challenge_instructions, demoInstructions to event',
    run: async () => {
        // Update faq field
        const resFaq = await mongoose
            .model('Event')
            .updateMany(
                { faq: { $exists: false } },
                { $set: { faq: "" } },
            )
        console.log('Done updating faq field', resFaq.n, resFaq.nModified)

        // Update challenge_instructions field
        const resChallengeInstructions = await mongoose
            .model('Event')
            .updateMany(
                { challenge_instructions: { $exists: false } },
                { $set: { challenge_instructions: "" } },
            )
        console.log('Done updating challenge_instructions field', resChallengeInstructions.n, resChallengeInstructions.nModified)

        // Update demoInstructions field
        const resDemoInstructions = await mongoose
            .model('Event')
            .updateMany(
                { demoInstructions: { $exists: false } },
                { $set: { demoInstructions: "" } },
            )
        console.log('Done updating demoInstructions field', resDemoInstructions.n, resDemoInstructions.nModified)

        return Promise.resolve()
    },
}
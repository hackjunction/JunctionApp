const mongoose = require('mongoose')
const Promise = require('bluebird')

module.exports = {
    index: 7,
    name: '07-uniform-answers',
    description: 'Fix data out from schema',
    run: async () => {
        /*
        const cursor = mongoose.model('UserProfile').find({}).cursor()
        await cursor.eachAsync(async function (user) {
            if (user.gender === "Don't want to answer") {
                user.gender = 'Prefer not to answer'
            }
            if (
                user.education &&
                (user.education.graduationYear > 2100 ||
                    user.education.graduationYear < 1900)
            ) {
                user.education.graduationYear = 1901
            }
            if (user.nationality === 'Åland Island') {
                user.nationality = 'Finnish'
            }
            if (JSON.stringify(user.registrations) === JSON.stringify([{}])) {
                user.registrations = []
            }

            try {
                await user.save()
            } catch (error) {
                console.error(error)
            }
        })
        const regcursor = mongoose.model('Registration').find({}).cursor()
        await regcursor.eachAsync(async function (registration) {
            if (registration.answers.gender === "Don't want to answer") {
                registration.answers.gender = 'Prefer not to answer'
            }
            if (
                registration.answers.education &&
                (registration.answers.education.graduationYear > 2100 ||
                    registration.answers.education.graduationYear < 1900)
            ) {
                registration.answers.education.graduationYear = 1901
            }
            if (registration.answers.nationality === 'Åland Island') {
                registration.answers.nationality = 'Finnish'
            }
            if (registration.travelGrantDetails) {
                if (
                    registration.travelGrantDetails.IBAN &&
                    !registration.travelGrantDetails.IBAN.swift
                ) {
                    registration.travelGrantDetails.IBAN.swift = 'NoSwift'
                }
                if (
                    registration.travelGrantDetails.IBAN &&
                    !registration.travelGrantDetails.IBAN.accountNumber
                ) {
                    registration.travelGrantDetails.IBAN.accountNumber =
                        'NoAccount'
                }
                if (
                    registration.travelGrantDetails.IBAN &&
                    !registration.travelGrantDetails.IBAN.bankName
                ) {
                    registration.travelGrantDetails.IBAN.bankName = 'NoBank'
                }
            }

            try {
                await registration.save()
            } catch (error) {
                console.error(error)
            }
        })
        */

        return Promise.resolve()
    },
}

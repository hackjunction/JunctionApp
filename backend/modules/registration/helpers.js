const mongoose = require('mongoose')
const yup = require('yup')
const {
    RegistrationFields,
    RegistrationFieldsCustom,
} = require('@hackjunction/shared')

const RegistrationHelpers = {
    validateAnswers: (data, event) => {
        const minimalSchema = {}
        const validationSchema = {}

        // Build validation schema for standard fields
        const { optionalFields = [], requiredFields = [] } =
            event.registrationConfig.toObject()

        const allFields = RegistrationFields.getFields()

        Object.keys(allFields).forEach(fieldName => {
            const field = allFields[fieldName]
            if (field.alwaysRequired) {
                validationSchema[fieldName] = field.validationSchema(
                    true,
                    event,
                )
                minimalSchema[fieldName] = field.validationSchema(true, event)
            } else if (requiredFields.indexOf(fieldName) !== -1) {
                validationSchema[fieldName] = field.validationSchema(
                    true,
                    event,
                )
                minimalSchema[fieldName] = field.validationSchema(false, event)
            } else if (optionalFields.indexOf(fieldName) !== -1) {
                validationSchema[fieldName] = field.validationSchema(
                    false,
                    event,
                )
                minimalSchema[fieldName] = field.validationSchema(false, event)
            }
        })

        // Build validation schema for custom questions
        event.customQuestions.forEach(section => {
            const sectionSchema = {}
            section.questions.forEach(question => {
                sectionSchema[question.name] = RegistrationFieldsCustom[
                    question.fieldType
                ].validationSchema(question.fieldRequired, question)
            })
            validationSchema[section.name] = yup.object().shape(sectionSchema)
        })

        const minSchema = yup.object().shape(minimalSchema)
        const schema = yup.object().shape(validationSchema)
        return schema
            .validate(data, { stripUknown: true })
            .catch(e => {
                // TODO proper log
                return minSchema
                    .validate(data, { stripUknown: true })
                    .catch(ee => {
                        // TODO proper log
                        console.log('error in minimalValidateAnswers', ee)
                        return [false, false]
                    })
                    .then(value => {
                        return [false, value]
                    })
            })
            .then(value => {
                return [true, value]
            })
    },
    registrationFromUser: user => {
        const d = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
        const validationSchema = {}
        const allFields = RegistrationFields.getFields()

        Object.keys(allFields).forEach(fieldName => {
            const field = allFields[fieldName]
            if (field.alwaysRequired) {
                validationSchema[fieldName] = field.validationSchema(true)
            }
        })

        const schema = yup.object().shape(validationSchema)

        const data = schema.validate(d, { stripUknown: true }).catch(e => {})
        return data
    },
    buildAggregation: (eventId, userId, qp) => {
        const aggregationSteps = []

        /** Match the event id first to reduce results */
        aggregationSteps.push({
            $match: {
                event: mongoose.Types.ObjectId(eventId.toString()),
            },
        })

        /** If only assigned to self, match that first */
        if (qp.selfAssignedOnly === 'true') {
            aggregationSteps.push({
                $match: {
                    assignedTo: userId,
                },
            })
        }

        /** Match indexed filters first */
        if (qp.notRatedOnly === 'true') {
            aggregationSteps.push({
                $match: {
                    rating: {
                        $exists: false,
                    },
                },
            })
        }

        if (qp.notAssignedOnly === 'true') {
            aggregationSteps.push({
                $match: {
                    assignedTo: {
                        $exists: false,
                    },
                },
            })
        }

        /** Apply rating filters if specified */
        if (qp.ratingMin || qp.ratingMax) {
            if (qp.ratingMin && qp.ratingMax) {
                aggregationSteps.push({
                    $match: {
                        rating: {
                            $gte: parseInt(qp.ratingMin),
                            $lte: parseInt(qp.ratingMax),
                        },
                    },
                })
            } else if (qp.ratingMin) {
                aggregationSteps.push({
                    $match: {
                        rating: {
                            $gte: parseInt(qp.ratingMin),
                        },
                    },
                })
            } else {
                aggregationSteps.push({
                    $match: {
                        rating: {
                            $lte: parseInt(qp.ratingMax),
                        },
                    },
                })
            }
        }

        /** If searching results, match the search */
        if (qp.searchField && qp.searchValue) {
            aggregationSteps.push({
                $match: {
                    [`answers.${qp.searchField}`]: qp.searchValue,
                },
            })
        }

        if (qp.hasTags && qp.hasTags.length) {
            aggregationSteps.push({
                $match: {
                    tags: {
                        $in: qp.hasTags,
                    },
                },
            })
        }

        /** If filtering by fields existing, do that last */
        if (qp.hasFields && qp.hasFields.length) {
            const match = {}
            qp.hasFields.forEach(fieldName => {
                match[`answers.${fieldName}`] = {
                    $exists: true,
                }
            })
            aggregationSteps.push({
                $match: match,
            })
        }

        /** Sort the results based on */
        aggregationSteps.push({
            $sort: {
                createdAt: 1,
            },
        })

        /** Last, limit the data if limit specified */
        if (qp.limit) {
            aggregationSteps.push({
                $limit: parseInt(qp.limit),
            })
        }

        return aggregationSteps
    },
}

module.exports = RegistrationHelpers

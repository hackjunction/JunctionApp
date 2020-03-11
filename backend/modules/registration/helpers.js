const _ = require('lodash')
const mongoose = require('mongoose')
const yup = require('yup')
const {
    RegistrationFields,
    RegistrationFieldsCustom,
} = require('@hackjunction/shared')

const RegistrationHelpers = {
    validateAnswers: (answers, event) => {
        const validationSchema = {}

        // Build validation schema for standard fields
        const {
            optionalFields = [],
            requiredFields = [],
        } = event.registrationConfig.toObject()

        const allFields = RegistrationFields.getFields()

        Object.keys(allFields).forEach(fieldName => {
            const params = allFields[fieldName]
            if (params.alwaysRequired) {
                validationSchema[fieldName] = params.validationSchema(true)
            }
            if (requiredFields.indexOf(fieldName) !== -1) {
                validationSchema[fieldName] = params.validationSchema(true)
            }
            if (optionalFields.indexOf(fieldName) !== -1) {
                validationSchema[fieldName] = params.validationSchema(false)
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
        const schema = yup.object().shape(validationSchema)
        return schema.validate(answers, { stripUknown: true })
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

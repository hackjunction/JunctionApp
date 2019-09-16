const _ = require('lodash');
const joi = require('joi');
const mongoose = require('mongoose');
const Shared = require('@hackjunction/shared');
const { RegistrationValidator, CustomValidator } = Shared;

const _RegistrationValidator = new RegistrationValidator(joi);
const _CustomValidator = new CustomValidator(joi);

const RegistrationHelpers = {
    validateAnswers: (answers, event) => {
        const errors = {};
        const result = {};
        const userDetailsFields = Object.keys(event.userDetailsConfig.toObject());
        const customSectionNames = event.customQuestions.map(s => s.name);
        const customSectionsMap = _.reduce(
            event.customQuestions,
            (map, section) => {
                section.questions.forEach(question => {
                    map[`${section.name}.${question.name}`] = question;
                });
                return map;
            },
            {}
        );

        _.forOwn(answers, (answer, field) => {
            if (userDetailsFields.indexOf(field) !== -1) {
                const error = _RegistrationValidator.validate(field, event.userDetailsConfig[field].require)(answer);
                if (error) {
                    errors[field] = error;
                } else {
                    result[field] = answer;
                }
            } else if (customSectionNames.indexOf(field) !== -1) {
                _.forOwn(answers[field], (answer, subField) => {
                    const name = `${field}.${subField}`;
                    const question = customSectionsMap[name];
                    const error = _CustomValidator.validate({
                        fieldType: question.fieldType,
                        fieldOptions: question.settings,
                        fieldLabel: question.label,
                        required: question.fieldRequired
                    })(answer);
                    if (error) {
                        errors[name] = error;
                    } else {
                        if (result.hasOwnProperty(field)) {
                            result[field][subField] = answer;
                        } else {
                            result[field] = {
                                [subField]: answer
                            };
                        }
                    }
                });
            } else {
                console.log('Extra field in validation: ' + field, answer);
            }
        });

        return result;
    },
    buildAggregation: (eventId, userId, qp) => {
        const aggregationSteps = [];

        /** Match the event id first to reduce results */
        aggregationSteps.push({
            $match: {
                event: mongoose.Types.ObjectId(eventId.toString())
            }
        });

        /** If only assigned to self, match that first */
        if (qp.selfAssignedOnly === 'true') {
            aggregationSteps.push({
                $match: {
                    assignedTo: userId
                }
            });
        }

        /** Match indexed filters first */
        if (qp.notRatedOnly === 'true') {
            aggregationSteps.push({
                $match: {
                    rating: {
                        $exists: false
                    }
                }
            });
        }

        if (qp.notAssignedOnly === 'true') {
            aggregationSteps.push({
                $match: {
                    assignedTo: {
                        $exists: false
                    }
                }
            });
        }

        /** Apply rating filters if specified */
        if (qp.ratingMin || qp.ratingMax) {
            if (qp.ratingMin && qp.ratingMax) {
                aggregationSteps.push({
                    $match: {
                        rating: {
                            $gte: parseInt(qp.ratingMin),
                            $lte: parseInt(qp.ratingMax)
                        }
                    }
                });
            } else if (qp.ratingMin) {
                aggregationSteps.push({
                    $match: {
                        rating: {
                            $gte: parseInt(qp.ratingMin)
                        }
                    }
                });
            } else {
                aggregationSteps.push({
                    $match: {
                        rating: {
                            $lte: parseInt(qp.ratingMax)
                        }
                    }
                });
            }
        }

        /** If searching results, match the search */
        if (qp.searchField && qp.searchValue) {
            aggregationSteps.push({
                $match: {
                    [`answers.${qp.searchField}`]: qp.searchValue
                }
            });
        }

        if (qp.hasTags && qp.hasTags.length) {
            aggregationSteps.push({
                $match: {
                    tags: {
                        $in: qp.hasTags
                    }
                }
            });
        }

        /** If filtering by fields existing, do that last */
        if (qp.hasFields && qp.hasFields.length) {
            const match = {};
            qp.hasFields.forEach(fieldName => {
                match['answers.' + fieldName] = {
                    $exists: true
                };
            });
            aggregationSteps.push({
                $match: match
            });
        }

        /** Sort the results based on */
        aggregationSteps.push({
            $sort: {
                createdAt: 1
            }
        });

        /** Last, limit the data if limit specified*/
        if (qp.limit) {
            aggregationSteps.push({
                $limit: parseInt(qp.limit)
            });
        }

        return aggregationSteps;
    }
};

module.exports = RegistrationHelpers;

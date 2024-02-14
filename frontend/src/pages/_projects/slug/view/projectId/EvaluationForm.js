import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from 'components/generic/Button'
import { Box, Typography } from '@material-ui/core'
import RadioScore from 'components/generic/RadioScore'
import TextAreaInput from 'components/inputs/TextAreaInput'
import FormControl from 'components/inputs/FormControl'
import BottomBar from 'components/inputs/BottomBar'
import _ from 'lodash'

const EvaluationForm = ({
    event,
    project,
    submit = () => {},
    score,
    scoreCriteria,
}) => {
    console.log('Score from eval form', score)

    const allScoresSet = evalScores => {
        const scoreList = evalScores.map(value => {
            return value?.score ? value.score : null
        })
        return _.every(scoreList, _.isNumber)
    }

    const calculateScore = (criterias, decimalPlaces) => {
        const multiplier = Math.pow(10, decimalPlaces)
        console.log('Multiplier', multiplier)
        const scoreAverage =
            criterias.reduce((acc, curr) => {
                if (!curr.score) return acc
                return curr.score + acc
            }, 0) / criterias.length
        console.log('Score average before format', scoreAverage)
        const scoreAverageFormatted =
            Math.floor(scoreAverage * multiplier) / multiplier
        console.log('Score average', scoreAverageFormatted)
        return scoreAverageFormatted
    }

    if (
        scoreCriteria &&
        scoreCriteria.length > 0 &&
        score.scoreCriteria.length > 0
    ) {
        const scoreFiltered = score.scoreCriteria.filter(criteria =>
            _.includes(
                scoreCriteria.map(crit => crit.criteria),
                criteria.criteria,
            ),
        )

        score.scoreCriteria = scoreFiltered
    }

    // if (score.scoreCriteria.map) {

    return (
        <>
            <Formik
                initialValues={{ ...score }}
                // initialValues={{
                //     ...score,
                //     scoreCriteria: [
                //         { ...scoreCriteria, score: score.scoreCriteria.score },
                //     ],
                // }}
                enableReinitialize={true}
                onSubmit={submit}
            >
                {formikProps => {
                    console.log('formikProps from EvaluationForm', formikProps)
                    return (
                        <Form className="tw-flex tw-flex-col tw-gap-8">
                            <Field name="scoreCriteria">
                                {({ field, form }) => (
                                    <>
                                        <FormControl
                                            label="Project evaluation"
                                            hint="Assign a score to each criteria to
                                        calculate the final score"
                                            touched={
                                                form.touched[field.name] ||
                                                formikProps.submitCount > 0
                                            }
                                            error={form.errors[field.name]}
                                        >
                                            <div className="tw-flex tw-flex-col tw-gap-4">
                                                {field.value &&
                                                    scoreCriteria.map(
                                                        (
                                                            { criteria, label },
                                                            index,
                                                        ) => {
                                                            console.log(
                                                                'Field value at evaluationForm',
                                                                field.value,
                                                            )
                                                            return (
                                                                <RadioScore
                                                                    key={
                                                                        criteria
                                                                    }
                                                                    category={
                                                                        criteria
                                                                    }
                                                                    label={
                                                                        label
                                                                    }
                                                                    value={
                                                                        field
                                                                            .value[
                                                                            index
                                                                        ]
                                                                            ? field
                                                                                  .value[
                                                                                  index
                                                                              ]
                                                                                  .score
                                                                            : null
                                                                    }
                                                                    onSelectionChange={score => {
                                                                        form.setFieldTouched(
                                                                            field.name,
                                                                        )
                                                                        const updatedField =
                                                                            field.value
                                                                        console.log(
                                                                            'From updated field at eval form',
                                                                            updatedField,
                                                                        )
                                                                        if (
                                                                            !updatedField[
                                                                                index
                                                                            ]
                                                                        ) {
                                                                            updatedField[
                                                                                index
                                                                            ] =
                                                                                {
                                                                                    criteria,
                                                                                    label,
                                                                                }
                                                                        }
                                                                        updatedField[
                                                                            index
                                                                        ].score =
                                                                            score
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            updatedField,
                                                                        )
                                                                        const updatedScore =
                                                                            calculateScore(
                                                                                updatedField,
                                                                                2,
                                                                            )

                                                                        if (
                                                                            allScoresSet(
                                                                                updatedField,
                                                                            )
                                                                        ) {
                                                                            form.setFieldValue(
                                                                                'score',
                                                                                updatedScore,
                                                                            )
                                                                        }
                                                                        return
                                                                    }}
                                                                />
                                                            )
                                                        },
                                                    )}
                                            </div>
                                        </FormControl>
                                    </>
                                )}
                            </Field>
                            <Field name="score">
                                {({ field, form }) => (
                                    <div className="tw-flex tw-gap-2">
                                        <Typography
                                            className="tw-font-semibold"
                                            variant="body1"
                                            component="p"
                                        >
                                            Final project score:
                                        </Typography>
                                        {field.value > 0 ? (
                                            <Typography
                                                variant="body1"
                                                component="p"
                                            >
                                                {field.value}
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="body1"
                                                component="p"
                                            >
                                                First assign a score to each
                                                criteria
                                            </Typography>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <Field name="message">
                                {({ field, form }) => (
                                    <FormControl
                                        label="Message"
                                        hint="Share your feedback with the team"
                                        touched={
                                            form.touched[field.name] ||
                                            formikProps.submitCount > 0
                                        }
                                        error={form.errors[field.name]}
                                    >
                                        <TextAreaInput
                                            value={field.value}
                                            placeholder="This project is great because..."
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value,
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(field.name)
                                            }
                                        />
                                    </FormControl>
                                )}
                            </Field>
                            <Box p={2} />
                            <BottomBar
                                onSubmit={formikProps.handleSubmit}
                                errors={formikProps.errors}
                                dirty={formikProps.dirty}
                                loading={formikProps.isSubmitting}
                            />
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default EvaluationForm

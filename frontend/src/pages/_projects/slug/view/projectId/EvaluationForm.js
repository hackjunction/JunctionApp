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

    const calculateScore = criterias => {
        return (
            criterias.reduce((acc, curr) => {
                if (!curr.score) return acc
                return curr.score + acc
            }, 0) / criterias.length
        )
    }

    return (
        <>
            <Formik
                initialValues={{ ...score }}
                enableReinitialize={true}
                onSubmit={submit}
            >
                {formikProps => {
                    console.log(formikProps)
                    return (
                        <Form className="tw-flex tw-flex-col tw-gap-8">
                            <Field name="scoreCriteria">
                                {({ field, form }) => (
                                    <>
                                        {console.log(
                                            'Field value for scoreCriteria',
                                            field.value,
                                        )}
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
                                            {field.value &&
                                                field.value.length > 0 &&
                                                scoreCriteria.map(
                                                    (
                                                        { criteria, label },
                                                        index,
                                                    ) => {
                                                        return (
                                                            <RadioScore
                                                                category={
                                                                    criteria
                                                                }
                                                                label={label}
                                                                value={
                                                                    field.value[
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
                            {/* <Button
                                color="theme_turquoise"
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Save
                            </Button> */}
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default EvaluationForm

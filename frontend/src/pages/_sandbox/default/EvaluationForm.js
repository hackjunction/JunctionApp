import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from 'components/generic/Button'
import { Box, Typography } from '@material-ui/core'
import RadioScore from 'components/generic/RadioScore'
import TextAreaInput from 'components/inputs/TextAreaInput'
import FormControl from 'components/inputs/FormControl'

const scoreCriteria = [
    {
        criteria: 'creativity',
        label: 'Creativity',
    },
    {
        criteria: 'innovation',
        label: 'Innovation',
    },
    {
        criteria: 'problemSolving',
        label: 'Problem Solving',
    },
    {
        criteria: 'companyFit',
        label: 'Company Fit',
    },
    {
        criteria: 'teamwork',
        label: 'Teamwork',
    },
]

const EvaluationForm = ({ event, project, submit = () => {}, score }) => {
    const [currentScore, setCurrentScore] = useState(0)

    const calculateScore = criterias => {
        return (
            criterias.reduce((acc, curr) => {
                if (!curr.score) return null
                return curr.score + acc
            }, 0) / criterias.length
        )
    }

    return (
        <>
            <Formik
                initialValues={{ ...score, scoreCriteria }}
                enableReinitialize={true}
                onSubmit={values => {
                    values.score = calculateScore(values.scoreCriteria)
                    console.log('This are the values submitted', values)
                    submit()
                }}
            >
                {formikProps => {
                    const { isSubmitting } = formikProps
                    console.log(formikProps)
                    return (
                        <Form className="tw-flex tw-flex-col tw-gap-8">
                            <Field name={'scoreCriteria'}>
                                {({ field, form }) => (
                                    <>
                                        {scoreCriteria.map(
                                            ({ criteria, label }, index) => {
                                                return (
                                                    <RadioScore
                                                        category={criteria}
                                                        label={label}
                                                        onSelectionChange={score => {
                                                            const criteriaIndex =
                                                                field.value.findIndex(
                                                                    c =>
                                                                        c.criteria ===
                                                                        criteria,
                                                                )
                                                            const updatedField =
                                                                field.value
                                                            updatedField[
                                                                criteriaIndex
                                                            ].score = score
                                                            form.setFieldValue(
                                                                field.name,
                                                                updatedField,
                                                            )
                                                            setCurrentScore(
                                                                calculateScore(
                                                                    updatedField,
                                                                ),
                                                            )
                                                        }}
                                                    />
                                                )
                                            },
                                        )}
                                    </>
                                )}
                            </Field>
                            <div className="tw-flex tw-gap-2">
                                <Typography
                                    className="tw-font-semibold"
                                    variant="body1"
                                    component="p"
                                >
                                    Final project score:
                                </Typography>
                                {currentScore > 0 ? (
                                    <Typography variant="body1" component="p">
                                        {currentScore}
                                    </Typography>
                                ) : (
                                    <Typography variant="body1" component="p">
                                        Assign a score to each criteria to
                                        calculate the final score
                                    </Typography>
                                )}
                            </div>
                            <ErrorMessage name="score" component="div" />
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
                                    // <TextField label="Message" {...field} />
                                )}
                            </Field>
                            <ErrorMessage name="message" component="div" />
                            <Box p={2} />
                            <Button
                                color="theme_turquoise"
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Save
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default EvaluationForm

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from 'components/generic/Button'

import { Box, TextField } from '@material-ui/core'

const ScoreForm = ({ event, project, submit }) => {
    const initalProjectValues = {
        project: project._id,
        event: event._id,
        scoreGiver: '',
        status: 'submitted',
        score: 0,
        maxScore: 10,
        message: '',
    }

    return (
        <>
            <Formik
                initialValues={{ ...initalProjectValues }}
                enableReinitialize={true}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field name="scoreGiver">
                            {({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Name"
                                    required={true}
                                    {...field}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="score" component="div" />
                        <Field name="score">
                            {({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Score"
                                    type="number"
                                    {...field}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="score" component="div" />
                        <Field name="message">
                            {({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Message"
                                    {...field}
                                />
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
                )}
            </Formik>
        </>
    )
}

export default ScoreForm

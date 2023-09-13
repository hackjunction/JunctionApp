import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from 'components/generic/Button'
import junctionStyle from 'utils/styles'

import {
    Box,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@material-ui/core'
import RadioScore from 'components/generic/RadioScore'
import TextAreaInput from 'components/inputs/TextAreaInput'
import FormControl from 'components/inputs/FormControl'

const evaluationCriteria = [
    'creativity',
    'innovation',
    'problemSolving',
    'companyFit',
    'teamwork',
]

const EvaluationFormForm = ({ event, project, submit = () => {}, score }) => {
    const classes = junctionStyle()

    const [selectedValue, setSelectedValue] = useState('5')
    const [selectedIndex, setSelectedIndex] = useState(4)

    const handleChange = (event, index) => {
        setSelectedValue(event.target.value)
        setSelectedIndex(index)
    }

    return (
        <>
            <div>
                {/* {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(i => (
                    <Radio
                        checked={selectedValue === i}
                        onChange={handleChange}
                        value={i}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': i }}
                    />
                ))} */}
                {/* <Radio
                    checked={selectedValue === 'b'}
                    onChange={handleChange}
                    value="b"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'B' }}
                />
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'C' }}
                />
                <Radio
                    checked={selectedValue === 'd'}
                    onChange={handleChange}
                    value="d"
                    color="default"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'D' }}
                />
                <Radio
                    checked={selectedValue === 'e'}
                    onChange={handleChange}
                    value="e"
                    color="default"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'E' }}
                    size="small"
                /> */}
            </div>
            <Formik
                initialValues={{ ...score }}
                enableReinitialize={true}
                onSubmit={values => {
                    values.score =
                        evaluationCriteria.reduce(
                            (acc, curr) => values[curr] + acc,
                            0,
                        ) / evaluationCriteria.length
                    console.log('This are the values submitted', values)
                    submit()
                }}
            >
                {formikProps => {
                    const { isSubmitting } = formikProps
                    console.log(formikProps)
                    return (
                        <Form className="tw-flex tw-flex-col tw-gap-8">
                            {evaluationCriteria.map(category => {
                                return <RadioScore category={category} />
                            })}
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

export default EvaluationFormForm

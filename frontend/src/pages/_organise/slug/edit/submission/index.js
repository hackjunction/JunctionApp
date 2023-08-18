import React, { useState } from 'react'
import Section from './section'
import {
    ErrorMessage,
    FastField,
    Field,
    FieldArray,
    Form,
    Formik,
    useFormikContext,
} from 'formik'
import { Grid } from '@material-ui/core'

import FormControl from 'components/inputs/FormControl'
import CustomSectionList from '../questions/CustomSectionList'

import CustomSectionListItem from '../questions/CustomSectionList/CustomSectionListItem'
import TempFieldBuilder from './components/TempFieldBuilder'
import AltSection from './AltSection'

const initialValues = {}

const renderField = index => {
    return (
        <div className="col">
            <label htmlFor={`submissionFormQuestions.${index}.heading`}>
                Heading
            </label>
            <Field
                name={`submissionFormQuestions.${index}.heading`}
                placeholder="Heading"
                type="text"
            />
            <ErrorMessage
                name={`submissionFormQuestions.${index}.heading`}
                component="div"
                className="field-error"
            />
        </div>
    )
}

export default () => {
    // const [sections, setSections] = useState([1])
    const formikCont = useFormikContext()
    // console.log('From submission page, complete formikContext:', formikCont)
    const { values } = formikCont
    // const handleAddSection = () => {
    //     setSections([...sections, sections.length + 1])
    //     console.log(sections)
    // }

    // TODO fix issue where removing a section is removing the wrong element because current method uses index instead of a unique identifier
    // const handleRemoveSection = index => {
    //     setSections(sections.filter((_, i) => i !== index))
    // }

    return (
        <>
            {/* <h1 className="tw-text-gray-800 tw-font-bold tw-text-2xl">
                Submission form builder
            </h1> */}
            {/* <FieldArray name="submissionFormQuestions">
                {({ remove, push }) => (
                    <div>
                        {values.submissionFormQuestions?.length > 0 &&
                            values.submissionFormQuestions.map(
                                (formQuestion, index) => (
                                    <div key={index}>
                                        {renderField(index)}

                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                ),
                            )}
                        <button
                            type="button"
                            onClick={() => push({ name: '' })}
                        >
                            Add new question
                        </button>
                    </div>
                )}
            </FieldArray>
            {sections.map((_, index) => (
                <div key={index} className="tw-mt-4">
                    <AltSection
                        onChange={() => {}}
                        onRemove={() => handleRemoveSection(index)}
                        fieldName={`form_submission_${index}`}
                    />
                </div>
            ))} */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FastField
                        name="submissionFormQuestions"
                        render={({ field, form }) => (
                            <FormControl
                                label="Submission form builder"
                                hint="Add custom questions to the project submission form. These questions will be asked to the user when they submit a project."
                            >
                                <CustomSectionList
                                    sections={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                />
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>
            {/* DELETE AFTER testing area  */}
            <button onClick={() => console.log(values)}>Test</button>
        </>
    )
}

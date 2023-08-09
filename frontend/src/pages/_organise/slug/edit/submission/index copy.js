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
import FormControl from 'components/inputs/FormControl'
import CustomSectionList from '../questions/CustomSectionList'
import CustomSectionListItem from '../questions/CustomSectionList/CustomSectionListItem'
import TempFieldBuilder from './components/TempFieldBuilder'
import AltSection from './AltSection'

const initialValues = {}

export default () => {
    const [sections, setSections] = useState([1])
    const formikCont = useFormikContext()
    console.log('From submission page, complete formikContext:', formikCont)
    const { values, submitForm } = formikCont
    const handleAddSection = () => {
        setSections([...sections, sections.length + 1])
        console.log(sections)
    }

    // TODO fix issue where removing a section is removing the wrong element because current method uses index instead of a unique identifier
    const handleRemoveSection = index => {
        setSections(sections.filter((_, i) => i !== index))
    }

    return (
        <>
            <h1>
                <span className="tw-text-gray-800 tw-font-bold tw-text-2xl">
                    Submission form builder
                </span>
            </h1>
            <FieldArray
                name="friends"
                render={arrayHelpers => (
                    <div>
                        {values.friends && values.friends.length > 0 ? (
                            values.friends.map((friend, index) => (
                                <div key={index}>
                                    <Field name={`friends.${index}`} />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            arrayHelpers.remove(index)
                                        } // remove a friend from the list
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            arrayHelpers.insert(index, '')
                                        } // insert an empty string at a position
                                    >
                                        +
                                    </button>
                                </div>
                            ))
                        ) : (
                            <button
                                type="button"
                                onClick={() => arrayHelpers.push('')}
                            >
                                {/* show this when user has removed all friends from the list */}
                                Add a friend
                            </button>
                        )}
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                )}
            />
            {/* <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    alert(JSON.stringify(values))
                }}
            >
            {({ values }) => (
                <> */}

            {/* <FastField name={'submissionFormQuestions'}>
                {({ field, form }) =>
                    sections.map((_, index) => (
                        <div key={index} className="tw-mt-4">
                            <AltSection
                                onChange={() => {}}
                                onRemove={() => handleRemoveSection(index)}
                                fieldName={`form_submission_${index}`}
                            />
                        </div>
                    ))
                }
            </FastField> */}
            {/* </>
            )}
            </Formik> */}

            <Formik
                initialValues={initialValues}
                onSubmit={async values => {
                    await new Promise(r => setTimeout(r, 500))
                    alert(JSON.stringify(values, null, 2))
                }}
            >
                {({ values }) => (
                    <FieldArray name="friends">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.friends?.length > 0 &&
                                    values.friends.map((friend, index) => (
                                        <div className="row" key={index}>
                                            <div className="col">
                                                <label
                                                    htmlFor={`friends.${index}.name`}
                                                >
                                                    Name
                                                </label>
                                                <Field
                                                    name={`friends.${index}.name`}
                                                    placeholder="Jane Doe"
                                                    type="text"
                                                />
                                                <ErrorMessage
                                                    name={`friends.${index}.name`}
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                            <div className="col">
                                                <label
                                                    htmlFor={`friends.${index}.email`}
                                                >
                                                    Email
                                                </label>
                                                <Field
                                                    name={`friends.${index}.email`}
                                                    placeholder="jane@acme.com"
                                                    type="email"
                                                />
                                                <ErrorMessage
                                                    name={`friends.${index}.name`}
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                            <div className="col">
                                                <button
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                <button
                                    type="button"
                                    className="secondary"
                                    onClick={() =>
                                        push({ name: '', email: '' })
                                    }
                                >
                                    Add Friend
                                </button>
                            </div>
                        )}
                    </FieldArray>
                )}
            </Formik>

            <button type="submit">Invite</button>

            {/* <button
                className="tw-mt-4 tw-bg-blue-500 tw-text-white tw-rounded-lg tw-px-4 tw-py-2 tw-cursor-pointer tw-shadow-md hover:tw-bg-blue-600"
                onClick={handleAddSection}
            >
                Add Section
            </button> */}
        </>
    )
}

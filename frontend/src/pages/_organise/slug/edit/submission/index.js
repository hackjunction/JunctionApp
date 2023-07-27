import React, { useState } from 'react'
import Section from './section'
import { FastField } from 'formik'
import FormControl from 'components/inputs/FormControl'
import CustomSectionList from '../questions/CustomSectionList'
import CustomSectionListItem from '../questions/CustomSectionList/CustomSectionListItem'
import TempFieldBuilder from './components/TempFieldBuilder'
// import { Formik } from 'formik'

export default () => {
    const [sections, setSections] = useState([1])

    const handleAddSection = () => {
        setSections([...sections, sections.length + 1])
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
            {sections.map((_, index) => (
                <div key={index} className="tw-mt-4">
                    <Section
                        onChange={() => {}}
                        onRemove={() => handleRemoveSection(index)}
                        fieldName={`form_submission_${index}`}
                    />
                </div>
            ))}
            {/* <FastField
                name="submissionFormFields"
                render={({ field, form }) => (
                    <FormControl
                        label="Custom questions"
                        hint="Add custom registration questions"
                    >
                        <CustomSectionList
                            sections={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                        />
                    </FormControl>
                )}
            /> */}
            {/* <CustomSectionListItem
                key={'123'}
                section={[
                    {
                        questions: ['test', 'there'],
                        label: 'label test',
                        description: 'description test',
                        conditional: false,
                    },
                ]}
                onChange={() => {}}
                onRemove={() => {}}
                onMoveUp={() => {}}
                onMoveDown={() => {}}
                onEdit={() => {}}
                isFirst={true}
                isLast={true}
                // onChange={section => handleChange(section, index)}
                // onRemove={() => handleRemove(section, index)}
                // onMoveUp={() => handleMoveUp(section, index)}
                // onMoveDown={() => handleMoveDown(section, index)}
                // onEdit={() => setEditing(section)}
                // isFirst={index === 0}
                // isLast={index === sections.length - 1}
            /> */}
            <FastField name="submissionFormFields">
                {({ field, form }) => <TempFieldBuilder />}
            </FastField>
            {/* render={({ field, form }) => (
                        <FormControl
                            label="Custom questions"
                            hint="Add custom registration questions"
                        >
                            <CustomSectionList
                                sections={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                            />
                        </FormControl>
                    )}
                /> */}
            <button
                className="tw-mt-4 tw-bg-blue-500 tw-text-white tw-rounded-lg tw-px-4 tw-py-2 tw-cursor-pointer tw-shadow-md hover:tw-bg-blue-600"
                onClick={handleAddSection}
            >
                Add Section
            </button>
        </>
    )
}

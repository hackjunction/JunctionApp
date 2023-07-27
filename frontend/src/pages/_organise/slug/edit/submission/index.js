import React, { useState } from 'react'
import Section from './section'
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
            <button
                className="tw-mt-4 tw-bg-blue-500 tw-text-white tw-rounded-lg tw-px-4 tw-py-2 tw-cursor-pointer tw-shadow-md hover:tw-bg-blue-600"
                onClick={handleAddSection}
            >
                Add Section
            </button>
        </>
    )
}

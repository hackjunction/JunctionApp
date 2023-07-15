import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import Section from './section'
import BottomBar from 'components/inputs/BottomBar'

export default () => {
    const [sections, setSections] = useState([1])
    const [hasChanges, setHasChanges] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const { ...formikProps } = useFormikContext()

    const handleAddSection = () => {
        setSections([...sections, sections.length + 1])
        setHasChanges(true)
    }

    const handleRemoveSection = index => {
        setSections(sections.filter((_, i) => i !== index))
        setHasChanges(true)
    }

    const onSubmit = () => {
        // save changes
        setHasChanges(false)
        setLoading(false)
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
                        onRemove={() => handleRemoveSection(index)}
                        fieldName={`section_${index}`}
                        onChange={() => setHasChanges(true)}
                        {...formikProps}
                    />
                </div>
            ))}
            <button
                className="tw-mt-4 tw-bg-blue-500 tw-text-white tw-rounded-lg tw-px-4 tw-py-2 tw-cursor-pointer tw-shadow-md hover:tw-bg-blue-600"
                onClick={handleAddSection}
            >
                Add Section
            </button>
            <BottomBar
                errors={errors}
                dirty={hasChanges}
                onSubmit={onSubmit}
                loading={loading}
                submitLabel="Apply Changes"
            />
        </>
    )
}

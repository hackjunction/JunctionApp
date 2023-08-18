// Section.js
import React, { useState } from 'react'
import { Field } from 'formik'
import TextInput from './components/inputs/TextInput'
import FileInput from './components/inputs/FileInput'
import UrlInput from './components/inputs/UrlInput'
import EditableOptions from './components/EditableOptions'
import EditableText from './components/section/EditableText'
import Dropdown from './components/section/Dropdown'
import RemoveButton from './components/section/RemoveButton'
import BooleanInput from './components/inputs/BooleanInput'
import Switch from './components/Switch'

const Section = ({
    initialData = {
        label: 'A label',
        hint: 'A hint',
        fieldType: 'text',
        placeholder: 'A placeholder',
    },
    onRemove,
    fieldName,
    onChange,
    ...props
}) => {
    const [checked, setChecked] = useState(false)
    const [fieldType, setFieldType] = useState(initialData.fieldType)
    const [label, setLabel] = useState(initialData.label)
    const [hint, setHint] = useState(initialData.hint)

    const [booleanChecked, setBooleanChecked] = useState(false)

    const handleBooleanChange = event => {
        setBooleanChecked(event.target.checked)
    }

    const [singleChoiceOptions, setSingleChoiceOptions] = useState([
        'Option 1',
        'Option 2',
        'Option 3',
    ])
    const [multiChoiceOptions, setMultiChoiceOptions] = useState([
        'Option 1',
        'Option 2',
        'Option 3',
    ])

    const inputConfig = {
        text: {
            component: TextInput,
            placeholder: 'Placeholder',
        },
        file: {
            component: FileInput,
            placeholder: 'Placeholder',
        },
        url: {
            component: UrlInput,
            placeholder: 'Placeholder',
        },
        boolean: {
            component: BooleanInput,
            checked: booleanChecked,
            onChange: handleBooleanChange,
        },
        singleChoice: {
            component: EditableOptions,
            options: singleChoiceOptions,
            handleAddOption: option => {
                setSingleChoiceOptions([...singleChoiceOptions, option])
            },
            handleEdit: (index, option) => {
                const newOptions = singleChoiceOptions.slice()
                newOptions[index] = option
                setSingleChoiceOptions(newOptions)
            },
            handleDelete: index => {
                const newOptions = singleChoiceOptions.slice()
                newOptions.splice(index, 1)
                setSingleChoiceOptions(newOptions)
            },
        },
        multiChoice: {
            component: EditableOptions,
            options: multiChoiceOptions,
            handleAddOption: option => {
                setMultiChoiceOptions([...multiChoiceOptions, option])
            },
            handleEdit: (index, option) => {
                const newOptions = multiChoiceOptions.slice()
                newOptions[index] = option
                setMultiChoiceOptions(newOptions)
            },
            handleDelete: index => {
                const newOptions = multiChoiceOptions.slice()
                newOptions.splice(index, 1)
                setMultiChoiceOptions(newOptions)
            },
        },
    }

    const renderInput = fieldType => {
        const inputProps = inputConfig[fieldType]
        if (!inputProps) return null

        const InputComponent = inputProps.component
        delete inputProps.component

        return (
            <Field name={fieldName}>
                {({ field, form }) => (
                    <InputComponent
                        {...inputProps}
                        {...field}
                        onChange={value => {
                            form.setFieldValue(fieldName, value)
                            if (inputProps.onChange) {
                                inputProps.onChange(value)
                            }
                        }}
                        onBlur={form.handleBlur}
                    />
                )}
            </Field>
        )
    }

    return (
        <div className="tw-p-4 tw-bg-white tw-rounded-lg tw-shadow-md">
            <div className="tw-flex tw-flex-col">
                <EditableText
                    value={label}
                    save={value => {
                        setLabel(value)
                        onChange()
                    }}
                    className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                    type="heading"
                />
                <EditableText
                    value={hint}
                    save={value => {
                        setHint(value)
                        onChange()
                    }}
                    className="tw-text-gray-500 tw-italic tw-my-1"
                    type=""
                />
                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-4 tw-justify-between">
                    <div className="tw-w-full sm:tw-w-4/5 tw-flex tw-flex-col tw-gap-4">
                        {renderInput(fieldType)}
                        <Switch
                            onChange={setChecked}
                            checked={checked}
                            checkedText="Yes"
                            uncheckedText="No"
                        />
                    </div>
                    <div className="tw-w-full sm:tw-w-1/5 tw-flex tw-flex-col tw-gap-4">
                        <Dropdown
                            value={fieldType}
                            onChange={setFieldType}
                            placeholder="Input type"
                            options={[
                                { value: 'text', label: 'Text' },
                                { value: 'file', label: 'File' },
                                { value: 'url', label: 'URL' },
                                { value: 'boolean', label: 'Boolean' },
                                {
                                    value: 'singleChoice',
                                    label: 'Single Choice',
                                },
                                { value: 'multiChoice', label: 'Multi Choice' },
                            ]}
                        />

                        <RemoveButton onRemove={onRemove} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section

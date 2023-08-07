import React, { useState, useCallback, useEffect } from 'react'

import { isEmpty } from 'lodash-es'

import { makeStyles } from '@material-ui/core/styles'
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core'

import Dropdown from './section/Dropdown'
import Switch from './Switch'
import TextInput from './inputs/TextInput'
import Button from 'components/generic/Button'
import Checkbox from './section/Checkbox'
import EditableOptions from './EditableOptions'

const initialData = {
    label: '',
    hint: '',
    settings: {
        options: [],
    },
    fieldRequired: false,
    fieldType: 'text',
}

const useStyles = makeStyles(theme => ({
    label: {
        fontWeight: 'bold',
    },
}))

export default ({
    initialValue = initialData,
    sectionName,
    visible,
    onVisibleChange,
    reservedNames,
    onSubmit,
    onEditDone,
    onEditCancel,
    editing,
}) => {
    const classes = useStyles()
    const [data, setData] = useState(initialValue)

    useEffect(() => {
        if (editing) {
            setData(editing)
        }
    }, [editing])

    const reset = () => {
        setData(initialData)
    }

    const validate = () => {
        // ! This only apply to the submission form, not the registration form
        if (data.fieldType === 'attachment') {
            if (
                data.settings.maxSize === undefined ||
                data.settings.maxSize === null
            ) {
                return 'Max size is required for attachment type'
            }

            if (typeof data.settings.maxSize !== 'number') {
                return 'Max size must be a number'
            }

            if (!Number.isInteger(data.settings.maxSize)) {
                return 'Max size must be an integer'
            }

            if (data.settings.maxSize <= 0) {
                return 'Max size must be greater than 0'
            }
            if (data.settings.maxSize > 100) {
                return 'Max size must be less than 100'
            }
        }
        // ! ----------------------------------------------------------------
        if (isEmpty(data.label)) {
            return 'Label is required'
        }

        if (data.label.length > 100) {
            return 'Label can be at most 100 characters'
        }

        if (isEmpty(data.fieldType)) {
            return 'Please choose a question type'
        }

        if (!/^[a-z-]*$/.test(data.name)) {
            return 'Machine name can only contain lowercase characters and dashes (-)'
        }

        if (!editing) {
            if (reservedNames.indexOf(data.name) !== -1) {
                return `This section already contains a question with the machine name ${data.name}, please use something else`
            }
        }

        return
    }

    const handleAdd = () => {
        const error = validate()
        if (error) {
            window.alert(error)
        } else {
            onSubmit(data)
            onVisibleChange(false)
        }
        reset()
    }

    const handleEdit = () => {
        const error = validate()
        if (error) {
            window.alert(error)
        } else {
            onEditDone(data)
        }
    }

    const handleCancel = () => {
        if (editing) {
            onEditCancel()
        } else {
            onVisibleChange(false)
        }
        reset()
    }

    const handleChange = useCallback(
        (field, value) => {
            setData({
                ...data,
                [field]: value,
            })
        },
        [data],
    )

    const renderPlaceholderInput = () => {
        return (
            <>
                <Typography variant="body1" className={classes.label}>
                    Placeholder
                </Typography>
                <TextInput
                    placeholder="Your favorite animal here"
                    value={data.placeholder}
                    onChange={value => handleChange('placeholder', value)}
                />
                <Typography variant="caption" paragraph>
                    Text to show in the field if it's empty
                </Typography>
            </>
        )
    }

    const renderFieldTypeOptions = () => {
        switch (data.fieldType) {
            case 'multiple-choice':
            case 'single-choice': {
                return (
                    <>
                        <Typography variant="body1" className={classes.label}>
                            Options to choose from
                        </Typography>
                        <EditableOptions
                            options={
                                data.settings.options
                                    ? data.settings.options
                                    : []
                            }
                            handleAddOption={value =>
                                handleChange('settings', {
                                    ...data.settings,
                                    options: [...data.settings.options, value],
                                })
                            }
                            handleEdit={(index, value) => {
                                const updatedOptions = [
                                    ...data.settings.options,
                                ]
                                updatedOptions[index] = value
                                handleChange('settings', {
                                    ...data.settings,
                                    options: updatedOptions,
                                })
                            }}
                            handleDelete={index => {
                                const updatedOptions = [
                                    ...data.settings.options,
                                ]
                                updatedOptions.splice(index, 1)
                                handleChange('settings', {
                                    ...data.settings,
                                    options: updatedOptions,
                                })
                            }}
                        />
                        <Typography variant="caption" paragraph>
                            Enter options to choose
                        </Typography>
                        {renderPlaceholderInput()}
                    </>
                )
            }
            case 'checkbox':
            case 'boolean': {
                return (
                    <>
                        <Typography variant="body1" className={classes.label}>
                            Default value
                        </Typography>
                        <Switch
                            checked={data.settings.default || false}
                            onChange={value =>
                                handleChange('settings', {
                                    ...data.settings,
                                    default: value,
                                })
                            }
                            checkedText="Yes"
                            uncheckedText="No"
                        />
                        <Typography variant="caption" paragraph>
                            Is this field checked/yes by default?
                        </Typography>
                    </>
                )
            }

            // ! This only apply to the submission form, not the registration form
            case 'attachment': {
                return (
                    <>
                        <Typography variant="body1" className={classes.label}>
                            Maximum file size
                        </Typography>
                        <TextInput
                            placeholder="10"
                            value={data.settings.maxSize || ''}
                            onChange={value =>
                                handleChange('settings', {
                                    ...data.settings,
                                    maxSize: parseInt(value, 10), // parse value to integer
                                })
                            }
                            width="tw-w-1/4"
                        />
                        <Typography variant="caption" paragraph>
                            Maximum file size in megabytes
                        </Typography>
                        <Typography variant="body1" className={classes.label}>
                            Allowed file types
                        </Typography>
                        <Checkbox
                            options={['pdf', 'docx', 'jpg', 'png', 'gif']} // Add all the file types you want to allow
                            selectedOptions={data.settings.allowedTypes || []}
                            onChange={value =>
                                handleChange('settings', {
                                    ...data.settings,
                                    allowedTypes: value,
                                })
                            }
                        />
                        <Typography variant="caption" paragraph>
                            Allowed file types, select multiple options
                        </Typography>
                    </>
                )
            }
            // ! ----------------------------------------------------------------
            case 'Link': {
                return (
                    <>
                        <Typography variant="body1" className={classes.label}>
                            Link
                        </Typography>
                        <TextInput
                            placeholder="https://www.google.com"
                            value={data.settings.link || ''}
                            onChange={value =>
                                handleChange('settings', {
                                    ...data.settings,
                                    link: value,
                                })
                            }
                        />
                        <Typography variant="caption" paragraph>
                            Enter the link
                        </Typography>
                    </>
                )
            }
            default:
                return renderPlaceholderInput()
        }
    }

    return (
        <>
            <div>
                <Typography variant="body1" className={classes.label}>
                    Label
                </Typography>
                <TextInput
                    placeholder="What's your favorite animal?"
                    value={data.label}
                    onChange={value => handleChange('label', value)}
                />
                <Typography variant="caption" paragraph>
                    The name of your question
                </Typography>
                <Typography variant="body1" className={classes.label}>
                    Machine name
                </Typography>
                <TextInput
                    placeholder="favoriteAnimal"
                    disabled={editing}
                    value={data.name}
                    onChange={value => handleChange('name', value)}
                />
                <Typography variant="caption" paragraph>
                    A unique machine-readable name. This should be only letters,
                    and be written in camelCase: e.g. letterOfMotivation. This
                    field will not be visible to the end-user.
                </Typography>
                <div className="tw-flex tw-space-x-2 tw-items-center">
                    <Typography variant="body1" className={classes.label}>
                        Question type:
                    </Typography>
                    <Dropdown
                        value={data.fieldType}
                        onChange={value => handleChange('fieldType', value)}
                        placeholder="Choose one"
                        options={[
                            {
                                value: 'text',
                                label: 'Short text',
                            },
                            {
                                value: 'textarea',
                                label: 'Long text',
                            },
                            {
                                value: 'link',
                                label: 'Link',
                            },
                            {
                                value: 'attachment',
                                label: 'Attachment',
                            },
                            {
                                value: 'boolean',
                                label: 'Yes / No',
                            },
                            {
                                value: 'single-choice',
                                label: 'Single choice',
                            },
                            {
                                value: 'multiple-choice',
                                label: 'Multiple choice',
                            },
                        ]}
                    />
                </div>
                <Typography variant="caption" paragraph>
                    Choose question type to put in the submission form
                </Typography>
                {renderFieldTypeOptions()}
                <Typography variant="body1" className={classes.label}>
                    Hint
                </Typography>
                <TextInput
                    placeholder="Enter the name of your favorite animal in ALL CAPS for added effect"
                    value={data.hint}
                    onChange={value => handleChange('hint', value)}
                />
                <Typography variant="caption" paragraph>
                    Add an optional help text to show under the question label -
                    just like the one you're reading right now
                </Typography>
                <div className="tw-flex tw-space-x-2 tw-items-center">
                    <Typography variant="body1" className={classes.label}>
                        Required?
                    </Typography>
                    <Switch
                        checked={data.fieldRequired}
                        onChange={value => handleChange('fieldRequired', value)}
                        checkedText="Yes"
                        uncheckedText="No"
                    />
                </div>

                <Typography variant="caption" paragraph>
                    Users will not be able to submit the form without answering
                    this question, if it is required.
                </Typography>
            </div>
            <div>
                <Button
                    onClick={handleCancel}
                    color="theme_lightgray"
                    variant="contained"
                >
                    Cancel
                </Button>
                <Box p={1} />
                <Button
                    onClick={editing ? handleEdit : handleAdd}
                    color="primary"
                    variant="contained"
                >
                    {editing ? 'Save edits' : 'Add question'}
                </Button>
            </div>
        </>
    )
}

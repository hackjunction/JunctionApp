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

import Select from 'components/inputs/Select'
import BooleanInput from 'components/inputs/BooleanInput'
import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'

const initialData = {
    label: '',
    hint: '',
    settings: {},
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
        if (isEmpty(data.label)) {
            return 'Label is required'
        }

        if (data.label.length > 100) {
            return 'Label can be at most 100 characters'
        }

        if (isEmpty(data.fieldType)) {
            return 'Please choose a question type'
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
                        <TextInput
                            placeholder="Zebra,Hippopotamus,Giraffe"
                            value={
                                data.settings.options
                                    ? data.settings.options.join(',')
                                    : ''
                            }
                            onChange={value =>
                                handleChange('settings', {
                                    ...data.settings,
                                    options: value
                                        .split(',')
                                        .map(item => item.trim()),
                                })
                            }
                        />
                        <Typography variant="caption" paragraph>
                            Enter options to choose from, separated by a comma
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
                        <BooleanInput
                            value={data.settings.default || false}
                            onChange={value =>
                                handleChange('settings', {
                                    ...data.settings,
                                    default: value,
                                })
                            }
                        />
                        <Typography variant="caption" paragraph>
                            Is this field checked/yes by default?
                        </Typography>
                    </>
                )
            }
            default:
                return renderPlaceholderInput()
        }
    }

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={visible || editing}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                {editing
                    ? `Edit ${data.label}`
                    : `Add a new question under ${sectionName}`}
            </DialogTitle>
            <DialogContent>
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
                <Typography variant="body1" className={classes.label}>
                    Question type
                </Typography>
                <Select
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
                <Typography variant="caption" paragraph>
                    Which kind of answer do you want? Choose a type and you will
                    be presented with any available additional options
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
                <Typography variant="body1" className={classes.label}>
                    Is this question required?
                </Typography>
                <BooleanInput
                    value={data.fieldRequired}
                    onChange={value => handleChange('fieldRequired', value)}
                />
                <Typography variant="caption" paragraph>
                    Users will not be able to submit the form without answering
                    this question, if it is required.
                </Typography>
            </DialogContent>
            <DialogActions>
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
            </DialogActions>
        </Dialog>
    )
}

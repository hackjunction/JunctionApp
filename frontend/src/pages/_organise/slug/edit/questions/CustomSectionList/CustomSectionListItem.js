import React, { useState, useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Box,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Divider,
    ListItemText,
    ListItem,
    List,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Button from 'components/generic/Button'
import Markdown from 'components/generic/Markdown'
import AddQuestionModal from './AddQuestionModal'
import TextInput from '../../submission/components/inputs/TextInput'
import Section from '../../submission/section'
import EditableText from '../../submission/components/section/EditableText'
import Dropdown from '../../submission/components/section/Dropdown'
import Switch from '../../submission/components/Switch'
import EditableOptions from '../../submission/components/EditableOptions'
import Checkbox from '../../submission/components/section/Checkbox'

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: theme.spacing(2),
        background: 'white',
        boxShadow: '2px 7px 30px rgba(0, 0, 0, 0.12)',
        borderRadius: '7px',
        marginBottom: theme.spacing(2),
    },
    descriptionWrapper: {
        marginTop: theme.spacing(2),
    },
}))

export default ({
    section,
    onChange,
    onRemove,
    onEdit,
    onMoveDown,
    onMoveUp,
    index,
    isFirst,
    isLast,
}) => {
    const classes = useStyles()
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(undefined)
    const questions = section.questions || []
    const reservedNames = questions.map(q => q.name)

    const renderPlaceholderInput = question => {
        return (
            <>
                <Typography variant="body1" className={classes.label}>
                    Placeholder
                </Typography>
                <TextInput
                    placeholder="Your favorite animal here"
                    value={question.placeholder}
                    onChange={value =>
                        onChange({ ...question, placeholder: value })
                    }
                />
                <Typography variant="caption" paragraph>
                    Text to show in the field if it's empty
                </Typography>
            </>
        )
    }

    const renderFieldTypeOptions = question => {
        switch (question.fieldType) {
            case 'multiple-choice':
            case 'single-choice': {
                return (
                    <>
                        <Typography variant="body1" className={classes.label}>
                            Options to choose from
                        </Typography>
                        <EditableOptions
                            options={
                                question.settings.options
                                    ? question.settings.options
                                    : []
                            }
                            handleAddOption={value =>
                                handleEdit({
                                    ...question,
                                    settings: {
                                        options: [
                                            ...question.settings.options,
                                            value,
                                        ],
                                    },
                                })
                            }
                            handleEdit={(index, value) => {
                                console.log(index, value)
                                const updatedOptions = [
                                    ...question.settings.options,
                                ]
                                updatedOptions[index] = value
                                handleEdit({
                                    ...question,
                                    settings: {
                                        options: updatedOptions,
                                    },
                                })
                            }}
                            handleDelete={index => {
                                console.log(index)
                                const updatedOptions = [
                                    ...question.settings.options,
                                ]
                                updatedOptions.splice(index, 1)
                                handleEdit({
                                    ...question,
                                    settings: {
                                        options: updatedOptions,
                                    },
                                })
                            }}
                        />
                        <Typography variant="caption" paragraph>
                            Enter options to choose
                        </Typography>
                        {renderPlaceholderInput(question)}
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
                            checked={question.settings.default || false}
                            onChange={value =>
                                handleEdit({
                                    ...question,
                                    settings: {
                                        default: value,
                                    },
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

            // // ! This only apply to the submission form, not the registration form
            case 'attachment': {
                return (
                    <>
                        <Typography variant="body1" className={classes.label}>
                            Maximum file size
                        </Typography>
                        <TextInput
                            placeholder="10"
                            value={question.settings.maxSize || ''}
                            onChange={value =>
                                handleEdit({
                                    ...question,
                                    settings: {
                                        maxSize: parseInt(value, 10),
                                    }, // parse value to integer
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
                            selectedOptions={
                                question.settings.allowedTypes || []
                            }
                            onChange={value =>
                                handleEdit({
                                    ...question,
                                    settings: {
                                        allowedTypes: value,
                                    },
                                })
                            }
                        />
                        <Typography variant="caption" paragraph>
                            Allowed file types, select multiple options
                        </Typography>
                    </>
                )
            }
            // // ! ----------------------------------------------------------------
            case 'link': {
                return (
                    <>
                        <Typography variant="body1" className={classes.label}>
                            Link
                        </Typography>
                        <TextInput
                            placeholder="https://www.google.com"
                            value={question.placeholder || ''}
                            onChange={value =>
                                handleEdit({
                                    ...question,
                                    placeholder: value,
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
                return renderPlaceholderInput(question)
        }
    }

    const handleAdd = useCallback(
        question => {
            const newQuestions = questions.concat(question)
            onChange({
                ...section,
                questions: newQuestions,
            })
        },
        [onChange, questions, section],
    )

    const handleEdit = useCallback(
        question => {
            const newQuestions = questions.map(q => {
                if (q.name === question.name) {
                    return question
                }
                return q
            })

            onChange({
                ...section,
                questions: newQuestions,
            })
            setEditing(undefined)
        },
        [onChange, questions, section],
    )

    const handleQuestionUp = useCallback(
        (question, index) => {
            if (index === 0) return
            const newItems = questions.slice()
            newItems[index] = newItems[index - 1]
            newItems[index - 1] = question
            onChange({
                ...section,
                questions: newItems,
            })
        },
        [onChange, questions, section],
    )

    const handleQuestionDown = useCallback(
        (question, index) => {
            if (index === questions.length - 1) return
            const newItems = questions.slice()
            newItems[index] = newItems[index + 1]
            newItems[index + 1] = question
            onChange({
                ...section,
                questions: newItems,
            })
        },
        [onChange, questions, section],
    )

    const handleQuestionRemove = useCallback(
        (question, index) => {
            const newItems = questions.slice()
            newItems.splice(index, 1)
            onChange({
                ...section,
                questions: newItems,
            })
        },
        [onChange, questions, section],
    )

    return (
        <>
            <Box className={classes.wrapper}>
                {index >= 0 && (
                    <>
                        <EditableText
                            value={section.label}
                            save={value =>
                                onChange({ ...section, label: value }, index)
                            }
                            className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                            type="heading"
                        />
                        <EditableText
                            value={section.description}
                            save={value =>
                                onChange(
                                    { ...section, description: value },
                                    index,
                                )
                            }
                            className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                            type="default"
                        />
                    </>
                )}
                <Box p={1}>
                    {questions.map((question, index) => (
                        <>
                            <div className="tw-p-4 tw-bg-white tw-rounded-lg tw-shadow-md">
                                <div className="tw-flex tw-flex-col">
                                    <EditableText
                                        value={question.label}
                                        save={value =>
                                            handleEdit({
                                                ...question,
                                                label: value,
                                            })
                                        }
                                        className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                                        type="default"
                                    />
                                    <EditableText
                                        value={question.hint}
                                        save={value =>
                                            handleEdit({
                                                ...question,
                                                hint: value,
                                            })
                                        }
                                        className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                                        type="default"
                                    />

                                    <Typography
                                        className="tw-text-lg"
                                        variant="body1"
                                        component="p"
                                    >
                                        {question.fieldType}
                                    </Typography>
                                    <Dropdown
                                        value={question.fieldType}
                                        onChange={value =>
                                            handleEdit({
                                                ...question,
                                                fieldType: value,
                                            })
                                        }
                                        placeholder="Input type"
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
                                    <p>Required</p>
                                    <Switch
                                        checked={question.fieldRequired}
                                        onChange={value =>
                                            handleEdit({
                                                ...question,
                                                fieldRequired: value,
                                            })
                                        }
                                        checkedText="Yes"
                                        uncheckedText="No"
                                    />
                                    <p>Field render</p>
                                    {renderFieldTypeOptions(question)}
                                </div>
                                <div>
                                    <Button
                                        color="error"
                                        onClick={() =>
                                            handleQuestionRemove(
                                                question,
                                                index,
                                            )
                                        }
                                    >
                                        Remove question
                                    </Button>
                                    <Button
                                        color="theme_turquoise"
                                        onClick={() => setEditing(question)}
                                    >
                                        Edit question
                                    </Button>
                                    <Button
                                        color="theme_turquoise"
                                        disabled={index === 0}
                                        onClick={() =>
                                            handleQuestionUp(question, index)
                                        }
                                    >
                                        Move up
                                    </Button>
                                    <Button
                                        color="theme_turquoise"
                                        disabled={
                                            index === questions.length - 1
                                        }
                                        onClick={() =>
                                            handleQuestionDown(question, index)
                                        }
                                    >
                                        Move down
                                    </Button>
                                </div>
                            </div>
                        </>
                    ))}
                </Box>
                <Box
                    p={1}
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="flex-end"
                >
                    <Button color="error" onClick={onRemove}>
                        Remove section
                    </Button>
                    <Button
                        color="theme_turquoise"
                        onClick={() => setModalOpen(true)}
                    >
                        Add a question
                    </Button>
                    <Button color="theme_turquoise" onClick={onEdit}>
                        Edit section
                    </Button>
                    <Button color="theme_turquoise" onClick={onMoveUp}>
                        Move up
                    </Button>
                    <Button color="theme_turquoise" onClick={onMoveDown}>
                        Move down
                    </Button>
                </Box>
                <AddQuestionModal
                    sectionName={section.label}
                    visible={modalOpen}
                    onVisibleChange={setModalOpen}
                    reservedNames={reservedNames}
                    onSubmit={handleAdd}
                    onEditDone={question => handleEdit(question)}
                    onEditCancel={() => setEditing(undefined)}
                    editing={editing}
                />
            </Box>
        </>
    )
}

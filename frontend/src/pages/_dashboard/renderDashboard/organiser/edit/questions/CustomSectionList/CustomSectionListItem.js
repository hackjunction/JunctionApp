import React, { useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import Button from 'components/generic/Button'
import TextInput from '../../submission/components/inputs/TextInput'
import EditableText from '../../submission/components/section/EditableText'
import Dropdown from '../../submission/components/section/Dropdown'
import Switch from '../../submission/components/Switch'
import EditableOptions from '../../submission/components/EditableOptions'
import Checkbox from '../../submission/components/section/Checkbox'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowAltCircleDown,
    faArrowAltCircleUp,
    faPlusCircle,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import Empty from 'components/generic/Empty'
import { now } from 'moment'

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
    onMoveDown,
    onMoveUp,
    index,
    projectsExist = false,
}) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const questions = section.questions || []

    const renderPlaceholderInput = question => {
        return (
            <EditableText
                value={
                    question.placeholder ||
                    t(`submission_form_customization_question_placeholder`)
                }
                save={value =>
                    handleEdit({
                        ...question,
                        placeholder: value,
                    })
                }
                className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                type="default"
            />
        )
    }

    const renderFieldTypeOptions = question => {
        switch (question.fieldType) {
            case 'multiple-choice':
            case 'single-choice': {
                return (
                    <div className=" tw-flex tw-flex-col tw-gap-2">
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
                            handleDelete={updatedArr => {
                                console.log(updatedArr)
                                handleEdit({
                                    ...question,
                                    settings: {
                                        options: updatedArr,
                                    },
                                })
                            }}
                        />
                    </div>
                )
            }
            case 'checkbox':
            case 'boolean': {
                return (
                    <div className=" tw-flex tw-flex-col tw-gap-2">
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
                    </div>
                )
            }

            case 'attachment': {
                return (
                    <div className=" tw-flex tw-flex-col tw-gap-2">
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
                    </div>
                )
            }
            // // ! ----------------------------------------------------------------
            case 'link': {
                return (
                    <div className=" tw-flex tw-flex-col tw-gap-2">
                        <Typography variant="body1" className={classes.label}>
                            Link placeholder
                        </Typography>
                        <TextInput
                            placeholder="https://www.google.com"
                            value={question.placeholder}
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
                    </div>
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
            if (projectsExist) {
                return alert(
                    t(`submission_form_customization_prevent_delete_question`),
                )
            }
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
        <Box className="tw-p-4 tw-rounded-md tw-flex tw-flex-col tw-gap-4 tw-bg-white tw-shadow-md">
            {index >= 0 && (
                <div className=" tw-flex tw-flex-col tw-gap-2">
                    <EditableText
                        value={section.label}
                        save={value =>
                            onChange({ ...section, label: value }, index)
                        }
                        className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                        type="heading"
                    />
                    <EditableText
                        value={
                            section.description ||
                            t(
                                `submission_form_customization_section_description`,
                            )
                        }
                        save={value =>
                            onChange({ ...section, description: value }, index)
                        }
                        className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                        type="paragraph"
                    />
                </div>
            )}
            <Box p={1} className="tw-flex tw-flex-col tw-gap-4">
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <div className="tw-p-4 tw-bg-white tw-rounded-lg tw-shadow-md">
                            <div className="tw-flex tw-flex-col tw-gap-8">
                                <div className="tw-flex tw-justify-between tw-gap-2">
                                    <div className="tw-flex tw-flex-col tw-gap-4">
                                        <div className="tw-flex tw-flex-col tw-gap-2">
                                            <EditableText
                                                value={question.label}
                                                save={value =>
                                                    handleEdit({
                                                        ...question,
                                                        label: value,
                                                    })
                                                }
                                                className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                                                type="subheading"
                                            />
                                            <EditableText
                                                value={
                                                    question.hint ||
                                                    t(
                                                        `submission_form_customization_question_hint`,
                                                    )
                                                }
                                                save={value =>
                                                    handleEdit({
                                                        ...question,
                                                        hint: value,
                                                    })
                                                }
                                                className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                                                type="paragraph"
                                            />
                                        </div>
                                        {renderFieldTypeOptions(question)}
                                    </div>
                                    <div className="tw-flex tw-flex-col tw-gap-2">
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
                                        <div className="tw-flex tw-gap-2">
                                            <p>Required field?</p>
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
                                        </div>
                                    </div>
                                </div>
                                <div className="tw-flex tw-items-center tw-gap-2 tw-flex-wrap">
                                    <Button
                                        color="theme_red"
                                        variant="jIconText"
                                        onClick={() =>
                                            handleQuestionRemove(
                                                question,
                                                index,
                                            )
                                        }
                                        startIcon={
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                size="lg"
                                            />
                                        }
                                    >
                                        {t(
                                            `submission_form_customization_question_remove`,
                                        )}
                                    </Button>
                                    <Button
                                        color="theme_black"
                                        variant="jIconText"
                                        onClick={() =>
                                            handleQuestionUp(question, index)
                                        }
                                        startIcon={
                                            <FontAwesomeIcon
                                                icon={faArrowAltCircleUp}
                                                size="lg"
                                            />
                                        }
                                    >
                                        {t(
                                            `submission_form_customization_question_move_up`,
                                        )}
                                    </Button>
                                    <Button
                                        color="theme_black"
                                        variant="jIconText"
                                        onClick={() =>
                                            handleQuestionDown(question, index)
                                        }
                                        startIcon={
                                            <FontAwesomeIcon
                                                icon={faArrowAltCircleDown}
                                                size="lg"
                                            />
                                        }
                                    >
                                        {t(
                                            `submission_form_customization_question_move_down`,
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <Empty isEmpty emptyText="Click on 'Add question'" />
                    </div>
                )}
            </Box>
            <Box
                p={1}
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Button
                    color="theme_red"
                    variant="jIconText"
                    onClick={onRemove}
                    startIcon={<FontAwesomeIcon icon={faTrashAlt} size="lg" />}
                >
                    {t(`submission_form_customization_section_remove`)}
                </Button>
                <Button
                    color="primary"
                    variant="jIconText"
                    onClick={() =>
                        handleAdd({
                            label: 'New question - click here to edit the question name',
                            name: `${section.name}_question_${now()}`,
                            fieldType: 'text',
                            fieldRequired: false,
                            settings: {
                                options: [],
                            },
                        })
                    }
                    startIcon={
                        <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                    }
                >
                    {t(`submission_form_customization_question_add`)}
                </Button>
                <Button
                    color="theme_black"
                    variant="jIconText"
                    onClick={onMoveUp}
                    startIcon={
                        <FontAwesomeIcon icon={faArrowAltCircleUp} size="lg" />
                    }
                >
                    {t(`submission_form_customization_section_move_up`)}
                </Button>
                <Button
                    color="theme_black"
                    variant="jIconText"
                    onClick={onMoveDown}
                    startIcon={
                        <FontAwesomeIcon
                            icon={faArrowAltCircleDown}
                            size="lg"
                        />
                    }
                >
                    {t(`submission_form_customization_section_move_down`)}
                </Button>
            </Box>
        </Box>
    )
}

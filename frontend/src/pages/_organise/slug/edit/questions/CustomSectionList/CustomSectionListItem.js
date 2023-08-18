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
    isFirst,
    isLast,
}) => {
    const classes = useStyles()
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(undefined)
    const questions = section.questions || []
    const reservedNames = questions.map(q => q.name)

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
                <Typography variant="h6">{section.label}</Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            secondary={
                                <Box className={classes.descriptionWrapper}>
                                    <Markdown source={section.description} />
                                </Box>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        {section.conditional && (
                            <ListItemText
                                primary={`Conditional question: ${section.conditional}`}
                            />
                        )}
                        {!section.conditional && (
                            <ListItemText
                                secondary={'No conditional question required'}
                            />
                        )}
                    </ListItem>
                </List>
                <Box p={1}>
                    {questions.map((question, index) => (
                        <>
                            <div className="tw-p-4 tw-bg-white tw-rounded-lg tw-shadow-md">
                                <div className="tw-flex tw-flex-col">
                                    <Typography
                                        className="tw-tracking-tight tw-font-medium"
                                        variant="h5"
                                        component="h5"
                                    >
                                        {question.label}
                                    </Typography>
                                    <Typography
                                        className="tw-text-lg"
                                        variant="body1"
                                        component="p"
                                    >
                                        {question.hint}
                                    </Typography>
                                    <Typography
                                        className="tw-text-lg"
                                        variant="body1"
                                        component="p"
                                    >
                                        {question.fieldType}
                                    </Typography>
                                </div>
                            </div>
                            <ExpansionPanel key={question.name}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1c-content"
                                    id="panel1c-header"
                                >
                                    <ListItemText
                                        primary={question.label}
                                        secondary={question.fieldType}
                                    />
                                </ExpansionPanelSummary>
                                {/* Display preview for the form https://www.figma.com/file/F0PvYOStjKVp6Vck3cw9gk/Junction?type=design&node-id=733-16420&mode=design&t=RDGTSCWd9ndyhd2G-0*/}
                                {/* This will need more work, but you can develop base on this:
                                    - It will get the question type and display the correct input
                                    - There are many different types of inputs that available in the submission/components/inputs folder
                             */}
                                <ExpansionPanelDetails>
                                    <Box width="100%">
                                        <Typography variant="h5">
                                            {question.label}
                                        </Typography>
                                        <TextInput />
                                    </Box>
                                </ExpansionPanelDetails>
                                <Divider />
                                <ExpansionPanelActions>
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
                                </ExpansionPanelActions>
                            </ExpansionPanel>
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

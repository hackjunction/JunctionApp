import React, { useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
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
    List
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from 'components/generic/Button';
import AddQuestionModal from '../AddQuestionModal';

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: theme.spacing(2),
        background: 'white',
        boxShadow: '2px 7px 30px rgba(0, 0, 0, 0.12)',
        borderRadius: '7px',
        marginBottom: theme.spacing(2)
    }
}));

const CustomSectionListItem = ({ section, onChange, onRemove, onEdit, onMoveDown, onMoveUp, isFirst, isLast }) => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(undefined);
    const questions = section.questions || [];
    const reservedNames = questions.map(q => q.name);

    const handleAdd = useCallback(
        question => {
            const newQuestions = questions.concat(question);
            onChange({
                ...section,
                questions: newQuestions
            });
        },
        [onChange, questions, section]
    );

    const handleEdit = useCallback(
        question => {
            const newQuestions = questions.map(q => {
                if (q.name === question.name) {
                    return question;
                }
                return q;
            });

            onChange({
                ...section,
                questions: newQuestions
            });
            setEditing(undefined);
        },
        [onChange, questions, section]
    );

    const handleQuestionUp = useCallback(
        (question, index) => {
            if (index === 0) return;
            const newItems = questions.slice();
            newItems[index] = newItems[index - 1];
            newItems[index - 1] = question;
            onChange({
                ...section,
                questions: newItems
            });
        },
        [onChange, questions, section]
    );

    const handleQuestionDown = useCallback(
        (question, index) => {
            if (index === questions.length - 1) return;
            const newItems = questions.slice();
            newItems[index] = newItems[index + 1];
            newItems[index + 1] = question;
            onChange({
                ...section,
                questions: newItems
            });
        },
        [onChange, questions, section]
    );

    const handleQuestionRemove = useCallback(
        (question, index) => {
            const newItems = questions.slice();
            newItems.splice(index, 1);
            onChange({
                ...section,
                questions: newItems
            });
        },
        [onChange, questions, section]
    );

    return (
        <React.Fragment>
            <Box className={classes.wrapper}>
                <Typography variant="h6">{section.label}</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Description" secondary={section.description} />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Always shown?"
                            secondary={!section.conditional ? `Yes` : `No (${section.conditional})`}
                        />
                    </ListItem>
                </List>
                <Box p={1}>
                    {questions.map((question, index) => (
                        <ExpansionPanel key={question.name}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <ListItemText primary={question.label} secondary={question.fieldType} />
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.details}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Field type" secondary={question.fieldType} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Machine name" secondary={question.name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Placeholder" secondary={question.placeholder} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Settings"
                                            secondary={
                                                <ul>
                                                    {question.settings.default && (
                                                        <li>
                                                            <strong>Default: </strong>
                                                            {question.settings.default}
                                                        </li>
                                                    )}
                                                    {question.settings.options && question.settings.options.length > 0 && (
                                                        <li>
                                                            <strong>Options: </strong>
                                                            {question.settings.options.join(', ')}
                                                        </li>
                                                    )}
                                                </ul>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                <Button color="error" onClick={() => handleQuestionRemove(question, index)}>
                                    Remove question
                                </Button>
                                <Button color="theme_turquoise" onClick={() => setEditing(question)}>
                                    Edit question
                                </Button>
                                <Button
                                    color="theme_turquoise"
                                    disabled={index === 0}
                                    onClick={() => handleQuestionUp(question, index)}
                                >
                                    Move up
                                </Button>
                                <Button
                                    color="theme_turquoise"
                                    disabled={index === questions.length - 1}
                                    onClick={() => handleQuestionDown(question, index)}
                                >
                                    Move down
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    ))}
                </Box>
                <Box p={1} display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-end">
                    <Button color="error">Remove section</Button>
                    <Button color="theme_turquoise" onClick={() => setModalOpen(true)}>
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
            {/* <Box marginLeft="30px">
                {questions.map((question, index) => (
                    <div key={question.name} className={styles.questionWrapper}>
                        <h3>{`${question.label} ${question.fieldRequired ? '(Required)' : '(Optional)'}`}</h3>
                        {question.hint && question.hint.length > 0 ? <Markdown source={question.hint} /> : null}
                        <Descriptions layout="vertical" bordered={true}>
                            <Descriptions.Item label="Field type">{question.fieldType}</Descriptions.Item>
                            <Descriptions.Item label="Machine name">{question.name}</Descriptions.Item>
                            <Descriptions.Item label="Placeholder">{question.placeholder}</Descriptions.Item>
                            <Descriptions.Item label="Settings">
                                <ul>
                                    {question.settings.default && (
                                        <li>
                                            <strong>Default: </strong>
                                            {question.settings.default}
                                        </li>
                                    )}
                                    {question.settings.options && question.settings.options.length > 0 && (
                                        <li>
                                            <strong>Options: </strong>
                                            {question.settings.options.join(', ')}
                                        </li>
                                    )}
                                </ul>
                            </Descriptions.Item>
                        </Descriptions>
                        <div className={styles.questionActions}>
                            <Button color="error" onClick={() => handleQuestionRemove(question, index)}>
                                Remove question
                            </Button>
                            <Button color="theme_turquoise" onClick={() => setEditing(question)}>
                                Edit question
                            </Button>
                            <Button
                                color="theme_turquoise"
                                disabled={index === 0}
                                onClick={() => handleQuestionUp(question, index)}
                            >
                                Move up
                            </Button>
                            <Button
                                color="theme_turquoise"
                                disabled={index === questions.length - 1}
                                onClick={() => handleQuestionDown(question, index)}
                            >
                                Move down
                            </Button>
                        </div>
                    </div>
                ))}
                <div className={styles.addButtonWrapper}>
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
                    <Button
                        text={`Add a question under ${section.label}`}
                        theme="secondary"
                        size="small"
                        button={{
                            onClick: () => setModalOpen(true)
                        }}
                    />
                </div>
            </Box> */}
        </React.Fragment>
    );
};

export default CustomSectionListItem;

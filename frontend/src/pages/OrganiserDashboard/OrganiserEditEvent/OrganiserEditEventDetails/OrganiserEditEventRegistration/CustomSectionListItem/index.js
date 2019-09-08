import React, { useState, useCallback } from 'react';
import styles from './CustomSectionListItem.module.scss';

import { Descriptions, Button as AntButton } from 'antd';
import Button from 'components/generic/Button';
import Markdown from 'components/generic/Markdown';
import AddQuestionModal from '../AddQuestionModal';

const CustomSectionListItem = ({ section, onChange, onRemove, onEdit, onMoveDown, onMoveUp, isFirst, isLast }) => {
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
            <div className={styles.wrapper}>
                <Descriptions title={section.label} layout="vertical" column={1} bordered={true}>
                    <Descriptions.Item label="Description">{section.description}</Descriptions.Item>
                    <Descriptions.Item label="Always shown?">
                        {!section.conditional ? `Yes` : `No (${section.conditional})`}
                    </Descriptions.Item>
                </Descriptions>
                <div className={styles.questionActions}>
                    <AntButton type="link" onClick={onRemove}>
                        Remove section
                    </AntButton>
                    <AntButton type="link" onClick={onEdit}>
                        Edit section
                    </AntButton>
                    <AntButton type="link" disabled={isFirst} onClick={onMoveUp}>
                        Move up
                    </AntButton>
                    <AntButton type="link" disabled={isLast} onClick={onMoveDown}>
                        Move down
                    </AntButton>
                </div>
            </div>
            <div className={styles.questionsWrapper}>
                {questions.map((question, index) => (
                    <div className={styles.questionWrapper}>
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
                            <AntButton type="link" onClick={() => handleQuestionRemove(question, index)}>
                                Remove question
                            </AntButton>
                            <AntButton type="link" onClick={() => setEditing(question)}>
                                Edit question
                            </AntButton>
                            <AntButton
                                type="link"
                                disabled={index === 0}
                                onClick={() => handleQuestionUp(question, index)}
                            >
                                Move up
                            </AntButton>
                            <AntButton
                                type="link"
                                disabled={index === questions.length - 1}
                                onClick={() => handleQuestionDown(question, index)}
                            >
                                Move down
                            </AntButton>
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
            </div>
        </React.Fragment>
    );
};

export default CustomSectionListItem;

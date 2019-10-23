import React, { useState, useCallback, useEffect } from 'react';

import { Modal, Input, Select, Radio } from 'antd';
import { isEmpty } from 'lodash-es';

import { Typography } from '@material-ui/core';

import MarkdownInput from 'components/inputs/MarkdownInput';
import Divider from 'components/generic/Divider';

const initialData = {
    label: '',
    hint: '',
    settings: {},
    fieldRequired: false,
    fieldType: 'text'
};

const AddQuestionModal = ({
    initialValue = initialData,
    sectionName,
    visible,
    onVisibleChange,
    reservedNames,
    onSubmit,
    onEditDone,
    onEditCancel,
    editing
}) => {
    const [data, setData] = useState(initialValue);

    useEffect(() => {
        if (editing) {
            setData(editing);
        }
    }, [editing]);

    const reset = () => {
        setData(initialData);
    };

    const validate = () => {
        if (isEmpty(data.label)) {
            return 'Label is required';
        }

        if (data.label.length > 100) {
            return 'Label can be at most 100 characters';
        }

        if (isEmpty(data.fieldType)) {
            return 'Please choose a question type';
        }

        if (!editing) {
            if (reservedNames.indexOf(data.name) !== -1) {
                return `This section already contains a question with the machine name ${data.name}, please use something else`;
            }
        }

        return;
    };

    const handleAdd = () => {
        const error = validate();
        if (error) {
            window.alert(error);
        } else {
            onSubmit(data);
            onVisibleChange(false);
        }
        reset();
    };

    const handleEdit = () => {
        const error = validate();
        if (error) {
            window.alert(error);
        } else {
            onEditDone(data);
        }
    };

    const handleCancel = () => {
        if (editing) {
            onEditCancel();
        } else {
            onVisibleChange(false);
        }
        reset();
    };

    const handleChange = useCallback(
        (field, value) => {
            setData({
                ...data,
                [field]: value
            });
        },
        [data]
    );

    const renderPlaceholderInput = () => {
        return (
            <React.Fragment>
                <Typography variant="subtitle1">Placeholder</Typography>
                <Typography variant="caption" paragraph>
                    Text to show in the field if it's empty
                </Typography>
                <Input
                    placeholder="Placeholder"
                    size="large"
                    value={data.placeholder}
                    onChange={e => handleChange('placeholder', e.target.value)}
                />
                <Divider size={2} />
            </React.Fragment>
        );
    };

    const renderFieldTypeOptions = () => {
        switch (data.fieldType) {
            case 'multiple-choice':
            case 'single-choice': {
                return (
                    <React.Fragment>
                        <Typography variant="subtitle1">Options to choose from</Typography>
                        <Typography variant="caption" paragraph>
                            Enter options to choose from, separated by a comma
                        </Typography>
                        <Input
                            type="text"
                            placeholder="Bacon,Cheese,Eggs"
                            size="large"
                            value={data.settings.options ? data.settings.options.join(',') : ''}
                            onChange={e =>
                                handleChange('settings', {
                                    ...data.settings,
                                    options: e.target.value.split(',').map(item => item.trim())
                                })
                            }
                        />
                        <Divider size={2} />
                        {renderPlaceholderInput()}
                    </React.Fragment>
                );
            }
            case 'checkbox':
            case 'boolean': {
                return (
                    <React.Fragment>
                        <Typography variant="subtitle1">Default value</Typography>
                        <Typography variant="caption" paragraph>
                            Is this field checked/yes by default?
                        </Typography>
                        <Radio.Group
                            value={data.settings.default || false}
                            buttonStyle="solid"
                            onChange={e =>
                                handleChange('settings', {
                                    ...data.settings,
                                    default: e.target.value
                                })
                            }
                        >
                            <Radio.Button value={true}>Yes</Radio.Button>
                            <Radio.Button value={false}>No</Radio.Button>
                        </Radio.Group>
                        <Divider size={2} />
                    </React.Fragment>
                );
            }
            default:
                return renderPlaceholderInput();
        }
    };

    return (
        <Modal
            title={editing ? `Edit ${data.name}` : `Add a new question under ${sectionName}`}
            visible={visible || editing}
            onOk={editing ? handleEdit : handleAdd}
            onCancel={handleCancel}
            destroyOnClose={true}
            maskClosable={false}
            centered={true}
        >
            {/** Label */}
            <Typography variant="subtitle1">Label</Typography>
            <Typography variant="caption" paragraph>
                The name of your question
            </Typography>
            <Input
                placeholder="Label"
                size="large"
                value={data.label}
                onChange={e => handleChange('label', e.target.value)}
            />
            <Divider size={2} />
            {/** Machine name */}
            <Typography variant="subtitle1">Machine name</Typography>
            <Typography variant="caption" paragraph>
                A unique machine-readable name. This should be only letters, and be written in camelCase: e.g.
                letterOfMotivation. This field will not be visible to the end-user.
            </Typography>
            <Input
                placeholder="machineName"
                size="large"
                disabled={editing}
                value={data.name}
                onChange={e => handleChange('name', e.target.value)}
            />
            <Divider size={2} />
            {/** Question Type */}
            <Typography variant="subtitle1">Question type</Typography>
            <Typography variant="caption" paragraph>
                Which kind of answer do you want? Choose a type and you will be presented with any available additional
                options
            </Typography>
            <Select
                size="large"
                style={{ width: '100%' }}
                placeholder="Choose one"
                value={data.fieldType}
                onSelect={val => handleChange('fieldType', val)}
            >
                <Select.Option key="text">Short Text</Select.Option>
                <Select.Option key="textarea">Long Text</Select.Option>
                <Select.Option key="boolean">Yes / No</Select.Option>
                <Select.Option key="checkbox">Checkbox (required)</Select.Option>
                <Select.Option key="single-choice">Single Choice</Select.Option>
                <Select.Option key="multiple-choice">Multiple Choice</Select.Option>
            </Select>
            <Divider size={2} />
            {renderFieldTypeOptions()}
            {/** Hint */}
            <Typography variant="subtitle1">Hint</Typography>
            <Typography variant="caption" paragraph>
                Add an optional help text to show under the question label - just like the one you're reading right now
            </Typography>
            <MarkdownInput placeholder="Hint" value={data.hint} onChange={e => handleChange('hint', e.target.value)} />
            <Divider size={2} />
            {/** Required? */}
            <Typography variant="subtitle1">Is this question required or optional?</Typography>
            <Typography variant="caption" paragraph>
                Users will not be able to submit the form without answering this question, if it is required.
            </Typography>
            <Radio.Group
                buttonStyle="solid"
                value={data.fieldRequired || false}
                onChange={e => handleChange('fieldRequired', e.target.value)}
            >
                <Radio.Button value={true}>Required</Radio.Button>
                <Radio.Button value={false}>Optional</Radio.Button>
            </Radio.Group>
            <Divider size={2} />
        </Modal>
    );
};

export default AddQuestionModal;

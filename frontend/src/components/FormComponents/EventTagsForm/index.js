import React, { useState, useCallback } from 'react';
import styles from './EventTagsForm.module.scss';

import { Input, Row, Col, Table, Tag, Select, Button as AntButton, Modal } from 'antd';
import { findIndex } from 'lodash-es';

import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';
import FormFieldBottom from 'components/FormComponents/FormFieldBottom';

import { useFormField } from 'hooks/formHooks';

const COLORS = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

const EventTagsForm = ({ value = [], fieldName, setFieldValue }) => {
    const label = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'Tag name is required';
        }
        if (value.length > 30) {
            return 'Tag name can be at most 30 characters';
        }
        if (findIndex(value, tag => tag.label === value) !== -1) {
            return `A tag with the name ${value} already exists`;
        }

        return;
    });
    const color = useFormField(undefined, value => {
        if (!value || value.length === 0) {
            return 'Tag color is required';
        }

        return;
    });
    const description = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'Please give a short description for your tag';
        }

        if (value.length > 200) {
            return 'Tag description must be under 200 characters';
        }
    });

    const resetForm = useCallback(() => {
        label.reset();
        color.reset();
        description.reset();
    }, [label, color, description]);

    const handleAdd = useCallback(() => {
        const items = [label, color, description];
        let passing = true;
        items.forEach(item => {
            const err = item.validate(item.value);
            if (err) {
                item.setError(err);
                passing = false;
            }
        });

        if (!passing) {
            return;
        } else {
            setFieldValue(
                fieldName,
                value.concat({ label: label.value, color: color.value, description: description.value })
            );
            resetForm();
        }
    }, [value, fieldName, color, label, description, resetForm, setFieldValue]);

    const handleDelete = useCallback(
        label => {
            Modal.confirm({
                title: `Are you sure you want to delete the tag ${label}?`,
                content:
                    'This will NOT remove the tag from any applications which it has been applied to, but you will no longer be able to search by this tag.',
                onOk() {
                    setFieldValue(fieldName, value.filter(tag => tag.label !== label));
                }
            });
        },
        [setFieldValue, fieldName, value]
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Divider size={1} />
                        <Input placeholder="Tag name" size="large" {...label} />
                        <FormFieldBottom errorMessage={label.error} />
                    </Col>
                    <Col xs={24} md={12}>
                        <Divider size={1} />
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Choose color"
                            size="large"
                            value={color.value}
                            onChange={color.setValue}
                        >
                            {COLORS.map(color => (
                                <Select.Option key={color} value={color}>
                                    <Tag color={color}>{color}</Tag>
                                </Select.Option>
                            ))}
                        </Select>
                        <FormFieldBottom errorMessage={color.error} />
                    </Col>
                    <Col xs={24} md={18}>
                        <Divider size={1} />
                        <Input placeholder="Tag description" size="large" {...description} />
                        <FormFieldBottom errorMessage={description.error} />
                    </Col>
                    <Col xs={24} md={6}>
                        <Divider size={1} />
                        <Button block text="Add" button={{ onClick: handleAdd }} />
                    </Col>
                </Row>
            </div>
            <Divider size={1} />
            <Table dataSource={value}>
                <Table.Column
                    title="Tag"
                    dataIndex="label"
                    key="label"
                    render={(label, record) => <Tag color={record.color}>{label}</Tag>}
                />
                <Table.Column title="Description" dataIndex="description" key="description" />
                <Table.Column
                    title="Actions"
                    dataIndex="label"
                    key="actions"
                    render={label => {
                        return (
                            <AntButton type="link" onClick={() => handleDelete(label)}>
                                Delete
                            </AntButton>
                        );
                    }}
                />
            </Table>
        </div>
    );
};

export default EventTagsForm;

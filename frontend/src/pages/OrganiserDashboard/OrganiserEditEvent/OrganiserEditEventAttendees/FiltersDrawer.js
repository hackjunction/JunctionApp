import React from 'react';
import styles from './FiltersDrawer.module.scss';
import { connect } from 'react-redux';
import { concat, filter, map } from 'lodash-es';
import { RegistrationStatuses, RegistrationFields } from '@hackjunction/shared';
import { Drawer, Tag, Descriptions, Input, Button, Select, Row, Col } from 'antd';
import { Formik } from 'formik';

import Divider from 'components/generic/Divider';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

const FiltersDrawer = ({ onClose, isOpen, getFilters, setFilters, event }) => {
    const filters = getFilters(event.slug);

    function handleSubmit(values) {
        setFilters(event.slug, values);
        onClose();
    }

    function handleReset() {
        setFilters(event.slug, {});
        onClose();
    }

    function renderStatusSelect(formikProps) {
        const selected = formikProps.values.status || [];
        return RegistrationStatuses.asArray.map(status => {
            const checked = selected.indexOf(status.id) !== -1;
            return (
                <Tag.CheckableTag
                    key={status.id}
                    checked={checked}
                    color={status.color}
                    onChange={checked => {
                        if (checked) {
                            formikProps.setFieldValue('status', concat(selected, status.id));
                        } else {
                            formikProps.setFieldValue('status', filter(selected, s => s !== status.id));
                        }
                    }}
                >
                    {status.label}
                </Tag.CheckableTag>
            );
        });
    }

    function renderSearchFilter(formikProps) {
        const currentValue = formikProps.values.email || '';
        return (
            <Input
                style={{ width: '100%' }}
                type="text"
                placeholder="john.doe@gmail.com"
                value={currentValue}
                onChange={e => formikProps.setFieldValue('email', e.target.value)}
            />
        );
    }

    function renderFieldExists(formikProps) {
        const currentValue = formikProps.values.fields || undefined;
        const userDetailFields = Object.keys(event.userDetailsConfig).map(q => ({
            name: q,
            label: RegistrationFields.getLabel(q)
        }));
        const registrationFields = map(event.registrationQuestions, q => ({
            name: q.name,
            label: q.label
        }));
        return (
            <Select
                onChange={value => formikProps.setFieldValue('fields', value)}
                value={currentValue}
                style={{ width: '100%' }}
                mode="multiple"
                placeholder={'Select fields'}
            >
                <Select.OptGroup label="User details">
                    {userDetailFields.map(field => (
                        <Select.Option key={field.name}>{field.label}</Select.Option>
                    ))}
                </Select.OptGroup>
                <Select.OptGroup label="Custom questions">
                    {registrationFields.map(field => (
                        <Select.Option key={field.name}>{field.label}</Select.Option>
                    ))}
                </Select.OptGroup>
            </Select>
        );
    }

    return (
        <Drawer
            destroyOnClose={true}
            title="Filter attendees"
            closable={true}
            onClose={onClose}
            visible={isOpen}
            width={500}
        >
            <Formik initialValues={filters} enableReinitialize={true} onSubmit={handleSubmit}>
                {formikProps => {
                    return (
                        <React.Fragment>
                            <Descriptions column={1} title="Select filters" layout="vertical" bordered>
                                <Descriptions.Item label="Status">
                                    <p>Filter participants by application status</p>
                                    {renderStatusSelect(formikProps)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Email">
                                    <p>Search by email address</p>
                                    {renderSearchFilter(formikProps)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Field exists">
                                    <p>Select all fields that must exist on the application</p>
                                    {renderFieldExists(formikProps)}
                                </Descriptions.Item>
                            </Descriptions>
                            <Divider size={1} />
                            <Row gutter={10}>
                                <Col xs={12}>
                                    <Button onClick={handleReset} block type="default">
                                        Clear filters
                                    </Button>
                                </Col>
                                <Col xs={12}>
                                    <Button onClick={formikProps.submitForm} block type="primary">
                                        Save filters
                                    </Button>
                                </Col>
                            </Row>
                        </React.Fragment>
                    );
                }}
            </Formik>
        </Drawer>
    );
};

const mapStateToProps = state => ({
    getFilters: OrganiserSelectors.getAttendeesFiltersForEvent(state)
});

const mapDispatchToProps = dispatch => ({
    setFilters: (slug, filters) => dispatch(OrganiserActions.setAttendeesFiltersForEvent(slug, filters))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FiltersDrawer);

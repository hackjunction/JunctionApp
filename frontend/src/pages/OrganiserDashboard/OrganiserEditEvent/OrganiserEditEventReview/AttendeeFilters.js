import React, { useState, useCallback, useEffect, useMemo } from 'react';
import './AttendeeFilters.scss';

import { connect } from 'react-redux';
import { Button as AntButton, Select, Row, Col, Rate, Tag, Collapse, Input, Steps } from 'antd';
import { RegistrationStatuses, RegistrationFields } from '@hackjunction/shared';
import { find } from 'lodash-es';

import Divider from 'components/generic/Divider';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import FilterOptions from 'constants/filters';

const AttendeeFilters = ({ event, registrations, filters = [], setFilters }) => {
    const [filterType, setFilterType] = useState();
    const [filterValue, setFilterValue] = useState();
    const [filterField, setFilterField] = useState();
    const disabled = !filterType;

    useEffect(() => {
        setFilterType(undefined);
        setFilterValue(undefined);
        setFilterField(undefined);
    }, [filters]);

    const handleAdd = useCallback(() => {
        const filter = {
            type: filterType,
            value: filterValue,
            field: filterField
        };
        setFilters(filters.concat(filter));
    }, [filterType, filterValue, filterField, filters, setFilters]);

    const handleRemove = useCallback(
        index => {
            const newFilters = filters.filter((f, idx) => {
                return idx !== index;
            });
            setFilters(newFilters);
        },
        [filters, setFilters]
    );

    const handleReset = useCallback(() => {
        setFilters([]);
    }, [setFilters]);

    const handleTypeChange = useCallback(type => {
        setFilterType(type);
        setFilterValue(undefined);
    }, []);

    const handleFieldChange = useCallback(field => {
        setFilterField(field);
    }, []);

    const questionSelect = useMemo(() => {
        return (
            <Select
                style={{ width: '100%' }}
                size="large"
                placeholder="Choose field"
                value={filterField}
                onChange={handleFieldChange}
            >
                <Select.OptGroup key="user-details" label="Basic questions">
                    {event.userDetailsConfig &&
                        Object.keys(event.userDetailsConfig).map(fieldName => {
                            return (
                                <Select.Option key={fieldName} value={fieldName}>
                                    {RegistrationFields.getLabel(fieldName)}
                                </Select.Option>
                            );
                        })}
                </Select.OptGroup>
                {event.customQuestions &&
                    event.customQuestions.map(section => {
                        return (
                            <Select.OptGroup key={section.name} label={`Custom questions - ${section.label}`}>
                                <Select.Option key={section.name} value={section.name}>
                                    {section.label} (any)
                                </Select.Option>
                                {section.questions.map(question => (
                                    <Select.Option
                                        key={`${section.name}.${question.name}`}
                                        value={`${section.name}.${question.name}`}
                                    >
                                        {section.label}: {question.label}
                                    </Select.Option>
                                ))}
                            </Select.OptGroup>
                        );
                    })}
            </Select>
        );
    }, [event, handleFieldChange, filterField]);

    const renderOptions = () => {
        switch (filterType) {
            case 'status-equals':
            case 'status-nequals': {
                return (
                    <Select
                        value={filterValue}
                        onChange={setFilterValue}
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Select status"
                        mode="multiple"
                    >
                        {RegistrationStatuses.asArray.map(status => (
                            <Select.Option key={status.id} value={status.id}>
                                <Tag color={status.color}>{status.label}</Tag>
                            </Select.Option>
                        ))}
                    </Select>
                );
            }
            case 'rating-lte':
            case 'rating-gte':
                return <Rate value={filterValue} onChange={setFilterValue} />;
            case 'tags-contain':
            case 'tags-not-contain':
                return (
                    <Select
                        value={filterValue}
                        onChange={setFilterValue}
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Select tags"
                        mode="multiple"
                    >
                        {event.tags &&
                            event.tags.map(tag => (
                                <Select.Option key={tag.label} value={tag.label}>
                                    <Tag color={tag.color}>{tag.label}</Tag>
                                </Select.Option>
                            ))}
                    </Select>
                );
            case 'field-equals':
            case 'field-nequals':
            case 'field-contains':
            case 'field-not-contains':
                return (
                    <React.Fragment>
                        {questionSelect}
                        <Divider size={1} />
                        <Input
                            value={filterValue}
                            onChange={e => setFilterValue(e.target.value)}
                            placeholder="Enter value"
                            size="large"
                        />
                    </React.Fragment>
                );
            case 'field-not-empty':
            case 'field-empty':
                return questionSelect;
            default:
                return null;
        }
    };

    const renderForm = () => {
        return (
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Select
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Select a filter"
                        value={filterType}
                        onChange={handleTypeChange}
                        showSearch
                        allowClear
                    >
                        {FilterOptions.map(({ id, label }) => (
                            <Select.Option key={id} value={id}>
                                {label}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    {renderOptions()}
                </Col>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <AntButton disabled={disabled} block size="large" type="primary" onClick={handleAdd}>
                        Add filter
                    </AntButton>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                </Col>
            </Row>
        );
    };

    const renderItemValue = (filter, label) => {
        switch (filter.type) {
            case 'status-equals':
            case 'status-nequals': {
                const statuses = RegistrationStatuses.asArray
                    .filter(status => {
                        return filter.value && filter.value.indexOf(status.id) !== -1;
                    })
                    .map(status => {
                        return <Tag color={status.color}>{status.label}</Tag>;
                    });
                return (
                    <span style={{ fontWeight: 'bold' }}>
                        {label} {statuses}
                    </span>
                );
            }
            case 'rating-lte':
            case 'rating-gte': {
                return (
                    <span style={{ fontWeight: 'bold' }}>
                        {label} <Rate readOnly value={filter.value} />
                    </span>
                );
            }
            case 'tags-contain':
            case 'tags-not-contain':
                const tags = event.tags
                    .filter(tag => {
                        return filter.value && filter.value.indexOf(tag.label) !== -1;
                    })
                    .map(tag => {
                        return <Tag color={tag.color}>{tag.label}</Tag>;
                    });
                return (
                    <span style={{ fontWeight: 'bold' }}>
                        {label} {tags}
                    </span>
                );
            case 'field-equals':
                return (
                    <span style={{ fontWeight: 'bold' }}>
                        {filter.field} <Tag>EQUALS</Tag> {filter.value}
                    </span>
                );
            case 'field-nequals':
                return (
                    <span style={{ fontWeight: 'bold' }}>
                        {filter.field} <Tag>DOES NOT EQUAL</Tag> {filter.value}
                    </span>
                );
            case 'field-empty':
                return (
                    <span style={{ fontWeight: 'bold' }}>
                        {filter.field} <Tag>IS EMPTY</Tag>
                    </span>
                );
            case 'field-not-empty':
                return (
                    <span style={{ fontWeight: 'bold' }}>
                        {filter.field} <Tag>IS NOT EMPTY</Tag>
                    </span>
                );
            case 'field-contains': {
                return (
                    <span style={{ fontWeight: 'bold' }}>
                        {filter.field} <Tag>CONTAINS</Tag> {filter.value}
                    </span>
                );
            }
            case 'field-not-contains': {
                return (
                    <span style={{ fontWeight: 'bold' }}>
                        {filter.field} <Tag>DOES NOT CONTAIN</Tag> {filter.value}
                    </span>
                );
            }
            default:
                return <span style={{ fontWeight: 'bold' }}>{label}</span>;
        }
    };

    const renderFilterSteps = () => {
        return filters.map((filter, idx) => {
            const label = find(FilterOptions, option => option.id === filter.type).label;

            return (
                <Steps.Step
                    status="finish"
                    key={filter.type + filter.value}
                    title={<div style={{ width: '100%' }}>{renderItemValue(filter, label)}</div>}
                    description={
                        <AntButton type="link" onClick={() => handleRemove(idx)}>
                            Remove filter
                        </AntButton>
                    }
                />
            );
        });
    };

    return (
        <Collapse>
            <Collapse.Panel
                header="Filters"
                extra={
                    <AntButton onClick={handleReset} size="small" type="link">
                        Clear filters
                    </AntButton>
                }
            >
                {renderForm()}
                <Steps
                    progressDot={(idonDot, { index }) =>
                        index !== 0 && <span className="AttendeeFilters--steps-icon">AND</span>
                    }
                    direction="vertical"
                    className="AttendeeFilters--steps"
                >
                    {renderFilterSteps()}
                </Steps>
            </Collapse.Panel>
        </Collapse>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    registrations: OrganiserSelectors.registrations(state),
    filters: []
});

const mapDispatch = dispatch => ({
    setFilters: filters => dispatch(OrganiserActions.setRegistrationsFilters(filters))
});

export default connect(
    mapState,
    mapDispatch
)(AttendeeFilters);

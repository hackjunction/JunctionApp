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

    const renderItemValue = filter => {
        switch (filter.type) {
            case 'status-equals':
            case 'status-nequals': {
                return RegistrationStatuses.asArray
                    .filter(status => {
                        return filter.value && filter.value.indexOf(status.id) !== -1;
                    })
                    .map(status => {
                        return <Tag color={status.color}>{status.label}</Tag>;
                    });
            }
            case 'rating-lte':
            case 'rating-gte': {
                return <Rate readOnly value={filter.value} />;
            }
            case 'tags-contain':
            case 'tags-not-contain':
                return event.tags
                    .filter(tag => {
                        return filter.value && filter.value.indexOf(tag.label) !== -1;
                    })
                    .map(tag => {
                        return <Tag color={tag.color}>{tag.label}</Tag>;
                    });
            case 'field-equals':
                return (
                    <span>
                        <Tag>{filter.field}</Tag>
                        <strong style={{ marginLeft: 10, marginRight: 15 }}>EQUALS</strong>
                        <Tag>{filter.value}</Tag>
                    </span>
                );
            case 'field-nequals':
                return (
                    <span>
                        <Tag>{filter.field}</Tag>
                        <strong style={{ marginLeft: 10, marginRight: 15 }}>IS NOT</strong>
                        <Tag>{filter.value}</Tag>
                    </span>
                );
            case 'field-empty':
                return (
                    <span>
                        <Tag>{filter.field}</Tag>
                        <strong style={{ marginLeft: 10 }}>IS EMPTY</strong>
                    </span>
                );
            case 'field-not-empty':
                return (
                    <span>
                        <Tag>{filter.field}</Tag>
                        <strong style={{ marginLeft: 10 }}>IS NOT EMPTY</strong>
                    </span>
                );
            case 'field-contains': {
                return (
                    <span>
                        <Tag>{filter.field}</Tag>
                        <strong style={{ marginLeft: 10 }}>CONTAINS</strong>
                        <Tag>{filter.value}</Tag>
                    </span>
                );
            }
            case 'field-not-contains': {
                return (
                    <span>
                        <Tag>{filter.field}</Tag>
                        <strong style={{ marginLeft: 10 }}>DOES NOT CONTAIN</strong>
                        <Tag>{filter.value}</Tag>
                    </span>
                );
            }
            default:
                return null;
        }
    };

    const renderFilterSteps = () => {
        return filters.map((filter, idx) => {
            const label = find(FilterOptions, option => option.id === filter.type).label;

            return (
                <Steps.Step
                    status="finish"
                    key={filter.type + filter.value}
                    title={
                        <div className="AttendeeFilters--steps-top">
                            <span>{label}</span>
                            <AntButton type="link" onClick={() => handleRemove(idx)}>
                                Remove
                            </AntButton>
                        </div>
                    }
                    description={<div style={{ width: '300px' }}>{renderItemValue(filter)}</div>}
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

    // return (
    //     <Row>
    //         <Col xs={24}>
    //             <Select style={{ width: '100%' }} placeholder="Choose field" size="large">
    //                 <Select.OptGroup label="System fields">
    //                     <Select.Option value="rating">Rating</Select.Option>
    //                 </Select.OptGroup>
    //                 <Select.OptGroup label="Standard questions">
    //                     <Select.Option value="answers.firstName">First name</Select.Option>
    //                     <Select.Option value="answers.lastName">Last name</Select.Option>
    //                 </Select.OptGroup>
    //                 <Select.OptGroup label="Custom questions">
    //                     <Select.Option value="terminal">Terminal</Select.Option>
    //                 </Select.OptGroup>
    //             </Select>
    //         </Col>
    //         <Col xs={24}>
    //             <Select style={{ width: '100%' }} placeholder="Choose a filter" size="large">
    //                 <Select.Option value="exists">Exists</Select.Option>
    //                 <Select.Option value="nexists">Does not exist</Select.Option>
    //                 <Select.Option value="atleast">Is at least</Select.Option>
    //                 <Select.Option value="atleast">Is at most</Select.Option>
    //             </Select>
    //         </Col>
    //         <Col xs={24}>
    //             <Input placeholder="Filter value" size="large" />
    //         </Col>
    //     </Row>
    // );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    registrations: OrganiserSelectors.registrations(state),
    filters: OrganiserSelectors.registrationsFilters(state)
});

const mapDispatch = dispatch => ({
    setFilters: filters => dispatch(OrganiserActions.setRegistrationsFilters(filters))
});

export default connect(
    mapState,
    mapDispatch
)(AttendeeFilters);

import React, { useState, useCallback } from 'react';
import styles from './Filters.module.scss';
import {
    Radio,
    Input,
    Switch,
    Row,
    Col,
    Select,
    Divider as AntDivider,
    Button as AntButton,
    Icon,
    Drawer,
    Rate,
    Tag
} from 'antd';
import { omit } from 'lodash-es';
import { connect } from 'react-redux';
import { RegistrationFields } from '@hackjunction/shared';

import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

const SEARCH_FIELDS = {
    firstName: {
        label: 'First name'
    },
    lastName: {
        label: 'Last name'
    },
    email: {
        label: 'Email'
    },
    secretCode: {
        label: 'Secret code'
    }
};

const Filters = ({ initial, setFilters, event = {} }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchField, setSearchField] = useState(initial.searchField);
    const [searchValue, setSearchValue] = useState(initial.searchValue);
    const [hasFields, setHasFields] = useState(initial.hasFields);
    const [hasTags, setHasTags] = useState(initial.hasTags);
    const [ratingMin, setRatingMin] = useState();
    const [ratingMax, setRatingMax] = useState();
    const [notRatedOnly, setNotRatedOnly] = useState(initial.notRatedOnly);
    const [notAssignedOnly, setNotAssignedOnly] = useState(initial.notAssignedOnly);
    const [limit, setLimit] = useState(initial.limit);

    const filters = {
        searchField,
        searchValue,
        hasFields,
        hasTags,
        ratingMin,
        ratingMax,
        notRatedOnly,
        notAssignedOnly,
        limit
    };

    const handleSearch = useCallback(() => {
        setFilters(filters);
        setDrawerOpen(false);
    }, [filters, setFilters]);

    const handleRemove = useCallback(
        fields => {
            const newFilters = omit(filters, fields);
            setFilters(newFilters);
        },
        [filters, setFilters]
    );

    const handleClear = () => {
        setSearchField(undefined);
        setSearchValue(undefined);
        setHasFields(undefined);
        setHasTags(undefined);
        setRatingMin(undefined);
        setRatingMax(undefined);
        setNotRatedOnly(true);
        setNotAssignedOnly(false);
        setLimit(50);
    };

    const renderPreviewItems = () => {
        const items = [];
        if (searchField) {
            items.push({
                label: `${searchField} = ${searchValue}`,
                onRemove: () => {
                    handleRemove(['searchField', 'searchValue']);
                    setSearchField(undefined);
                    setSearchValue(undefined);
                }
            });
        }

        if (notRatedOnly) {
            items.push({
                label: 'Non-rated only',
                onRemove: () => {
                    handleRemove(['notRatedOnly']);
                    setNotRatedOnly(false);
                }
            });
        }
        if (notAssignedOnly) {
            items.push({
                label: 'Non-assigned only',
                onRemove: () => {
                    handleRemove(['notAssignedOnly']);
                    setNotAssignedOnly(false);
                }
            });
        }
        if (limit) {
            items.push({
                label: `Max results: ${limit}`,
                onRemove: () => {
                    handleRemove(['limit']);
                    setLimit(undefined);
                }
            });
        }

        if (hasFields && hasFields.length) {
            const fields = hasFields.join(', ');
            const label = `Has fields: ${fields.length > 50 ? fields.slice(0, 50) + '...' : fields}`;
            items.push({
                label,
                onRemove: () => {
                    handleRemove(['hasFields']);
                    setHasFields(undefined);
                }
            });
        }

        if (hasTags && hasTags.length) {
            const tags = hasTags.join(', ');
            const label = `Has tags: ${tags.length > 50 ? tags.slice(0, 50) + '...' : tags}`;
            items.push({
                label,
                onRemove: () => {
                    handleRemove(['hasTags']);
                    setHasTags(undefined);
                }
            });
        }

        if (ratingMin) {
            items.push({
                label: `Rating, min.: ${ratingMin}`,
                onRemove: () => {
                    handleRemove(['ratingMin']);
                    setRatingMin(undefined);
                }
            });
        }
        if (ratingMax) {
            items.push({
                label: `Rating, max.: ${ratingMax}`,
                onRemove: () => {
                    handleRemove(['ratingMax']);
                    setRatingMax(undefined);
                }
            });
        }

        return items.map(item => {
            return (
                <React.Fragment key={item.label}>
                    <div className={styles.filtersPreviewItem}>
                        <AntButton
                            type="primary"
                            shape="round"
                            onClick={() => {
                                item.onRemove();
                            }}
                        >
                            {item.label}
                            <Icon type="close" style={{ fontSize: '12px' }} />
                        </AntButton>
                        <Divider size={1} />
                    </div>
                    <Divider size={1} />
                </React.Fragment>
            );
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.filtersPreview}>
                <div className={styles.filtersPreviewItems}>{renderPreviewItems()}</div>
                <AntButton onClick={() => setDrawerOpen(true)}>
                    <Icon type="filter" />
                    Filters
                </AntButton>
            </div>
            <Drawer
                title="Search registrations"
                placement="right"
                width={640}
                closable={true}
                onClose={() => setDrawerOpen(false)}
                visible={drawerOpen}
                getContainer={false}
            >
                <Divider size={1} />
                <AntDivider>
                    <h3>Search by field</h3>
                </AntDivider>
                <Row gutter={16}>
                    <Col xs={24}>
                        <Divider size={1} />
                        <Select
                            size="large"
                            style={{ width: '100%' }}
                            value={searchField}
                            onSelect={setSearchField}
                            placeholder="Select a field"
                        >
                            {Object.keys(SEARCH_FIELDS).map(field => (
                                <Select.Option key={field} value={field}>
                                    {SEARCH_FIELDS[field].label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24}>
                        <Divider size={1} />
                        <Input
                            addonBefore="Is exactly"
                            value={searchValue}
                            disabled={!searchField}
                            onChange={e => setSearchValue(e.target.value)}
                            size="large"
                            placeholder={searchField ? '' : 'Select a field to search by'}
                        />
                    </Col>
                </Row>
                <Divider size={1} />
                <AntDivider>
                    <h3>Has fields</h3>
                </AntDivider>
                <Row gutter={16}>
                    <Col xs={24}>
                        <Select
                            size="large"
                            style={{ width: '100%' }}
                            value={hasFields}
                            onChange={setHasFields}
                            placeholder="Registrations where all selected fields are non-empty will be shown"
                            mode="multiple"
                        >
                            <Select.OptGroup label="User details">
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
                                        <Select.OptGroup
                                            key={section.name}
                                            label={`Custom questions - ${section.label}`}
                                        >
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
                    </Col>
                </Row>
                <Divider size={1} />
                <AntDivider>
                    <h3>Has tags</h3>
                </AntDivider>
                <Row gutter={16}>
                    <Col xs={24}>
                        <Select
                            size="large"
                            style={{ width: '100%' }}
                            value={hasTags}
                            onChange={setHasTags}
                            placeholder="Registrations with any of these tags will be shown"
                            mode="multiple"
                        >
                            {event.tags &&
                                event.tags.map(tag => (
                                    <Select.Option value={tag.label} key={tag.label}>
                                        <Tag color={tag.color}>{tag.label}</Tag>
                                    </Select.Option>
                                ))}
                        </Select>
                    </Col>
                </Row>
                <Divider size={1} />
                <AntDivider>
                    <h3>Has rating</h3>
                </AntDivider>
                <Row gutter={16}>
                    <Col xs={24}>
                        <div className={styles.ratingWrapper}>
                            <span>Rating is at least:</span>
                            <Divider size={1} />
                            <Rate value={ratingMin} onChange={setRatingMin} />
                        </div>
                    </Col>
                    <Col xs={24}>
                        <div className={styles.ratingWrapper}>
                            <span>Rating is at most:</span>
                            <Divider size={1} />
                            <Rate value={ratingMax} onChange={setRatingMax} />
                        </div>
                    </Col>
                </Row>
                <Divider size={1} />
                <AntDivider>
                    <h3>Exclude results</h3>
                </AntDivider>
                <div className={styles.filtersSection}>
                    <Switch checked={notRatedOnly} onChange={setNotRatedOnly} />
                    <Divider size={1} />
                    <p>Only show registrations which haven't been rated yet</p>
                </div>
                <Divider size={1} />
                <div className={styles.filtersSection}>
                    <Switch checked={notAssignedOnly} onChange={setNotAssignedOnly} />
                    <Divider size={1} />
                    <p>Only show registrations which haven't been assigned to anyone</p>
                </div>
                <AntDivider>
                    <h3>Limit results</h3>
                </AntDivider>
                <Radio.Group value={limit} onChange={e => setLimit(e.target.value)}>
                    <Radio key={10} value={10}>
                        10
                    </Radio>
                    <Radio key={50} value={50}>
                        50
                    </Radio>
                    <Radio key={100} value={100}>
                        100
                    </Radio>
                    <Radio key="all" value={undefined}>
                        All
                    </Radio>
                </Radio.Group>
                <Divider size={1} />
                <div className={styles.bottom}>
                    <Button
                        text="Reset filters"
                        button={{
                            onClick: handleClear
                        }}
                    />
                    <Divider size={1} />
                    <Button
                        theme="accent"
                        text="Search"
                        button={{
                            onClick: handleSearch
                        }}
                    />
                </div>
            </Drawer>
        </div>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    initial: OrganiserSelectors.registrationsFilters(state)
});

const mapDispatch = dispatch => ({
    setFilters: filters => dispatch(OrganiserActions.setRegistrationsFilters(filters))
});

export default connect(
    mapState,
    mapDispatch
)(Filters);

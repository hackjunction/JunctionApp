import React, { useState, useEffect, useCallback } from 'react';
import styles from './Filters.module.scss';
import {
    Radio,
    Collapse,
    Input,
    Modal,
    Switch,
    Row,
    Col,
    Select,
    Divider as AntDivider,
    Button as AntButton,
    Icon
} from 'antd';
import { omit } from 'lodash-es';

import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

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

const Filters = ({ onSubmit, initial = {} }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchField, setSearchField] = useState(initial.searchField);
    const [searchValue, setSearchValue] = useState(initial.searchValue);
    const [notRatedOnly, setNotRatedOnly] = useState(initial.notRatedOnly);
    const [notAssignedOnly, setNotAssignedOnly] = useState(initial.notAssignedOnly);
    const [limit, setLimit] = useState(initial.limit);

    const filters = {
        searchField,
        searchValue,
        notRatedOnly,
        notAssignedOnly,
        limit
    };

    const handleSearch = useCallback(() => {
        onSubmit(filters);
        setModalOpen(false);
    }, [filters, onSubmit]);

    const handleRemove = useCallback(
        fields => {
            const newFilters = omit(filters, fields);
            onSubmit(newFilters);
        },
        [filters, onSubmit]
    );

    const handleClear = () => {
        setSearchField(undefined);
        setSearchValue(undefined);
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

        return items.map(item => {
            return (
                <React.Fragment>
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
                <AntButton onClick={() => setModalOpen(true)}>
                    <Icon type="filter" />
                    Filters
                </AntButton>
            </div>
            <Modal
                width={600}
                title="Set filters"
                visible={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={
                    <div className={styles.bottom}>
                        <Button
                            text="Clear filters"
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
                }
            >
                <Divider size={1} />
                <AntDivider>Search by field</AntDivider>
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
                <AntDivider>Exclude results</AntDivider>
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
                <AntDivider>Limit results</AntDivider>
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
            </Modal>
        </div>
    );
};

export default Filters;

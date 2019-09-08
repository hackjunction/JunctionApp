import React, { useState, useCallback, useEffect } from 'react';
import styles from './JobRoleForm.module.scss';

import { find } from 'lodash-es';
import { Row, Col, List, Rate, Icon, Button as AntButton } from 'antd';
import { Roles } from '@hackjunction/shared';

import JobRoleSelect from '../JobRoleSelect/index';
import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';

const JobRoleForm = React.memo(({ value = [], name, setFieldValue, setFieldTouched, validateField, touched }) => {
    const [role, setRole] = useState();
    const [years, setYears] = useState(0);

    useEffect(() => {
        if (!touched) return;
        validateField(name);
    }, [value, name, validateField, touched]);

    const onChange = useCallback(
        value => {
            setFieldValue(name, value);
            setFieldTouched(name);
        },
        [name, setFieldTouched, setFieldValue]
    );

    const handleRoleChange = useCallback(value => {
        setRole(value);
    }, []);

    const handleYearsChange = useCallback(value => {
        setYears(value);
    }, []);

    const handleItemAdd = useCallback(() => {
        onChange(
            value.concat({
                role,
                years
            })
        );
        setRole(undefined);
        setYears(0);
    }, [onChange, role, value, years]);

    const handleItemRemove = useCallback(
        index => {
            const newValue = JSON.parse(JSON.stringify(value));
            newValue.splice(index, 1);
            onChange(newValue);
        },
        [onChange, value]
    );

    const isDisabled = !role || !years || find(value, i => i.role === role);

    return (
        <div className={styles.wrapper}>
            <Row>
                <Col xs={24}>
                    <Row gutter={16}>
                        <Col xs={24} md={8}>
                            <span className={styles.formFieldLabel}>Choose a role</span>
                        </Col>
                        <Col xs={24} md={16}>
                            <JobRoleSelect value={role} onChange={handleRoleChange} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24}>
                    <Row gutter={16}>
                        <Col xs={24}>
                            <Divider size={1} />
                        </Col>
                        <Col xs={24} md={8}>
                            <span className={styles.formFieldLabel}>Years of experience</span>
                        </Col>
                        <Col xs={24} md={8}>
                            <Rate
                                tooltips={Roles.experienceLevelsLabelsArray}
                                value={years}
                                onChange={handleYearsChange}
                                character={<Icon type="fire" theme="filled" />}
                            />
                        </Col>
                        <Col xs={24} md={8}>
                            <Col xs={24} md={0}>
                                <Divider size={1} />
                            </Col>
                            <Button
                                round
                                block
                                size="small"
                                text="Add"
                                button={{
                                    onClick: handleItemAdd,
                                    disabled: isDisabled
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider size={2} />
            <List
                itemLayout="horizontal"
                dataSource={value}
                renderItem={(item, index) => (
                    <List.Item
                        key={item.role}
                        extra={
                            <AntButton type="link" onClick={item => handleItemRemove(index)}>
                                Remove
                            </AntButton>
                        }
                    >
                        <List.Item.Meta title={item.role} description={Roles.getLabelForExperienceLevel(item.years)} />
                    </List.Item>
                )}
            />
        </div>
    );
});

export default JobRoleForm;

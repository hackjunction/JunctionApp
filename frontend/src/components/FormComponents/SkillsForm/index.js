import React, { useState, useCallback, useEffect } from 'react';
import styles from './SkillsForm.module.scss';

import Shared from '@hackjunction/shared';
import { find } from 'lodash-es';
import { Row, Col, List, Rate, Icon, Button as AntButton } from 'antd';
import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';
import SkillsSelect from '../SkillsSelect';

const { Skills } = Shared;

const SkillsForm = React.memo(({ value, name, validateField, setFieldTouched, setFieldValue, touched }) => {
    const [skill, setSkill] = useState();
    const [level, setLevel] = useState(0);
    const buttonDisabled = !skill || !level || find(value, v => v.skill === skill);

    useEffect(() => {
        if (!touched) return;
        validateField(name);
    }, [name, touched, validateField, value]);

    const onChange = useCallback(
        value => {
            setFieldValue(name, value);
            setFieldTouched(name);
        },
        [name, setFieldTouched, setFieldValue]
    );

    const handleAdd = useCallback(() => {
        const newValue = value.concat({
            skill,
            level
        });

        onChange(newValue);
        setSkill(undefined);
        setLevel(0);
    }, [level, onChange, skill, value]);

    const handleRemove = index => {
        const newValue = JSON.parse(JSON.stringify(value));
        newValue.splice(index, 1);
        onChange(newValue);
    };

    return (
        <div className={styles.wrapper}>
            <Row>
                <Col xs={24}>
                    <Row gutter={16}>
                        <Col xs={24} md={8}>
                            <span className={styles.formFieldLabel}>Choose a skill</span>
                        </Col>
                        <Col xs={24} md={16}>
                            <SkillsSelect value={skill} onChange={setSkill} />
                        </Col>
                        <Col xs={24}>
                            <Divider size={1} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={8}>
                            <span className={styles.formFieldLabel}>Level of experience</span>
                        </Col>
                        <Col xs={24} md={8}>
                            <Rate
                                tooltips={Skills.skillLevelLabelsArray}
                                value={level}
                                onChange={setLevel}
                                character={<Icon type="fire" theme="filled" />}
                            />
                        </Col>
                        <Col xs={24}>
                            <Divider size={1} />
                        </Col>
                        <Col xs={24} md={16}>
                            <strong>{Skills.getLabelForSkillLevel(level)} </strong>
                            <br />
                            <i>
                                {Skills.getDescriptionForSkillLevel(level) ||
                                    'Pick a level to see detailed description'}
                            </i>
                        </Col>
                        <Col xs={24} md={0}>
                            <Divider size={1} />
                        </Col>
                        <Col xs={24} md={8}>
                            <Button
                                block
                                round
                                size="small"
                                text="Add"
                                button={{ onClick: handleAdd, disabled: buttonDisabled }}
                            />
                        </Col>
                    </Row>
                    <Divider />
                </Col>
            </Row>
            <Divider size={2} />
            <List
                itemLayout="horizontal"
                dataSource={value}
                renderItem={(item, index) => (
                    <List.Item
                        key={item.skill}
                        extra={
                            <AntButton type="link" onClick={item => handleRemove(index)}>
                                Remove
                            </AntButton>
                        }
                    >
                        <List.Item.Meta title={item.skill} description={Skills.getLabelForSkillLevel(item.level)} />
                    </List.Item>
                )}
            />
        </div>
    );
});

export default SkillsForm;

import React, { useState, useEffect, useCallback } from 'react';

import { isEmpty } from 'lodash';
import { Select, Input, Row, Col, AutoComplete } from 'antd';

import Divider from 'components/generic/Divider';
const Shared = require('@hackjunction/shared');
const { Option } = Select;

// value = { field.value }
// name = { field.name }
// validateField = { form.validateField }
// setFieldTouched = { form.setFieldTouched }
// setFieldValue = { form.setFieldValue }
// touched = { form.touched[field.name] }

const EducationForm = ({
    value = {},
    name,
    validateField,
    setFieldTouched,
    setFieldValue,
    touched,
    placeholder = 'Choose as many as you like'
}) => {
    const universityLevels = ['Doctoral', 'Bachelor', 'Master'];
    const showExtraOptions = universityLevels.indexOf(value.level) !== -1;
    const [universityCountry, setUniversityCountry] = useState();
    const [universityOptions, setUniversityOptions] = useState([]);

    useEffect(() => {
        if (!touched) return;
        validateField(name);
    }, [name, touched, validateField, value]);

    useEffect(() => {
        const universities = Shared.Universities.getByAlpha2Code(
            Shared.Countries.alpha2CodeFromName(universityCountry)
        ).map(uni => uni.name);
        setUniversityOptions(universities);
    }, [universityCountry]);

    const onChange = useCallback(
        value => {
            setFieldValue(name, value);
            setFieldTouched(name);
        },
        [name, setFieldTouched, setFieldValue]
    );

    function handleChange(field, val) {
        if (field === 'level') {
            if (universityLevels.indexOf(val) === -1) {
                onChange({
                    [field]: val
                });
            } else {
                onChange({
                    ...value,
                    [field]: val
                });
            }
        } else {
            onChange({
                ...value,
                [field]: val
            });
        }
    }

    function renderExtraOptions() {
        return (
            <React.Fragment>
                <Col xs={24} md={12}>
                    <Select
                        style={{ width: '100%' }}
                        value={universityCountry}
                        onChange={alpha2 => setUniversityCountry(alpha2)}
                        size="large"
                        showSearch
                        placeholder="Choose country"
                    >
                        {Shared.Countries.asArrayOfName.map(country => (
                            <Option key={country}>{country}</Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} md={12}>
                    <AutoComplete
                        style={{ width: '100%' }}
                        value={value.university}
                        onChange={val => handleChange('university', val)}
                        size="large"
                        placeholder="University"
                        disabled={isEmpty(universityCountry)}
                        dataSource={universityOptions}
                        filterOption={true}
                    />
                    <Divider size={1} />
                </Col>
                <Col xs={24} md={12}>
                    <Input
                        style={{ width: '100%' }}
                        value={value.degree}
                        onChange={e => handleChange('degree', e.target.value)}
                        placeholder="Field of study (e.g. Computer Science)"
                        size="large"
                    />
                    <Divider size={1} />
                </Col>
                <Col xs={24} md={12}>
                    <Input
                        type="number"
                        style={{ width: '100%' }}
                        value={value.graduationYear}
                        onChange={e => handleChange('graduationYear', e.target.value)}
                        placeholder="Graduation year"
                        size="large"
                    />
                    <Divider size={1} />
                </Col>
            </React.Fragment>
        );
    }

    return (
        <Row gutter={16}>
            <Col xs={24}>
                <Select
                    style={{ width: '100%' }}
                    value={value.level}
                    onChange={val => handleChange('level', val)}
                    size="large"
                    placeholder="Level of Education"
                >
                    <Option value="Lower Secondary">Lower Secondary Education</Option>
                    <Option value="Upper Secondary">Upper Secondary Education</Option>
                    <Option value="Bachelor">Bachelor or Equivalent</Option>
                    <Option value="Master">Master or Equivalent</Option>
                    <Option value="Doctoral">Doctoral or Equivalent</Option>
                    <Option value="Other Post-secondary">Other post-secondary Education</Option>
                    <Option value="None of the above">None of the above</Option>
                </Select>
                <Divider size={1} />
            </Col>
            {showExtraOptions ? renderExtraOptions() : null}
        </Row>
    );
};

export default EducationForm;

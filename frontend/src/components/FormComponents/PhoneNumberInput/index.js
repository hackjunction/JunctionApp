import React, { useCallback, useEffect } from 'react';
import styles from './PhoneNumberInput.module.scss';

import { Countries } from '@hackjunction/shared';
import { Row, Col, Select, Input } from 'antd';

import Divider from 'components/generic/Divider';

const options = Countries.asArray.map(country => (
    <Select.Option key={country.phone_code + ',' + country.en_short_name}>{`${country.en_short_name} (${
        country.phone_code
    })`}</Select.Option>
));

const PhoneNumberInput = React.memo(({ value = {}, name, setFieldValue, setFieldTouched, validateField, touched }) => {
    useEffect(() => {
        if (!touched) return;
        validateField(name);
    }, [name, touched, validateField, value]);

    const onChange = useCallback(
        function(value) {
            setFieldValue(name, value);
            setFieldTouched(name);
        },
        [name, setFieldTouched, setFieldValue]
    );

    const setCountryCode = useCallback(
        val => {
            onChange({
                ...value,
                country_code: val.split(',')[0]
            });
        },
        [onChange, value]
    );
    const setNumber = useCallback(
        e => {
            onChange({
                ...value,
                number: e.target.value
            });
        },
        [onChange, value]
    );
    return (
        <Row gutter={16}>
            <Col xs={24} md={8}>
                <Select
                    value={value.country_code}
                    onChange={setCountryCode}
                    style={{ width: '100%' }}
                    size="large"
                    showSearch
                    placeholder="Choose country"
                >
                    {options}
                </Select>
            </Col>
            <Col xs={24} md={0}>
                <Divider size={1} />
            </Col>
            <Col xs={24} md={16}>
                <Input
                    type="number"
                    size="large"
                    value={value.number}
                    onChange={setNumber}
                    disabled={!value.country_code}
                    addonBefore={value.country_code && <span>{value.country_code}</span>}
                    style={{ width: '100%' }}
                    placeholder="Phone number"
                />
            </Col>
        </Row>
    );
});

export default PhoneNumberInput;

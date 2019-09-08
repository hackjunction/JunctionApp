import React, { useCallback, useEffect } from 'react';
import './style.scss';

import { Select } from 'antd';

const { Countries } = require('@hackjunction/shared');

const options = Countries.asArrayOfName.map(country => <Select.Option key={country}>{country}</Select.Option>);

const CountrySelect = React.memo(
    ({ value, name, setFieldValue, setFieldTouched, validateField, touched, placeholder = 'Choose country' }) => {
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
        return (
            <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
                size="large"
                placeholder={placeholder}
            >
                {options}
            </Select>
        );
    }
);

export default CountrySelect;

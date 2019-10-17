import React, { useCallback, useEffect } from 'react';
import './style.scss';

import { Genders } from '@hackjunction/shared';
import { Select } from 'antd';

const options = Genders.map(gender => <Select.Option key={gender}>{gender}</Select.Option>);

const GenderSelect = React.memo(
    ({ value, name, setFieldValue, setFieldTouched, validateField, touched, placeholder = 'Choose gender' }) => {
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

export default GenderSelect;

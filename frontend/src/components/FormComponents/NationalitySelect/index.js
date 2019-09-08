import React, { useCallback, useEffect } from 'react';
import './style.scss';

import { Select } from 'antd';
import { Countries } from '@hackjunction/shared';

const options = Countries.asArrayOfNationalities.map(nationality => (
    <Select.Option key={nationality}>{nationality}</Select.Option>
));

const NationalitySelect = React.memo(
    ({ value, name, setFieldValue, setFieldTouched, validateField, touched, placeholder = 'Choose nationality' }) => {
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

export default NationalitySelect;

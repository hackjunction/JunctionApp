import React, { useCallback, useEffect } from 'react';

import { Select } from 'antd';
import { Misc } from '@hackjunction/shared';

const options = Misc.dietaryRestrictions.map(item => <Select.Option key={item}>{item}</Select.Option>);

const DietaryRestrictionsSelect = React.memo(
    ({ value = [], name, setFieldValue, setFieldTouched, validateField, touched }) => {
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
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
                size="large"
                placeholder="Please select all that apply"
                showSearch
                mode="multiple"
            >
                {options}
            </Select>
        );
    }
);

export default DietaryRestrictionsSelect;

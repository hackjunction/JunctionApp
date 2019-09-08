import React, { useCallback, useEffect } from 'react';
import './style.scss';

import { Select } from 'antd';
import { Misc } from '@hackjunction/shared';

const options = Misc.numHackathonOptions.asArray.map(option => (
    <Select.Option key={option.value}>{option.label}</Select.Option>
));

const NumHackathonsSelect = React.memo(
    ({
        value,
        name,
        setFieldValue,
        setFieldTouched,
        validateField,
        touched,
        placeholder = 'Choose the closest option'
    }) => {
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
            <Select style={{ width: '100%' }} value={value} onChange={onChange} size="large" placeholder={placeholder}>
                {options}
            </Select>
        );
    }
);

export default NumHackathonsSelect;

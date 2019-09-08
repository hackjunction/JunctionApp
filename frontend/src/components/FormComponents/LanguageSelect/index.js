import React, { useCallback } from 'react';
import './style.scss';

import { Select } from 'antd';
import { Languages } from '@hackjunction/shared';

const options = Languages.asArrayOfNames.map(lang => <Select.Option key={lang}>{lang}</Select.Option>);

const LanguageSelect = React.memo(
    ({ value, name, setFieldValue, onBlur, placeholder = 'Select all with working efficiency', mode = 'multiple' }) => {
        const onChange = useCallback(
            value => {
                setFieldValue(name, value);
            },
            [name, setFieldValue]
        );
        return (
            <Select
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                size="large"
                placeholder={placeholder}
                showSearch
                mode={mode}
            >
                {options}
            </Select>
        );
    }
);

export default LanguageSelect;

import React from 'react';
import './style.scss';

import { Select } from 'antd';
import { Roles } from '@hackjunction/shared';
const { OptGroup, Option } = Select;

const options = Roles.categories.map(category => (
    <OptGroup key={category.id} label={category.label}>
        {category.items.map(item => (
            <Option key={item}>{item}</Option>
        ))}
    </OptGroup>
));

const JobRoleSelect = ({ value, onChange, onBlur, placeholder = 'Choose a role' }) => {
    return (
        <Select
            style={{ width: '100%' }}
            value={value || undefined}
            onChange={onChange}
            onBlur={onBlur}
            size="large"
            placeholder={placeholder}
            showSearch
        >
            {options}
        </Select>
    );
};

export default JobRoleSelect;

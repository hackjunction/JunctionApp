import React from 'react';

import { Select } from 'antd';
import { Skills } from '@hackjunction/shared';

const options = Skills.categories.map(category => (
    <Select.OptGroup key={category.id} label={category.label}>
        {category.items.map(item => (
            <Select.Option key={item}>{item}</Select.Option>
        ))}
    </Select.OptGroup>
));

const SkillsSelect = ({ onChange, value, placeholder = 'Search for skills' }) => {
    return (
        <Select
            style={{ width: '100%' }}
            size="large"
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            showSearch
        >
            {options}
        </Select>
    );
};

export default SkillsSelect;

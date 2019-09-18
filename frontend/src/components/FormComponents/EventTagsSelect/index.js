import React from 'react';

import { Select, Tag } from 'antd';

const EventTagsSelect = ({ value, onChange, tags = [], mode = 'multiple', placeholder = 'Select tags' }) => {
    return (
        <Select
            placeholder={placeholder}
            size="large"
            value={value}
            style={{ width: '100%' }}
            onChange={onChange}
            mode={mode}
        >
            {tags.map(tag => (
                <Select.Option key={tag.label} value={tag.label}>
                    <Tag color={tag.color}>{tag.label}</Tag>
                </Select.Option>
            ))}
        </Select>
    );
};

export default EventTagsSelect;

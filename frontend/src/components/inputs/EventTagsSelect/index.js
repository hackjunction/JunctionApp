import React from 'react';
import Tag from 'components/generic/Tag';
import { Select } from 'antd';

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
                    <Tag color={tag.color} label={tag.label} />
                </Select.Option>
            ))}
        </Select>
    );
};

export default EventTagsSelect;

import React from 'react'

import Select from 'components/inputs/Select'

const EventTagsSelect = ({
    value,
    onChange,
    tags = [],
    placeholder = 'Select tags',
}) => {
    return (
        <Select
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isMulti
            options={tags.map(tag => ({
                value: tag.label,
                label: tag.label,
            }))}
        />
    )
}

export default EventTagsSelect

import React from 'react'

import { RegistrationStatuses } from '@hackjunction/shared'
import Select from 'components/inputs/Select'

const RegistrationStatusSelect = ({
    value,
    onChange,
    placeholder = 'Select status',
    selectProps,
    allowRestricted = false,
}) => {
    return (
        <Select
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            options={RegistrationStatuses.asArray.map(status => ({
                label: status.label,
                value: status.id,
            }))}
        />
    )
}

export default RegistrationStatusSelect

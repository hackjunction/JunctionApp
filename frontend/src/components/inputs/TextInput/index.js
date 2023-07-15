import React, { useCallback } from 'react'

import { TextField } from '@material-ui/core'

const TextInput = React.memo(
    ({
        disabled,
        label,
        name,
        onBlur,
        onChange = () => { },
        placeholder = '',
        required = false,
        value = '',
        autoFocus,
        type = 'text',
    }) => {
        const handleChange = useCallback(
            e => {
                onChange(e.target.value)
            },
            [onChange],
        )

        return (
            <TextField
                autoFocus={autoFocus}
                disabled={disabled}
                fullWidth
                label={label}
                name={name}
                onBlur={onBlur}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                value={value}
                type={type}
            />
        )
    },
)

export default TextInput

import React, { useCallback } from 'react'

import { TextField } from '@material-ui/core'

const TextAreaInput = React.memo(
    ({
        disabled,
        label,
        name
        onBlur,
        onChange = () => { },
        placeholder = '',
        required = false,
        value = '',
        autoFocus,
    }) => {
        const handleChange = useCallback(
            e => {
                onChange(e.target.value)
            },
            [onChange],
        )

        return (
            <TextField
                type="text"
                variant="filled"
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
                multiline
                rows={10}
                rowsMax={100}
            />
        )
    },
)

export default TextAreaInput

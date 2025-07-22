import React, { useCallback, useState } from 'react'
import { TextField } from '@mui/material'

const errorLengthBase = {
    error: false,
    helperText: '',
}

const TextAreaInput = React.memo(
    ({
        disabled,
        label,
        name,
        onBlur,
        onChange = () => {},
        placeholder = '',
        required = false,
        value = '',
        autoFocus,
        minRows = 10,
        maxRows = 100,
        maxLength,
        id = undefined,
    }) => {
        const [errorLength, setErrorLength] = useState(errorLengthBase)

        const handleChange = useCallback(
            e => {
                if (maxLength) {
                    if (e.target.value.length > maxLength) {
                        setErrorLength({
                            error: true,
                            helperText: `${e.target.value.length}/${maxLength}`,
                        })
                    } else {
                        setErrorLength(errorLengthBase)
                    }
                }
                onChange(e.target.value)
            },
            [onChange],
        )

        return (
            <TextField
                sx={{
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#f7fafc',
                        border: `2px solid #e2e8f0`,
                        borderRadius: '6px',
                    },
                }}
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
                minRows={minRows}
                maxRows={maxRows}
                error={errorLength.error}
                helperText={errorLength.helperText}
            />
        )
    },
)

export default TextAreaInput

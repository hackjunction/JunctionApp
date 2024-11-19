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
                className="w-full bg-gray-100 border-2 border-gray-300 rounded-md"
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

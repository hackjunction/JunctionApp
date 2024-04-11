import React, { useCallback, useState } from 'react'

import { TextField } from '@material-ui/core'

const errorLengthBase = {
    error: false,
    helperText: '',
}

const TextInput = React.memo(
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
        type = 'text',
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

        let textFieldFormat

        if (maxLength) {
            textFieldFormat = (
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
                    error={errorLength.error}
                    helperText={errorLength.helperText}
                />
            )
        } else {
            textFieldFormat = (
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
        }

        return textFieldFormat
    },
)

export default TextInput

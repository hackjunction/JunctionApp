import React, { useCallback, useState } from 'react'

import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useTextField = makeStyles(theme => ({
    root: {
        '& .MuiFilledInput-root': {
            backgroundColor: '#f7fafc',
            border: `2px solid #e2e8f0`,
            borderRadius: '6px',
        },
    },
}))

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

        const classes = useTextField()

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
                    classes={classes}
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
        } else {
            textFieldFormat = (
                <TextField
                    classes={classes}
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
                />
            )
        }

        return textFieldFormat
    },
)

export default TextAreaInput

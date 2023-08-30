import React, { useCallback } from 'react'

import { TextField } from '@material-ui/core'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'

// const theme = useTheme()
const useTextField = makeStyles(theme => ({
    root: {
        '& .MuiFilledInput-root': {
            backgroundColor: '#f7fafc',
            border: `2px solid #e2e8f0`,
            borderRadius: '6px',
        },
        // backgroundColor: '#f8f8f8',
    },
}))

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
    }) => {
        const classes = useTextField()

        const handleChange = useCallback(
            e => {
                onChange(e.target.value)
            },
            [onChange],
        )

        return (
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
                rows={10}
                rowsMax={100}
            />
        )
    },
)

export default TextAreaInput

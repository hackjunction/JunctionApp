import React, { useCallback } from 'react';

import { TextField } from '@material-ui/core';

const TextInput = React.memo(
    ({
        disabled,
        error,
        formatOnChange,
        formatValue,
        helperText,
        label,
        name,
        onChange = () => {},
        rawOnChange = false,
        textarea = false,
        textFieldProps = {},
        type = 'text',
        value = ''
    }) => {
        const handleChange = useCallback(
            e => {
                if (rawOnChange) {
                    e.target.value = formatOnChange ? formatOnChange(e.target.value) : e.target.value;
                    onChange(e);
                } else {
                    const val = formatOnChange ? formatOnChange(e.target.value) : e.target.value;
                    onChange(val);
                }
            },
            [onChange, rawOnChange, formatOnChange]
        );

        const formattedValue = formatValue ? formatValue(value) : value;

        return (
            <TextField
                disabled={disabled}
                error={error}
                fullWidth
                helperText={error || helperText}
                label={label}
                multiline={textarea}
                name={name}
                onChange={handleChange}
                rows={5}
                type={type}
                value={formattedValue}
                {...textFieldProps}
            />
        );
    }
);

export default TextInput;

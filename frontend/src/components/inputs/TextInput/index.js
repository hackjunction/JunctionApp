import React, { useCallback } from 'react';

import { TextField } from '@material-ui/core';

const TextInput = React.memo(
    ({
        disabled,
        error,
        helperText,
        label,
        onBlur,
        onChange = () => {},
        placeholder = '',
        rawOnChange = false,
        value = ''
    }) => {
        const handleChange = useCallback(
            e => {
                onChange(e.target.value);
            },
            [onChange]
        );

        return (
            <TextField
                disabled={disabled}
                error={error}
                fullWidth
                helperText={error || helperText}
                label={label}
                onChange={handleChange}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
            />
        );
    }
);

export default TextInput;

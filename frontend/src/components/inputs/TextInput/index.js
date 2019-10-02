import React, { useCallback } from 'react';

import { TextField } from '@material-ui/core';

const TextInput = ({ label, helperText, value = '', onChange = () => {}, error, disabled, rawOnChange = false, type = 'text', multiline = false, formatValue, formatOnChange }) => {
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
        [onChange, rawOnChange]
    );

    const formattedValue = formatValue ? formatValue(value) : value;

    return <TextField fullWidth label={label} value={formattedValue} onChange={handleChange} helperText={error || helperText} error={error} disabled={disabled} type={type} />;
};

export default TextInput;

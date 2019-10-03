import React, { useCallback } from 'react';

import { TextField } from '@material-ui/core';

const TextInput = ({ label, helperText, value = '', onChange = () => {}, error, disabled, rawOnChange = false, type = 'text', textarea = false, formatValue, formatOnChange }) => {
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

    return(
        <TextField 
            fullWidth 
            label={label} 
            value={formattedValue} 
            onChange={handleChange} 
            helperText={error || helperText} 
            error={error} 
            disabled={disabled} 
            type={type} 
            multiline={textarea}
            rows={5}
        />
    );
};

export default TextInput;

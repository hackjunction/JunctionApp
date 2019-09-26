import React, { useCallback } from 'react';

import { TextField } from '@material-ui/core';

const TextInput = ({ label, helperText, value, onChange = () => {} }) => {
    const handleChange = useCallback(
        e => {
            onChange(e.target.value);
        },
        [onChange]
    );

    return <TextField fullWidth label={label} value={value} onChange={handleChange} helperText={helperText} />;
};

export default TextInput;

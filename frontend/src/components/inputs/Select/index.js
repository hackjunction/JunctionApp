import React, { useCallback, useMemo, useEffect } from 'react';

import { TextField, MenuItem } from '@material-ui/core';
import { SelectOptions } from '@hackjunction/shared';

const Select = ({ label, helperText, value, onChange = () => {}, options = [], type }) => {
    const handleChange = useCallback(
        e => {
            onChange(e.target.value);
        },
        [onChange]
    );

    const items = useMemo(() => {
        switch (type) {
            case 'country':
                return SelectOptions.COUNTRIES;
            case 'nationality':
                return SelectOptions.NATIONALITIES;
            case 'gender':
                return SelectOptions.GENDERS;
            case 'industry':
                return SelectOptions.INDUSTRY;
            case 'language':
                return SelectOptions.LANGUAGES;
            case 'role':
                return SelectOptions.ROLES;
            case 'skill':
                return SelectOptions.SKILLS;
            case 'theme':
                return SelectOptions.THEMES;
            default:
                return options;
        }
    }, [options, type]);

    console.log('ITEMs', items);

    return (
        <TextField select fullWidth label={label} value={value} onChange={handleChange} helperText={helperText}>
            {items.map(item => (
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default Select;

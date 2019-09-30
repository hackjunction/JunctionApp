import React, { useCallback, useMemo } from 'react';

import { TextField, MenuItem } from '@material-ui/core';
import { SelectOptions } from '@hackjunction/shared';

const _Select = ({
    label,
    placeholder,
    helperText,
    value,
    onChange = () => {},
    options = [],
    type,
    multiple = false
}) => {
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
            case 'status':
                return SelectOptions.STATUSES;
            default:
                return options;
        }
    }, [options, type]);

    const valueOrDefault = value || (multiple ? [] : '');

    return (
        <TextField
            select
            fullWidth
            label={label}
            placeholder={placeholder}
            value={valueOrDefault}
            onChange={handleChange}
            helperText={helperText}
            SelectProps={{
                multiple
            }}
        >
            {items.map(item => (
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default _Select;

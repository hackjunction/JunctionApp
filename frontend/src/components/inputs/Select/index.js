import React, { useCallback, useMemo } from 'react';

import { Select, MenuItem } from '@material-ui/core';
import { SelectOptions } from '@hackjunction/shared';

const _Select = ({ label, helperText, value, onChange = () => {}, options = [], type, multiple = false }) => {
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
        <Select
            select
            fullWidth
            label={label}
            value={valueOrDefault}
            onChange={handleChange}
            helperText={helperText}
            selectProps={{
                multiple,
                renderValue: 'Hello'
            }}
        >
            {items.map(item => (
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>
            ))}
        </Select>
    );
};

export default _Select;

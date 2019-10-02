import React, { useCallback, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Chip, ListItemText } from '@material-ui/core';
import { SelectOptions } from '@hackjunction/shared';

const useStyles = makeStyles(theme => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    }
}));

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
    const classes = useStyles();
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

    const selectProps = { multiple };
    if (multiple) {
        selectProps.renderValue = (value = []) => {
            return (
                <div className={classes.chips}>
                    {value.map(item => (
                        <Chip key={item} label={item} className={classes.chip} />
                    ))}
                </div>
            );
        };
    }

    return (
        <TextField
            select
            fullWidth
            label={label}
            placeholder={placeholder}
            value={valueOrDefault}
            onChange={handleChange}
            helperText={helperText}
            SelectProps={selectProps}
        >
            {items.map(item => (
                <MenuItem key={item.value} value={item.value}>
                    <ListItemText primary={item.label} secondary={item.helper} />
                </MenuItem>
            ))}
        </TextField>
    );
};

export default _Select;

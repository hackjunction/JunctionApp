import React, { useCallback, useMemo } from 'react'

import { TextField, MenuItem, Chip, ListItemText } from '@mui/material'
import { SelectOptions } from '@hackjunction/shared'

const _Select = React.memo(
    ({
        disabled,
        error,
        helperText,
        label,
        multiple = false,
        onBlur = () => {},
        onChange = () => {},
        options,
        placeholder,
        type,
        value,
    }) => {
        const handleChange = useCallback(
            e => {
                e.preventDefault()
                onChange(e.target.value)
            },
            [onChange],
        )

        const items = useMemo(() => {
            if (Array.isArray(options) && options.length > 0) {
                return options
            }
            switch (type) {
                case 'country':
                    return SelectOptions.COUNTRIES
                case 'countryCode':
                    return SelectOptions.COUNTRY_CODES
                case 'nationality':
                    return SelectOptions.NATIONALITIES
                case 'dietary-restriction':
                    return SelectOptions.DIETARY_RESTRICTIONS
                case 'num-hackathons':
                    return SelectOptions.NUM_HACKATHONS
                case 'gender':
                    return SelectOptions.GENDERS
                case 'industry':
                    return SelectOptions.INDUSTRIES
                case 'language':
                    return SelectOptions.LANGUAGES
                case 'role':
                    return SelectOptions.ROLES
                case 'skill':
                    return SelectOptions.SKILLS
                case 'theme':
                    return SelectOptions.THEMES
                case 'status':
                    return SelectOptions.STATUSES
                case 'day':
                    return SelectOptions.DAYS
                case 'month':
                    return SelectOptions.MONTHS
                case 'year':
                    return SelectOptions.YEARS
                default:
                    return []
            }
        }, [type, options])

        const valueOrDefault = value || (multiple ? [] : '')

        const selectProps = {
            multiple,
            onOpen: e => e.preventDefault(),
        }
        if (multiple) {
            selectProps.renderValue = (value = []) => {
                return (
                    <div className="flex flex-wrap">
                        {value.map(item => (
                            <Chip key={item} label={item} className="p-1" />
                        ))}
                    </div>
                )
            }
        }

        return (
            <TextField
                disabled={disabled}
                error={error}
                fullWidth
                helperText={error || helperText}
                label={label}
                onBlur={onBlur}
                onChange={handleChange}
                placeholder={placeholder}
                select
                SelectProps={selectProps}
                value={valueOrDefault}
            >
                {items.map(item => (
                    <MenuItem key={item.value + item.label} value={item.value}>
                        <ListItemText
                            primary={item.label}
                            secondary={item.helper}
                        />
                    </MenuItem>
                ))}
            </TextField>
        )
    },
)

export default _Select

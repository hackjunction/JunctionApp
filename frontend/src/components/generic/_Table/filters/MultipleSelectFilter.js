import React, { useCallback, useMemo } from 'react'
import { groupBy } from 'lodash-es'
import { TextField } from '@mui/material'

import * as FilterTypes from '../filterTypes'

const Component = ({ column }) => {
    const { filterValue, preFilteredRows, setFilter, id } = column
    const selectedValues = filterValue || []
    const handleChange = useCallback(
        e => {
            setFilter(e.target.value)
        },
        [setFilter],
    )

    const options = useMemo(() => {
        const grouped = groupBy(preFilteredRows, row => row.values[id])
        return Object.keys(grouped).map(value => ({
            value,
            label: `${value} (${grouped[value].length})`,
        }))
    }, [preFilteredRows, id])

    return (
        <TextField
            style={{ width: '100%' }}
            select
            helperText={'Choose one or more'}
            value={selectedValues}
            onChange={handleChange}
            SelectProps={{
                multiple: true,
            }}
            variant="filled"
        >
            {options.map(({ value, label }) => (
                <option
                    className={
                        selectedValues.indexOf(value) !== -1
                            ? 'p-1 bg-gray-200'
                            : 'p-1'
                    }
                    key={value}
                    value={value}
                >
                    {label}
                </option>
            ))}
        </TextField>
    )
}

const MultipleSelectFilter = {
    Filter: Component,
    filter: FilterTypes.MULTIPLE_SELECT,
}

export default MultipleSelectFilter

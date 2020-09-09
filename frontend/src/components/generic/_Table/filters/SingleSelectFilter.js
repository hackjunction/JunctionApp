import React, { useCallback, useMemo } from 'react'
import { groupBy } from 'lodash-es'
import { TextField } from '@material-ui/core'

import * as FilterTypes from '../filterTypes'

const Component = ({ column }) => {
    const { filterValue, preFilteredRows, setFilter, id } = column
    const handleChange = useCallback(
        e => {
            setFilter(e.target.value)
        },
        [setFilter]
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
            helperText={'Choose one'}
            value={filterValue}
            onChange={handleChange}
            margin="dense"
            SelectProps={{
                native: true,
            }}
            variant="filled"
        >
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </TextField>
    )
}

const SingleSelectFilter = {
    Filter: Component,
    filter: FilterTypes.SINGLE_SELECT,
}

export default SingleSelectFilter

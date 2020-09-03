import React, { useCallback } from 'react'
import { TextField } from '@material-ui/core'

import * as FilterTypes from '../filterTypes'

const Component = ({ column }) => {
    const { filterValue, setFilter } = column
    const handleChange = useCallback(
        e => {
            setFilter(e.target.value)
        },
        [setFilter],
    )

    return (
        <TextField
            style={{ width: '100%' }}
            helperText={'Contains value'}
            value={filterValue}
            onChange={handleChange}
            margin="dense"
            variant="filled"
        />
    )
}

const ContainsSearchFilter = {
    Filter: Component,
    filter: FilterTypes.CONTAINS_SEARCH,
}

export default ContainsSearchFilter

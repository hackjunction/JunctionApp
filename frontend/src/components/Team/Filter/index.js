import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'components/inputs/Select'
import Button from 'components/generic/Button'

export default ({ filterArray = [], noFilterOption = 'All' }) => {
    const [filter, setFilter] = useState(noFilterOption)

    const handleChange = event => {
        setFilter(event.target.value)
    }

    const resetFilters = () => {
        setFilter(noFilterOption)
    }
    return (
        <div>
            <Select
                value={filter}
                options={filterArray}
                onChange={handleChange}
            />
            <Button onClick={resetFilters}>Reset filter</Button>
        </div>
    )
}

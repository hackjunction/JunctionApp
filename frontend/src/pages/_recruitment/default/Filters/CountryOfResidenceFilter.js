import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'

import FilterItem from './FilterItem'
import Select from 'components/inputs/Select'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'

export default () => {
    const dispatch = useDispatch()
    const filters =
        useSelector(RecruitmentSelectors.filters)?.countryOfResidence ?? []
    const [draft, setDraft] = useState(filters)

    const handleSubmit = useCallback(() => {
        dispatch(
            RecruitmentActions.setFiltersField('countryOfResidence', draft)
        )
    }, [dispatch, draft])

    const handleReset = useCallback(() => {
        setDraft(filters)
    }, [filters])

    return (
        <FilterItem
            label="Country of residence"
            active={filters.length > 0}
            onSubmit={handleSubmit}
            onClose={handleReset}
        >
            <Box width="300px" height="300px" overflow="hidden">
                <Select
                    label="Choose countries (can be any of)"
                    options="country"
                    value={draft}
                    onChange={setDraft}
                    isMulti={true}
                    autoFocus
                />
            </Box>
        </FilterItem>
    )
}

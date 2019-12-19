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
        useSelector(RecruitmentSelectors.filters)?.spokenLanguages ?? []
    const [draft, setDraft] = useState(filters)

    const handleSubmit = useCallback(() => {
        dispatch(RecruitmentActions.setFiltersField('spokenLanguages', draft))
    }, [dispatch, draft])

    const handleReset = useCallback(() => {
        setDraft(filters)
    }, [filters])

    return (
        <FilterItem
            label="Spoken languages"
            active={filters.length > 0}
            onSubmit={handleSubmit}
            onClose={handleReset}
        >
            <Box width="300px" height="300px" overflow="hidden">
                <Select
                    label="Choose languages (must have all)"
                    options="language"
                    value={draft}
                    onChange={setDraft}
                    isMulti={true}
                    autoFocus
                />
            </Box>
        </FilterItem>
    )
}

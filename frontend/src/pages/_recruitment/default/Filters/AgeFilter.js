import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Slider, Typography } from '@material-ui/core'

import FilterItem from './FilterItem'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'

export default () => {
    const dispatch = useDispatch()
    const filters = useSelector(RecruitmentSelectors.filters)?.age ?? [0, 120]

    const [draft, setDraft] = useState(filters)

    const handleSubmit = useCallback(() => {
        dispatch(RecruitmentActions.setFiltersField('age', draft))
    }, [dispatch, draft])

    const handleChange = useCallback((e, value) => {
        setDraft(value)
    }, [])

    const handleReset = useCallback(() => {
        setDraft(filters)
    }, [filters])
// TODO Weird to translate
    return (
      <FilterItem
        label='Age'
        active={filters && filters[1] - filters[0] !== 120}
        onSubmit={handleSubmit}
        onClose={handleReset}
      >
        <Box
          padding={2}
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          width='300px'
        >
          <Typography variant='subtitle1' style={{ textAlign: 'center' }}>
            Between {draft[0]} and {draft[1]}
          </Typography>
          <Box height='50px' />
          <Slider
            value={draft}
            onChange={handleChange}
            valueLabelDisplay='auto'
            aria-labelledby='range-slider'
            max={120}
          />
        </Box>
      </FilterItem>
    );
}

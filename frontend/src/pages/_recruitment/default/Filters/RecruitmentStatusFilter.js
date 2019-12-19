import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Checkbox } from '@material-ui/core'
import { Misc } from '@hackjunction/shared'
import FilterItem from './FilterItem'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'

const ACTIVELY_LOOKING = Misc.recruitmentStatuses.items['actively-looking']
const UP_FOR_DISCUSSIONS = Misc.recruitmentStatuses.items['up-for-discussions']

export default () => {
    const dispatch = useDispatch()
    const filters =
        useSelector(RecruitmentSelectors.filters)?.recruitmentStatus ?? []
    const [draft, setDraft] = useState(filters)
    const handleChange = useCallback(
        value => {
            if (draft.indexOf(value) === -1) {
                setDraft([...draft, value])
            } else {
                setDraft(draft.filter(item => item !== value))
            }
        },
        [draft]
    )
    const handleSubmit = useCallback(() => {
        dispatch(RecruitmentActions.setFiltersField('recruitmentStatus', draft))
    }, [dispatch, draft])

    const handleReset = useCallback(() => {
        setDraft(filters)
    }, [filters])

    return (
        <FilterItem
            label="Recruitment status"
            active={filters.length !== 0}
            onSubmit={handleSubmit}
            onClose={handleReset}
        >
            <Box
                p={1}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="body1">
                    {ACTIVELY_LOOKING.label}
                </Typography>
                <Checkbox
                    checked={draft.indexOf(ACTIVELY_LOOKING.id) !== -1}
                    onChange={() => handleChange(ACTIVELY_LOOKING.id)}
                    value={ACTIVELY_LOOKING.id}
                    color="primary"
                    inputProps={{
                        'aria-label': 'secondary checkbox',
                    }}
                />
            </Box>
            <Box
                p={1}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="body1">
                    {UP_FOR_DISCUSSIONS.label}
                </Typography>
                <Checkbox
                    checked={draft.indexOf(UP_FOR_DISCUSSIONS.id) !== -1}
                    onChange={() => handleChange(UP_FOR_DISCUSSIONS.id)}
                    value={UP_FOR_DISCUSSIONS.id}
                    color="primary"
                    inputProps={{
                        'aria-label': 'secondary checkbox',
                    }}
                />
            </Box>
        </FilterItem>
    )
}

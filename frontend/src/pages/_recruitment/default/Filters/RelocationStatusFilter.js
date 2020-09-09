import React, { useState, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Checkbox } from '@material-ui/core'
import { Misc } from '@hackjunction/shared'
import FilterItem from './FilterItem'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'

const LOOKING_FOR_CHANGE = Misc.relocationOptions.items['looking-for-change']
const WILLING_TO_RELOCATE = Misc.relocationOptions.items['willing-to-relocate']
const NOT_CURRENTLY = Misc.relocationOptions.items['not-currently']

export default () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const filters =
        useSelector(RecruitmentSelectors.filters)?.relocationStatus ?? []
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
        dispatch(RecruitmentActions.setFiltersField('relocationStatus', draft))
    }, [dispatch, draft])

    const handleReset = useCallback(() => {
        setDraft(filters)
    }, [filters])

    return (
        <FilterItem
            label={t('Relocation_pref_')}
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
                    {LOOKING_FOR_CHANGE.label}
                </Typography>
                <Checkbox
                    checked={draft.indexOf(LOOKING_FOR_CHANGE.id) !== -1}
                    onChange={() => handleChange(LOOKING_FOR_CHANGE.id)}
                    value={LOOKING_FOR_CHANGE.id}
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
                    {WILLING_TO_RELOCATE.label}
                </Typography>
                <Checkbox
                    checked={draft.indexOf(WILLING_TO_RELOCATE.id) !== -1}
                    onChange={() => handleChange(WILLING_TO_RELOCATE.id)}
                    value={WILLING_TO_RELOCATE.id}
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
                <Typography variant="body1">{NOT_CURRENTLY.label}</Typography>
                <Checkbox
                    checked={draft.indexOf(NOT_CURRENTLY.id) !== -1}
                    onChange={() => handleChange(NOT_CURRENTLY.id)}
                    value={NOT_CURRENTLY.id}
                    color="primary"
                    inputProps={{
                        'aria-label': 'secondary checkbox',
                    }}
                />
            </Box>
        </FilterItem>
    )
}

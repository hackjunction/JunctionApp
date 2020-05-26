import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'

import FilterItem from './FilterItem'
import Select from 'components/inputs/Select'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'
import { useTranslation } from 'react-i18next'
export default () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation() // eslint-disable-line
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
            label={t('Spoken_languages_')}
            active={filters.length > 0}
            onSubmit={handleSubmit}
            onClose={handleReset}
        >
            <Box width="300px" height="300px" overflow="hidden">
                <Select
                    label={t('Choose_languages_')}
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

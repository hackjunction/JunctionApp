import React, { useState, useCallback, useEffect } from 'react'

import { Box, CircularProgress } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'

import * as RecruitmentActions from 'redux/recruitment/actions'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'

import { useDebounce } from 'hooks/customHooks'

import RecruitmentStatusFilter from './RecruitmentStatusFilter'
import CountryOfResidenceFilter from './CountryOfResidenceFilter'
import RelocationStatusFilter from './RelocationStatusFilter'
import LanguagesFilter from './LanguagesFilter'
import SkillsFilter from './SkillsFilter'
import RolesFilter from './RolesFilter'
import FilteredBy from './FilteredBy'
import TextInput from 'components/inputs/TextInput'

export default () => {
    const dispatch = useDispatch()
    const filters = useSelector(RecruitmentSelectors.filters)
    const loading = useSelector(RecruitmentSelectors.searchResultsLoading)
    const [searchValue, setSearchValue] = useState(filters.textSearch || '')

    const debouncedSearchValue = useDebounce(searchValue, 500)
    const handleSearch = useCallback(
        value => {
            dispatch(RecruitmentActions.setFiltersField('textSearch', value))
        },
        [dispatch],
    )

    useEffect(() => {
        handleSearch(debouncedSearchValue)
    }, [debouncedSearchValue, handleSearch])

    return (
        <Box display="flex" flexDirection="column">
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-start"
            >
                <SearchIcon />
                <Box width="300px" pl={0.5} pr={1}>
                    <TextInput
                        value={searchValue}
                        onChange={setSearchValue}
                        placeholder="Search by name/email"
                    />
                </Box>
                {loading && <CircularProgress size={24} />}
            </Box>
            <motion.div
                animate={{
                    overflow: 'hidden',
                    height: searchValue.length === 0 ? 'auto' : 0,
                    opacity: searchValue.length === 0 ? 1 : 0,
                }}
            >
                <Box
                    p={2}
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-end"
                    flexWrap="wrap"
                >
                    <SkillsFilter />
                    <RolesFilter />
                    <RecruitmentStatusFilter />
                    <RelocationStatusFilter />
                    <CountryOfResidenceFilter />
                    <LanguagesFilter />
                    {/* <EventsFilter /> */}
                    {/* <AgeFilter /> */}
                    <FilteredBy />
                </Box>
            </motion.div>
        </Box>
    )
}

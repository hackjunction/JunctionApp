import React, { useState, useCallback, useEffect } from 'react'

import {
    Box,
    // CircularProgress,
    Grid,
} from '@material-ui/core'
// import SearchIcon from '@material-ui/icons/Search'
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
import LoadingCard from '../SearchResults/LoadingCard'
// import TextInput from 'components/inputs/TextInput'

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

    const renderLoading = () => {
        if (!loading) return null
        if (loading) {
            return (
                <>
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(index => (
                            <Grid
                                direction="row"
                                alignItems="stretch"
                                container
                                key={index}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                            >
                                <LoadingCard />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )
        }
        return null
    }

    return (
        <Box display="flex" flexDirection="column">
            {/* <Box
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

            </Box> */}
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
            {loading && renderLoading()}
        </Box>
    )
}

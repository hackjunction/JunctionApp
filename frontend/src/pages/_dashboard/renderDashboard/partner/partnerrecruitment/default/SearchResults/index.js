import React, { useEffect } from 'react'
import Empty from 'components/generic/Empty'
import ResultCard from './ResultCard'
import { useDispatch, useSelector } from 'react-redux'
// import { useRouteMatch } from 'react-router'
import { Grid, Box, Typography, CircularProgress } from '@material-ui/core'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'
import * as DashboardActions from 'redux/dashboard/actions'
import { useTranslation } from 'react-i18next'
import Pagination from './Pagination'
import LoadingCard from './LoadingCard'
import { debugGroup } from 'utils/debuggingTools'

export default ({ items, organisation }) => {
    const dispatch = useDispatch()
    // const match = useRouteMatch()
    const searchResults =
        items ?? useSelector(RecruitmentSelectors.searchResults)
    const searchResultsCount = useSelector(
        RecruitmentSelectors.searchResultsCount,
    )
    const loading = useSelector(RecruitmentSelectors.searchResultsLoading)
    const filters = useSelector(RecruitmentSelectors.filters)
    const pageSize = useSelector(RecruitmentSelectors.pageSize)
    const page = useSelector(RecruitmentSelectors.page)
    const paginationEnabled = !items
    const isFavorited = !!items
    // const { slug } = match.params
    const { t } = useTranslation()

    debugGroup('RecruitmentSearchResults', [
        useSelector(RecruitmentSelectors.searchResults),
        searchResults,
        searchResultsCount,
    ])

    useEffect(() => {
        //dispatch(DashboardActions.updateEvent(slug))
        dispatch(RecruitmentActions.updateSearchResults())
    }, [pageSize, page, filters, dispatch])

    const renderLoading = () => {
        if (!loading) return null
        if (searchResults.length === 0) {
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
                                //lg={3}
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

    const renderResults = () => {
        if (searchResults.length === 0 && !loading) {
            if (isFavorited) {
                return <Empty isEmpty emptyText={t('No_favorites')} />
            } else if (filters.textSearch) {
                return <Empty isEmpty emptyText={t('No_results_')} />
            } else {
                return <Empty isEmpty emptyText={t('No_results_filter_')} />
            }
        }
        return (
            <Grid direction="row" alignItems="stretch" container spacing={2}>
                {searchResults.map(user => (
                    <Grid
                        direction="row"
                        alignItems="stretch"
                        container
                        key={`item-${user.userId}`}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        //lg={3}
                    >
                        <ResultCard data={user} organisation={organisation} />
                    </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <>
            {paginationEnabled && (
                <Box
                    p={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="subtitle1">
                        {searchResultsCount} results
                    </Typography>

                    <Box
                        p={2}
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                    >
                        <Pagination />
                    </Box>
                </Box>
            )}
            {renderLoading()}
            {renderResults()}
            {paginationEnabled && (
                <Box
                    p={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                >
                    <Pagination />
                </Box>
            )}
        </>
    )
}

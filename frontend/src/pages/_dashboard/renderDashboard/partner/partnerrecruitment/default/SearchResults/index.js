import React, { useEffect } from 'react'
import Empty from 'components/generic/Empty'
import ResultCard from './ResultCard'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { Grid, Box, Typography } from '@material-ui/core'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'
// import * as DashboardActions from 'redux/dashboard/actions'
import { useTranslation } from 'react-i18next'
import Pagination from './Pagination'
import LoadingCard from './LoadingCard'
import { push } from 'connected-react-router'

export default ({ items, organisation, eventId }) => {
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const baseRoute = match.url
    const itemsFromStore = useSelector(RecruitmentSelectors.searchResults)
    const searchResults = items ?? itemsFromStore
    const searchResultsCount = useSelector(
        RecruitmentSelectors.searchResultsCount,
    )
    const loading = useSelector(RecruitmentSelectors.searchResultsLoading)
    const filters = useSelector(RecruitmentSelectors.filters)
    const pageSize = useSelector(RecruitmentSelectors.pageSize)
    const page = useSelector(RecruitmentSelectors.page)
    const paginationEnabled = !items
    const isFavorited = !!items
    // // const { slug } = match.params
    const { t } = useTranslation()

    useEffect(() => {
        //dispatch(DashboardActions.updateEvent(slug))
        dispatch(RecruitmentActions.updateSearchResults())
    }, [pageSize, page, filters])

    const renderLoading = () => {
        if (!loading) return null
        if (Array.isArray(searchResults) && searchResults.length === 0) {
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
        if (
            Array.isArray(searchResults) &&
            searchResults.length === 0 &&
            !loading
        ) {
            if (isFavorited) {
                return <Empty isEmpty emptyText={t('No_favorites_')} />
            } else if (filters.textSearch) {
                return <Empty isEmpty emptyText={t('No_results_')} />
            } else {
                return <Empty isEmpty emptyText={t('No_results_filter_')} />
            }
        }
        return (
            <Grid direction="row" alignItems="stretch" container spacing={2}>
                {Array.isArray(searchResults) &&
                    searchResults.map(user => (
                        <Grid
                            direction="row"
                            alignItems="stretch"
                            container
                            key={`item-${user.userId}`}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                        >
                            <ResultCard
                                data={user}
                                organisation={organisation}
                                onClick={() => {
                                    dispatch(
                                        push(`${baseRoute}/${user.userId}`),
                                    )
                                }}
                                eventId={eventId}
                            />
                        </Grid>
                    ))}
            </Grid>
        )
    }

    return (
        <>
            {paginationEnabled && (
                <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-p-2">
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
                </div>
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

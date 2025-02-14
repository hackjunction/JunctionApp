import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, IconButton, CircularProgress } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { useDebounce } from 'hooks/customHooks'

import * as RecruitmentSelectors from 'reducers/recruitment/selectors'
import * as RecruitmentActions from 'reducers/recruitment/actions'

export default () => {
    const dispatch = useDispatch()
    const currentPage = useSelector(RecruitmentSelectors.page)
    const totalPages = useSelector(RecruitmentSelectors.pageCount)
    const totalResults = useSelector(RecruitmentSelectors.searchResultsCount)
    const loading = useSelector(RecruitmentSelectors.searchResultsLoading)

    const [_currentPage, _setCurrentPage] = useState(currentPage)
    const debouncedPage = useDebounce(_currentPage, 200)

    const handlePageChange = page => {
        dispatch(RecruitmentActions.setPage(page))
    }

    useEffect(() => {
        _setCurrentPage(currentPage)
    }, [currentPage])

    useEffect(() => {
        handlePageChange(debouncedPage)
    }, [debouncedPage, handlePageChange])

    const handlePrevPage = useCallback(() => {
        _setCurrentPage(_currentPage - 1)
    }, [_currentPage])

    const handleNextPage = useCallback(() => {
        _setCurrentPage(_currentPage + 1)
    }, [_currentPage])

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            {loading ? (
                <Typography variant="overline">Page 1</Typography>
            ) : (
                <>
                    <IconButton
                        disabled={_currentPage === 0}
                        onClick={handlePrevPage}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <Box padding={1}>
                        {totalResults > 0 ? (
                            <Typography variant="overline">
                                Page {_currentPage + 1} of {totalPages}
                            </Typography>
                        ) : (
                            <Typography variant="overline">Page 1</Typography>
                        )}
                    </Box>
                    <IconButton
                        disabled={_currentPage + 1 >= totalPages}
                        onClick={handleNextPage}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </>
            )}
        </Box>
    )
}

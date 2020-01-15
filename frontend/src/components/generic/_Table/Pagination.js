import React, { useCallback } from 'react'

import { Box, Typography, IconButton, TextField } from '@material-ui/core'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

const Pagination = props => {
    const {
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        pageSize,
        pageIndex,
        items,
    } = props

    // const handlePageSizeChange = useCallback(
    //     e => {
    //         setPageSize(Number(e.target.value))
    //     },
    //     [setPageSize]
    // )

    return (
        <Box
            p={1}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            flexWrap="wrap"
            alignItems="center"
        >
            <Box>
                <Typography variant="caption">
                    {items === 1 ? '1 result' : `${items} results`}
                </Typography>
            </Box>
            {pageOptions.length > 0 && (
                <Box display="flex" flexDirection="row" alignItems="center">
                    <IconButton
                        disabled={!canPreviousPage}
                        onClick={previousPage}
                    >
                        <NavigateBeforeIcon />
                    </IconButton>
                    <Box p={1}>
                        <Typography variant="subtitle2">
                            Page {pageIndex + 1} of {pageCount}
                        </Typography>
                    </Box>
                    <IconButton disabled={!canNextPage} onClick={nextPage}>
                        <NavigateNextIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    )
}

export default Pagination

import React from 'react'

import { Box, Typography, IconButton } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'

export default ({
    pageIndex,
    pageCount,
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
    pageSize,
}) => {
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton disabled={!canPreviousPage} onClick={previousPage}>
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
    )
}

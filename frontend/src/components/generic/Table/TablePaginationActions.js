import React, { useCallback } from 'react'

import { IconButton, Box } from '@mui/material'

import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'

const TablePaginationActions = ({ count, page, rowsPerPage, onChangePage }) => {
    const handleFirstPageButtonClick = useCallback(
        event => {
            onChangePage(event, 0)
        },
        [onChangePage],
    )

    const handleBackButtonClick = useCallback(
        event => {
            onChangePage(event, page - 1)
        },
        [onChangePage, page],
    )

    const handleNextButtonClick = useCallback(
        event => {
            onChangePage(event, page + 1)
        },
        [onChangePage, page],
    )

    const handleLastPageButtonClick = useCallback(
        event => {
            onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
        },
        [onChangePage, count, rowsPerPage],
    )

    return (
        <Box flexShrink="0">
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </Box>
    )
}

export default TablePaginationActions

import React from 'react'
import { Box } from '@mui/material'
import PageSizeSelect from './PageSizeSelect'
import PageSelect from './PageSelect'

const Pagination = props => {
    const {
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        pageSize,
        pageIndex,
    } = props

    return (
        <Box className="flex flex-col items-center md:flex-row md:justify-between md:flex-wrap">
            <PageSizeSelect
                gotoPage={gotoPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            <PageSelect
                pageSize={pageSize}
                pageIndex={pageIndex}
                pageCount={pageCount}
                canPreviousPage={canPreviousPage}
                previousPage={previousPage}
                canNextPage={canNextPage}
                nextPage={nextPage}
            />
        </Box>
    )
}

export default Pagination

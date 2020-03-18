import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import PageSizeSelect from './PageSizeSelect'
import PageSelect from './PageSelect'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
        },
    },
}))

const Pagination = props => {
    const classes = useStyles()
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
        <Box className={classes.wrapper}>
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

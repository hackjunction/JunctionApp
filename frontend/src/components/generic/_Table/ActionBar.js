import React, { useState, useCallback, useMemo } from 'react'

import {
    Box,
    Typography,
    IconButton,
    Popover,
    Paper,
    InputBase,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'
import GetAppIcon from '@material-ui/icons/GetApp'
import FilterListIcon from '@material-ui/icons/FilterList'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1, 2),
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
    },
    search: {
        flex: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    filtersWrapper: {
        width: '100%',
        maxWidth: '600px',
    },
    filtersInner: {
        padding: theme.spacing(2),
        width: '100%',
        overflow: 'scroll',
        minHeight: '300px',
        maxHeight: '600px',
    },
}))

const ActionBar = ({ columns }) => {
    const classes = useStyles()
    const [filterAnchor, setFilterAnchor] = useState(null)

    const handleFiltersOpen = useCallback(e => {
        setFilterAnchor(e.currentTarget)
    }, [])

    const handleFiltersClose = useCallback(() => {
        setFilterAnchor(null)
    }, [])

    const filtersOpen = Boolean(filterAnchor)
    const filtersId = filtersOpen ? 'filters-popover' : undefined

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.search}>
                <InputBase
                    placeholder="Search results"
                    startAdornment={
                        <SearchIcon
                            fontSize="small"
                            style={{ marginRight: '0.5rem' }}
                        />
                    }
                />
            </Box>
            <Box className={classes.actions}>
                {/* <Popover
                    id={filtersId}
                    open={filtersOpen}
                    anchorEl={filterAnchor}
                    onClose={handleFiltersClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    classes={{
                        paper: classes.filtersWrapper,
                    }}
                >
                    <Box className={classes.filtersInner}>
                        {columns.map(column => {
                            if (!column.canFilter || !column.filter) return null
                            const filter = column.render('Filter')
                            return (
                                <React.Fragment key={column.id}>
                                    <Typography
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {column.Header}
                                    </Typography>
                                    <Box>{filter}</Box>
                                </React.Fragment>
                            )
                        })}
                    </Box>
                </Popover> */}
                <Box>
                    <IconButton
                        size="small"
                        className={classes.button}
                        onClick={handleFiltersOpen}
                        aria-describedby={filtersId}
                    >
                        <FilterListIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className={classes.button}>
                        <GetAppIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default ActionBar

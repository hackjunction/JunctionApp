import React, { useState, useCallback, useMemo } from 'react';

import { Box, Typography, IconButton, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: theme.palette.theme_lightgray.main,
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1),
        justifyContent: 'flex-end'
    },
    filtersWrapper: {
        width: '100%',
        maxWidth: '600px'
    },
    filtersInner: {
        padding: theme.spacing(2),
        width: '100%',
        overflow: 'scroll',
        minHeight: '300px',
        maxHeight: '600px'
    }
}));

const ActionBar = ({ columns }) => {
    const classes = useStyles();
    const [filterAnchor, setFilterAnchor] = useState(null);

    const handleFiltersOpen = useCallback(e => {
        setFilterAnchor(e.currentTarget);
    }, []);

    const handleFiltersClose = useCallback(() => {
        setFilterAnchor(null);
    }, []);

    const filtersOpen = Boolean(filterAnchor);
    const filtersId = filtersOpen ? 'filters-popover' : undefined;

    return (
        <Box className={classes.wrapper}>
            <IconButton onClick={handleFiltersOpen} aria-describedby={filtersId}>
                <FilterListIcon />
            </IconButton>
            <Popover
                id={filtersId}
                open={filtersOpen}
                anchorEl={filterAnchor}
                onClose={handleFiltersClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                classes={{
                    paper: classes.filtersWrapper
                }}
            >
                <Box className={classes.filtersInner}>
                    {columns.map(column => {
                        if (!column.canFilter || !column.filter) return null;
                        const filter = column.render('Filter');
                        return (
                            <React.Fragment key={column.id}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {column.Header}
                                </Typography>
                                <Box>{filter}</Box>
                            </React.Fragment>
                        );
                    })}
                </Box>
            </Popover>
            <IconButton>
                <GetAppIcon />
            </IconButton>
        </Box>
    );
};

export default ActionBar;

import React, { useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Button, Box } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import SearchResults from './SearchResults';
import FiltersDrawer from './FiltersDrawer';

const DRAWER_WIDTH = 500;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0
    },
    drawerInner: {
        width: DRAWER_WIDTH,
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));

const SearchPage = () => {
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = useCallback(() => setDrawerOpen(true), []);
    const closeDrawer = useCallback(() => setDrawerOpen(false), []);

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerInner
                }}
                variant="temporary"
                open={drawerOpen}
                onClose={closeDrawer}
            >
                <FiltersDrawer onSubmit={closeDrawer} />
            </Drawer>
            <main className={classes.content}>
                <Button onClick={openDrawer}>
                    <FilterListIcon />
                    Filters
                </Button>
                <Box mt={1} />
                <SearchResults />
            </main>
        </div>
        // <PageWrapper>
        //     <SearchBox />
        //     <SearchResults />
        // </PageWrapper>
    );
};

export default SearchPage;

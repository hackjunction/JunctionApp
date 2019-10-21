import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

import SearchResults from './SearchResults';
import SearchBox from './SearchBox';

const DRAWER_WIDTH = 500;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flex: 1
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        backgroundColor: 'white'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));

const SearchPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Drawer className={classes.drawer} variant="permanent">
                <SearchBox />
            </Drawer>
            <main className={classes.content}>
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

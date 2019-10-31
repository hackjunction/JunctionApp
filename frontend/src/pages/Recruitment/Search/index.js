import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SearchResults from './SearchResults';
import Filters from './Filters';
import CenteredContainer from 'components/generic/CenteredContainer';

const DRAWER_WIDTH = 500;

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
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

    return (
        <div className={classes.root}>
            <CenteredContainer>
                <Filters />
                <SearchResults />
            </CenteredContainer>
        </div>
    );
};

export default SearchPage;

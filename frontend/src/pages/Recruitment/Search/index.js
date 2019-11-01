import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SearchResults from './SearchResults';
import Filters from './Filters';
import CenteredContainer from 'components/generic/CenteredContainer';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
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

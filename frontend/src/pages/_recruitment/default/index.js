import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';

import SearchResults from './SearchResults';
import Filters from './Filters';
import CenteredContainer from 'components/generic/CenteredContainer';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

import ToggleFavorites from './ToggleFavorites';

import { useToggle } from 'hooks/customHooks';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));

export default () => {
    const classes = useStyles();
    const idTokenData = useSelector(AuthSelectors.idTokenData);
    const favorites = useSelector(RecruitmentSelectors.favorites);

    const [showFavorites, toggleFavorites] = useToggle(false);

    useEffect(() => {
        if (!idTokenData) {
            throw new Error(
                'Invalid access token. Please try logging out and logging in again. If the problem persists, please contact support.'
            );
        }
        if (!idTokenData.recruiter_events) {
            throw new Error(
                "You don't have access to any events. Please try logging out and logging in again. If the problem persists, please contact support."
            );
        }
        if (!idTokenData.recruiter_organisation) {
            throw new Error(
                "You don't belong to any organisation. Please try logging out and logging in again. If the problem persists, please contact support."
            );
        }
    }, [idTokenData]);

    return (
        <div className={classes.root}>
            <CenteredContainer>
                <Box display="flex" flexDirection="row" justifyContent="flex-end" mb={2}>
                    <ToggleFavorites count={favorites.length} active={showFavorites} onChange={toggleFavorites} />
                </Box>
                {showFavorites ? (
                    <SearchResults items={favorites} />
                ) : (
                    <React.Fragment>
                        <Filters />
                        <SearchResults />
                    </React.Fragment>
                )}
            </CenteredContainer>
        </div>
    );
};

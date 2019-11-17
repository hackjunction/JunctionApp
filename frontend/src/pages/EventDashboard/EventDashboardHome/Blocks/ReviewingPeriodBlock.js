import React, { useEffect } from 'react';

import { Typography, Grid, Box } from '@material-ui/core';
import { push } from 'connected-react-router';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { EventHelpers } from '@hackjunction/shared';

import Button from 'components/generic/Button';
import GradientBox from 'components/generic/GradientBox';
import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';

const ReviewingPeriodBlock = ({ event, voteCount, updateAnnotator, openReviewing }) => {
    useEffect(() => {
        if (event) {
            updateAnnotator(event.slug);
        }
    }, [event, updateAnnotator]);

    if (!event || !EventHelpers.isVotingOpen(event, moment)) return null;

    return (
        <Grid item xs={12}>
            <GradientBox p={3} color="theme_purple">
                <Typography variant="button">Reviewing period</Typography>
                <Typography variant="h4">Reviewing period is open!</Typography>
                <Typography variant="h6" gutterBottom>
                    Reviewing ends {moment(event.reviewingEndTime).fromNow()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {voteCount === 0
                        ? `Head over to the reviewing page to start reviewing other projects!`
                        : `You've submitted ${voteCount} votes. Head over to the reviewing page to continue reviewing other projects!`}
                </Typography>
                <Box mt={2}></Box>
                <Button onClick={() => openReviewing(event.slug)} color="theme_white" variant="contained">
                    To reviewing
                </Button>
            </GradientBox>
        </Grid>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    voteCount: DashboardSelectors.annotatorVoteCount(state)
});

const mapDispatch = dispatch => ({
    updateAnnotator: slug => dispatch(DashboardActions.updateAnnotator(slug)),
    openReviewing: slug => dispatch(push(`/dashboard/${slug}/reviewing`))
});

export default connect(mapState, mapDispatch)(ReviewingPeriodBlock);

import React from 'react';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment-timezone';
import { EventStatuses } from '@hackjunction/shared';
import { Typography, Grid } from '@material-ui/core';

import Button from 'components/generic/Button';
import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

const EventButtons = ({ event, eventStatus, user, hasRegistration, pushLogin, pushRegistration, pushDashboard }) => {
    switch (eventStatus) {
        case EventStatuses.PUBLISHED.id: {
            return (
                <Typography align="center" variant="subtitle1">
                    The application period begins{' '}
                    {moment(event.registrationStartTime).format(`LLL [(${event.timezone})]`)}
                </Typography>
            );
        }
        case EventStatuses.REGISTRATION_OPEN.id: {
            if (user) {
                if (hasRegistration) {
                    return (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={pushRegistration}
                                    variant="contained"
                                    color="theme_turquoise"
                                >
                                    Edit your registration
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth onClick={pushDashboard} variant="contained" color="theme_orange">
                                    Event dashboard
                                </Button>
                            </Grid>
                        </Grid>
                    );
                } else {
                    return (
                        <Button fullWidth onClick={pushRegistration} variant="contained" color="theme_turquoise">
                            Apply now
                        </Button>
                    );
                }
            } else {
                return (
                    <Button fullWidth onClick={pushLogin} variant="contained" color="theme_turquoise">
                        Log in to apply
                    </Button>
                );
            }
        }
        default: {
            if (user) {
                if (hasRegistration) {
                    return (
                        <Button fullWidth onClick={pushDashboard} variant="contained" color="theme_turquoise">
                            Event dashboard
                        </Button>
                    );
                } else {
                    return (
                        <Typography variant="subtitle1" align="center">
                            The application period for this event has ended!
                        </Typography>
                    );
                }
            } else {
                return (
                    <Button fullWidth onClick={pushLogin} variant="contained" color="theme_turquoise">
                        Log in
                    </Button>
                );
            }
        }
    }
};

const mapState = state => ({
    event: EventDetailSelectors.event(state),
    eventStatus: EventDetailSelectors.eventStatus(state),
    hasRegistration: EventDetailSelectors.hasRegistration(state),
    idTokenData: AuthSelectors.idTokenData(state)
});

const mapDispatch = (dispatch, ownProps) => ({
    pushDashboard: () => dispatch(push(`/dashboard/${ownProps.slug}`)),
    pushRegistration: () => dispatch(push(`${ownProps.match.url}/register`)),
    pushLogin: () => dispatch(push('/login', { nextRoute: ownProps.match.url }))
});

export default connect(
    mapState,
    mapDispatch
)(EventButtons);

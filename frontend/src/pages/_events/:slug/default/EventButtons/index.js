import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useRouteMatch } from 'react-router';
import moment from 'moment-timezone';
import { EventStatuses } from '@hackjunction/shared';
import { Typography, Grid } from '@material-ui/core';

import Button from 'components/generic/Button';
import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import * as UserSelectors from 'redux/user/selectors';

export default () => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const event = useSelector(EventDetailSelectors.event);
    const eventStatus = useSelector(EventDetailSelectors.eventStatus);
    const userProfile = useSelector(UserSelectors.userProfile);
    const hasRegistration = useSelector(EventDetailSelectors.hasRegistration);
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
            if (userProfile) {
                if (hasRegistration) {
                    return (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={() => dispatch(push(`${match.url}/register`))}
                                    variant="contained"
                                    color="theme_turquoise"
                                >
                                    Edit your registration
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={() => dispatch(push(`/dashboard/${event.slug}`))}
                                    variant="contained"
                                    color="theme_orange"
                                >
                                    Event dashboard
                                </Button>
                            </Grid>
                        </Grid>
                    );
                } else {
                    return (
                        <Button
                            fullWidth
                            onClick={() => dispatch(push(`${match.url}/register`))}
                            variant="contained"
                            color="theme_turquoise"
                        >
                            Apply now
                        </Button>
                    );
                }
            } else {
                return (
                    <Button
                        fullWidth
                        onClick={() => dispatch(push(`/login`, { nextRoute: match.url }))}
                        variant="contained"
                        color="theme_turquoise"
                    >
                        Log in to apply
                    </Button>
                );
            }
        }
        default: {
            if (userProfile) {
                if (hasRegistration) {
                    return (
                        <Button
                            fullWidth
                            onClick={() => dispatch(push(`/dashboard/${event.slug}`))}
                            variant="contained"
                            color="theme_turquoise"
                        >
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
                    <Button
                        fullWidth
                        onClick={() => dispatch(push('/login', { nextRoute: match.url }))}
                        variant="contained"
                        color="theme_turquoise"
                    >
                        Log in
                    </Button>
                );
            }
        }
    }
};

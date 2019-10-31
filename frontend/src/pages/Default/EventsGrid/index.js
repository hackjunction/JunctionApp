import React from 'react';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Grid, Typography } from '@material-ui/core';

import * as EventsSelectors from 'redux/events/selectors';

import CenteredContainer from 'components/generic/CenteredContainer';
import EventCard from 'components/events/EventCard';
import Button from 'components/generic/Button';
import PageWrapper from 'components/layouts/PageWrapper';

const EventsGrid = ({ events, loading, push }) => {
    function renderEvents() {
        return events.map(event => {
            return (
                <Grid item xs={12} md={6} lg={4}>
                    <EventCard
                        event={event}
                        buttons={[
                            <Button
                                color="theme_lightgray"
                                variant="outlined"
                                onClick={() => push('/events/' + event.slug)}
                            >
                                See more
                            </Button>
                        ]}
                    />
                </Grid>
            );
        });
    }

    return (
        <PageWrapper
            loading={loading}
            render={() => (
                <CenteredContainer>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Upcoming events</Typography>
                        </Grid>
                        {renderEvents()}
                    </Grid>
                </CenteredContainer>
            )}
        />
    );
};

const mapStateToProps = state => ({
    events: EventsSelectors.events(state),
    loading: EventsSelectors.eventsLoading(state)
});

export default connect(
    mapStateToProps,
    { push }
)(EventsGrid);

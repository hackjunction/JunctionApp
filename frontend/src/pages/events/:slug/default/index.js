import React, { useEffect } from 'react';

import { Grid, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import EventHeroImage from 'components/events/EventHeroImage';
import Markdown from 'components/generic/Markdown';
import AnalyticsService from 'services/analytics';

import EventTimeline from './EventTimeline';
import EventButtons from './EventButtons';

import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import StaggeredList from 'components/animated/StaggeredList';
import StaggeredListItem from 'components/animated/StaggeredListItem';
import FadeInWrapper from 'components/animated/FadeInWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';

const EventDetail = props => {
    const { event, registration, slug, match, location, pushLogin, eventStatus } = props;
    useEffect(() => {
        AnalyticsService.events.VIEW_EVENT(slug);
    }, [slug]);

    return (
        <React.Fragment>
            <EventHeroImage event={event} />
            <FadeInWrapper>
                <CenteredContainer>
                    <StaggeredList>
                        <Grid container spacing={5} wrap="wrap-reverse">
                            <Grid item xs={12} md={8}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <Markdown source={event.description} />
                                </StaggeredListItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <EventButtons slug={slug} match={match} location={location} />
                                    <Box mt={3} />
                                    <EventTimeline event={event} />
                                </StaggeredListItem>
                            </Grid>
                        </Grid>
                    </StaggeredList>
                </CenteredContainer>
            </FadeInWrapper>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    event: EventDetailSelectors.event(state),
    registration: EventDetailSelectors.registration(state),
    eventStatus: EventDetailSelectors.eventStatus(state)
});

const mapDispatchToProps = dispatch => ({
    pushLogin: nextRoute => dispatch(push('/login', { nextRoute }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);

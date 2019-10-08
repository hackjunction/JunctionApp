import React, { useEffect } from 'react';
import styles from './EventDetail.module.scss';

import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import EventHeroImage from 'components/events/EventHeroImage';
import Divider from 'components/generic/Divider';
import Markdown from 'components/generic/Markdown';
import AnalyticsService from 'services/analytics';

import EventTimeline from './EventTimeline';
import EventButtons from './EventButtons';

import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import StaggeredList from 'components/animated/StaggeredList';
import StaggeredListItem from 'components/animated/StaggeredListItem';
import FadeInWrapper from 'components/animated/FadeInWrapper';

const EventDetail = ({ event, registration, slug, user, match, location, pushLogin, eventStatus }) => {
    useEffect(() => {
        AnalyticsService.events.VIEW_EVENT(slug);
    }, [slug]);

    return (
        <React.Fragment>
            <EventHeroImage event={event} />
            <FadeInWrapper className={styles.centered}>
                <StaggeredList>
                    <Row gutter={32} type="flex">
                        <Col xs={{ span: 24, order: 2 }} md={{ span: 16, order: 1 }}>
                            <Divider size={3} />
                            <StaggeredListItem>
                                <div className={styles.detailsCard}>
                                    <Markdown source={event.description} />
                                </div>
                            </StaggeredListItem>
                        </Col>
                        <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 2 }}>
                            <Col xs={0} md={24}>
                                <Divider size={3} />
                            </Col>
                            <Col xs={24} md={0}>
                                <Divider size={1} />
                            </Col>
                            <StaggeredListItem>
                                <EventButtons match={match} location={location} />
                                <Divider size={3} />
                                <EventTimeline event={event} />
                            </StaggeredListItem>
                        </Col>
                    </Row>
                </StaggeredList>
            </FadeInWrapper>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    user: AuthSelectors.getCurrentUser(state),
    event: EventDetailSelectors.event(state),
    registration: EventDetailSelectors.registration(state),
    eventStatus: EventDetailSelectors.eventStatus(state)
});

const mapDispatchToProps = dispatch => ({
    pushLogin: nextRoute => dispatch(push('/login', { nextRoute }))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventDetail);

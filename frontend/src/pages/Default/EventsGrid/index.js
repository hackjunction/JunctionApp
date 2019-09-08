import React from 'react';
import styles from './EventsGrid.module.scss';

import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import * as EventsSelectors from 'redux/events/selectors';

import EventCard from 'components/events/EventCard';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';
import PageWrapper from 'components/PageWrapper';

const EventsGrid = ({ events, loading }) => {
    function renderEvents() {
        return events.map(event => {
            return (
                <Col xs={24} md={12} lg={8} key={event.slug}>
                    <EventCard
                        event={event}
                        buttons={[
                            <Button
                                key={1}
                                text="See more"
                                theme="secondary"
                                link={{
                                    internal: '/events/' + event.slug
                                }}
                            />
                        ]}
                    />
                    <Divider size={1} />
                </Col>
            );
        });
    }

    return (
        <PageWrapper
            loading={loading}
            render={() => (
                <div className={styles.wrapper}>
                    <Row>
                        <Col xs={24}>
                            <h3>Upcoming events</h3>
                            <Divider size={1} />
                        </Col>
                    </Row>
                    <Row gutter={16}>{renderEvents()}</Row>
                </div>
            )}
        />
    );
};

const mapStateToProps = state => ({
    events: EventsSelectors.events(state),
    loading: EventsSelectors.eventsLoading(state)
});

export default connect(mapStateToProps)(EventsGrid);

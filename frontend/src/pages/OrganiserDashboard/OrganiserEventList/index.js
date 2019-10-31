import React, { useState, useEffect, useCallback } from 'react';
import styles from './OrganiserEditEventList.module.scss';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Input, message, Row, Col, notification } from 'antd';

import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';
import PageWrapper from 'components/layouts/PageWrapper';
import GlobalNavBar from 'components/navbars/GlobalNavBar';
import Footer from 'components/layouts/Footer';
import EventCard from 'components/events/EventCard';

import * as AuthSelectors from 'redux/auth/selectors';
import CenteredContainer from 'components/generic/CenteredContainer';
import EventsService from 'services/events';

const OrganiserEventList = ({ editEvent, idToken }) => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    const updateEvents = useCallback(() => {
        setLoading(true);
        EventsService.getEventsByOrganiser(idToken)
            .then(data => {
                setEvents(data);
            })
            .catch(e => {
                notification.error({
                    message: 'Something went wrong',
                    description: 'Unable to get events'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idToken]);

    const handleCreate = useCallback(() => {
        const hideMessage = message.loading('Creating ' + inputValue, 0);
        EventsService.createEvent(idToken, { name: inputValue })
            .then(data => {
                editEvent(data.slug);
            })
            .catch(e => {
                message.error('Oops, something went wrong');
            })
            .finally(() => {
                hideMessage();
            });
    }, [editEvent, idToken, inputValue]);

    useEffect(() => {
        updateEvents();
    }, [updateEvents]);

    function renderEvents() {
        return events.map(event => (
            <Col xs={24} md={12} lg={8} key={event.slug}>
                <EventCard
                    event={event}
                    buttons={[
                        <Button color="primary" variant="contained" onClick={() => editEvent(event.slug)}>
                            Manage
                        </Button>
                    ]}
                />
            </Col>
        ));
    }

    return (
        <PageWrapper
            loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <CenteredContainer className={styles.content}>
                    <Divider size={2} />
                    <Row gutter={16}>
                        <Col xs={18}>
                            <Input
                                className="OrganiserEventList--form__input"
                                type="text"
                                placeholder="Enter a name for your event"
                                value={inputValue}
                                size="large"
                                onChange={e => setInputValue(e.target.value)}
                            />
                        </Col>
                        <Col xs={6}>
                            <Button color="primary" variant="contained" onClick={handleCreate} disabled>
                                Create event
                            </Button>
                        </Col>
                    </Row>
                    <Divider size={1} />
                    <Row gutter={16}>{renderEvents()}</Row>
                </CenteredContainer>
            )}
        />
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state)
});

const mapDispatchToProps = dispatch => ({
    editEvent: slug => dispatch(push('/organise/edit/' + slug))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganiserEventList);

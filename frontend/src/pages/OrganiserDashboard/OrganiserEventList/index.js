import React, { useState, useEffect, useCallback } from 'react';
import styles from './OrganiserEditEventList.module.scss';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withSnackbar } from 'notistack';
import { Grid } from '@material-ui/core';

import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';
import PageWrapper from 'components/layouts/PageWrapper';
import GlobalNavBar from 'components/navbars/GlobalNavBar';
import Footer from 'components/layouts/Footer';
import EventCard from 'components/events/EventCard';
import TextInput from 'components/inputs/TextInput';

import * as AuthSelectors from 'redux/auth/selectors';
import CenteredContainer from 'components/generic/CenteredContainer';
import EventsService from 'services/events';

const OrganiserEventList = ({ editEvent, idToken, enqueueSnackbar }) => {
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
                enqueueSnackbar('Something went wrong... Unable to get events', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idToken, enqueueSnackbar]);

    const handleCreate = useCallback(() => {
        setLoading(true);
        EventsService.createEvent(idToken, { name: inputValue })
            .then(data => {
                editEvent(data.slug);
            })
            .catch(e => {
                enqueueSnackbar('Something went wrong... Unable to get events', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [editEvent, idToken, inputValue, enqueueSnackbar]);

    useEffect(() => {
        updateEvents();
    }, [updateEvents]);

    function renderEvents() {
        return events.map(event => (
            <Grid item xs={12} md={6} lg={4} key={event.slug}>
                <EventCard
                    event={event}
                    buttons={[
                        <Button color="primary" variant="contained" onClick={() => editEvent(event.slug)}>
                            Manage
                        </Button>
                    ]}
                />
            </Grid>
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
                    <Grid container spacing={3}>
                        <Grid item xs={9}>
                            <TextInput
                                label="Event name"
                                placeholder="Enter a name for your event"
                                value={inputValue}
                                onChange={setInputValue}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                loading={loading}
                                color="primary"
                                variant="contained"
                                onClick={handleCreate}
                                disabled
                            >
                                Create event
                            </Button>
                        </Grid>
                        {renderEvents()}
                    </Grid>
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

export default withSnackbar(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(OrganiserEventList)
);

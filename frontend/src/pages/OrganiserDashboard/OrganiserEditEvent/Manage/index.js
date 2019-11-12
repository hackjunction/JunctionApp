import React, { useState, useEffect } from 'react';
import { concat } from 'lodash-es';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withSnackbar } from 'notistack';

import * as OrganiserActions from 'redux/organiser/actions';
import * as OrganiserSelectors from 'redux/organiser/selectors';

import AddOrganiserDrawer from './AddOrganiserDrawer';
import Button from 'components/generic/Button';
import PageHeader from 'components/generic/PageHeader';
import PageWrapper from 'components/layouts/PageWrapper';
import { ListItemSecondaryAction, List, ListItem, ListItemText } from '@material-ui/core';

const OrganiserEditEventManage = props => {
    const {
        addOrganiser,
        removeOrganiser,
        updateOrganiserProfiles,
        organiserProfiles,
        event,
        eventLoading,
        enqueueSnackbar
    } = props;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { slug } = event;

    useEffect(() => {
        updateOrganiserProfiles(event.owner, event.organisers).catch(err => {
            enqueueSnackbar('Oops, something went wrong... Unable to load organisers. Please try again.');
        });
    }, [event.organisers, updateOrganiserProfiles, event.owner, enqueueSnackbar]);

    function handleOrganiserRemoved(userId) {
        setLoading(true);
        removeOrganiser(slug, userId)
            .then(() => {
                enqueueSnackbar('Organiser removed', { variant: 'success' });
            })
            .catch(err => {
                enqueueSnackbar('Oops something went wrong... Unable to remove organiser', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleOrganiserAdded(userId) {
        setLoading(true);
        addOrganiser(slug, userId)
            .then(() => {
                enqueueSnackbar('Added organiser');
            })
            .catch(err => {
                enqueueSnackbar('Oops, something went wrong... Please try again.', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <PageWrapper
            loading={eventLoading}
            error={!event && !eventLoading}
            render={() => (
                <React.Fragment>
                    <PageHeader heading="Organisers" subheading="Manage who has access to edit this event" />
                    <Button loading={loading} color="primary" variant="contained" onClick={() => setDrawerOpen(true)}>
                        Add organisers
                    </Button>
                    <List>
                        {organiserProfiles.map(profile => (
                            <ListItem key={profile.userId} divider>
                                <ListItemText
                                    primary={`${profile.firstName} ${profile.lastName}`}
                                    secondary={profile.email}
                                />
                                <ListItemSecondaryAction>
                                    <Button
                                        loading={loading}
                                        color="error"
                                        onClick={() => handleOrganiserRemoved(profile.userId)}
                                    >
                                        Remove
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                    <AddOrganiserDrawer
                        isOpen={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        onAdded={handleOrganiserAdded}
                        slug={event.slug}
                        organisers={concat(event.owner, event.organisers)}
                    />
                </React.Fragment>
            )}
        />
    );
};

const mapStateToProps = state => ({
    event: OrganiserSelectors.event(state),
    eventLoading: OrganiserSelectors.eventLoading(state),
    organiserProfiles: OrganiserSelectors.organisers(state),
    organiserProfilesLoading: OrganiserSelectors.organisersLoading(state)
});
const mapDispatchToProps = dispatch => ({
    updateOrganiserProfiles: (owner, organisers) =>
        dispatch(OrganiserActions.updateOrganisersForEvent(owner, organisers)),
    addOrganiser: (slug, userId) => dispatch(OrganiserActions.addOrganiserToEvent(slug, userId)),
    removeOrganiser: (slug, userId) => dispatch(OrganiserActions.removeOrganiserFromEvent(slug, userId)),
    push: (...args) => dispatch(push(...args))
});

export default withSnackbar(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(OrganiserEditEventManage)
);

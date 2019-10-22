import React, { useState, useEffect } from 'react';
import { Button, Table, notification, message } from 'antd';
import { concat } from 'lodash-es';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as OrganiserActions from 'redux/organiser/actions';
import * as OrganiserSelectors from 'redux/organiser/selectors';

import AddOrganiserDrawer from './AddOrganiserDrawer';
import PageHeader from 'components/generic/PageHeader';
import PageWrapper from 'components/layouts/PageWrapper';

const OrganiserEditEventManage = props => {
    const {
        addOrganiser,
        removeOrganiser,
        updateOrganiserProfiles,
        organiserProfiles,
        organiserProfilesLoading,
        event,
        eventLoading
    } = props;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { slug } = event;

    useEffect(() => {
        updateOrganiserProfiles(event.owner, event.organisers).catch(err => {
            notification.error({
                message: 'Oops, something went wrong',
                description: 'Unable to load organisers'
            });
        });
    }, [event.organisers, updateOrganiserProfiles, event.owner]);

    function handleOrganiserRemoved(userId) {
        const hideMessage = message.loading('Removing organiser', 0);
        removeOrganiser(slug, userId)
            .then(() => {
                message.success('Organiser removed');
            })
            .catch(err => {
                notification.error({
                    message: 'Oops, something went wrong',
                    description: 'Unable to remove organiser'
                });
            })
            .finally(() => {
                hideMessage();
            });
    }

    function handleOrganiserAdded(userId) {
        const hideMessage = message.loading('Adding organiser', 0);
        addOrganiser(slug, userId)
            .then(() => {
                hideMessage();
                message.success('Added organiser');
            })
            .catch(err => {
                notification.error({
                    message: 'Oops, something went wrong',
                    description: 'Please try again'
                });
            })
            .finally(() => {
                hideMessage();
            });
    }

    return (
        <PageWrapper
            loading={eventLoading}
            error={!event && !eventLoading}
            render={() => (
                <React.Fragment>
                    <PageHeader heading="Organisers" subheading="Manage who has access to edit this event" />
                    <Button type="primary" key="add-organiser" onClick={() => setDrawerOpen(true)}>
                        Add organisers
                    </Button>
                    <Table
                        loading={organiserProfilesLoading}
                        dataSource={organiserProfiles}
                        pagination={false}
                        rowKey="userId"
                        showHeader={false}
                        columns={[
                            {
                                title: 'Name',
                                dataIndex: 'firstName',
                                key: 'name',
                                render: (text, record) => record.firstName + ' ' + record.lastName
                            },
                            {
                                title: 'Email',
                                dataIndex: 'email',
                                key: 'email'
                            },
                            {
                                title: 'Actions',
                                dataIndex: 'userId',
                                key: 'actions',
                                render: (text, record) => {
                                    if (event.owner === record.userId) {
                                        return (
                                            <Button disabled={true} type="link">
                                                Owner
                                            </Button>
                                        );
                                    }
                                    return (
                                        <Button type="link" onClick={() => handleOrganiserRemoved(record.userId)}>
                                            Remove
                                        </Button>
                                    );
                                }
                            }
                        ]}
                    />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganiserEditEventManage);

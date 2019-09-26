import React, { useMemo, useState, useCallback, useEffect } from 'react';
import styles from './OrganiserEditEventGrants.module.scss';

import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import Table from 'components/generic/Table';

import EditTravelGrantModal from './EditTravelGrantModal';

import FilterForm from 'components/filters/FilterForm';

const OrganiserEditEventGrants = ({
    event,
    registrations,
    travelGrantsByUser,
    travelGrantsTotal,
    updateTravelGrants,
    loading,
    error
}) => {
    const [activeItem, setActiveItem] = useState();

    const handleClose = useCallback(() => {
        setActiveItem(undefined);
    }, []);

    useEffect(() => {
        updateTravelGrants(event.slug);
    }, [updateTravelGrants, event.slug]);

    const data = useMemo(() => {
        return registrations.map(reg => {
            reg.travelGrant = travelGrantsByUser[reg.user];
            return reg;
        });
    }, [registrations, travelGrantsByUser]);

    return (
        <div>
            <EditTravelGrantModal slug={event.slug} activeItem={activeItem} onClose={handleClose} />
            <h1>Total spend: {travelGrantsTotal}</h1>
            <Table
                dataSource={data}
                rowKey="_id"
                loading={loading}
                title="Travel Grants"
                rowSelection={false}
                rowActions={[
                    {
                        key: 'edit',
                        label: 'Edit',
                        action: item => setActiveItem(item)
                    }
                ]}
                columns={[
                    {
                        key: 'firstName',
                        path: 'answers.firstName',
                        label: 'First name'
                    },
                    {
                        key: 'lastName',
                        path: 'answers.lastName',
                        label: 'Last name'
                    },
                    {
                        key: 'email',
                        path: 'answers.email',
                        label: 'Email'
                    },
                    {
                        key: 'amount',
                        path: 'travelGrant.sum',
                        label: 'Amount',
                        render: sum => sum || 'N/A'
                    },
                    {
                        key: 'status',
                        path: 'travelGrant.status',
                        label: 'Status',
                        render: status => status || 'Pending'
                    }
                ]}
            />
        </div>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    registrations: OrganiserSelectors.registrationsConfirmed(state),
    travelGrantsByUser: OrganiserSelectors.travelGrantsMap(state),
    travelGrantsTotal: OrganiserSelectors.travelGrantsTotal(state),
    loading: OrganiserSelectors.registrationsLoading(state) || OrganiserSelectors.travelGrantsLoading(state),
    error: OrganiserSelectors.registrationsError(state) || OrganiserSelectors.travelGrantsError(state)
});

const mapDispatch = dispatch => ({
    updateTravelGrants: slug => dispatch(OrganiserActions.updateTravelGrants(slug))
});

export default connect(
    mapState,
    mapDispatch
)(OrganiserEditEventGrants);

import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { Dialog, Typography, Box } from '@material-ui/core';
import { withSnackbar } from 'notistack';

import Button from 'components/generic/Button';
import PageHeader from 'components/generic/PageHeader';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import RegistrationsService from 'services/registrations';

import ApplicationsTable from './ApplicationsTable';
import ApplicationDetail from './ApplicationDetail';

const TravelGrantsPage = ({ items, event, idToken, enqueueSnackbar }) => {
    const location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const activeIdx = params.get('view');
    const activeRow = activeIdx ? items[activeIdx] : null;
    const [loading, setLoading] = useState(false);

    const handleRowClick = useCallback(
        (data, rowMeta) => {
            history.push(location.pathname + '?view=' + rowMeta.dataIndex);
        },
        [history, location]
    );

    const notifyRejected = useCallback(async () => {
        setLoading(true);
        try {
            const { count } = await RegistrationsService.adminNotifyRejectedTravelGrants(idToken, event.slug);
            enqueueSnackbar(`Success! Notification set to ${count} people`, { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('Oops, something went wrong...', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, [idToken, event.slug, enqueueSnackbar]);

    const notifyAccepted = useCallback(async () => {
        setLoading(true);
        try {
            const { count } = await RegistrationsService.adminNotifyAcceptedTravelGrants(idToken, event.slug);
            enqueueSnackbar(`Success! Notification set to ${count} people`, { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('Oops, something went wrong...', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, [idToken, event.slug, enqueueSnackbar]);

    return (
        <>
            <PageHeader heading="Travel Grants" subheading="Manage travel grants" />
            <ApplicationsTable data={items} onRowClick={handleRowClick} />
            <Dialog fullScreen open={Boolean(activeRow)} onClose={() => history.goBack()}>
                <ApplicationDetail data={activeRow} />
            </Dialog>
            <Box mt={3} />
            <Typography variant="h4" gutterBottom>
                Tools
            </Typography>
            <Box display="flex" flexDirection="row">
                <Button onClick={notifyAccepted} loading={loading} color="primary" variant="contained">
                    Notify accepted
                </Button>
                <Box p={1} />
                <Button onClick={notifyRejected} loading={loading} color="secondary" variant="contained">
                    Notify rejected
                </Button>
            </Box>
        </>
    );
};

const mapState = state => ({
    items: OrganiserSelectors.registrationsWithTravelGrant(state),
    event: OrganiserSelectors.event(state),
    idToken: AuthSelectors.getIdToken(state)
});

export default withSnackbar(connect(mapState)(TravelGrantsPage));

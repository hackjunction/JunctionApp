import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import { withSnackbar } from 'notistack';

import {
    Box,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Button
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PageWrapper from 'components/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';
import OrganiserSelectModal from 'components/modals/OrganiserSelectModal';
import OrganiserListItem from 'components/generic/UserListItem/OrganiserListItem';
import EventTagsSelect from 'components/FormComponents/EventTagsSelect';
import RegistrationStatusSelect from 'components/FormComponents/RegistrationStatusSelect';
import ConfirmDialog from 'components/generic/ConfirmDialog';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import { useFormField } from 'hooks/formHooks';

const BulkEditRegistrationModal = ({
    visible,
    registrationIds = [],
    onClose,
    onSubmit,
    organisers,
    event,
    enqueueSnackbar
}) => {
    const [loading, setLoading] = useState(false);
    const [organiserModal, setOrganiserModal] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const rating = useFormField(null);
    const assignedTo = useFormField(null);
    const tags = useFormField([]);
    const status = useFormField('pending');

    const [expandedIds, setExpandedIds] = useState([]);

    const isExpanded = useCallback(
        panel => {
            return expandedIds.indexOf(panel) !== -1;
        },
        [expandedIds]
    );

    const toggleExpanded = panel => {
        if (isExpanded(panel)) {
            setExpandedIds(expandedIds.filter(id => id !== panel));
        } else {
            setExpandedIds(expandedIds.concat(panel));
        }
    };

    const reset = useCallback(() => {
        rating.reset();
        assignedTo.reset();
        tags.reset();
        status.reset();
        setLoading(false);
        setExpandedIds([]);
    }, [rating, assignedTo, tags, status]);

    const handleClose = useCallback(() => {
        reset();
        onClose();
    }, [reset, onClose]);

    const getEdits = useCallback(() => {
        const edits = {};
        if (isExpanded('rating')) edits.rating = rating.value;
        if (isExpanded('assignedTo')) edits.assignedTo = assignedTo.value;
        if (isExpanded('tags')) edits.tags = tags.value;
        if (isExpanded('status')) edits.status = status.value;
        return edits;
    }, [rating, assignedTo, tags, status, isExpanded]);

    const handleSubmit = useCallback(() => {
        setLoading(true);
        const edits = getEdits();

        onSubmit(registrationIds, edits, event.slug)
            .then(() => {
                enqueueSnackbar(`Edited ${registrationIds.length} registrations`, { variant: 'success' });
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
                handleClose();
            });
    }, [onSubmit, handleClose, getEdits, event.slug, registrationIds, enqueueSnackbar]);

    if (!registrationIds.length) return null;
    return (
        <Modal isOpen={visible} handleClose={handleClose} size="max">
            <PageWrapper loading={loading} wrapContent={false}>
                <ConfirmDialog
                    open={confirmDialog}
                    title="Are you sure?"
                    message={`This will apply your configured changes to ${registrationIds.length} registrations, and you won't be able to revert them. Please make sure you are not making any unintended changes.`}
                    onClose={() => setConfirmDialog(false)}
                    onOk={handleSubmit}
                />
                <CenteredContainer>
                    <PageHeader heading="Bulk edit" subheading={registrationIds.length + ' selected participants'} />
                    <Typography variant="body1" paragraph>
                        Here you can edit all of the selected registrations. Expand the panels for the fields which you
                        want to edit - if a panel is left <strong>un-expanded</strong>, that field will not be edited in
                        the registrations.
                    </Typography>
                    <ExpansionPanel expanded={isExpanded('rating')} onChange={() => toggleExpanded('rating')}>
                        <ExpansionPanelSummary>
                            <Box flex="1" display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography variant="subtitle1">Rating</Typography>
                                {isExpanded('rating') ? (
                                    <Typography variant="button" color="secondary">
                                        {rating.value ? 'Set rating to ' + rating.value : 'Clear rating'}
                                    </Typography>
                                ) : (
                                    <Typography variant="button" color="primary">
                                        Leave unchanged
                                    </Typography>
                                )}
                            </Box>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Rating value={rating.value} onChange={(e, num) => rating.setValue(num)} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={isExpanded('assignedTo')} onChange={() => toggleExpanded('assignedTo')}>
                        <ExpansionPanelSummary>
                            <Box flex="1" display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography variant="subtitle1">Assigned to</Typography>
                                {isExpanded('assignedTo') ? (
                                    <Typography variant="button" color="secondary">
                                        {assignedTo.value ? 'Change assigned to' : 'Clear assigned to'}
                                    </Typography>
                                ) : (
                                    <Typography variant="button" color="primary">
                                        Leave unchanged
                                    </Typography>
                                )}
                            </Box>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <OrganiserSelectModal
                                open={organiserModal}
                                onClose={setOrganiserModal}
                                onSelect={value => assignedTo.setValue(value.userId)}
                                onClear={assignedTo.setValue}
                            />
                            <Box display="flex" flexDirection="column">
                                <Box mb={1} width="100%">
                                    <OrganiserListItem userId={assignedTo ? assignedTo.value : null} />
                                </Box>
                                <Button variant="contained" color="primary" onClick={() => setOrganiserModal(true)}>
                                    Change
                                </Button>
                            </Box>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={isExpanded('tags')} onChange={() => toggleExpanded('tags')}>
                        <ExpansionPanelSummary>
                            <Box flex="1" display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography variant="subtitle1">Tags</Typography>
                                {isExpanded('tags') ? (
                                    <Typography variant="button" color="secondary">
                                        {tags.value && tags.value.length
                                            ? 'Set tags to ' + tags.value.join(', ')
                                            : 'Clear tags'}
                                    </Typography>
                                ) : (
                                    <Typography variant="button" color="primary">
                                        Leave unchanged
                                    </Typography>
                                )}
                            </Box>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <EventTagsSelect value={tags.value} onChange={tags.setValue} tags={event.tags} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={isExpanded('status')} onChange={() => toggleExpanded('status')}>
                        <ExpansionPanelSummary>
                            <Box flex="1" display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography variant="subtitle1">Status</Typography>
                                {isExpanded('status') ? (
                                    <Typography variant="button" color="secondary">
                                        Set status to {status.value}
                                    </Typography>
                                ) : (
                                    <Typography variant="button" color="primary">
                                        Leave unchanged
                                    </Typography>
                                )}
                            </Box>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <RegistrationStatusSelect value={status.value} onChange={status.setValue} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <Box p={2} display="flex" alignItems="center" justifyContent="center">
                        <Button
                            onClick={() => setConfirmDialog(true)}
                            variant="contained"
                            color="primary"
                            disabled={expandedIds.length === 0}
                        >
                            {expandedIds.length === 0
                                ? 'Expand panels to make edits'
                                : ` Apply edits to ${registrationIds.length} registrations`}
                        </Button>
                    </Box>
                </CenteredContainer>
            </PageWrapper>
        </Modal>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state),
    organisersMap: OrganiserSelectors.organisersMap(state),
    organisers: OrganiserSelectors.organisers(state)
});

const mapDispatch = dispatch => ({
    onSubmit: (registrationIds, edits, slug) =>
        dispatch(OrganiserActions.bulkEditRegistrations(registrationIds, edits, slug))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(BulkEditRegistrationModal)
);

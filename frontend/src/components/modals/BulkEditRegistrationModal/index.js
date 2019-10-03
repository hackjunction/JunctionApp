import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import { withSnackbar } from 'notistack';

import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PageWrapper from 'components/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';
import UserSelectModal from 'components/modals/UserSelectModal';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import { useFormField } from 'hooks/formHooks';

const BulkEditRegistrationModal = ({ registrationIds = [], onClose, organisers }) => {
    const [loading, setLoading] = useState(false);
    const rating = useFormField(0);
    const assignedTo = useFormField(null);
    // const [error, setError] = useState(false);
    // const [registration, setRegistration] = useState();
    // const { slug } = event;

    // useEffect(() => {
    //     if (registrationId) {
    //         setLoading(true);
    //         RegistrationsService.getFullRegistration(idToken, slug, registrationId)
    //             .then(data => {
    //                 setRegistration(data);
    //             })
    //             .catch(err => {
    //                 setError(true);
    //             })
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     }
    // }, [idToken, registrationId, slug]);

    // const participantName = useMemo(() => {
    //     if (!registration) return '';
    //     const { firstName, lastName } = registration.answers;
    //     return `${firstName} ${lastName}`;
    // }, [registration]);

    // const participantSubheading = useMemo(() => {
    //     if (!registration) return '';
    //     return registration.answers.countryOfResidence;
    // }, [registration]);

    // const handleEdit = useCallback(
    //     async data => {
    //         setLoading(true);
    //         await MiscUtils.sleep(1000);
    //         editRegistration(registrationId, data, slug)
    //             .then(data => {
    //                 enqueueSnackbar('Changes saved!', { variant: 'success' });
    //                 onEdited(data);
    //                 onClose();
    //             })
    //             .catch(err => {
    //                 enqueueSnackbar('Something went wrong', { variant: 'error' });
    //             })
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     },
    //     [enqueueSnackbar, editRegistration, registrationId, slug, onClose, onEdited]
    // );

    return (
        <Modal isOpen={registrationIds.length !== 0} handleClose={onClose} size="max">
            <PageWrapper loading={loading} wrapContent={false}>
                <CenteredContainer>
                    <PageHeader heading="Bulk edit" subheading={registrationIds.length + ' selected participants'} />
                    <Typography variant="body1" paragraph>
                        Here you can edit all of the selected registrations. Expand the panels for the fields which you
                        want to edit - if a panel is left <strong>un-expanded</strong>, that field will not be edited in
                        the registrations.
                    </Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography>Rating</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Rating name="pristine" value={rating.value} onChange={rating.onChange} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography>Assigned to</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <UserSelectModal
                                renderTrigger={showModal => (
                                    <React.Fragment>
                                        <span>{assignedTo.value}</span>
                                        <Button variant="contained" color="primary">
                                            Change
                                        </Button>
                                        {assignedTo && (
                                            <Button variant="contained" onClick={assignedTo.setValue}>
                                                Clear
                                            </Button>
                                        )}
                                    </React.Fragment>
                                )}
                                onDone={value => assignedTo.setValue(value.userId)}
                                allowMultiple={false}
                                userProfiles={organisers}
                            />
                            <Typography>Details here</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography>Tags</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>Details here</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography>Status</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>Details here</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CenteredContainer>
                {/* <Collapse activeKey={enabledFields} onChange={setEnabledFields}>
                    <Collapse.Panel key="assignedTo" header="Assigned to" extra={renderFieldEnabled('assignedTo')}>
                        <UserSelectModal
                            renderTrigger={showModal => (
                                <React.Fragment>
                                    <span>{renderAssignedTo()}</span>
                                    <AntButton type="link" onClick={showModal} size="small">
                                        Change
                                        </AntButton>
                                    {assignedTo && (
                                        <AntButton type="link" onClick={() => setAssignedTo(null)}>
                                            Clear
                                            </AntButton>
                                    )}
                                </React.Fragment>
                            )}
                            onDone={handleAssignedChange}
                            allowMultiple={false}
                            userProfiles={organisers}
                        />
                    </Collapse.Panel>
                    <Collapse.Panel key="tags" header="Tags" extra={renderFieldEnabled('tags')}>
                        <EventTagsSelect value={tags} onChange={setTags} tags={event.tags} />
                    </Collapse.Panel>
                    <Collapse.Panel key="status" header="Status" extra={renderFieldEnabled('status')}>
                        <RegistrationStatusSelect value={status} onChange={setStatus} />
                    </Collapse.Panel>
                </Collapse>
                <Divider size={1} />
                {renderPreview()}
                <Button theme="secondary" block text="Cancel" button={{ onClick: () => setVisible(false) }} />
                <Divider size={1} />
                <Button
                    theme="danger"
                    text={`Apply changes to ${registrationIds.length} items`}
                    block
                    button={{ onClick: handleSubmit, disabled: enabledFields.length === 0 }}
                /> */}
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
    editRegistration: (registrationId, data, slug) =>
        dispatch(OrganiserActions.editRegistration(registrationId, data, slug))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(BulkEditRegistrationModal)
);

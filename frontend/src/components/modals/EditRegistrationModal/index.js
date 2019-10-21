import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import { withSnackbar } from 'notistack';

import PageWrapper from 'components/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import RegistrationsService from 'services/registrations';
import MiscUtils from 'utils/misc';

import EditRegistrationActions from './EditRegistrationActions';
import EditRegistrationContent from './EditRegistrationContent';

const EditRegistrationModal = ({
    idToken,
    registrationId,
    onClose,
    event,
    editRegistration,
    enqueueSnackbar,
    onEdited = () => {},
    teamsMap
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [registration, setRegistration] = useState();
    const { slug } = event;

    useEffect(() => {
        if (registrationId) {
            setLoading(true);
            RegistrationsService.getFullRegistration(idToken, slug, registrationId)
                .then(data => {
                    setRegistration(data);
                })
                .catch(err => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [idToken, registrationId, slug]);

    const participantName = useMemo(() => {
        if (!registration) return '';
        const { firstName, lastName } = registration.answers;
        return `${firstName} ${lastName}`;
    }, [registration]);

    const participantSubheading = useMemo(() => {
        if (!registration) return '';
        const team = teamsMap[registration.user];
        const countryText = registration.answers.countryOfResidence;
        const teamText = team ? team.code : 'No team';

        return `${countryText} // ${teamText} `;
    }, [registration, teamsMap]);

    const handleEdit = useCallback(
        async data => {
            setLoading(true);
            await MiscUtils.sleep(1000);
            editRegistration(registrationId, data, slug)
                .then(data => {
                    enqueueSnackbar('Changes saved!', { variant: 'success' });
                    onEdited(data);
                    onClose();
                })
                .catch(err => {
                    enqueueSnackbar('Something went wrong', { variant: 'error' });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [enqueueSnackbar, editRegistration, registrationId, slug, onClose, onEdited]
    );

    return (
        <Modal isOpen={!!registrationId} handleClose={onClose} size="max">
            <PageWrapper loading={loading || !registration} error={error}>
                <CenteredContainer>
                    <PageHeader heading={participantName} subheading={participantSubheading} />
                    <EditRegistrationContent registration={registration} />
                    <EditRegistrationActions registration={registration} onSubmit={handleEdit} />
                </CenteredContainer>
            </PageWrapper>
        </Modal>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state),
    teamsMap: OrganiserSelectors.teamsMap(state)
});

const mapDispatch = dispatch => ({
    editRegistration: (registrationId, data, slug) =>
        dispatch(OrganiserActions.editRegistration(registrationId, data, slug))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(EditRegistrationModal)
);

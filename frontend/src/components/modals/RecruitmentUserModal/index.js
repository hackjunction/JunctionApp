import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import { withSnackbar } from 'notistack';

import PageWrapper from 'components/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';

import RegistrationsService from 'services/registrations';

const RecruitmentUserModal = ({ idToken, registrationId, onClose, event }) => {
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
    return registration.answers.countryOfResidence;
  }, [registration]);

  return (
    <Modal isOpen={true} handleClose={onClose} size="max" title="Test user">
      <PageWrapper loading={false} error={error}>
        <CenteredContainer>
          <PageHeader
            heading={participantName}
            subheading={participantSubheading}
          />
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

const mapDispatch = dispatch => ({});

export default withSnackbar(
  connect(
    mapState,
    mapDispatch
  )(RecruitmentUserModal)
);

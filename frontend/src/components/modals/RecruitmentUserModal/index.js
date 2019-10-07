import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import Image from 'components/generic/Image';
import { withSnackbar } from 'notistack';

import styles from './RecruitmentUserModal.module.scss';

import PageWrapper from 'components/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';

import RecruitmentProfileInfo from './RecruitmentProfileInfo';

import * as AuthSelectors from 'redux/auth/selectors';

import UserProfilesService from 'services/userProfiles';

const RecruitmentUserModal = ({ idToken, profileId, onClose, event }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    console.log('id:', profileId);
    if (profileId) {
      setLoading(true);
      UserProfilesService.getUserProfileRecruitment(profileId, idToken)
        .then(data => {
          setProfile(data);
          console.log(data);
        })
        .catch(err => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [idToken, profileId]);

  const participantName = useMemo(() => {
    if (!profile) return '';
    const { firstName, lastName } = profile;
    return `${firstName} ${lastName}`;
  }, [profile]);

  const participantSubheading = useMemo(() => {
    if (!profile) return '';
    return profile.countryOfResidence;
  }, [profile]);

  const participantImageUrl = useMemo(() => {
    if (!profile) return '';
    return profile.avatar;
  }, [profile]);

  return (
    <Modal
      isOpen={!!profileId}
      handleClose={onClose}
      size="max"
      title="Profile details"
    >
      <PageWrapper loading={loading || !profile} error={error}>
        <CenteredContainer wrapperClass={styles.wrapper}>
          <PageHeader
            heading={participantName}
            subheading={participantSubheading}
          />
          <Image
            url={participantImageUrl}
            alt="Profile picture"
            transformation={{ width: '20%', height: '20%' }}
          />
        </CenteredContainer>
        <CenteredContainer>
          <RecruitmentProfileInfo profile={profile} />
        </CenteredContainer>
      </PageWrapper>
    </Modal>
  );
};

const mapState = state => ({
  idToken: AuthSelectors.getIdToken(state)
});

const mapDispatch = dispatch => ({});

export default withSnackbar(
  connect(
    mapState,
    mapDispatch
  )(RecruitmentUserModal)
);

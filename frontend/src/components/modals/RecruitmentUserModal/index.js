import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import Image from 'components/generic/Image';
import { withSnackbar } from 'notistack';
import { Box, Typography, Grid } from '@material-ui/core';

import styles from './RecruitmentUserModal.module.scss';

import PageWrapper from 'components/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';

import RecruitmentProfileInfo from './RecruitmentProfileInfo';

import * as AuthSelectors from 'redux/auth/selectors';

import UserProfilesService from 'services/userProfiles';

const RecruitmentUserModal = ({ idToken, profileId, onClose, event }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [participant, setParticipant] = useState();

  useEffect(() => {
    console.log('id:', profileId);
    if (profileId) {
      setLoading(true);
      UserProfilesService.getUserProfileRecruitment(profileId, idToken)
        .then(data => {
          setParticipant(data);
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
    if (!participant) return '';
    const { firstName, lastName } = participant.profile;
    return `${firstName} ${lastName}`;
  }, [participant]);

  const participantSubheading = useMemo(() => {
    if (!participant) return '';
    return participant.profile.countryOfResidence;
  }, [participant]);

  const participantImageUrl = useMemo(() => {
    if (!participant) return '';
    return participant.profile.avatar;
  }, [participant]);

  return (
    <Modal
      isOpen={!!profileId}
      handleClose={onClose}
      size="max"
      title="Profile details"
    >
      <PageWrapper loading={loading || !participant} error={error}>
        <Grid>
          <Box>
            <Typography variant="h3">{participantName}</Typography>
            <Typography variant="subtitle1">{participantSubheading}</Typography>
            <Typography>
              Insert here some basic data about the participant Insert here some
              basic data about the participant Insert here some basic data about
              the participant
            </Typography>
          </Box>
          <Image
            url={participantImageUrl}
            alt="Profile picture"
            transformation={{
              width: '30%',
              height: '30%'
            }}
          />
          <RecruitmentProfileInfo participant={participant} />
        </Grid>
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

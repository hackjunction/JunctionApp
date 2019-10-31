import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import Image from 'components/generic/Image';
import Button from 'components/generic/Button';

import { withSnackbar } from 'notistack';
import { Typography, Grid, Icon, Link, Box } from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import styles from './RecruitmentUserModal.module.scss';

import PageWrapper from 'components/layouts/PageWrapper';

import RecruitmentProfileInfo from './RecruitmentProfileInfo';

import * as AuthSelectors from 'redux/auth/selectors';

import UserProfilesService from 'services/userProfiles';

import * as RecruitmentActions from 'redux/recruitment/actions';

const RecruitmentUserModal = ({
  idToken,
  profileId,
  onClose,
  toggleFavorite
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [participant, setParticipant] = useState();

  useEffect(() => {
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
    return participant.profile.profilePicture;
  }, [participant]);

  const { social } = participant || {};

  const isFavorite = 'Implement some logic';

  return (
    <Modal
      isOpen={!!profileId}
      handleClose={onClose}
      size="max"
      title="Profile details"
    >
      <PageWrapper
        wrapperProps={{ style: { margin: '0 4rem' } }}
        loading={loading || !participant}
        error={error}
        render={() => (
          <Box alignItems="center" justifyContent="center">
            <Button
              onClick={() => toggleFavorite(profileId, isFavorite)}
              variant="contained"
              color="primary"
            >
              Add to favorites
            </Button>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Image
                  url={participantImageUrl}
                  defaultImage="https://avatars1.githubusercontent.com/u/11797156?s=460&v=4"
                  alt="Profile picture"
                  className={styles.profilePic}
                />
              </Grid>
              <Grid
                item
                alignItems="center"
                justifyContent="center"
                className={styles.nameContainer}
              >
                <Typography variant="h3">{participantName}</Typography>
                <Typography variant="h6">{participantSubheading}</Typography>
              </Grid>
              <Grid item>
                {social && social.linkedin && (
                  <Link to={social.linkedin}>
                    <GitHubIcon color="primary" size="large" />
                  </Link>
                )}
                {social && social.github && (
                  <Link to={social.github}>
                    <LinkedInIcon color="primary" size="large" />
                  </Link>
                )}
              </Grid>
            </Grid>
            <RecruitmentProfileInfo participant={participant} />
          </Box>
        )}
      />
    </Modal>
  );
};

const mapState = state => ({
  idToken: AuthSelectors.getIdToken(state)
});

const mapDispatch = dispatch => ({
  toggleFavorite: (profileId, isFavorite) =>
    dispatch(RecruitmentActions.toggleFavorite(profileId, isFavorite))
});

export default withSnackbar(
  connect(
    mapState,
    mapDispatch
  )(RecruitmentUserModal)
);

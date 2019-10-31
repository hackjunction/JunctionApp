import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import Image from 'components/generic/Image';
import Button from 'components/generic/Button';

import { withSnackbar } from 'notistack';
import { Typography, Grid, Icon, Link } from '@material-ui/core';

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

  const { education, roles, social } = participant || {};

  const isFavorite = 'Implement some logic';

  return (
    <Modal
      isOpen={!!profileId}
      handleClose={onClose}
      size="max"
      title="Profile details"
    >
      <PageWrapper loading={loading || !participant} error={error}>
        <Button
          block
          text="Add to favorites"
          button={{
            onClick: () => toggleFavorite(profileId, isFavorite)
          }}
        />
        <Grid container direction="row" justify="space-around">
          <Grid item sm={8} md={8} lg={8}>
            <Typography variant="h3">{participantName}</Typography>
            <Typography variant="subtitle1">{participantSubheading}</Typography>
            {education && education.level && (
              <Grid item mb={1}>
                <Typography variant="h6">Education</Typography>
                <Typography>
                  <strong>
                    {education.level} in {education.degree}
                  </strong>
                </Typography>
                <Typography>{education.university}</Typography>
                <Typography>{education.graduationYear}</Typography>
              </Grid>
            )}
            {roles && roles.length !== 0 && (
              <Grid item mb={1}>
                <Typography variant="h6">Previous roles</Typography>
                {roles.map(a => {
                  return (
                    <React.Fragment>
                      <Typography>{a.role}</Typography>
                      <Typography>{a.years} years</Typography>
                    </React.Fragment>
                  );
                })}
              </Grid>
            )}
          </Grid>
          <Grid item sm={4} md={4} lg={4}>
            <Image
              url={participantImageUrl}
              defaultImage="https://avatars1.githubusercontent.com/u/11797156?s=460&v=4"
              alt="Profile picture"
              className={styles.profilePic}
            />
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
      </PageWrapper>
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

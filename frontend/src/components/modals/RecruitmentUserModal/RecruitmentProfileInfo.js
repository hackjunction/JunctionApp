import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Link, Grid, Box, Icon, Button } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { Input } from 'antd';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import SkillRating from '../../../pages/Recruitment/Search/SearchResults/SkillRating';
import { sendMessage } from 'redux/recruitment/actions';
import styles from './RecruitmentUserModal.module.scss';
import UserProfilesService from 'services/userProfiles';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';

const getListOf = (areas, subject) => {
  if (areas && areas.length !== 0)
    return (
      <Grid item mb={1}>
        {subject === 'theme' ? (
          <Typography variant="h6">Themes of interest</Typography>
        ) : (
          <Typography variant="h6">Industries of interest</Typography>
        )}
        {areas.map(area => {
          return (
            <Typography key={area}>
              <CheckCircleRoundedIcon
                fontSize="inherit"
                className={styles.listItem}
              />
              {area}
            </Typography>
          );
        })}
      </Grid>
    );
};

const getSkills = skills => {
  if (skills && skills.length !== 0)
    return (
      <Grid item mb={1} xs={12} md={6} lg={6}>
        <Typography variant="h6">Skills</Typography>
        {skills.map(a => {
          return <SkillRating data={a} key={a.skill} />;
        })}
      </Grid>
    );
};

const MessageThing = props => {
  const [profile, setProfile] = useState({
    firstName: 'Loading',
    lastName: 'User'
  });

  const { action } = props;

  useEffect(() => {
    UserProfilesService.getPublicUserProfiles(action.recruiter).then(data => {
      setProfile(data[0]);
    });
  }, [action]);

  return (
    <React.Fragment>
      <Typography>
        {profile.firstName} {profile.lastName} from {action.organisation}
      </Typography>
      <Typography key={action._id}>{action.data.message}</Typography>
    </React.Fragment>
  );
};

const getActionHistory = messages => {
  if (messages && messages.length !== 0) {
    return (
      <Grid item mb={1}>
        <Typography variant="subtitle1">Previous messages</Typography>
        {messages.map(action => {
          return <MessageThing action={action} />;
        })}
      </Grid>
    );
  }
};

const RecruitmentProfileInfo = React.memo(
  ({ participant, sendMessage, actionHistory }) => {
    const {
      themesOfInterest,
      industriesOfInterest,
      skills,
      education,
      roles
    } = participant;
    const { firstName } = participant.profile;

    const [messageVal, changeMessageValue] = useState('');

    return (
      <Grid
        container
        direction="row"
        justify="center"
        justifyContent="center"
        xs={12}
      >
        <Grid
          container
          item
          direction="column"
          wrap="nowrap"
          justifyContent="center"
          xs={12}
          sm={4}
          spacing={4}
        >
          {roles && roles.length !== 0 && (
            <Grid item mb={1}>
              <Typography variant="h6">Previous roles</Typography>
              {roles.map(a => {
                return (
                  <React.Fragment>
                    <Typography variant="subtitle1">{a.role}</Typography>
                    <Typography>{a.years} years</Typography>
                  </React.Fragment>
                );
              })}
            </Grid>
          )}
          {getListOf(industriesOfInterest, 'industry')}
          {getListOf(themesOfInterest, 'theme')}
        </Grid>
        <Grid container item direction="column" xs={12} wrap="nowrap" sm={8}>
          <Grid container item spacing={4}>
            {getSkills(skills)}
            {education && education.level && (
              <Grid item mb={1} xs={12} md={6} lg={6}>
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
          </Grid>
          <Grid item>
            <Typography variant="h6">Contact</Typography>
            {getActionHistory(
              actionHistory.filter(action => action.type === 'message')
            )}
            <Typography>Here you can send {firstName} a message.</Typography>
            <Input.TextArea
              onChange={e => changeMessageValue(e.target.value)}
              value={messageVal}
              autosize={{ minRows: 10, maxRows: 20 }}
              placeholder="Type message here..."
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => (
                sendMessage(messageVal, participant.userId),
                changeMessageValue('')
              )}
              startIcon={<EmailIcon />}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
);

const mapState = state => ({
  actionHistory: RecruitmentSelectors.actionHistory(state)
});

const mapDispatch = dispatch => ({
  sendMessage: (message, profileId) => dispatch(sendMessage(message, profileId))
});

export default connect(
  mapState,
  mapDispatch
)(RecruitmentProfileInfo);

import React from 'react';
import { connect } from 'react-redux';
import { Typography, Link, Grid, Box, Icon, Button } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { Input } from 'antd';
import { changeMessageValue } from 'redux/recruitment/actions';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import SkillRating from '../../../pages/Recruitment/Search/SearchResults/SkillRating';
import { sendMessage } from 'redux/recruitment/actions';

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
              <CheckCircleRoundedIcon />
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

const getActionHistory = history => {
  if (history && history.length !== 0)
    return (
      <Grid item mb={1}>
        <Typography variant="subtitle1">Previous messages</Typography>
        {history.map(action => {
          return <Typography key={action}>{action}</Typography>;
        })}
      </Grid>
    );
};

const getPrevEvents = events => {
  if (events && events.length !== 0)
    return (
      <Grid item mb={1}>
        <Typography variant="h6">Hackathons</Typography>
        {events.map(event => {
          return <Typography key={event.id}>{event.name}</Typography>;
        })}
      </Grid>
    );
};

const RecruitmentProfileInfo = React.memo(
  ({ participant, sendMessage, changeMessageValue, messageValue }) => {
    const {
      themesOfInterest,
      industriesOfInterest,
      previousEvents,
      skills,
      education,
      roles
    } = participant;
    const { recruitmentActionHistory, firstName } = participant.profile;
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
          justify="space-between"
          justifyContent="center"
          xs={12}
          sm={4}
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
          {/* getPrevEvents(previousEvents */}
          <Grid container item>
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
            {getActionHistory(recruitmentActionHistory)}
            <Typography>Here you can send {firstName} a message.</Typography>
            <Input.TextArea
              onChange={e => changeMessageValue(e.target.value)}
              value={messageValue}
              autosize={{ minRows: 10, maxRows: 20 }}
              placeholder="Type message here..."
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => sendMessage(messageValue, participant.userId)}
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
  messageValue: state.recruitment.messageValue
});

const mapDispatch = dispatch => ({
  changeMessageValue: value => dispatch(changeMessageValue(value)),
  sendMessage: (message, profileId) => dispatch(sendMessage(message, profileId))
});

export default connect(
  mapState,
  mapDispatch
)(RecruitmentProfileInfo);

import React from 'react';
import { connect } from 'react-redux';
import { RegistrationFields } from '@hackjunction/shared';
import { groupBy } from 'lodash-es';
import { Typography, Link, Box } from '@material-ui/core';

import { Input } from 'antd';

const RecruitmentProfileInfo = React.memo(({ participant }) => {
  const fields = Object.keys(participant);
  const grouped = groupBy(fields, field =>
    RegistrationFields.getCategory(field)
  );
  const { education, portfolio, firstName, previousEvents } = participant;
  return (
    <React.Fragment>
      <Box width="30%">
        {education && education.level && (
          <React.Fragment>
            <Typography variant="h6">Education</Typography>
            <Typography>
              {education.level} in {education.degree}, {education.university} (
              {education.graduationYear})
            </Typography>
          </React.Fragment>
        )}
        {portfolio && (
          <React.Fragment>
            <Typography variant="h6">Portfolio</Typography>
            <Link>{portfolio}</Link>
          </React.Fragment>
        )}
        <Typography variant="h6">Interests</Typography>
        <Link>{portfolio}</Link>
        {previousEvents && (
          <Typography variant="subtitle1">Past hackathons</Typography>
        )}
        {previousEvents.map(event => {
          <Typography>{event.name}</Typography>;
        })}
      </Box>
      <Box>
        <Typography>Contact {firstName}</Typography>
        <Input.TextArea
          autosize={{ minRows: 10, maxRows: 20 }}
          placeholder="Max 1000 characters"
        />
      </Box>
    </React.Fragment>
  );
});

const mapState = state => ({});

export default connect(mapState)(RecruitmentProfileInfo);

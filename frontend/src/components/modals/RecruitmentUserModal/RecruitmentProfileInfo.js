import React from 'react';
import { connect } from 'react-redux';
import { RegistrationFields } from '@hackjunction/shared';
import { groupBy } from 'lodash-es';
import { Typography, Link, Box } from '@material-ui/core';

import { Input } from 'antd';

const RecruitmentProfileInfo = React.memo(({ profile }) => {
  const fields = Object.keys(profile);
  const grouped = groupBy(fields, field =>
    RegistrationFields.getCategory(field)
  );
  const { education, portfolio, spokenLanguages, firstName } = profile;
  return (
    <React.Fragment>
      <Box width="30%">
        {education && (
          <React.Fragment>
            <Typography variant="h6">Education</Typography>
            <Typography>{education.level}</Typography>
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

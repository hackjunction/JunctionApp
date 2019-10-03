import React from 'react';
import { connect } from 'react-redux';
import { RegistrationFields } from '@hackjunction/shared';
import { groupBy } from 'lodash-es';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Image from 'components/generic/Image';

const RecruitmentProfileInfo = React.memo(({ profile }) => {
  const fields = Object.keys(profile);
  const grouped = groupBy(fields, field =>
    RegistrationFields.getCategory(field)
  );
  const categoryNames = Object.keys(grouped).filter(key => key !== '');

  return (
    <React.Fragment>
      <Image
        url={profile.avatar}
        alt="Profile picture"
        transformation={{ width: '20%', height: '20%' }}
      />
      {categoryNames.map(name => (
        <ExpansionPanel key={name}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${name}-content`}
            id={`${name}-header`}
          >
            <Typography>{name}</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      ))}
    </React.Fragment>
  );
});

const mapState = state => ({});

export default connect(mapState)(RecruitmentProfileInfo);

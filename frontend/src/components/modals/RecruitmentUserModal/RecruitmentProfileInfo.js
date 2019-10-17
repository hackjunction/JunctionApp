import React from 'react';
import { connect } from 'react-redux';
import { RegistrationFields } from '@hackjunction/shared';
import { groupBy } from 'lodash-es';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Link } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Image from 'components/generic/Image';

const RecruitmentProfileInfo = React.memo(({ profile }) => {
    const fields = Object.keys(profile);
    const { education } = profile;
    const { portfolio } = profile.social;
    const { spokenLanguages = [], profilePicture } = profile.profile;
    return (
        <React.Fragment>
            {education && (
                <React.Fragment>
                    <Typography variant="h4">Education</Typography>
                    <Typography>{education.level}</Typography>
                </React.Fragment>
            )}
            {portfolio && (
                <React.Fragment>
                    <Typography variant="h4">Portfolio</Typography>
                    <Link>{portfolio}</Link>
                </React.Fragment>
            )}

            <Typography variant="h4">Interests</Typography>
            <Link>{portfolio}</Link>
            <ExpansionPanel key="languages">
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="languages-content"
                    id="languages-header"
                >
                    <Typography>Languages</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {spokenLanguages.map(language => (
                        <p>
                            <Typography>{language}</Typography>
                        </p>
                    ))}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <textarea></textarea>
        </React.Fragment>
    );
});

const mapState = state => ({});

export default connect(mapState)(RecruitmentProfileInfo);

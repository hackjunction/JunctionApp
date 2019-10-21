import React from 'react';
import { connect } from 'react-redux';
import { RegistrationFields } from '@hackjunction/shared';
import { groupBy } from 'lodash-es';
import {
    Box,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    Link
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const getListOf = (areas, subject) => {
    if (areas && areas.length !== 0)
        return (
            <Box mb={1} sm={12} md={6} lg={6}>
                {subject === 'theme' ? (
                    <Typography variant="h6">Themes of interest</Typography>
                ) : (
                    <Typography variant="h6">Industries of interest</Typography>
                )}
                {areas.map(area => {
                    return <Typography key={area}>{area}</Typography>;
                })}
            </Box>
        );
};

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

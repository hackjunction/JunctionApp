import React from 'react';

import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { Misc } from '@hackjunction/shared';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';

const FilteredByItem = ({ label, text }) => {
    return (
        <Box
            style={{
                marginRight: '1rem',
                marginBottom: '0.5rem',
                backgroundColor: '#ececec',
                borderRadius: '5px',
                padding: '0.1rem 0.4rem'
            }}
        >
            <Typography variant="body2">
                {label}: {text}
            </Typography>
        </Box>
    );
};

const FilteredBy = ({ filters }) => {
    const { skills = [], roles = [], countryOfResidence = [], age, recruitmentStatus = [] } = filters;
    console.log('FILTERED BY', filters);
    return (
        <Box mb={2} width="100%" display="flex" flexDirection="row">
            {Array.isArray(recruitmentStatus) && recruitmentStatus.length ? (
                <FilteredByItem
                    label="Status"
                    text={recruitmentStatus.map(s => Misc.recruitmentStatuses.getLabelForValue(s)).join(', ')}
                />
            ) : null}
            {Array.isArray(countryOfResidence) && countryOfResidence.length ? (
                <FilteredByItem label="Country" text={countryOfResidence.join(', ')} />
            ) : null}
            {age && age[1] - age[0] !== 120 ? <FilteredByItem label="Age" text={`${age[0]} to ${age[1]}`} /> : null}
            {Array.isArray(skills) && skills.length ? (
                <FilteredByItem label="Skills" text={skills.map(s => s.skill).join(', ')} />
            ) : null}
            {Array.isArray(roles) && roles.length ? (
                <FilteredByItem label="Previous roles" text={roles.map(r => r.role).join(', ')} />
            ) : null}
        </Box>
    );
};

const mapState = state => ({
    filters: RecruitmentSelectors.filters(state)
});

export default connect(mapState)(FilteredBy);

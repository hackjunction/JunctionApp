import React from 'react';

import { Box } from '@material-ui/core';

import RecruitmentStatusFilter from './RecruitmentStatusFilter';
import CountryOfResidenceFilter from './CountryOfResidenceFilter';
import AgeFilter from './AgeFilter';
import SkillsFilter from './SkillsFilter';
import RolesFilter from './RolesFilter';

const Filters = () => {
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap">
            <RecruitmentStatusFilter />
            <CountryOfResidenceFilter />
            <AgeFilter />
            <SkillsFilter />
            <RolesFilter />
        </Box>
    );
};

export default Filters;

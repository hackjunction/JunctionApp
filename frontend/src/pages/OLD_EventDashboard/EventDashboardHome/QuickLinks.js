import React from 'react';

import { Box, Typography } from '@material-ui/core';
import GradientBox from 'components/generic/GradientBox';

const LinkBox = ({ text, color }) => {
    return (
        <GradientBox
            p={2}
            mr={3}
            mb={3}
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="flex-end"
            width="160px"
            height="140px"
            color={color}
        >
            <Typography
                variant="button"
                textAlign="right"
                style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.1rem' }}
            >
                {text}
            </Typography>
        </GradientBox>
    );
};

const QuickLinks = () => {
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap">
            <LinkBox text="Team building" color="theme_orange" />
            <LinkBox text="Submission" color="theme_purple" />
            <LinkBox text="Discord" color="theme_turquoise" />
            <LinkBox text="Live website" color="theme_orange" />
            <LinkBox text="Your event ID" color="theme_purple" />
        </Box>
    );
};

export default QuickLinks;

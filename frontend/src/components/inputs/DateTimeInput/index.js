import React from 'react';

import { Box } from '@material-ui/core';
import DateInput from '../DateInput';
import TimeInput from '../TimeInput';

const DateTimeInput = () => {
    return (
        <Box width="100%" display="flex" flexDirection="row">
            <Box flex="3">
                <DateInput />
            </Box>
            <Box flex="1">
                <TimeInput />
            </Box>
        </Box>
    );
};

export default DateTimeInput;

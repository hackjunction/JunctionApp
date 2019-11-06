import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    imageUpload: {
        width: '300px',
        height: '300px'
    }
}));

const AccountEditProfile = () => {
    const classes = useStyles();
    return (
        <Box>
            {/* <Box width="300px" height="300px" borderRadius="50%" overflow="hidden">
                <ImageUpload />
            </Box> */}
        </Box>
    );
};

export default AccountEditProfile;

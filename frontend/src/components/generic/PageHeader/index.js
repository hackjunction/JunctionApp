import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    subheading: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0.5)
    }
}))

const PageHeader = ({heading, subheading}) => {
    const classes = useStyles();
    return(
        <Box pb={2} pt={2}>
            <Typography variant="h3">{heading}</Typography>
            {subheading && <Typography variant="subtitle1" className={classes.subheading}>{subheading}</Typography>}
        </Box>
    )
}

export default PageHeader;
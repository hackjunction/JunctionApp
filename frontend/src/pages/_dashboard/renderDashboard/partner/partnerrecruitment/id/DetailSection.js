import React from 'react'

import { Box, Typography } from '@mui/material'

const useStyles = makeStyles(theme => ({
    label: {
        color: '#b7b7b7',
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}))

const DetailSection = ({ label, children }) => {
    const classes = useStyles()
    return (
        <Box
            className={classes.root}
            display="flex"
            flexDirection="column"
            mb={3}
        >
            <Typography className={classes.label} variant="subtitle1">
                {label}
            </Typography>
            {children}
        </Box>
    )
}

export default DetailSection

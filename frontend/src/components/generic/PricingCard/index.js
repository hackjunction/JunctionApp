import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
    top: {
        height: '350px',
        position: 'relative',
        padding: theme.spacing(2),
    },
    bottom: {
        padding: theme.spacing(2),
    },
    turquoise: {
        color: '#58C7D6',
    },
}));

function renderText(arr) {
    return arr.map((text) => {
        return (
            <>
                <ListItem>
                    <CheckIcon />
                    <Typography variant='body1'>{text}</Typography>
                </ListItem>
            </>
        );
    });
}

// account linking

const PricingItem = ({ topic, body, price, wrapper }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={4} lg={4}>
            <div className={wrapper}>
                <div className={classes.top}>
                    <Typography variant='h6'>{topic}</Typography>
                    <List>{renderText(body)}</List>
                    <Box mt={1} />
                </div>
                <div className={classes.bottom}>
                    <Box display='flex' flexDirection='row' flexWrap='wrap'>
                        <Typography
                            className={classes.turquoise}
                            variant='h6'
                            strong
                        >
                            {price}
                        </Typography>
                    </Box>
                </div>
            </div>
        </Grid>
    );
};

export default PricingItem;

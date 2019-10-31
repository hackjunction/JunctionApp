import React from 'react';
import { Avatar, Paper, Typography, Box } from '@material-ui/core';

import { sortBy } from 'lodash-es';
import { makeStyles } from '@material-ui/core/styles';

import SkillRating from './SkillRating';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        padding: '2em',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        backgroundColor: '#FBFBFB',

        '&:hover': {
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            cursor: 'pointer'
        }
    },
    avatar: {
        margin: '15px auto',
        width: 100,
        height: 100
    },
    name: {
        textAlign: 'center',
        fontSize: '1.15rem',
        lineHeight: 1.2
    },
    country: {
        textAlign: 'center'
    },
    topWrapper: {
        minHeight: '75px'
    }
}));

const ResultCard = ({ data, onClick, isFavourite }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} onClick={onClick}>
            <Avatar className={classes.avatar} alt="Profile Picture" src={data.profile.profilePicture} />
            <Box className={classes.topWrapper} mb={1}>
                <Typography className={classes.name} variant="h6">
                    {data.profile.firstName} {data.profile.lastName}
                </Typography>
                <Typography className={classes.country} variant="subtitle1" display="block">
                    {data.profile.countryOfResidence}
                </Typography>
            </Box>

            {sortBy(data.skills, skill => -1 * skill.level)
                .map(item => <SkillRating data={item} key={item.skill} />)
                .slice(0, 3)}
        </Paper>
    );
};

export default ResultCard;

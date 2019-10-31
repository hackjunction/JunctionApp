import React from 'react';
import { Avatar, Paper, Typography } from '@material-ui/core';

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
            // top: '-3px',
            // left: '-3px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            cursor: 'pointer'
        }
    },

    avatar: {
        margin: '15px auto',
        width: 100,
        height: 100,

    },

    typography: {
        textAlign: 'center'
    },

    fab: {


    }

}));



const ResultCard = ({ data, onClick, isFavourite }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} onClick={onClick}>
            <Avatar
                className={classes.avatar}
                alt="Profile Picture"
                src={data.profile.profilePicture}
            />
            <Typography className={classes.typography} variant="h6">{data.profile.firstName} {data.profile.lastName}</Typography>
            <Typography
                className={classes.typography}
                variant="subtitle1"
                display="block"
                paragraph
            >
                {data.profile.countryOfResidence}
            </Typography>

            {sortBy(data.skills, skill => -1 * skill.level).map(item => (
                <SkillRating
                    data={item}
                    key={item.skill}
                />

            )).slice(0, 3)}


        </Paper>
    );
};

export default ResultCard;
import React from 'react';

import { Grid, Button, Avatar, Paper, Typography } from '@material-ui/core';

import { sortBy } from 'lodash-es';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto'
    },
    avatar: {
        margin: 10,
        width: 200,
        height: 200
    },
    button: {
        margin: 10
    }
}));

const ResultCard = ({ data, onClick }) => {

    const classes = useStyles();

    const skills =
        sortBy(data.skills, skill => -1 * skill.level)
            .map(item => {
                return item.skill + ' (' + item.level + ')';
            })
            .slice(0, 3).join(', ') + (data.skills.length > 3 ? ` and ${data.skills.length - 3} more` : null);//if data.skills length > 3 then add string

    const roles =
        sortBy(data.roles, role => -1 * role.level)
            .map(item => {
                return item.role + ' years: ' + item.years;
            })
            .slice(0, 3).join(', ') + (data.roles.length > 3 ? ` and ${data.roles.length - 3} more` : null);//if data.roles length > 3 then add string

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item>
                        <Avatar
                            alt="profile pic"
                            className={classes.avatar}
                            src={data.profile.profilePicture}
                        />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="h5" gutterBottom>
                                    {data.profile.firstName} {data.profile.lastName}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {data.profile.countryOfResidence}
                                </Typography>
                                <Typography gutterBottom variant="body1">Skills:<br />{skills}</Typography>
                                <Typography gutterBottom variant="body1">
                                    Previous roles:<br />{roles}{(data.roles.length > 3 ? ` and ${data.roles.length - 3} more` : null)}
                                </Typography>
                                {/* <Grid item>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={onClick}
                                    >
                                        Details
                                    </Button>
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item justify="center" alignItems="center" direction="column">
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={onClick}
                        >
                            Details
                            </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default ResultCard;

import React from 'react';

import { Grid, Button, Avatar, Paper, Typography } from '@material-ui/core';

import { sortBy } from 'lodash-es';
import { makeStyles } from '@material-ui/core/styles';

import SkillRating from './SkillRating';

const useStyles = makeStyles(theme => ({
    // root: {
    //     flexGrow: 1
    // },
    // paper: {
    //     padding: theme.spacing(2),
    //     margin: 'auto'
    // },
    // avatar: {
    //     margin: 10,
    //     width: 200,
    //     height: 200
    // },
    // button: {
    //     margin: 10
    // }


    root: {
        padding: '1em',
        position: 'relative',
        height: 'auto',
        width: 'auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',

        '&:hover': {
            top: '-3px',
            left: '-3px',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
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
    }
}));



const ResultCard = ({ data, onClick }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} onClick={onClick}>
            <Avatar
                className={classes.avatar}
                alt="profile pic"
                src={data.profile.profilePicture}
            />
            <Typography className={classes.typography} variant="h6">{data.profile.firstName} {data.profile.lastName}</Typography>
            <Typography className={classes.typography} variant="subtitle1" display="block">{data.profile.countryOfResidence}</Typography>

            {sortBy(data.skills, skill => -1 * skill.level).map(item => (
                <SkillRating
                    data={item}
                    key={item.skill}
                />

            ))}

        </Paper>
    );
};

export default ResultCard;

// const ResultCard = ({ data, onClick }) => {

//     const classes = useStyles();

//     const skills =
//         sortBy(data.skills, skill => -1 * skill.level)
//             .map(item => {
//                 return item.skill + ' (' + item.level + ')';
//             })
//             .slice(0, 3).join(', ') + (data.skills.length > 3 ? ` and ${data.skills.length - 3} more` : null);//if data.skills length > 3 then add string

//     const roles =
//         sortBy(data.roles, role => -1 * role.level)
//             .map(item => {
//                 return item.role + ' years: ' + item.years;
//             })
//             .slice(0, 3).join(', ') + (data.roles.length > 3 ? ` and ${data.roles.length - 3} more` : null);//if data.roles length > 3 then add string

//     return (
//         <div className={classes.root}>
//             <Paper className={classes.paper}>
//                 <Grid container spacing={2} justify="center" alignItems="center">
//                     <Grid item>
//                         <Avatar
//                             alt="profile pic"
//                             className={classes.avatar}
//                             src={data.profile.profilePicture}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm container>
//                         <Grid item xs container direction="column" spacing={2}>
//                             <Grid item xs>
//                                 <Typography variant="h5" gutterBottom>
//                                     {data.profile.firstName} {data.profile.lastName}
//                                 </Typography>
//                                 <Typography variant="h6" gutterBottom>
//                                     {data.profile.countryOfResidence}
//                                 </Typography>
//                                 <Typography gutterBottom variant="body1">Skills:<br />{skills}</Typography>
//                                 <Typography gutterBottom variant="body1">
//                                     Previous roles:<br />{roles}{(data.roles.length > 3 ? ` and ${data.roles.length - 3} more` : null)}
//                                 </Typography>
//                                 {/* <Grid item>
//                                     <Button
//                                         className={classes.button}
//                                         variant="contained"
//                                         color="primary"
//                                         onClick={onClick}
//                                     >
//                                         Details
//                                     </Button>
//                                 </Grid> */}
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid item justify="center" alignItems="center" direction="column">
//                         <Button
//                             className={classes.button}
//                             variant="contained"
//                             color="primary"
//                             onClick={onClick}
//                         >
//                             Details
//                             </Button>
//                     </Grid>
//                 </Grid>
//             </Paper>
//         </div>
//     );
// };

//export default ResultCard;
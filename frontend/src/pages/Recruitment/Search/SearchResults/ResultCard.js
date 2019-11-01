import React from 'react';

import { Avatar, Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Star, StarBorder, KeyboardArrowDown } from '@material-ui/icons/';

import { sortBy } from 'lodash-es';
import SkillRating from './SkillRating';
import emblem_black from '../../../../assets/logos/emblem_black.png';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    padding: '2rem',
    position: 'relative',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    backgroundColor: '#FBFBFB',
    display: 'flex',
    flexDirection: 'column',

    '&:hover': {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      cursor: 'pointer',
      paddingBottom: '1.75rem',
      paddingTop: '2.25rem'
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
  },
  bottomWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    height: '3rem'
  },
  button: {
    marginTop: 'auto'
  }
}));

const ResultCard = ({ data, onClick, isFavorite }) => {
  const classes = useStyles();

  const renderStar = () => {
    if (isFavorite) {
      return <Star style={{ float: 'right' }} />;
    }
    return <StarBorder style={{ float: 'right' }} />;
  };

  return (
    <Paper className={classes.root} onClick={onClick}>
      <div>{renderStar()}</div>
      <div style={{ flex: 1 }}>
        <Avatar
          className={classes.avatar}
          alt="Profile Picture"
          src={data.profile.profilePicture}
          imgProps={{
            onError: e => {
              e.target.src = emblem_black;
            }
          }}
        />
        <Box className={classes.topWrapper} mb={1}>
          <Typography className={classes.name} variant="h6">
            {data.profile.firstName} {data.profile.lastName}
          </Typography>
          <Typography
            className={classes.country}
            variant="subtitle1"
            display="block"
          >
            {data.profile.countryOfResidence}
          </Typography>
        </Box>

        <Box>
          {sortBy(data.skills, skill => -1 * skill.level)
            .map(item => <SkillRating data={item} key={item.skill} small />)
            .slice(0, 3)}
        </Box>
      </div>
      <Box className={classes.bottomWrapper}>
        <KeyboardArrowDown
          className={classes.button}
          fontSize="large"
          color="secondary"
        />
      </Box>
    </Paper>
  );
};

export default ResultCard;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from 'components/generic/Button';

import * as AuthActions from 'redux/auth/actions';

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),
        background: 'black',
        color: 'white'
    },
    logo: {
        width: '200px',
        height: '200px'
    },
    title: {
        color: 'white',
        textTransform: 'uppercase'
    },
    error: {
        color: 'white'
    }
}));

export default () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        dispatch(AuthActions.clearSession());
    }, [dispatch]);

    const error = this.props.location.state ? this.props.location.state.error : null;

    return (
        <div className={classes.wrapper}>
            <img className={classes.logo} src={require('../../assets/logos/emblem_white.png')} alt="logo" />
            <Typography variant="button" className={classes.title}>
                Oh-oh, something went wrong
            </Typography>

            {error ? (
                <Typography variant="subtitle1" className={classes.error}>
                    {error}
                </Typography>
            ) : null}
            <Typography variant="subtitle2" className={classes.error}>
                Please log in again and you should be good to go!
            </Typography>
            <Button variant="contained" color="primary" onClick={() => dispatch(push('/'))}>
                Back to home page
            </Button>
        </div>
    );
};

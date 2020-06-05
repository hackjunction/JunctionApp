import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import UserMenu from 'components/UserMenu';
import LanguageMenu from 'components/LanguageMenu';

import config from 'constants/config';
import { Grid, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        height: '78px',
        background: 'white',
        padding: theme.spacing(0, 2),
    },
    inner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0',
        height: '100%',
    },
    wordmark: {
        height: '50px',
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <img
                    src={config.LOGO_DARK_URL}
                    className={classes.wordmark}
                    alt={config.PLATFORM_OWNER_NAME + ' logo'}
                />
                <Grid className={classes.inner}>
                    <UserMenu />
                    <Hidden only='xs'>
                        <LanguageMenu />
                    </Hidden>
                </Grid>
            </div>
        </div>
    );
};

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import UserMenu from 'components/UserMenu'
import LanguageMenu from 'components/LanguageMenu'

import config from 'constants/config'
import { Grid, Hidden } from '@material-ui/core'

// JUST FOR TESTING, DON'T KEEP IN FINAL PRODUCT! //
var userProg = 53
var userNeed = 100
var userLvl = 0
////////////////////////////////////////////////////

const useStyles = makeStyles(theme => ({
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
    progBar: {
        width: '60%',
        height: '48px',
        background: 'gray',
        display: 'flex',
        fontSize: '24px',
        color: 'black',
        boxShadow: '0 0 4px 1px black',
    },
    lvlText: {
        fontSize: '26px',
        color: 'black',
        textShadow: '0 0 6px silver',
    },
    progBarfill: {
        width: (userProg / userNeed) * 100 + '%',
        height: '100%',
        background: 'rgb(207, 134, 25)',
        boxShadow: 'inset 0 0 6px 2px rgb(163, 105, 18)',
    },
}))

export default () => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <img
                    src={config.LOGO_DARK_URL}
                    className={classes.wordmark}
                    alt={config.PLATFORM_OWNER_NAME + ' logo'}
                />
                <span className={classes.lvlText}>PROGRESS: {userProg}%</span>
                <div className={classes.progBar}>
                    <div className={classes.progBarfill}></div>
                    {/* <span className={classes.lvlText}>
                        PROGRESS: {userProg}%
                    </span> */}
                </div>
                <span className={classes.lvlText}>LVL: {userLvl}</span>
                <Grid className={classes.inner}>
                    <UserMenu />
                    <Hidden only="xs">
                        <LanguageMenu />
                    </Hidden>
                </Grid>
            </div>
        </div>
    )
}

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import UserMenu from 'components/UserMenu'
import LanguageMenu from 'components/LanguageMenu'
import Progress from 'components/ProgressBar'

import * as UserSelectors from 'redux/user/selectors'

// JUST FOR TESTING, DON'T KEEP IN FINAL PRODUCT! //
var userProg = 17
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
    userName: {
        fontSize: '16px',
        color: 'black',
        textTransform: 'uppercase',
    },
    progBar: {
        width: '60%',
        height: '48px',
        background: 'gray',
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
    const userProfile = useSelector(UserSelectors.userProfile)
    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <div>
                    <span className={classes.userName}>
                        Hi, {userProfile?.firstName}
                    </span>
                </div>
                <span className={classes.lvlText}>PROGRESS: {userProg}%</span>
                <div className={classes.progBar}>
                    <div className={classes.progBarfill}></div>
                </div>
                <span className={classes.lvlText}>LVL: {userLvl}</span>
                <div className={classes.inner}>
                    <UserMenu />
                    <LanguageMenu />
                </div>
            </div>
        </div>
    )
}

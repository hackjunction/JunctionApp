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
        width: '72%',
        height: '48px',
        background: 'gray',
    },
    lvlText: {
        fontSize: '24px',
        color: 'black',
        background: 'silver',
    },
    progBarfill: {
        width: (userProg / userNeed) * 100 + '%',
        height: '100%',
        background: 'orange',
    },
}))
export default () => {
    const classes = useStyles()
    const userProfile = useSelector(UserSelectors.userProfile)
    return (
        <div className={classes.wrapper}>
            <div id="testausDiv">
                <Progress />
            </div>
            <div className={classes.inner}>
                <div>
                    <span className={classes.userName}>
                        Hi, {userProfile?.firstName}
                    </span>
                </div>
                <div className={classes.progBar}>
                    <span className={classes.lvlText}>
                        PROGRESS: {userProg}%
                    </span>
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

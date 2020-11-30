import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import UserMenu from 'components/UserMenu'

import * as UserSelectors from 'redux/user/selectors'

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
                <div className={classes.inner}>
                    <UserMenu />
                </div>
            </div>
        </div>
    )
}

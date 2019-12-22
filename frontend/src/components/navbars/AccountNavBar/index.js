import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import UserMenu from 'components/UserMenu'
import * as UserSelectors from 'redux/user/selectors'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(3),
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
            <div>
                <span className={classes.userName}>
                    Hi, {userProfile?.firstName}
                </span>
            </div>
            <div>
                <UserMenu />
            </div>
        </div>
    )
}

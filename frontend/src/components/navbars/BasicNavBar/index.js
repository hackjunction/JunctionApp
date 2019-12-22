import React from 'react'
import UserMenu from 'components/UserMenu'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    text: {
        marginRight: theme.spacing(1),
        textTransform: 'uppercase',
        color: 'black',
        alignSelf: 'flex-end',
        display: 'none',
    },
}))

const BasicNavBar = ({ text }) => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <Typography variant="button">{text}</Typography>
            <UserMenu />
        </div>
    )
}

export default BasicNavBar

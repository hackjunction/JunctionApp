import React from 'react'
import UserMenu from 'components/UserMenu'
import LanguageMenu from 'components/LanguageMenu'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
            <div className={classes.inner}>
                <Typography variant="button" style={{ padding: '40px' }}>
                    {text}
                </Typography>
                <div className={classes.inner}>
                    <UserMenu />
                    <LanguageMenu />
                </div>
            </div>
        </div>
    )
}

export default BasicNavBar

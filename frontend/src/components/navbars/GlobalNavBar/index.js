import React from 'react'
import UserMenu from 'components/UserMenu'
import config from 'constants/config'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        height: '60px',
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
        height: '20px',
    },
}))

export default () => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <a href="/">
                    <img
                        src={config.LOGO_DARK_URL}
                        className={classes.wordmark}
                        alt={config.PLATFORM_OWNER_NAME + ' logo'}
                    />
                </a>
                <UserMenu />
            </div>
        </div>
    )
}

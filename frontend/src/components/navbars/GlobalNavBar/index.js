import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import UserMenu from 'components/UserMenu'
import Button from 'components/generic/Button'

import config from 'constants/config'
import PlatformLogo from 'assets/logos/JO_wordmark_black.png'
import WavePattern from 'assets/images/nawbar_waves.svg'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        height: '60px',
        background: WavePattern,
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
        height: '70px',
        paddingLeft: '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
        backgroundColor: 'white',
    },
}))

export default () => {
    const classes = useStyles()
    return (
        <div className='tw-w-full tw-py-2 tw-bg-wave-pattern' >
            <div className={classes.wrapper}>
                <div className={classes.inner}>

                    <a href="/home">
                        <img
                            src={PlatformLogo}
                            className={classes.wordmark}
                            alt={config.PLATFORM_OWNER_NAME + ' logo'}
                        />
                    </a>
                    <UserMenu />
                </div>
            </div>
        </div>
    )
}

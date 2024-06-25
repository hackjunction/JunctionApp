import React from 'react'
import UserMenu from 'components/UserMenu'
import UserAvatar from 'components/UserAvatar'
import LanguageMenu from 'components/LanguageMenu'

import { Typography } from '@mui/material'

import navbarWaves from 'assets/images/nawbar_waves.svg'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        height: '78px',
        //background: 'black',
        background: 'assets/images/nawbar_waves.svg',
        padding: theme.spacing(0, 2),
    },
    inner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        margin: '0',
        height: '100%',
    },
}))

const BasicNavBar = ({ text }) => {
    const classes = useStyles()
    return (
        // <div className={classes.wrapper}>
        <div className="tw-w-full tw-px-0 tw-py-2 tw-pr-32 tw-bg-wave-pattern tw-bg-black ">
            <div className={classes.inner}>
                <UserAvatar />
                {/* <LanguageMenu /> */}
            </div>
        </div>
    )
}

export default BasicNavBar

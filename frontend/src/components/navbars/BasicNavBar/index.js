import React from 'react'
// import UserMenu from 'components/UserMenu'
import UserAvatar from 'components/UserAvatar'
import LanguageMenu from 'components/LanguageMenu'

// import { Typography } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'

// import navbarWaves from 'assets/images/nawbar_waves.svg'

// const useStyles = makeStyles(theme => ({
//     // wrapper: {
//     //     width: '100%',
//     //     height: '78px',
//     //     //background: 'black',
//     //     background: 'assets/images/nawbar_waves.svg',
//     //     padding: theme.spacing(0, 2),
//     // },
//     // inner: {
//     //     display: 'flex',
//     //     flexDirection: 'row',
//     //     justifyContent: 'right',
//     //     margin: '0',
//     //     height: '100%',
//     // },
// }))

const BasicNavBar = ({ text }) => {
    // const classes = useStyles()
    return (
        // <div className={classes.wrapper}>
        <div className="tw-w-full tw-p-2 tw-bg-wave-pattern tw-bg-black ">
            <div className={'tw-flex tw-justify-end tw-items-center'}>
                <UserAvatar />
                <LanguageMenu />
            </div>
        </div>
    )
}

export default BasicNavBar

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import UserMenu from 'components/UserMenu'

import config from 'constants/config'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        padding: theme.spacing(2, 3),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(82,151,119,0.3) 0%, rgba(0,29,36,1) 100%)',
        borderBottom: '1px solid #0c2c34',
    },
    brand: {
        fontFamily: '"Pixelify Sans", sans-serif',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#4dffd1',
        textDecoration: 'none',
        letterSpacing: '0.05em',
        '&:hover': {
            color: '#7fffe0',
        },
    },
}))

export default () => {
    const classes = useStyles()
    return (
        <div id="global-navbar" className={classes.wrapper}>
            <a href="/home" className={classes.brand}>
                That Crypto Hackathon
            </a>
            <UserMenu />
        </div>
    )
}

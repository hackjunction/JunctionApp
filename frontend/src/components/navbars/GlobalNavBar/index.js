import React from 'react'

import UserMenu from 'components/UserMenu'

import config from 'constants/config'
import PlatformLogo from 'assets/logos/JO_wordmark_black.png'
import WavePattern from 'assets/images/nawbar_waves.svg'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

const NavbarWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    background: `url(${WavePattern})`,
    display: 'flex',
    flexDirection: 'row',
    // For smaller screens
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem',
}))

const LogoImage = styled('img')(({ theme }) => ({
    height: '3rem',
    backgroundColor: 'white',
    borderRadius: '0.4rem',
    [theme.breakpoints.down('md')]: {
        height: '4rem',
        marginBottom: '0.3rem',
    },
    marginLeft: '0.2rem',
    marginRight: '0.2rem',
}))

export default () => {
    return (
        <NavbarWrapper id="global-navbar">
            <Link to="/home">
                <LogoImage
                    src={PlatformLogo}
                    alt={config.PLATFORM_OWNER_NAME + ' logo'}
                />
            </Link>
            <UserMenu />
        </NavbarWrapper>
    )
}

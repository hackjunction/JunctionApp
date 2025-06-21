import React from 'react'

import { styled } from '@mui/material/styles'

import WavePattern from 'assets/images/nawbar_waves.svg'
import UserAvatar from 'components/UserAvatar'
import LanguageMenu from 'components/LanguageMenu'

const NavbarWrapper = styled('div')({
    width: '100%',
    background: `url(${WavePattern})`,
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    padding: '0.5rem',
})

const BasicNavBar = () => {
    return (
        <NavbarWrapper>
            <LanguageMenu />
            <UserAvatar />
        </NavbarWrapper>
    )
}

export default BasicNavBar

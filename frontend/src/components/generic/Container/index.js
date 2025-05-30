import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const Wrapper = styled(Box, {
    // This specifies which props should not get passed down to the DOM,
    // will throw a console error if you do.
    shouldForwardProp: prop => prop !== 'center' && prop !== 'small',
})(({ theme, center, small }) => ({
    padding: theme.spacing(0, 2),
    margin: '0 auto',
    maxWidth: '1120px',

    textAlign: center && 'center',
    width: small ? '60%' : '100%',
    [theme.breakpoints.down('md')]: {
        width: small && '80%',
    },
}))

const Container = ({ children, ...props }) => {
    return <Wrapper {...props}>{children}</Wrapper>
}

export default Container

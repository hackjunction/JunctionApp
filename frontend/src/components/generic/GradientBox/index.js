import React from 'react'
import { Box } from '@mui/material'
import clsx from 'clsx'

const getGradientClasses = (color, theme) => {
    const colorObj = theme.palette[color]
    const bg = `linear-gradient(145deg, ${colorObj.dark} 0%, ${colorObj.main} 100%)`
    return {
        background: bg,
        color: colorObj.contrastText,
    }
}

const GradientBox = ({ color, radius = '13px', children, ...boxProps }) => {
    const theme = {
        palette: {
            primary: {
                main: '#3f51b5',
                dark: '#303f9f',
                contrastText: '#fff',
            },
            secondary: {
                main: '#f50057',
                dark: '#ab003c',
                contrastText: '#fff',
            },
            // Add other colors as needed
        },
    }

    const gradientClasses = getGradientClasses(color, theme)

    return (
        <Box
            {...boxProps}
            className={clsx(
                'shadow-lg',
                'p-4',
                'transition-all',
                'ease-in-out',
                gradientClasses,
            )}
            style={{ borderRadius: radius }}
        >
            {children}
        </Box>
    )
}

export default GradientBox

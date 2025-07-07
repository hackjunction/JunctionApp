import React from 'react'
import { IconButton as MuiButton, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'

const baseStyles = () => {
    return {
        boxSizing: 'border-box',
        boxShadow: 'none',
        '&:focus': {
            boxShadow: 'none',
        },
        outline: 'none',
    }
}

const variantStyles = (theme, variant, color) => {
    const colorPalette = theme.palette[color]
    switch (variant) {
        case 'roundedBlack':
            return {
                backgroundColor: 'black',
                color: colorPalette.main,
                border: `2px solid ${colorPalette.main}`,
                borderRadius: '50%',
                '&:hover': {
                    color: 'black',
                    background: colorPalette.dark,
                    border: `2px solid ${colorPalette.dark}`,
                },
                '&.Mui-disabled': {
                    backgroundColor: colorPalette.dark,
                    color: colorPalette.contrastText,
                    opacity: 0.5,
                },
            }
        default:
            return {
                borderRadius: 0,
                color: colorPalette.main,
            }
    }
}

const IconButton = ({
    color = 'primary',
    strong = false,
    loading = false,
    ...props
}) => {
    const CustomIconButton = styled(MuiButton, {
        // MUI IconButtons don't have variants so no point in forwarding them
        shouldForwardProp: prop => prop !== 'variant',
    })(({ theme }) => ({
        ...baseStyles(),
        ...variantStyles(theme, props.variant, color),
    }))

    return (
        <CustomIconButton {...props} disabled={loading || props.disabled}>
            {loading ? <CircularProgress size={20} /> : props.children}
        </CustomIconButton>
    )
}

export default IconButton

import React from 'react'

import { Button as MuiButton, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'

const getButton = (color, variant, strong) => {
    const baseStyles = (theme, strong) => ({
        borderRadius: '13px',
        padding: '0.35rem 1.5rem',
        boxSizing: 'border-box',
        fontSize: '1rem',
        letterSpacing: '0.02em',
        lineHeight: '1.4rem',
        boxShadow: 'none',
        fontWeight: 'bold',
        fontFamily: strong
            ? theme.typography.h1.fontFamily
            : theme.typography.body1.fontFamily,
        '&:focus': {
            boxShadow: 'none',
        },
    })

    const getVariant = (theme, color) => {
        const colorPalette = theme.palette[color]
        switch (variant) {
            case 'contained': {
                return {
                    backgroundColor: colorPalette.main,
                    color: colorPalette.contrastText,
                    border: `2px solid ${colorPalette.main}`,
                    '&.Mui-disabled': {
                        border: `2px solid lightgrey`,
                    },
                }
            }
            case 'containedNew': {
                return {
                    color: colorPalette.contrastText,
                    textDecoration: 'underline',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    '&:hover': {
                        textDecoration: 'none',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: 'transparent',
                        color: colorPalette.contrastText,
                        opacity: 0.5,
                    },
                }
            }
            case 'outlined-small': {
                return {
                    backgroundColor: 'transparent',
                    color: colorPalette.contrastText,
                    border: `2px solid ${colorPalette.dark}`,
                    borderRadius: '28px',
                    height: '2em',
                    width: '10em',
                    fontSize: '10px',
                    margin: theme.spacing(3),
                }
            }
            case 'contained-large': {
                return {
                    backgroundColor: colorPalette.main,
                    color: colorPalette.contrastText,
                    border: `2px solid ${colorPalette.main}`,
                    height: '3em',
                    fontSize: '1.5em',
                    '&:hover': {
                        backgroundColor: colorPalette.main,
                    },
                    '&.Mui-disabled': {
                        backgroundColor: colorPalette.dark,
                        color: colorPalette.contrastText,
                        opacity: 0.5,
                    },
                }
            }
            // "See more"
            case 'containedCard': {
                return {
                    color: colorPalette.contrastText,
                    backgroundColor: colorPalette.main,
                    borderRadius: '16px 0 15px',
                    textTransform: 'uppercase',
                    opacity: 0.75,
                    fontSize: '12px',
                    '&:hover': {
                        backgroundColor: colorPalette.main,
                        opacity: 1,
                    },
                    '&.Mui-disabled': {
                        backgroundColor: 'transparent',
                        color: colorPalette.contrastText,
                        opacity: 1,
                    },
                }
            }
            case 'containedEventImage': {
                return {
                    backgroundColor: colorPalette.main,
                    color: colorPalette.contrastText,
                    border: `2px solid ${colorPalette.main}`,
                    height: '2.6em',
                    borderRadius: '28px',
                    fontSize: '1.3em',
                    margin: theme.spacing(2),
                    '&:hover': {
                        backgroundColor: colorPalette.main,
                    },
                }
            }
            case 'outlined': {
                return {
                    backgroundColor: 'white',
                    color: 'black',
                    border: `2px solid ${colorPalette.dark}`,
                }
            }
            case 'outlinedNew': {
                return {
                    backgroundColor: 'transparent',
                    color: colorPalette.contrastText,
                    border: `2px solid ${colorPalette.dark}`,
                    borderRadius: '28px',
                    height: '3em',
                    width: '13em',
                }
            }
            case 'applicationsClosed': {
                return {
                    color: colorPalette.main,
                    margin: '25px 0 0 0',
                    textTransform: 'uppercase',
                    fontSize: '18px',
                    textAlign: 'center',
                    '&:hover': {
                        textDecoration: 'none',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: 'transparent',
                        color: colorPalette.contrastText,
                        opacity: 0.5,
                    },
                }
            }
            case 'jOutlined': {
                return {
                    backgroundColor: 'transparent',
                    color: colorPalette.contrastText,
                    border: `2px solid ${colorPalette.dark}`,
                    borderRadius: theme.spacing(4),
                    padding: theme.spacing(1, 2),
                    margin: 0,
                }
            }
            case 'jIconText': {
                return {
                    backgroundColor: 'transparent',
                    color: colorPalette.main,
                    padding: theme.spacing(1, 2),
                    margin: 0,
                    fontWeight: 'fontWeightRegular',
                    fontSize: theme.spacing(1, 4),
                }
            }
            case 'jContained': {
                return {
                    backgroundColor: colorPalette.main,
                    color: colorPalette.contrastText,
                    border: `2px solid ${colorPalette.main}`,
                    borderRadius: theme.spacing(4),
                    padding: theme.spacing(1, 2),
                    margin: 0,
                    '&:hover': {
                        backgroundColor: colorPalette.dark,
                        border: `2px solid ${colorPalette.dark}`,
                    },
                    '&.Mui-disabled': {
                        backgroundColor: colorPalette.dark,
                        color: colorPalette.contrastText,
                        opacity: 0.5,
                    },
                }
            }
            case 'jOutlinedBox': {
                return {
                    backgroundColor: colorPalette.main,
                    color: colorPalette.contrastText,
                    border: `1px solid ${colorPalette.lightBorder}`,
                    borderRadius: theme.spacing(1),
                    padding: theme.spacing(2),
                    margin: 0,
                    width: '100%',
                }
            }
            default: {
                return {
                    borderRadius: 0,
                    color: colorPalette.main,
                }
            }
        }
    }

    const CustomButton = styled(MuiButton)(({ theme }) => ({
        ...baseStyles(theme, strong),
        ...getVariant(theme, color, variant),
    }))

    return CustomButton
}

const Button = ({
    color = 'primary',
    strong = false,
    loading = false,
    className = '',
    ...props
}) => {
    const CustomButton = getButton(color, props.variant, strong)

    // These are the only variants offered by MUIbutton
    if (!['text', 'outlined', 'contained'].includes(props.variant)) {
        delete props.variant
    }
    return (
        <CustomButton
            {...props}
            disabled={loading || props.disabled}
            children={loading ? <CircularProgress size={20} /> : props.children}
        />
    )
}

export default Button

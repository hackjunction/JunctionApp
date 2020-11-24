import React from 'react'

import { Button as MuiButton, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const baseStyles = (theme, props, variant) => {
    return {
        borderRadius: '13px',
        padding: '0.35rem 1.5rem',
        boxSizing: 'border-box',
        fontSize: '16px',
        letterSpacing: '0.02em',
        lineHeight: '22px',
        boxShadow: 'none',
        fontFamily: props.strong
            ? theme.typography.h1.fontFamily
            : theme.typography.body1.fontFamily,
        fontWeight: 'bold',
        textTransform: props.strong ? 'uppercase' : 'none',
        '&:focus': {
            boxShadow: 'none',
        },
    }
}

const variantStyles = (theme, props) => {
    const color = theme.palette[props.color]
    switch (props.variant) {
        case 'contained': {
            return {
                backgroundColor: color.main,
                color: color.contrastText,
                border: `2px solid ${color.main}`,
                '&:hover': {
                    backgroundColor: color.main,
                },
                '&.Mui-disabled': {
                    backgroundColor: color.dark,
                    color: color.contrastText,
                    opacity: 0.5,
                },
            }
        }
        case 'containedNew': {
            return {
                color: color.contrastText,

                textDecoration: 'underline',
                textTransform: 'uppercase',
                textAlign: 'center',
                '&:hover': {
                    textDecoration: 'none',
                },
                '&.Mui-disabled': {
                    backgroundColor: 'transparent',
                    color: color.contrastText,
                    opacity: 0.5,
                },
            }
        }
        case 'containedCard': {
            return {
                color: color.contrastText,
                backgroundColor: color.main,
                borderRadius: '16px 0 15px',
                textTransform: 'uppercase',
                opacity: 0.75,
                fontSize: '12px',
                '&:hover': {
                    backgroundColor: color.main,
                    opacity: 1,
                },
                '&.Mui-disabled': {
                    backgroundColor: 'transparent',
                    color: color.contrastText,
                    opacity: 1,
                },
            }
        }

        case 'outlined': {
            return {
                backgroundColor: 'transparent',
                color: color.contrastText,
                border: `2px solid ${color.dark}`,
            }
        }
        case 'outlinedNew': {
            return {
                backgroundColor: 'transparent',
                color: color.contrastText,
                border: `2px solid ${color.dark}`,
                borderRadius: '28px',
                height: '3em',
                width: '13em',
                margin: theme.spacing(3),
            }
        }
        case 'contained-large': {
            return {
                backgroundColor: color.main,
                color: color.contrastText,
                border: `2px solid ${color.main}`,
                height: '3em',
                fontSize: '1.5em',
                '&:hover': {
                    backgroundColor: color.main,
                },
                '&.Mui-disabled': {
                    backgroundColor: color.dark,
                    color: color.contrastText,
                    opacity: 0.5,
                },
            }
        }
        default: {
            return {
                borderRadius: 0,
                color: color.main,
            }
        }
    }
}

const useStyles = makeStyles(theme => ({
    root: props => {
        return {
            ...baseStyles(theme, props),
            ...variantStyles(theme, props),
            '&:focus': {
                boxShadow: 'none',
            },
        }
    },
}))

const Button = ({ color = 'primary', strong, loading, ...props }) => {
    const classes = useStyles({ color, strong, variant: props.variant })
    return (
        <MuiButton
            {...props}
            classes={classes}
            disabled={loading || props.disabled}
            children={loading ? <CircularProgress size={20} /> : props.children}
        />
    )
}

export default Button

import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'

const baseStyles = (theme, props) => {
    return {
        borderRadius: '13px',
        padding: '2px 2px',
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
    return {
        color: color.contrastText,
        backgroundColor: color.light,
        borderRadius: '16px 0 0 16px',

        textTransform: 'uppercase',
        opacity: 0.65,
        fontSize: '10px',
        '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: color.contrastText,
            opacity: 1,
        },
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


export default function CardTag({
    label,
    color = 'primary',
    strong = false,
    loading = false,
    ...props
}) {
    const classes = useStyles({ color, strong, variant: props.variant })
    return (
        <Chip
            {...props}
            classes={classes}
            label={label}
        />
    )
}
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    link: ({ _theme }) => {
        let color
        let hoverColor

        switch (_theme) {
            case 'dark': {
                color = 'black'
                hoverColor = 'black'
                break
            }
            default: {
                color = theme.palette.primary.main
                hoverColor = theme.palette.primary.dark
                break
            }
        }

        return {
            color: color,
            textDecoration: 'underline',
            cursor: 'pointer',
            '&:hover': {
                color: hoverColor,
            },
        }
    },
}))

const ExternalLink = ({ href, children, theme }) => {
    const classes = useStyles({ _theme: theme })
    return (
        <a
            className={classes.link}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}

export default ExternalLink

import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    link: ({ _theme }) => {
        let color
        let hoverColor
        // eslint-disable-next-line no-unused-vars
        let textDecoration

        switch (_theme) {
            case 'dark': {
                color = 'black'
                hoverColor = 'black'
                textDecoration = 'underline'
                break
            }
            case 'footer': {
                color = 'white'
                hoverColor = 'white'
                textDecoration = 'none'
                break
            }
            default: {
                color = theme.palette.primary.main
                hoverColor = theme.palette.primary.dark
                textDecoration = 'underline'
                break
            }
        }

        return {
            color: color,

            cursor: 'pointer',
            '&:hover': {
                color: hoverColor,
            },
        }
    },
}))

const ExternalLink = ({ href, children, theme = null }) => {
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

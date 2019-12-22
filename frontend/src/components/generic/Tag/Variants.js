import React from 'react'
import { withStyles, lighten } from '@material-ui/core/styles'
import { Chip } from '@material-ui/core'

export const Yes = withStyles(theme => ({
    root: {
        backgroundColor: lighten('#00ff00', 0.4),
    },
    label: {
        ...theme.typography.overline,
        fontWeight: 'bold',
        color: 'white',
    },
}))(({ classes }) => <Chip size="small" classes={classes} label="Yes" />)

export const No = withStyles(theme => ({
    root: {
        backgroundColor: lighten('#ff0000', 0.4),
    },
    label: {
        ...theme.typography.overline,
        fontWeight: 'bold',
        color: 'white',
    },
}))(({ classes }) => <Chip size="small" classes={classes} label="No" />)

export const NotAvailable = withStyles(theme => ({
    root: {
        backgroundColor: lighten('#ffa500', 0.2),
    },
    label: {
        ...theme.typography.overline,
        fontWeight: 'bold',
        color: 'white',
    },
}))(({ classes }) => <Chip size="small" classes={classes} label="N/A" />)

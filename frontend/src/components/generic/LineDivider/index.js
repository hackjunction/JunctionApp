import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        height: '1px',
        background: '#f8f8f8',
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
    },
}))

const LineDivider = () => {
    const classes = useStyles()
    return <div className={classes.root} />
}

export default LineDivider

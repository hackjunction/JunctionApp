import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: ({ size }) => ({
        width: theme.spacing(size),
        height: theme.spacing(size),
    }),
}))

export default ({ size = 1 }) => {
    const classes = useStyles({ size })

    return <div className={classes.root} />
}

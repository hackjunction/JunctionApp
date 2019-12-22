import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button as MuiButton, Badge } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    padding: {
        padding: theme.spacing(0, 2),
    },
}))

const ToggleFavorites = ({ count, active, onChange }) => {
    const classes = useStyles()
    return (
        <Badge badgeContent={!active ? count : 0} color="primary">
            <MuiButton onClick={onChange} className={classes.padding}>
                {active ? 'Back to search' : 'Your favorites'}
            </MuiButton>
        </Badge>
    )
}

export default ToggleFavorites

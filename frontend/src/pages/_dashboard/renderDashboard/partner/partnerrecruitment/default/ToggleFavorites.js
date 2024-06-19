import React from 'react'

import { makeStyles } from '@mui/styles'
import { Button as MuiButton, Badge } from '@mui/material'
import Button from 'components/generic/Button'

const useStyles = makeStyles(theme => ({
    padding: {
        padding: theme.spacing(1, 2),
    },
}))

const ToggleFavorites = ({ count, active, onChange }) => {
    const classes = useStyles()
    return (
        <Badge badgeContent={!active ? count : 0} color="secondary">
            <Button
                variant={'contained'}
                onClick={onChange}
                className={classes.padding}
            >
                {active ? 'Back to search' : 'Your favorites'}
            </Button>
        </Badge>
    )
}

export default ToggleFavorites

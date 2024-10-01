import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Badge } from '@material-ui/core'
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

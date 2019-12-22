import React, { useState, useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    CircularProgress,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    value: {
        textAlign: 'left',
    },
    suffix: {
        marginLeft: theme.spacing(1),
        display: 'inline-block',
    },
}))

const Statistic = ({ label, value, suffix, action, actionText }) => {
    const [actionLoading, setActionLoading] = useState()

    const handleAction = useCallback(async () => {
        setActionLoading(true)
        await action()
        setActionLoading(false)
    }, [action])
    const classes = useStyles()
    return (
        <Card>
            <CardContent className={classes.root}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {label}
                </Typography>
                <Box display="flex" flexDirection="row" alignItems="flex-end">
                    <Typography variant="h4" className={classes.value}>
                        {value}
                    </Typography>
                    {suffix && (
                        <Typography variant="h6" className={classes.suffix}>
                            {suffix}
                        </Typography>
                    )}
                </Box>
                {action && actionText && (
                    <Box mt={2}>
                        {actionLoading && <CircularProgress size={24} />}
                        <Button
                            disabled={actionLoading}
                            color="secondary"
                            onClick={handleAction}
                        >
                            {actionText}
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}

export default Statistic

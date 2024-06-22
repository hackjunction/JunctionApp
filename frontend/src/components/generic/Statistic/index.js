import React, { useState, useCallback } from 'react'

import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    CircularProgress,
} from '@mui/material'

const Statistic = ({ label, value, suffix, action, actionText }) => {
    const [actionLoading, setActionLoading] = useState()

    const handleAction = useCallback(async () => {
        setActionLoading(true)
        await action()
        setActionLoading(false)
    }, [action])
    return (
        <Card>
            <CardContent className="">
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {label}
                </Typography>
                <Box display="flex" flexDirection="row" alignItems="flex-end">
                    <Typography variant="h4" className="tw-text-left">
                        {value}
                    </Typography>
                    {suffix && (
                        <Typography
                            variant="h6"
                            className={'ml-1 tw-inline-block'}
                        >
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

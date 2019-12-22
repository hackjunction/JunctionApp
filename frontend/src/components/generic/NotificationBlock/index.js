import React from 'react'

import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    CircularProgress,
    Box,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import {
    SuccessHeader,
    ErrorHeader,
    InfoHeader,
    WarningHeader,
} from './IconHeader'

const NotificationBlock = ({
    title,
    titleExtra,
    body,
    bottom,
    bottomLoading,
    type,
    loading,
}) => {
    const headerComponent = () => {
        switch (type) {
            case 'success':
                return <SuccessHeader />
            case 'error':
                return <ErrorHeader />
            case 'warning':
                return <WarningHeader />
            case 'info':
                return <InfoHeader />
            default:
                return <InfoHeader />
        }
    }

    if (loading) {
        return (
            <Card>
                <CardContent>
                    <Skeleton variant="rect" width="100%" height="60px" />
                    <Box mt={1} />
                    <Skeleton variant="rect" width="60%" height="30px" />
                    <Box mt={1} />
                    <Skeleton variant="rect" width="100%" height="200px" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardMedia component="div" height="200">
                {headerComponent()}
            </CardMedia>
            <CardContent>
                <Typography variant="button">{title}</Typography>
                <Typography variant="h6" paragraph>
                    {titleExtra}
                </Typography>
                <Typography variant="subtitle1">{body}</Typography>
            </CardContent>
            <CardActions>
                <Box
                    p={2}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    flexWrap="wrap"
                    width="100%"
                >
                    {bottomLoading ? <CircularProgress size={24} /> : bottom}
                </Box>
            </CardActions>
        </Card>
    )
}

export default NotificationBlock

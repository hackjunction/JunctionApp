import React from 'react';

import { Card, CardMedia, CardContent, CardActions, Typography, CircularProgress, Box } from '@material-ui/core';
import { SuccessHeader, ErrorHeader, InfoHeader, WarningHeader } from './IconHeader';

const NotificationBlock = ({ title, titleExtra, body, bottom, bottomLoading, type }) => {
    const headerComponent = () => {
        switch (type) {
            case 'success':
                return SuccessHeader;
            case 'error':
                return ErrorHeader;
            case 'warning':
                return WarningHeader;
            case 'info':
                return InfoHeader;
            default:
                return InfoHeader;
        }
    };

    return (
        <Card>
            <CardMedia component={headerComponent()} height="200" />
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
                    justifyContent="center"
                    flexWrap="wrap"
                    width="100%"
                >
                    {bottomLoading ? <CircularProgress size={24} /> : bottom}
                </Box>
            </CardActions>
        </Card>
    );
};

export default NotificationBlock;

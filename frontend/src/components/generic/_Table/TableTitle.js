import React from 'react'

import { Box, Typography } from '@material-ui/core'

export default ({ pageIndex, pageSize, totalItems }) => {
    console.log({ pageIndex, pageSize })
    return (
        <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
            flexWrap="wrap"
            p={1}
        >
            <Typography variant="h6">Participants</Typography>
            <Typography variant="subtitle2">
                Showing {pageIndex * pageSize} to{' '}
                {Math.min(pageIndex * (pageSize + 1), totalItems)} of{' '}
                {totalItems}
            </Typography>
        </Box>
    )
}

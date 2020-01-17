import React from 'react'

import { Box, Typography, Button, ButtonGroup } from '@material-ui/core'

export default ({ pageSize, setPageSize }) => {
    const opts = [
        [10, 10],
        [25, 25],
        [50, 50],
        [100, 100],
        ['All', -1],
    ]
    return (
        <Box p={1} display="flex" flexDirection="column" alignItems="center">
            <Typography
                variant="subtitle1"
                style={{ textAlign: 'center' }}
                gutterBottom
            >
                Results per page
            </Typography>
            <ButtonGroup size="small" aria-label="small outlined button group">
                {opts.map(([label, value]) => (
                    <Button
                        onClick={setPageSize.bind(null, value)}
                        color={pageSize === value ? 'primary' : undefined}
                        key={value}
                    >
                        {label}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    )
}

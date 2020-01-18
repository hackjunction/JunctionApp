import React, { useCallback } from 'react'

import { Box, Button, ButtonGroup } from '@material-ui/core'

export default ({ gotoPage, pageSize, setPageSize }) => {
    const opts = [
        [10, 10],
        [25, 25],
        [50, 50],
        [100, 100],
        ['All', 100000],
    ]

    const _setPageSize = useCallback(
        size => {
            setPageSize(size)
            gotoPage(0)
        },
        [setPageSize, gotoPage]
    )

    return (
        <Box p={1}>
            <ButtonGroup size="small" aria-label="small outlined button group">
                {opts.map(([label, value]) => (
                    <Button
                        onClick={_setPageSize.bind(null, value)}
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

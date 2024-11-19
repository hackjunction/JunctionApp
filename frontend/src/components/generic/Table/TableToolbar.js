import React from 'react'
import { Toolbar, Tooltip, Typography, Box, IconButton } from '@mui/material'
import clsx from 'clsx'

const TableToolbar = ({ title, selectedRows, actions = [] }) => {
    const hasSelected = selectedRows.length > 0

    return (
        <Toolbar
            className={clsx(
                'px-4 transition-all duration-200',
                hasSelected ? 'bg-primary-light text-primary-dark' : '',
            )}
        >
            <Typography variant="button" color="inherit">
                {hasSelected ? `${selectedRows.length} selected` : title}
            </Typography>
            <Box className="ml-4 flex flex-1 justify-end">
                {actions.map(action => (
                    <Tooltip
                        className={clsx(
                            'transition-all duration-200 transform scale-50 opacity-0 pointer-events-none',
                            hasSelected
                                ? 'scale-100 opacity-100 pointer-events-auto'
                                : '',
                        )}
                        key={action.key}
                        title={action.label}
                    >
                        <IconButton
                            onClick={() => action.action(selectedRows)}
                            aria-label={action.label}
                        >
                            {action.icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </Box>
        </Toolbar>
    )
}

export default TableToolbar

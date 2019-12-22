import React from 'react'

import { lighten, makeStyles } from '@material-ui/core/styles'
import {
    Toolbar,
    Tooltip,
    Typography,
    Box,
    IconButton,
} from '@material-ui/core'
import clsx from 'clsx'

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        transition: 'all 0.2s ease',
    },
    highlight: {
        color: theme.palette.primary.dark,
        backgroundColor: lighten(theme.palette.primary.main, 0.85),
    },
    action: {
        transform: 'scale(0.5)',
        transition: 'all 0.2s ease',
        opacity: 0,
        pointerEvents: 'none',
    },
    actionActive: {
        transform: 'scale(1)',
        opacity: 1,
        pointerEvents: 'initial',
    },
}))

const TableToolbar = ({ title, selectedRows, actions = [] }) => {
    const classes = useToolbarStyles()
    const hasSelected = selectedRows.length > 0

    return (
        <Toolbar
            className={clsx({
                [classes.root]: true,
                [classes.highlight]: hasSelected,
            })}
        >
            <Typography variant="button" color="inherit">
                {hasSelected ? `${selectedRows.length} selected` : title}
            </Typography>
            <Box
                m={1}
                flex="1"
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
            >
                {actions.map(action => (
                    <Tooltip
                        className={clsx({
                            [classes.action]: true,
                            [classes.actionActive]: hasSelected,
                        })}
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

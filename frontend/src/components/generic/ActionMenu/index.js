import React, { useState, useCallback } from 'react'

import { Menu, MenuItem, IconButton, Tooltip } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const ActionMenu = ({ title = 'Actions', actions = [], actionProps }) => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = useCallback(event => {
        setAnchorEl(event.currentTarget)
    }, [])

    const handleClose = useCallback(event => {
        setAnchorEl(null)
    }, [])

    const handleItemClick = action => {
        action.action(...actionProps)
        handleClose()
    }

    if (actions.length === 1) {
        const action = actions[0]
        return (
            <Tooltip title={action.label}>
                <IconButton onClick={() => handleItemClick(action)}>
                    <MoreHorizIcon />
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <>
            <Tooltip title="Actions">
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted={false}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {actions.map(action => (
                    <MenuItem
                        key={action.key}
                        onClick={() => handleItemClick(action)}
                    >
                        {action.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default ActionMenu

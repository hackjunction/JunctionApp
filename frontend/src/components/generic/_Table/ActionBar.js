import React, { useState, useCallback, useMemo } from 'react'

import {
    Box,
    Typography,
    IconButton,
    Popover,
    Paper,
    InputBase,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'

import SearchIcon from '@material-ui/icons/Search'
import GetAppIcon from '@material-ui/icons/GetApp'
import FilterListIcon from '@material-ui/icons/FilterList'

const useStyles = makeStyles(theme => ({
    selectionActions: {
        height: 0,
        background: theme.palette.primary.main,
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    selectionTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
}))

const ActionBar = ({ selected }) => {
    const classes = useStyles()
    const selectionActive = selected.length > 0

    return (
        <motion.div
            className={classes.selectionActions}
            variants={{
                visible: {
                    height: 'auto',
                },
                hidden: {
                    height: 0,
                },
            }}
            animate={selectionActive ? 'visible' : 'hidden'}
        >
            <Box
                p={1}
                pt={0}
                display="flex"
                flexDirection="row"
                alignItems="center"
                flexWrap="wrap"
            >
                <Box width="100%" mt={1}>
                    <Typography
                        variant="subtitle2"
                        className={classes.selectionTitle}
                    >
                        {selected.length} selected
                    </Typography>
                </Box>
                <Box mr={1} mt={1}>
                    <Button size="small" variant="outlined">
                        Email all
                    </Button>
                </Box>
                <Box mr={1} mt={1}>
                    <Button size="small" variant="outlined">
                        Edit all
                    </Button>
                </Box>
                <Box mr={1} mt={1}>
                    <Button size="small" variant="outlined">
                        Export as CSV
                    </Button>
                </Box>
            </Box>
        </motion.div>
    )
}

export default ActionBar

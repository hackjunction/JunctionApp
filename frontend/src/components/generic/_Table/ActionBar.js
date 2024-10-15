import React, { useMemo } from 'react'

import { Box, Typography } from '@material-ui/core'
import Button from '../Button'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'
import { CSVLink } from 'react-csv'

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

const ActionBar = ({ selected, actions = [], enableExport, flatHeaders }) => {
    const classes = useStyles()
    const selectionActive = selected.length > 0

    const _actions = useMemo(() => {
        let base = [...actions]
        if (enableExport) {
            base = base.concat({
                key: 'export',
                label: (
                    <CSVLink
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        data={selected.map(item => item.values)}
                        filename="export.csv"
                        headers={flatHeaders
                            .map(header => {
                                if (typeof header.Header === 'string') {
                                    return {
                                        label: header.Header,
                                        key: header.id,
                                    }
                                }
                                // Not a proper header, filter it out
                                return false
                            })
                            .filter(item => item)}
                    >
                        Export selected
                    </CSVLink>
                ),
                action: () => {},
            })
        }
        return base
    }, [actions, enableExport, flatHeaders, selected])

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
                <>
                    {_actions.map(action => (
                        <Box key={action.key} mr={1} mt={1}>
                            <Button
                                onClick={action.action.bind(null, selected)}
                                size="small"
                                variant="outlined"
                            >
                                {action.label}
                            </Button>
                        </Box>
                    ))}
                </>
            </Box>
        </motion.div>
    )
}

export default ActionBar

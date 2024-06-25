import React, { useState, useCallback } from 'react'
import {
    Box,
    Grid,
    CircularProgress,
    ButtonBase,
    Typography,
    Popover,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Button from 'components/generic/Button'
import BlockExitIfDirty from 'components/inputs/BlockExitIfDirty/index'
import { isArray } from 'lodash-es'
import clsx from 'clsx'

const BottomBar = ({
    errors,
    dirty,
    onSubmit,
    loading,
    submitLabel = 'Save Changes',
    loadingText = '',
}) => {
    const hasErrors = Object.keys(errors).length > 0
    const [showErrors, setShowErrors] = useState(false)

    const handleShowErrors = useCallback(() => {
        setShowErrors(true)
    }, [])

    const handleHideErrors = useCallback(() => {
        setShowErrors(false)
    }, [])

    const renderErrorsButton = () => (
        <ButtonBase className="p-2" onClick={handleShowErrors}>
            <Typography variant="button" className="text-white">
                {Object.keys(errors).length} errors
            </Typography>
            <Box mr={1} />
            <ErrorOutlineIcon className="text-white" />
        </ButtonBase>
    )

    return (
        <>
            <Box
                className={clsx(
                    'fixed transition-all duration-300 flex flex-row justify-end items-center z-50 w-full p-4',
                    dirty ? 'bottom-0' : '-bottom-24',
                    hasErrors ? 'bg-red-500' : 'bg-blue-500',
                )}
            >
                {loading && (
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography className="font-bold text-white inline-block mr-4 text-lg">
                                {loadingText}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <CircularProgress
                                className="text-white m-2 p-1"
                                size={24}
                            />
                        </Grid>
                    </Grid>
                )}
                {dirty && !hasErrors && (
                    <Button
                        color="theme_white"
                        variant="contained"
                        onClick={onSubmit}
                        disabled={loading}
                    >
                        {submitLabel}
                    </Button>
                )}
                {!loading && hasErrors && renderErrorsButton()}
            </Box>
            {dirty && <BlockExitIfDirty dirty={dirty} />}
            <Popover
                open={showErrors}
                onClose={handleHideErrors}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <List>
                    {Object.keys(errors).map(field => {
                        const errorMsg = errors[field]

                        if (typeof errorMsg === 'string') {
                            return (
                                <ListItem divider key={field}>
                                    <ListItemText primary={errorMsg} />
                                </ListItem>
                            )
                        } else if (isArray(errorMsg)) {
                            if (showErrors)
                                console.info(`${field} errors`, errorMsg)
                            return (
                                <ListItem divider key={field}>
                                    <ListItemText
                                        primary={`Multiple errors in ${field}`}
                                    />
                                </ListItem>
                            )
                        } else {
                            return Object.keys(errorMsg).map(key => (
                                <ListItem divider key={key}>
                                    <ListItemText primary={errorMsg[key]} />
                                </ListItem>
                            ))
                        }
                    })}
                </List>
            </Popover>
        </>
    )
}

export default BottomBar

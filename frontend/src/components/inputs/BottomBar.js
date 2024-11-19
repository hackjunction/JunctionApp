import React, { useState, useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
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
} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

import Button from 'components/generic/Button'
import BlockExitIfDirty from 'components/inputs/BlockExitIfDirty/index'
import { isArray } from 'lodash-es'

const useStyles = makeStyles(theme => ({
    wrapper: ({ dirty, hasErrors }) => ({
        position: 'fixed',
        transition: 'all 0.33s ease',
        bottom: dirty ? 0 : '-100px',
        right: 0,
        width: '100%',
        padding: theme.spacing(2),
        background: hasErrors
            ? theme.palette.error.main
            : theme.palette.primary.main,
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            paddingLeft: 300 + theme.spacing(2),
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 500,
    }),
    saveButton: {
        transition: 'all 0.2s ease',
        background: 'white',
        color: theme.palette.text.primary,
        '&:hover': {
            background: 'white',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    loader: {
        margin: '10px',
        padding: '5px',
        color: 'white',
        size: '10px',
    },
    loadingText: {
        fontWeight: 'bold',
        display: 'inlineBlock',
        margin: '10px',
        color: 'white',
        size: '24px',
    },
    errorButton: {
        padding: theme.spacing(1),
    },
}))

const BottomBar = ({
    errors,
    dirty,
    onSubmit,
    loading,
    submitLabel = 'Save Changes',
    loadingText = '',
}) => {
    const hasErrors = Object.keys(errors).length > 0
    const classes = useStyles({ dirty, hasErrors })
    const [showErrors, setShowErrors] = useState(false)

    const handleShowErrors = useCallback(e => {
        setShowErrors(true)
    }, [])

    const handleHideErrors = useCallback(() => {
        setShowErrors(false)
    }, [])

    const renderErrorsButton = () => {
        return (
            <ButtonBase
                className={classes.errorButton}
                onClick={handleShowErrors}
            >
                <Typography variant="button" style={{ color: 'white' }}>
                    {Object.keys(errors).length} errors
                </Typography>
                <Box mr={1} />
                <ErrorOutlineIcon style={{ color: 'white' }} />
            </ButtonBase>
        )
    }

    return (
        <>
            <Box className={classes.wrapper}>
                {loading && ( //TODO: fix the looks
                    <Grid container spacing={6}>
                        <Grid item xs={8}>
                            <Typography className={classes.loadingText}>
                                {loadingText}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <CircularProgress className={classes.loader} />
                        </Grid>
                    </Grid>
                )}
                {dirty && !hasErrors && (
                    <Button
                        id={'save-button'}
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
                            // TODO: improve
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

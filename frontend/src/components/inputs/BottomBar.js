import React, { useState, useCallback } from 'react'
import {
    Box,
    Grid2 as Grid,
    CircularProgress,
    ButtonBase,
    Typography,
    Popover,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { styled } from '@mui/material/styles'
import { isArray } from 'lodash-es'

import Button from 'components/generic/Button'
import BlockExitIfDirty from 'components/inputs/BlockExitIfDirty/index'

const SIDEBAR_WIDTH = '300px'

const Wrapper = styled(Box)(({ theme, dirty, hasErrors }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: hasErrors
        ? theme.palette.error.main
        : theme.palette.primary.main,
    padding: '1rem',
    [theme.breakpoints.up('md')]: {
        paddingLeft: `calc(${SIDEBAR_WIDTH} + 1rem)`,
    },
    position: 'fixed',
    transition: 'bottom 0.33s ease',
    width: '100%',
    bottom: dirty ? 0 : '-100px',
    right: 0,
    zIndex: 500,
    color: 'white',
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
    const [showErrors, setShowErrors] = useState(false)

    const handleShowErrors = useCallback(() => {
        setShowErrors(true)
    }, [])

    const handleHideErrors = useCallback(() => {
        setShowErrors(false)
    }, [])

    const renderErrorsButton = () => (
        <ButtonBase sx={{ padding: '8px' }} onClick={handleShowErrors}>
            <Typography sx={{ textTransform: 'uppercase', mr: 1 }}>
                {Object.keys(errors).length} errors
            </Typography>
            <ErrorOutlineIcon />
        </ButtonBase>
    )

    return (
        <>
            <Wrapper dirty={dirty} hasErrors={hasErrors}>
                {loading && (
                    <Grid
                        container
                        spacing={2}
                        sx={{ alignItems: 'center', width: '100%', mr: '1rem' }}
                    >
                        <Grid size={{ xs: 10, sm: 11 }}>
                            <Typography
                                sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
                            >
                                {loadingText}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 2, sm: 1 }}>
                            <CircularProgress
                                size={24}
                                sx={{ color: 'inherit' }}
                            />
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
            </Wrapper>
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

import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Popper, Paper, Typography, Box } from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CloseIcon from '@material-ui/icons/Close'

import MiscUtils from 'utils/misc'

const useStyles = makeStyles(theme => ({
    errorButton: ({ hasErrors }) => ({
        transition: 'all 0.2s ease',
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        fontSize: hasErrors ? 30 : 0,
    }),
    errorsBox: {
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        top: '-50px',
    },
    errorsBoxTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.error.main,
        padding: theme.spacing(1),
    },
    errorsBoxTitle: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    errorsBoxClose: {
        color: 'white',
        fontSize: 24,
    },
    errorIcon: {
        color: theme.palette.error.main,
        fontSize: 'inherit',
    },
    errorsBoxContent: {
        maxHeight: '200px',
        overflow: 'auto',
    },
    popper: {
        zIndex: 1000,
        padding: theme.spacing(2),
    },
}))

const ErrorDisplay = React.memo(({ errors = {} }) => {
    const hasErrors = Object.keys(errors).length > 0
    const classes = useStyles({ hasErrors })
    const [popperOpen, setPopperOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpen = event => {
        setAnchorEl(event.currentTarget)
        setPopperOpen(true)
    }

    return (
        <React.Fragment>
            <IconButton
                aria-label="errors"
                className={classes.errorButton}
                size="small"
                onClick={handleOpen}
            >
                <ErrorOutlineIcon className={classes.errorIcon} />
            </IconButton>
            <Popper
                className={classes.popper}
                open={popperOpen}
                placement="top"
                disablePortal={false}
                anchorEl={anchorEl}
                modifiers={{
                    flip: {
                        enabled: false,
                    },
                    preventOverflow: {
                        enabled: false,
                        boundariesElement: 'scrollParent',
                    },
                    arrow: {
                        enabled: true,
                    },
                }}
            >
                <Paper className={classes.errorsBox}>
                    <Box className={classes.errorsBoxTop}>
                        <Typography
                            variant="overline"
                            className={classes.errorsBoxTitle}
                        >
                            Please check these fields:
                        </Typography>
                        <IconButton
                            aria-label="close-errors"
                            size="small"
                            onClick={() => setPopperOpen(false)}
                        >
                            <CloseIcon className={classes.errorsBoxClose} />
                        </IconButton>
                    </Box>
                    <Box className={classes.errorsBoxContent} p={1}>
                        <ul>
                            {MiscUtils.parseFormikErrors(errors).map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </Box>
                </Paper>
            </Popper>
        </React.Fragment>
    )
})

export default ErrorDisplay

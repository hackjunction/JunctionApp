import React from 'react'

import HyperModal from 'react-hyper-modal'
import clsx from 'clsx'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        zIndex: 2000,
    },
    wrapperPadded: {
        padding: theme.spacing(2),
    },
    content: {
        background: '#ffffff',
        width: '100% !important',
        maxWidth: '600px',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    contentMed: {
        maxWidth: '900px',
    },
    contentMax: {
        maxWidth: 'none',
        height: '100% !important',
        borderRadius: '0 !important',
    },
    header: {
        padding: theme.spacing(3),
        textAlign: 'center',
    },
    inner: {
        padding: '1rem',
        flex: 1,
        overflow: 'auto',
    },
}))

const GenericModal = ({
    title,
    isOpen,
    handleClose,
    size,
    children,
    footer = null,
}) => {
    const classes = useStyles()
    return (
        <HyperModal
            isOpen={isOpen}
            requestClose={handleClose}
            classes={{
                contentClassName: clsx({
                    [classes.content]: true,
                    [classes.contentMed]: size === 'med',
                    [classes.contentMax]: size === 'max',
                }),
                wrapperClassName: clsx({
                    [classes.wrapper]: true,
                    [classes.wrapperPadded]: size !== 'max',
                }),
            }}
        >
            {title && (
                <Box className={classes.header}>
                    <Typography variant="h6">{title}</Typography>
                </Box>
            )}
            <Box className={classes.inner}>{children}</Box>
            {footer}
        </HyperModal>
    )
}

export default GenericModal

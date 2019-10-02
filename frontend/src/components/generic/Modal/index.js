import React from 'react';

import HyperModal from 'react-hyper-modal';
import classNames from 'classnames';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        zIndex: 100
    },
    wrapperPadded: {
        padding: theme.spacing(2)
    },
    content: {
        background: '#ffffff',
        width: '100% !important',
        maxWidth: '600px',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    contentMed: {
        maxWidth: '900px'
    },
    contentMax: {
        maxWidth: 'none',
        height: '100% !important',
        borderRadius: '0 !important'
    },
    header: {
        padding: theme.spacing(3),
        textAlign: 'left'
    },
    inner: {
        padding: '1rem',
        flex: 1,
        overflow: 'auto'
    }
}));

const GenericModal = ({ title, isOpen, handleClose, size, children }) => {
    const classes = useStyles();
    return (
        <HyperModal
            isOpen={isOpen}
            requestClose={handleClose}
            classes={{
                contentClassName: classNames({
                    [classes.content]: true,
                    [classes.contentMed]: size === 'med',
                    [classes.contentMax]: size === 'max'
                }),
                wrapperClassName: classNames({
                    [classes.wrapper]: true,
                    [classes.wrapperPadded]: size !== 'max'
                })
            }}
        >
            <Box className={classes.header}>
                <Typography variant="button">{title}</Typography>
            </Box>
            <Box className={classes.inner}>{children}</Box>
        </HyperModal>
    );
};

export default GenericModal;

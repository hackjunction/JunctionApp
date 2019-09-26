import React, { useState, useCallback } from 'react';

import HyperModal from 'react-hyper-modal';
import classNames from 'classnames';
import { Modal, Backdrop, Paper, Box, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import theme from 'material-ui-theme';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        zIndex: 1000000
    },
    wrapperPadded: {
        padding: theme.spacing(2)
    },
    content: {
        background: '#ffffff',
        width: '100% !important',
        maxWidth: '600px',
        zIndex: 100000,
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    inner: {
        paddingTop: '100px',
        paddingLeft: '1rem',
        paddingRight: '1rem',
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
            // isFullscreen={true}
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

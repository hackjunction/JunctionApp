import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';

import Button from 'components/generic/Button';
import BlockExitIfDirty from 'components/inputs/BlockExitIfDirty/index';

const useStyles = makeStyles(theme => ({
    wrapper: ({ dirty }) => ({
        position: 'fixed',
        transition: 'all 0.33s ease',
        bottom: dirty ? 0 : '-100px',
        right: 0,
        width: '100%',
        padding: theme.spacing(2),
        background: theme.palette.primary.main,
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            paddingLeft: 300 + theme.spacing(2)
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 3000
    }),
    saveButton: {
        transition: 'all 0.2s ease',
        background: 'white',
        color: theme.palette.text.primary,
        '&:hover': {
            background: 'white',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    }
}));

const BottomBar = ({ errors, dirty, onSubmit, loading }) => {
    const classes = useStyles({ dirty });
    return (
        <React.Fragment>
            <Box className={classes.wrapper}>
                {loading || !dirty ? (
                    <CircularProgress size={24} style={{ color: 'white' }} />
                ) : (
                    <Button color="theme_white" variant="contained" onClick={onSubmit}>
                        Save changes
                    </Button>
                )}
            </Box>
            {dirty && <BlockExitIfDirty dirty={dirty} />}
        </React.Fragment>
    );
};

export default BottomBar;

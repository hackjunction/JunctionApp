import React, { useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

const useStyles = makeStyles(theme => ({
    wrapper: ({ active, completed }) => ({
        transition: 'opacity 0.2s ease',
        opacity: !active && !completed ? 0 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2)
    }),
    label: {
        color: 'white',
        fontSize: '1.4rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    backButton: ({ completed }) => {
        const style = {
            transition: 'all 0.5s ease',
            overflow: 'hidden',
            maxWidth: 200,
            color: 'white'
        };

        if (completed) {
            style.maxWidth = 0;
            style.minWidth = 0;
            style.padding = 0;
            style.opacity = 0;
        }

        return style;
    },
    left: ({ completed }) => ({
        transition: 'all 0.5s ease',
        flex: completed ? 0 : 1
    }),
    check: ({ completed }) => ({
        color: 'white',
        fontSize: completed ? '1.8rem' : 0,
        transition: 'fontSize 0.2s bounce',
        marginRight: '4px'
    }),
    center: {
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    right: {
        transition: 'all 0.5s ease',
        flex: 1
    }
}));

const RegistrationSectionLabel = ({ label, previousLabel, onPrevious, active, completed }) => {
    const classes = useStyles({ active, completed });
    const mainRef = useRef(null);

    useEffect(() => {
        if (active && mainRef) {
            setTimeout(function() {
                if (!previousLabel) {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: mainRef.current.offsetTop - 100, left: 0, behaviour: 'smooth' });
                }
            }, 500);
        }
    }, [active, previousLabel]);

    return (
        <Box ref={mainRef} className={classes.wrapper}>
            <Box className={classes.left}>
                {previousLabel && onPrevious && (
                    <Button onClick={onPrevious} className={classes.backButton}>
                        <ArrowBackIcon /> Back
                    </Button>
                )}
            </Box>
            <Box className={classes.center}>
                <CheckCircleOutlineOutlinedIcon className={classes.check} />
                <Typography className={classes.label} variant="subtitle1">
                    {label}
                </Typography>
            </Box>
            <Box className={classes.right}></Box>
        </Box>
    );
};

export default RegistrationSectionLabel;

import React from 'react';

import { makeStyles, lighten } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: ({ color, radius }) => {
        const _color = theme.palette[color];
        const bg = `linear-gradient(145deg, ${_color.main} 0%, ${_color.dark} 100%)`;
        const bgHover = `linear-gradient(145deg, ${lighten(_color.main, 0.2)} 0%, ${lighten(_color.dark, 0.2)} 100%)`;

        return {
            background: bg,
            borderRadius: radius || '13px',
            color: _color.contrastText,
            boxShadow: '0px 3px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.33s ease',
            '&:hover': {
                background: bgHover,
                cursor: 'pointer'
            }
            // transitionDuration: '2s',
            // transitionProperty: 'all',
            // transitionTimingFunction: 'ease'
        };
    }
}));

const GradientBox = ({ color, radius, children, ...boxProps }) => {
    const classes = useStyles({ color, radius });
    return (
        <Box {...boxProps} className={classes.root}>
            {children}
        </Box>
    );
};

export default GradientBox;

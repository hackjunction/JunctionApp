import React from 'react';

import { Box, Typography, ButtonBase, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Button from 'components/generic/Button';

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: '1rem',
        marginBottom: '1rem'
    },
    toggleButton: ({ active }) => ({
        background: '#ffffff',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: active ? '1px solid #000000' : '1px solid #DBDBDB',
        borderRadius: '4px',
        height: '28px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }),
    buttonLabel: {
        fontSize: '14px',
        marginLeft: '1rem'
    },
    buttonIcon: {
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        fontSize: '22px'
    }
}));

const FilterItem = ({ label, active, children, onClose = () => {}, onSubmit = () => {} }) => {
    const classes = useStyles({ active });
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        onClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div className={classes.root}>
            <ButtonBase
                className={classes.toggleButton}
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
            >
                <Typography variant="body1" className={classes.buttonLabel}>
                    {label}
                </Typography>
                <KeyboardArrowDownIcon className={classes.buttonIcon} />
            </ButtonBase>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <Box p={1}>{children}</Box>
                <Box p={1} display="flex" flexDirection="row" justifyContent="flex-end">
                    <Button color="primary" variant="contained" size="small">
                        Save filters
                    </Button>
                </Box>
            </Popover>
        </div>
    );
};

export default FilterItem;

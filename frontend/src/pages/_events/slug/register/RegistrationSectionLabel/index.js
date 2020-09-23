import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, Button } from '@material-ui/core'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'

const useStyles = makeStyles(theme => ({
    wrapper: ({ active, completed, isVisible }) => ({
        transition: 'all 0.25s ease',
        opacity: !active && !completed ? 0 : 1,
        alignItems: 'center',
        justifyContent: completed ? 'flex-start' : 'center',
        flexDirection: 'row',
        padding: completed ? 0 : theme.spacing(2),
        display: isVisible ? 'flex' : 'none',
    }),
    label: ({ completed }) => ({
        color: 'white',
        fontSize: completed ? '0.75rem' : '1.4rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
    }),
    backButton: ({ completed }) => {
        const style = {
            transition: 'all 0.5s ease',
            overflow: 'hidden',
            maxWidth: 200,
            color: 'white',
        }

        if (completed) {
            style.maxWidth = 0
            style.minWidth = 0
            style.padding = 0
            style.opacity = 0
        }

        return style
    },
    left: ({ completed }) => ({
        transition: 'all 0.25s ease',
        flex: completed ? 0 : 1,
    }),
    check: ({ completed }) => ({
        color: 'white',
        fontSize: completed ? '1.4rem' : 0,
        transition: 'fontSize 0.2s bounce',
        marginRight: '4px',
    }),
    center: {
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    right: {
        transition: 'all 0.25s ease',
        flex: 1,
    },
}))

const RegistrationSectionLabel = ({
    label,
    active,
    completed,
    onClick,
    isVisible,
}) => {
    const classes = useStyles({ active, completed, isVisible })

    return (
        <Box className={classes.wrapper}>
            <CheckCircleOutlineOutlinedIcon className={classes.check} />
            <Button disabled={active} onClick={onClick}>
                <Typography className={classes.label} variant="subtitle1">
                    {label}
                </Typography>
            </Button>
        </Box>
    )
}

export default RegistrationSectionLabel

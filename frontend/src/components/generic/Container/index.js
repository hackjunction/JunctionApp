import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: theme.spacing(0, 2),
    },
    inner: {
        margin: '0 auto',
        width: '100%',
        maxWidth: '1120px',
    },
    small: {
        width: '60%',
        [theme.breakpoints.down('md')]: {
            width: '80%',
        },
    },
    center: {
        textAlign: 'center',
    },
}))

export default ({
    wrapperClass = null,
    className = null,
    small = false,
    center = false,
    children,
}) => {
    const classes = useStyles()
    return (
        <div
            className={clsx({
                [classes.wrapper]: true,
                [wrapperClass]: typeof wrapperClass !== 'undefined',
            })}
        >
            <div
                className={clsx({
                    [classes.inner]: true,
                    [classes.small]: small,
                    [classes.center]: center,
                    [className]: typeof className !== 'undefined',
                })}
            >
                {children}
            </div>
        </div>
    )
}

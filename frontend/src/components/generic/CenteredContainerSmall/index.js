import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: theme.spacing(0, 2),
    },
    inner: {
        margin: '0 auto',
        width: '60%',
        maxWidth: '1120px',
        textAlign: 'center',
    },
}))

export default ({ wrapperClass, className, children }) => {
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
                    [className]: typeof className !== 'undefined',
                })}
            >
                {children}
            </div>
        </div>
    )
}

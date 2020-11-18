import React from 'react'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        padding: 0,
        background: 'black',
    },
    backgroundImage: ({ backgroundOpacity }) => ({
        zIndex: 2,
        position: 'absolute',
        objectFit: 'cover',
        objectPosition: 'center',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        filter: 'blur(5px)',
        opacity: backgroundOpacity,
    }),
    inner: {
        position: 'absolute',
        zIndex: 3,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        overflowY: 'scroll',
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(5),
        },
    },
}))

export default ({ background, backgroundOpacity = 1, children }) => {
    const classes = useStyles({ backgroundOpacity })
    return (
        <div className={classes.wrapper}>
            {background && (
                <img
                    className={classes.backgroundImage}
                    src={background}
                    alt="Background"
                />
            )}
            <div className={classes.inner}>{children}</div>
        </div>
    )
}

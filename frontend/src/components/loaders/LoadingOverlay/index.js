import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import GlitchLoader from 'components/loaders/GlitchLoader'

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#001d24',
        backgroundImage:
            'linear-gradient(rgba(77, 255, 209, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(77, 255, 209, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: 1000,
        padding: theme.spacing(5),
    },
}))

const LoadingOverlay = ({ text }) => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <GlitchLoader title={text} size={200} />
        </div>
    )
}

export default LoadingOverlay

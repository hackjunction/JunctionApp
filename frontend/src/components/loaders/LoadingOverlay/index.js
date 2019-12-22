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
        background: 'black',
        zIndex: 1000,
        padding: theme.spacing(5),
    },
    backgroundImage: {
        position: 'absolute',
        objectFit: 'cover',
        objectPosition: 'center',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        filter: 'blur(5px)',
        opacity: 0.5,
    },
}))

const LoadingOverlay = ({ text }) => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <img
                className={classes.backgroundImage}
                src={require('assets/images/default_cover_image.png')}
                alt="background"
            />
            <GlitchLoader title={text} size={200} />
        </div>
    )
}

export default LoadingOverlay

import React from 'react'

import { useDispatch } from 'react-redux'
import { goBack } from 'connected-react-router'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Button, Typography } from '@material-ui/core'
import Image from 'components/generic/Image'
import FadeInWrapper from 'components/animated/FadeInWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '200px',
        width: '100%',
        position: 'relative',
        background: 'black',
        [theme.breakpoints.up('sm')]: {
            height: '300px',
        },
    },
    backButtonWrapper: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        paddingTop: theme.spacing(1),
    },
    logoWrapper: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.75rem',
        },
    },
    overline: {
        color: 'white',
        fontSize: '1.25rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
        },
    },
    image: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}))

export default ({ event, title, subheading, onBack }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    return (
        <Box className={classes.wrapper}>
            <Image
                className={classes.image}
                publicId={event?.coverImage?.publicId}
                defaultImage={require('assets/images/default_cover_image.png')}
                transformation={{
                    width: 1440,
                    height: 300,
                }}
            />
            <Box className={classes.logoWrapper}>
                <FadeInWrapper enterDelay={0.3} verticalOffset={50}>
                    <Box
                        p={3}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            className={classes.overline}
                            variant="button"
                        >
                            {event?._eventTimeFormatted}
                        </Typography>
                        <Typography className={classes.title} variant="h3">
                            {title ?? event?.name}
                        </Typography>
                        <Typography className={classes.title} variant="h4">
                            {subheading}
                        </Typography>

                        <Typography
                            className={classes.overline}
                            variant="button"
                        >
                            {event?._eventLocationFormatted}
                        </Typography>
                    </Box>
                </FadeInWrapper>
            </Box>
            <CenteredContainer wrapperClass={classes.backButtonWrapper}>
                <Button
                    onClick={
                        typeof onBack === 'function'
                            ? onBack
                            : () => dispatch(goBack())
                    }
                >
                    <ArrowBackIosIcon style={{ color: 'white' }} />
                    <Typography variant="button" style={{ color: 'white' }}>
                        Back
                    </Typography>
                </Button>
            </CenteredContainer>
        </Box>
    )
}

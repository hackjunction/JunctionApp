import React from 'react'

import { useDispatch } from 'react-redux'
import { goBack } from 'connected-react-router'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Button, Typography } from '@material-ui/core'
import Image from 'components/generic/Image'
import FadeInWrapper from 'components/animated/FadeInWrapper'
import Container from 'components/generic/Container'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        overflow: 'hidden',
    },
    image: {
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '465px',
        objectFit: 'cover',
    },
    backButtonWrapper: {
        position: 'absolute',
        zIndex: 10,
        width: 'auto',
        paddingTop: theme.spacing(3),
    },
    buttonInner: {
        color: 'black',
        background: 'white',
        zIndex: 2,
        border: 'none',
        width: '100%',
        '&:hover': {
            opacity: '70%',
        },
        borderRadius: '10px',
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
}))

export default ({ event, title = '', subheading = '', onBack }) => {
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
                    height: 465,
                }}
            />
            {/* <Box className={classes.logoWrapper}>
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
            </Box> */}
            <Container
                wrapperClass={classes.backButtonWrapper}
                className={classes.buttonInner}
            >
                <Button
                    onClick={
                        typeof onBack === 'function'
                            ? onBack
                            : () => dispatch(goBack())
                    }
                >
                    <ArrowBackIosIcon style={{ color: 'black' }} />
                    <Typography variant="button" style={{ color: 'black' }}>
                        Back
                    </Typography>
                </Button>
            </Container>
        </Box>
    )
}

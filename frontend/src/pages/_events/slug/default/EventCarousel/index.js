import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Button from 'components/generic/Button'
import EventImage from 'components/generic/EventImage'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const useStyles = makeStyles(theme => ({
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
        objectFit: 'cover',
    },
    placeholderTop: {
        background: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderImage: {
        width: '100%',
        objectFit: 'cover',
    },
    margin: {
        marginTop: theme.spacing(15),
    },
}))

const buttons = [
    {
        text: 'Create An Event',
    },
    {
        text: 'Create An Event',
    },
]

const EventCarousel = ({ event }) => {
    const classes = useStyles()
    console.log('buttons :>> ', buttons)
    console.log('event :>> ', event)
    const [index, setIndex] = useState(0)
    return (
        <Box style={{ position: 'relative' }} className={classes.margin}>
            <AutoPlaySwipeableViews
                enableMouseEvents
                index={index}
                onChangeIndex={setIndex}
            >
                <Box className={classes.placeholderTop}>
                    <EventImage
                        className={classes.placeholderImage}
                        // publicId={event?.coverImage?.logo}
                        defaultImage={require('assets/images/default_cover_image.png')}
                        transformation={{
                            width: 1440,
                            height: 465,
                        }}
                        buttons={buttons}
                    />
                </Box>
            </AutoPlaySwipeableViews>
        </Box>
    )
}

export default EventCarousel

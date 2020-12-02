import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Button from 'components/generic/Button'
import EventImage from 'components/generic/EventImage'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import BannerService from 'services/banner'
import { useEffect } from 'react'
import Pagination from '../../projects/ProjectDetail/Pagination'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const useStyles = makeStyles(theme => ({
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
        objectFit: 'contain',
    },
    placeholderTop: {
        background: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '465px',
    },
    placeholderImage: {
        width: '100%',
        maxHeight: '465px',
        objectFit: 'contain',
        maxWidth: '1440px',
    },
    margin: {
        marginTop: theme.spacing(0),
    },
    backButtonWrapper: {
        background: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    top: {
        // width: '100%',
        // paddingTop: '50%',
        // position: 'relative',
        // overflow: 'hidden',
        // background: 'black',
        [theme.breakpoints.up('lg')]: {
            paddingTop: theme.breakpoints.values.lg / 2,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))

const BannerCarousel = (event = null) => {
    const classes = useStyles()
    //TODO in case event is provided, display event pic
    const [pictures, setPictures] = useState()

    useEffect(() => {
        BannerService.getAllBanners().then(banners => {
            if (banners) setPictures(banners)
        })
    }, [])
    console.log('pictures :>> ', pictures)
    const [index, setIndex] = useState(0)

    return (
        <>
            <Box style={{ position: 'relative' }} className={classes.margin}>
                <AutoPlaySwipeableViews
                    enableMouseEvents
                    index={index}
                    onChangeIndex={setIndex}
                    interval="5000"
                    disabled
                >
                    {pictures?.map(picture => {
                        return (
                            <Box
                                key={picture?.publicId}
                                className={classes.placeholderTop}
                            >
                                <EventImage
                                    className={classes.placeholderImage}
                                    publicId={picture?.icon}
                                    defaultImage={require('assets/images/default_cover_image.png')}
                                    transformation={{
                                        width: 1440,
                                        height: 465,
                                    }}
                                    buttons={picture?.buttons}
                                />
                            </Box>
                        )
                    })}
                </AutoPlaySwipeableViews>
            </Box>
        </>
    )
}

export default BannerCarousel

import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import EventImage from 'components/generic/EventImage'
import React, { useState } from 'react'
import { SwipeableViews } from 'components/animated/SwipeableViews'
import BannerService from 'services/banner'
import { useEffect } from 'react'

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
        height: '100%',
        maxHeight: '465px',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        maxHeight: '465px',
        objectFit: 'scale-down',
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
    const [pictures, setPictures] = useState([])

    useEffect(() => {
        BannerService.getAllBanners().then(banners => {
            if (banners) setPictures(banners)
        })
    }, [])
    const [index, setIndex] = useState(0)
    console.log('pictures', pictures)
    return (
        <>
            <Box style={{ position: 'relative' }} className={classes.margin}>
                <SwipeableViews
                    enableMouseEvents
                    index={index}
                    onChangeIndex={setIndex}
                    interval={5000}
                    disabled
                >
                    {pictures?.map(picture => {
                        return (
                            <Box
                                key={picture._id}
                                className={classes.placeholderTop}
                            >
                                <EventImage
                                    className={classes.placeholderImage}
                                    publicId={picture.icon}
                                    defaultImage={require('assets/images/default_cover_image.png')}
                                    transformation={{
                                        width: 1440,
                                        height: 465,
                                    }}
                                    buttons={picture.buttons}
                                />
                            </Box>
                        )
                    })}
                </SwipeableViews>
            </Box>
        </>
    )
}

export default BannerCarousel

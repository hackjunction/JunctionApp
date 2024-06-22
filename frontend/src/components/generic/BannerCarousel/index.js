import { Box } from '@mui/material'
import EventImage from 'components/generic/EventImage'
import React, { useState, useEffect } from 'react'
import { SwipeableViews } from 'components/animated/SwipeableViews'
import BannerService from 'services/banner'

const BannerCarousel = (event = null) => {
    const [pictures, setPictures] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        BannerService.getAllBanners().then(banners => {
            if (banners) setPictures(banners)
        })
    }, [])

    return (
        <>
            <Box className="relative mt-0">
                <SwipeableViews
                    enableMouseEvents
                    index={index}
                    onChangeIndex={setIndex}
                    interval={5000}
                    disabled
                >
                    {pictures?.map(picture => (
                        <Box
                            key={picture._id}
                            className="bg-black flex flex-col items-center justify-center h-full max-h-[465px]"
                        >
                            <EventImage
                                className="w-full h-full max-h-[465px] object-contain max-w-[1440px]"
                                publicId={picture.icon}
                                defaultImage={require('assets/images/default_cover_image.png')}
                                transformation={{
                                    width: 1440,
                                    height: 465,
                                }}
                                buttons={picture.buttons}
                            />
                        </Box>
                    ))}
                </SwipeableViews>
            </Box>
        </>
    )
}

export default BannerCarousel

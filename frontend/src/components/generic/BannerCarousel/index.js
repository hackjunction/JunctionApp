import React, { useState, useEffect } from 'react'

import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import Image from 'components/generic/Image'
import BannerService from 'services/banner'

const Banner = styled(Box)({
    maxHeight: '465px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
})

// This used to have SwipeableViews, that's why it's called a carousel
const BannerCarousel = () => {
    const [pictures, setPictures] = useState([])

    useEffect(() => {
        BannerService.getAllBanners().then(banners => {
            if (banners) setPictures(banners)
        })
    }, [])
    return (
        <Banner>
            {pictures?.map(picture => (
                <Image
                    publicId={picture.icon}
                    defaultImage={require('assets/images/default_cover_image.png')}
                    key={picture._id}
                />
            ))}
        </Banner>
    )
}

export default BannerCarousel

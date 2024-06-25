import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button, Typography } from '@mui/material'
import Image from 'components/generic/Image'
import Container from 'components/generic/Container'

export default ({
    event,
    title = '',
    subheading = '',
    onBack,
    backgroundColor,
    alignRight,
}) => {
    return (
        <Box className={`relative ${backgroundColor ?? ''} pt-2`}>
            <Container>
                <Grid container>
                    {alignRight && <Grid item xs={12} md={4} />}
                    <Grid
                        item
                        xs={12}
                        md={alignRight ? 8 : 12}
                        className="flex"
                    >
                        <Image
                            className="z-1 top-0 left-0 object-cover aspect-[16/9] max-h-[500px] rounded-[6px] m-auto shadow-[2px_7px_15px_rgba(0,0,0,0.12)]"
                            publicId={event?.coverImage?.publicId}
                            defaultImage={require('assets/images/default_cover_image.png')}
                            transformation={{
                                width: 1920,
                                height: 1080,
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* <Box className="absolute z-2 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex flex-col justify-center">
                <FadeInWrapper enterDelay={0.3} verticalOffset={50}>
                    <Box
                        p={3}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            className="text-white text-xl md:text-base"
                            variant="button"
                        >
                            {event?._eventTimeFormatted}
                        </Typography>
                        <Typography className="text-white md:text-2xl text-3xl" variant="h3">
                            {title ?? event?.name}
                        </Typography>
                        <Typography className="text-white md:text-2xl text-3xl" variant="h4">
                            {subheading}
                        </Typography>
                        <Typography
                            className="text-white text-xl md:text-base"
                            variant="button"
                        >
                            {event?._eventLocationFormatted}
                        </Typography>
                    </Box>
                </FadeInWrapper>
            </Box> */}
            <Container
                wrapperClass="absolute z-10 pt-3 top-0 left-0 w-auto"
                className="text-black bg-white z-2 border-none w-full hover:opacity-70 rounded-[10px]"
            >
                <Button
                    onClick={
                        typeof onBack === 'function'
                            ? onBack
                            : () => window.history.back()
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

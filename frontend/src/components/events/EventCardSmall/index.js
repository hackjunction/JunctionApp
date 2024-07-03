import React, { useCallback } from 'react'
import { Paper, Grid, Box, Typography } from '@mui/material'
import Image from 'components/generic/Image'

export default ({ event, handleClick }) => {
    const onClick = useCallback(() => {
        handleClick(event)
    }, [event, handleClick])

    return event ? (
        <Paper
            className="rounded-[10px] overflow-hidden shadow-[2px_7px_30px_rgba(0,0,0,0.04)] cursor-pointer relative transition-all duration-200 ease-in-out hover:shadow-[2px_7px_30px_rgba(0,0,0,0.12)]"
            onClick={onClick}
        >
            <Grid container spacing={0}>
                <Grid item xs={12} md={3}>
                    <Image
                        className="object-cover h-full w-full min-h-[130px]"
                        defaultImage={require('assets/images/default_cover_image.png')}
                        publicId={event.coverImage?.publicId}
                        transformation={{
                            width: 400,
                            height: 150,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        p={2}
                    >
                        <Typography variant="button">
                            {event._eventTimeFormatted}
                        </Typography>
                        <Typography variant="h6">{event.name}</Typography>
                        <Typography variant="subtitle1">
                            {event._eventLocationFormatted}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    ) : null
}

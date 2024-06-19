import React, { useCallback } from 'react'

import { makeStyles } from '@mui/styles'
import { Paper, Grid, Box, Typography } from '@mui/material'

import Image from 'components/generic/Image'

const useStyles = makeStyles(theme => ({
    paper: {
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '2px 7px 30px rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s ease',
        '&:hover': {
            boxShadow: '2px 7px 30px rgba(0, 0, 0, 0.12)',
        },
    },
    image: {
        objectFit: 'cover',
        height: '100%',
        width: '100%',
        minHeight: '130px',
    },
}))

export default ({ event, handleClick }) => {
    /*
    if (!event.slug) {
        return 'loading'
    }
    console.log('event is', event)
    */
    const classes = useStyles()

    const onClick = useCallback(() => {
        handleClick(event)
    }, [event, handleClick])

    return event ? (
        <Paper className={classes.paper} onClick={onClick}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={3}>
                    <Image
                        className={classes.image}
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

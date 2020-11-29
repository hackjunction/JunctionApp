import React, { useCallback } from 'react'

import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import Image from 'components/generic/Image'

import { useEventPreview } from 'graphql/queries/events'

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

export default ({ eventId, handleClick }) => {
    // TODO a lot of event?. here due to possibility of null event in test databases.
    // Shouldn't happen in production
    const [event = {}, loading] = useEventPreview(eventId)
    //TODO make sure this never fires
    if (!event) {
        console.log('No event with id ', eventId)
    } else {
        console.log('mem')
    }
    const dispatch = useDispatch()
    const classes = useStyles()

    const onClick = useCallback(() => {
        if (loading) return
        handleClick(event)
    }, [dispatch, event?.slug, loading])

    if (!event && !eventId) {
        return null
    }

    const renderImage = () => {
        if (loading) {
            return (
                <Skeleton
                    className={classes.image}
                    variant="rect"
                    height="100%"
                    width="100%"
                />
            )
        } else {
            return (
                <Image
                    className={classes.image}
                    defaultImage={require('assets/images/default_cover_image.png')}
                    publicId={event?.coverImage?.publicId}
                    transformation={{
                        width: 400,
                        height: 150,
                    }}
                />
            )
        }
    }

    const renderContent = () => {
        if (loading || !event) {
            return (
                <>
                    <Skeleton width="40%" />
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                </>
            )
        } else {
            return (
                <>
                    <Typography variant="button">
                        {event?._eventTimeFormatted}
                    </Typography>
                    <Typography variant="h6">{event.name}</Typography>
                    <Typography variant="subtitle1">
                        {event?._eventLocationFormatted}
                    </Typography>
                </>
            )
        }
    }

    return event ? (
        <Paper className={classes.paper} onClick={onClick}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={3}>
                    {renderImage()}
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        p={2}
                    >
                        {renderContent()}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    ) : null
}

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Image from 'components/generic/Image'
import Button from 'components/generic/Button'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: 'inherit',
        borderRadius: '12px',
        overflow: 'hidden',
        flex: 1,
    },
    top: {
        height: '200px',
        maxWidth: 'min(100%, 400px)',
        aspectRatio: '16/9',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    topWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    topLeft: {
        justifyContent: 'flex-start',
    },

    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '15px',
    },
    organiser: {
        position: 'absolute',
        top: '5%',
        left: '2%',
    },
    bottom: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    bolded: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    uppercase: {
        textTransform: 'uppercase',
    },
}))

const EventCard = ({ event, buttons }) => {//TODO: use neweventcard everywhere
    const dispatch = useDispatch()
    const classes = useStyles()
    const organization = event?.organizations
    // {event.published && !event.approved ? 'Waiting approval' : null}
    return (
        <div className={classes.wrapper}>
            <div className={classes.top}>
                <Image
                    className={classes.image}
                    defaultImage={require('assets/images/default_cover_image.png')}
                    publicId={event?.coverImage?.publicId}
                    transformation={{
                        width: 400,
                    }}
                />
                {organization?.icon && (
                    <Avatar
                        className={classes.organiser}
                        src={organization?.icon}
                    />
                )}
                <Button
                    variant="containedCard"
                    color="theme_lightgray"
                    onClick={() => dispatch(push('/events/' + event.slug))}
                >
                    See more
                </Button>
            </div>
            <div className={classes.bottom}>
                <Box width="100%" height="4em" margin="0">
                    <Typography variant="h6">{event.name}</Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    flexWrap="wrap"
                    justifyContent="center"
                    mt={2}
                    className={classes.uppercase}
                >
                    <Typography variant="body1" className={classes.bolded}>
                        {event?._eventTimeFormatted}
                    </Typography>
                    <Typography variant="body1">
                        {event?._eventLocationFormatted}
                    </Typography>
                    {buttons?.map((btn, index) => (
                        <Box key={index}>{btn}</Box>
                    ))}
                </Box>
            </div>
        </div>
    )
}

export default EventCard

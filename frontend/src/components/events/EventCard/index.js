import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Image from 'components/generic/Image'

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        flex: 1,
    },
    top: {
        height: '148px',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    organizer: {
        position: 'absolute',
        top: '5%',
        left: '2%',
    },
    bottom: {
        padding: theme.spacing(2),
    },
}))

const EventCard = ({ event, organization, buttons }) => {
    const classes = useStyles()
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
                        className={classes.organizer}
                        src={organization?.icon}
                    />
                )}
            </div>
            <div className={classes.bottom}>
                <Typography variant="button">
                    {event?._eventTimeFormatted}
                </Typography>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body1">
                    {event?._eventLocationFormatted}
                </Typography>
                <Box mt={1} />
                <Box display="flex" flexDirection="row" flexWrap="wrap">
                    {buttons?.map((btn, index) => (
                        <Box key={index} mr={1} mb={1}>
                            {btn}
                        </Box>
                    ))}
                </Box>
            </div>
        </div>
    )
}

export default EventCard

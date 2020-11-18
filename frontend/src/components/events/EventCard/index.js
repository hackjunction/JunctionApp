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
    topWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    topLeft: {
        justifyContent: 'flex-start',
    },
    topRight: {
        justifyContent: 'flex-end',
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
}))

const EventCard = ({ event, organization, buttons }) => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <div className={classes.topWrapper}>
                <Typography variant="button" align="left">
                    {event?._eventTimeFormatted}
                </Typography>

                <Typography variant="button" align="right">
                    {event?._eventLocationFormatted}
                </Typography>
            </div>
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
            </div>
            <div className={classes.bottom}>
                <Box width="100%" height="4em" margin="0">
                    <Typography variant="h6">{event.name}</Typography>
                </Box>
                {/* <Box mt={1} /> */}
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="center"
                    m={0}
                >
                    {buttons?.map((btn, index) => (
                        <Box key={index}>{btn}</Box>
                    ))}
                </Box>
            </div>
        </div>
    )
}

export default EventCard

import React from 'react'
import { Box, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Image from 'components/generic/Image'
import Button from 'components/generic/Button'
import { Link } from 'react-router-dom'

const EventCard = ({ event, buttons }) => {
    const organization = event?.organizations

    return (
        <div className="bg-inherit rounded-[12px] overflow-hidden flex-1">
            <div className="h-[200px] max-w-[min(100%,400px)] aspect-[16/9] mx-auto relative flex justify-end items-end">
                <Image
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-[15px]"
                    defaultImage={require('assets/images/default_cover_image.png')}
                    publicId={event?.coverImage?.publicId}
                    transformation={{
                        width: 400,
                    }}
                />
                {organization?.icon && (
                    <Avatar
                        className="absolute top-[5%] left-[2%]"
                        src={organization?.icon}
                    />
                )}
                <Button variant="containedCard" color="theme_lightgray">
                    <Link to={`/events/${event.slug}`}>See more</Link>
                </Button>
            </div>
            <div className="p-4 text-center">
                <Box width="100%" height="4em" margin="0">
                    <Typography variant="h6">{event.name}</Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    flexWrap="wrap"
                    justifyContent="center"
                    mt={2}
                    className="uppercase"
                >
                    <Typography variant="body1" className="font-bold mb-1">
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

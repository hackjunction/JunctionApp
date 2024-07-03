import React, { useState } from 'react'
import { Card, CardContent, CardActions, Typography, Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Image from 'components/generic/Image'
import Markdown from 'components/generic/Markdown'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import * as SnackbarActions from 'reducers/snackbar/actions'
import ProgressBar from 'components/generic/ProgressBar'

const NewEventCard = ({ event, buttons }) => {
    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const organization = event?.organizations

    const styling = {
        cardHover: '',
    }

    if (hover) {
        styling.cardHover = 'cursor-pointer hover:shadow-xl'
    }

    const parseDescription = description => {
        const parsed = description.replace(/#.*\n/g, '')
        return parsed.length > 300 ? parsed.slice(0, 200) + ' &hellip;' : parsed
    }

    if (event === undefined || event === null) {
        dispatch(SnackbarActions.error('some of your events is not defined!'))
        console.log('Event is not defined!')
        return null
    }

    return (
        <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`bg-white m-4 text-left rounded-lg shadow-md min-h-[600px] max-w-xs flex flex-col justify-between ${styling.cardHover}`}
        >
            <CardContent className="flex flex-col p-0">
                <div className="h-40 w-full my-0 mx-auto relative flex justify-end items-end">
                    <Image
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                        defaultImage={require('assets/images/default_cover_image.png')}
                        publicId={event?.coverImage?.publicId}
                        transformation={{
                            width: 400,
                        }}
                    />
                    {organization?.icon && (
                        <Avatar
                            className="absolute top-5 left-2"
                            src={organization?.icon}
                        />
                    )}
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <Typography variant="h4">{event.name}</Typography>
                </div>
                {event?.description && (
                    <div className="p-4 flex flex-col gap-4">
                        <Markdown
                            source={parseDescription(event?.description)}
                        />
                    </div>
                )}
                {event?.startTime && event?.endTime && (
                    <div className="p-4">
                        <ProgressBar
                            start={event?.startTime}
                            end={event?.endTime}
                            current={new Date()}
                            event={event.slug}
                        />
                    </div>
                )}
            </CardContent>
            <CardActions className="flex gap-4 justify-start max-w-full px-4 pb-4 pt-6">
                {buttons?.slice(0, 2).map((btn, index) => {
                    return <Box key={index}>{btn}</Box>
                })}
            </CardActions>
        </Card>
    )
}

export default NewEventCard

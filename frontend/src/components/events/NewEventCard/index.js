import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Image from 'components/generic/Image'
import Markdown from 'components/generic/Markdown'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import * as SnackbarActions from 'redux/snackbar/actions'
import ProgressBar from 'components/generic/ProgressBar'
import CardTag from 'components/generic/CardTag'

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        flex: 1,
    },
    top: {
        height: '150px',
        width: 'min(100%, 400px)',
        aspectRatio: '16/9',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderBottom: `2px ${theme.palette.primary.main} solid`,
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
        borderRadius: '15px 15px 0 0',
    },
    tag: {
        position: 'absolute',
        top: '30%',
        borderRadius: '16px 0 0 16px',
        right: 0,
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

const NewEventCard = ({ event, buttons }) => {
    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const classes = useStyles()
    const organization = event?.organizations
    // {event.published && !event.approved ? 'Waiting approval' : null}

    const styling = {
        cardHover: '',
    }

    if (hover) {
        styling.cardHover = 'tw-cursor-pointer hover:tw-shadow-xl'
    }

    const parseDescription = description => {
        const parsed = description.replace(/#.*\n/g, '')

        return parsed.length > 300 ? parsed.slice(0, 200) + ' &hellip;' : parsed
    }

    if (event === undefined || event === null) {
        dispatch(SnackbarActions.error('some of your events are not defined!'))
        console.log('Event is not defined!')
        return null
    }

    return (
        <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`tw-bg-white tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-min-h-600px tw-max-w-xs tw-flex tw-flex-col tw-justify-between ${styling.cardHover}`}
        >
            <CardContent className="tw-flex tw-flex-col tw-p-0">
                <div className="tw-h-40 tw-w-full tw-my-0 tw-mx-auto tw-relative tw-flex tw-justify-end tw-items-end">
                    <Image
                        className={classes.image}
                        defaultImage={require('assets/images/default_cover_image.png')}
                        publicId={event?.coverImage?.publicId}
                        transformation={{
                            width: 400,
                        }}
                    />
                    {organization?.icon && ( //TODO: Fix
                        <Avatar
                            className={classes.organiser}
                            src={organization?.icon}
                            //src={FlagUK}
                        />
                    )}

                    {/* <CardTag
                        className={classes.tag}
                        variant='outlined'
                        color="secondary"
                        label="Prize: 20 000 $"//TODO: make this dynamic
                    >

                    </CardTag> */}
                </div>
                <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                    <Typography variant="h4">{event.name}</Typography>
                </div>
                {event?.description && (
                    <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                        <Markdown
                            source={parseDescription(event?.description)}
                        />
                    </div>
                )}

                {event?.startTime && event?.endTime && (
                    <div className="tw-p-4">
                        <ProgressBar
                            start={event?.startTime}
                            end={event?.endTime}
                            current={new Date()}
                            event={event.slug}
                        />
                    </div>
                )}
            </CardContent>

            <CardActions className="tw-flex tw-gap-4 tw-justify-start tw-max-w-full tw-px-4 tw-pb-4 tw-pt-6">
                {/* <Button
                    color="theme_lightgray"
                    variant="outlined-small"
                    strong
                    onClick={() =>
                        dispatch(push('/events/' + event.slug))
                    }
                >
                    {t('See_more_')} 
                </Button>*/}

                {buttons?.slice(0, 2).map((btn, index) => {
                    return <Box key={index}>{btn}</Box>
                })}
            </CardActions>
        </Card>
        //     <div className={classes.wrapper}>
        //         <div className={classes.top}>
        //             <Image
        //                 className={classes.image}
        //                 defaultImage={require('assets/images/default_cover_image.png')}
        //                 publicId={event?.coverImage?.publicId}
        //                 transformation={{
        //                     width: 400,
        //                 }}
        //             />
        //             {organization?.icon && (
        //                 <Avatar
        //                     className={classes.organiser}
        //                     src={organization?.icon}
        //                 />
        //             )}
        //             <Button
        //                 variant="containedCard"
        //                 color="theme_lightgray"
        //                 onClick={() => dispatch(push('/events/' + event.slug))}
        //             >
        //                 See more
        //             </Button>
        //         </div>
        //         <div className={classes.bottom}>
        //             <Box width="100%" height="4em" margin="0">
        //                 <Typography variant="h6">{event.name}</Typography>
        //             </Box>
        //             <Box
        //                 display="flex"
        //                 flexDirection="column"
        //                 flexWrap="wrap"
        //                 justifyContent="center"
        //                 mt={2}
        //                 className={classes.uppercase}
        //             >
        //                 <Typography variant="body1" className={classes.bolded}>
        //                     {event?._eventTimeFormatted}
        //                 </Typography>
        //                 <Typography variant="body1">
        //                     {event?._eventLocationFormatted}
        //                 </Typography>
        //                 {buttons?.map((btn, index) => (
        //                     <Box key={index}>{btn}</Box>
        //                 ))}
        //             </Box>
        //         </div>
        //     </div>
    )
}

export default NewEventCard

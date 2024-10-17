import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    CardActionArea,
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Image from 'components/generic/Image'
import Markdown from 'components/generic/Markdown'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

import * as SnackbarActions from 'redux/snackbar/actions'
import ProgressBar from 'components/generic/ProgressBar'

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

const NewEventCard = ({ event, buttons, handleClick = () => {} }) => {
    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const classes = useStyles()
    const organization = event?.organizations

    const styling = {
        cardHover: '',
    }

    if (hover) {
        styling.cardHover = 'tw-cursor-pointer hover:tw-shadow-xl'
    }

    if (event === undefined || event === null) {
        dispatch(SnackbarActions.error(t('Invalid_access_')))
        return null
    }

    return (
        <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`tw-bg-white tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-min-h-600px tw-max-w-xs tw-flex tw-flex-col tw-justify-between ${styling.cardHover}`}
        >
            <CardActionArea onClick={handleClick}>
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
                            />
                        )}
                    </div>
                    <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                        <Typography variant="h4">{event.name}</Typography>
                    </div>
                    {event?.description && (
                        <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                            <Markdown
                                source={_.truncate(event?.description, {
                                    length: 200,
                                })}
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
            </CardActionArea>

            <CardActions className="tw-flex tw-gap-4 tw-justify-start tw-max-w-full tw-px-4 tw-pb-4 tw-pt-6">
                {buttons?.slice(0, 2).map((btn, index) => {
                    return <Box key={index}>{btn}</Box>
                })}
            </CardActions>
        </Card>
    )
}

export default NewEventCard

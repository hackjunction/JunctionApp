import React, { useState, useCallback, useEffect } from 'react'

import { push } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Box,
} from '@material-ui/core'

import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'
import Image from 'components/generic/Image'

import EventsService from 'services/events'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useTranslation } from 'react-i18next'

const fillerContent = makeStyles({
    filler20: {
        width: '20%',
        height: '10px',
        background: '#cbd2e0',
        borderRadius: '5px',
        margin: '5px',
    },
    filler40: {
        width: '40%',
        height: '10px',
        background: '#cbd2e0',
        borderRadius: '5px',
        margin: '5px',
    },
    filler60: {
        width: '60%',
        height: '10px',
        background: '#cbd2e0',
        borderRadius: '5px',
        margin: '5px',
    },
    filler80: {
        width: '80%',
        height: '10px',
        background: '#cbd2e0',
        borderRadius: '5px',
        margin: '5px',
    },
})

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        width: '320px',
        flex: 1,
    },
    top: {
        height: '150px',
        width: '320px',
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
        borderRadius: '16px 16px 0 0',
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

export default () => {
    const [hover, setHover] = useState(false)
    const { t } = useTranslation()
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const hasError = Boolean(error)
    const classes = useStyles()
    const content = fillerContent()

    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)

    const styling = {
        cardHover: '',
    }

    if (hover) {
        styling.cardHover = 'tw-cursor-pointer hover:tw-shadow-xl'
    }

    useEffect(() => {
        checkName()
    }, [name])

    const checkName = useCallback(() => {
        if (name.length < 5) {
            setError('Event name must be at least 5 characters')
            return false
        } else if (name.length >= 50) {
            setError('Event name must be under 50 characters')
            return false
        } else if (name === 'default') {
            setError('Event name cannot be default')
            return false
        }
        setError('')
        return true
    }, [name.length])

    const handleCreate = useCallback(() => {
        setLoading(true)
        if (checkName()) {
            EventsService.createEvent(idToken, { name })
                .then(data => {
                    dispatch(push(`/organise/${data.slug}`))
                    dispatch(SnackbarActions.success(`Created ${data.name}`))
                })
                .catch(e => {
                    dispatch(SnackbarActions.error(t('Unable_to_create_')))
                    if (error) {
                    }
                })
        } else {
            dispatch(SnackbarActions.error(t('Unable_to_create_')))
            dispatch(SnackbarActions.error(error))
        }
        setLoading(false)
    }, [checkName, idToken, name, dispatch])

    //TODO: make same size, add border color = primary
    return (
        <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => console.log('click')}
            className={`tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-min-h-600px tw-max-w-xs tw-flex tw-flex-col tw-bg-gray-200 tw-rounded-t-2xl tw-border-8 tw-border-black tw-justify-between ${styling.cardHover}`}
        >
            <CardContent className="tw-flex tw-flex-col tw-p-0">
                <div className="tw-h-40 tw-w-full tw-my-0 tw-mx-auto tw-relative tw-flex tw-justify-end tw-items-end">
                    <Image
                        className={classes.image}
                        defaultImage={require('assets/images/default_cover_image.png')}
                        transformation={{
                            width: 400,
                        }}
                    />
                </div>
                <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                    <Typography variant="h4">
                        {t('Create_new_event_')}
                    </Typography>
                </div>
                <div className={content.filler80}></div>
                <div className={content.filler60}></div>
                <div className={content.filler80}></div>
                <div className={content.filler40}></div>
                <div className={content.filler60}></div>
                <div className={content.filler60}></div>
                <div className={content.filler20}></div>
                <div className={content.filler60}></div>
                <div className={content.filler60}></div>
                <div className={content.filler80}></div>

                <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        alignItems="flex-end"
                    >
                        <Grid item xs={12} sm={6}>
                            <TextInput
                                label={t('Event_name_')}
                                placeholder={t('Enter_event_name_')}
                                value={name}
                                onChange={setName}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={hasError}
                                onClick={handleCreate}
                                loading={loading}
                                fullWidth
                                color="primary"
                                variant="contained"
                            >
                                {'+ Create'}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </CardContent>
        </Card>
    )
}

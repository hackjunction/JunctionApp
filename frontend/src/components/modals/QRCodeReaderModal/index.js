import React, { useState, useRef, useCallback } from 'react'
import QrReader from 'react-qr-reader'

import { makeStyles } from '@material-ui/core/styles'
import {
    Box,
    Typography,
    Avatar,
    Button,
    CircularProgress,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RegistrationStatuses } from '@hackjunction/shared'

import Modal from 'components/generic/Modal'
import StatusBadge from 'components/generic/StatusBadge'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import UserProfilesService from 'services/userProfiles'

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 200,
        height: 200,
        margin: theme.spacing(2),
    },
}))

export default ({ open, onClose, editRegistration }) => {
    const dispatch = useDispatch()
    const registrationsMap = useSelector(OrganiserSelectors.registrationsMap)
    const event = useSelector(OrganiserSelectors.event)
    const classes = useStyles()
    const reader = useRef(null)
    const [user, setUser] = useState()
    const [legacyMode, setLegacyMode] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleError = useCallback(() => {
        dispatch(SnackbarActions.error('Error scanning QR code'))
        setLegacyMode(true)
    }, [dispatch])

    const handleCheckIn = useCallback(() => {
        setLoading(true)
        const registration = registrationsMap[user.userId]
        dispatch(
            OrganiserActions.editRegistration(
                registration._id,
                { status: RegistrationStatuses.asObject.checkedIn.id },
                event.slug,
            ),
        )
            .then(() => {
                dispatch(
                    SnackbarActions.success('Changed status to checked in'),
                )
            })
            .catch(err => {
                dispatch(SnackbarActions.error('Something went wrong...'))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [dispatch, event.slug, registrationsMap, user.userId])

    const handleScan = useCallback(
        data => {
            if (data) {
                setLoading(true)
                UserProfilesService.getPublicUserProfiles(data)
                    .then(users => {
                        if (users.length === 0) {
                            dispatch(SnackbarActions.error('Unknown user'))
                        } else {
                            setUser(users[0])
                        }
                    })
                    .catch(err => {
                        dispatch(
                            SnackbarActions.error('Somethign went wrong...'),
                        )
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                if (legacyMode) {
                    dispatch(
                        SnackbarActions.error(
                            'No QR code detected, please upload another image',
                        ),
                    )
                }
            }
        },
        [dispatch, legacyMode],
    )

    const renderRegistrationInfo = () => {
        const registration = registrationsMap[user.userId]
        if (!registration) {
            return (
                <>
                    <Typography
                        variant="subtitle1"
                        color="secondary"
                        align="center"
                    >
                        No registration found!
                    </Typography>
                </>
            )
        }
        const status = RegistrationStatuses.asObject[registration.status]

        return (
            <>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="center"
                >
                    Registration status: <br />
                    <StatusBadge status={status.id} />
                </Typography>
                <Box mt={2} />
                {renderActions(status)}
            </>
        )
    }

    const renderActions = status => {
        if (!status) return null
        switch (status.id) {
            case RegistrationStatuses.asObject.confirmed.id: {
                return (
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleCheckIn}
                    >
                        Check in
                    </Button>
                )
            }
            default:
                return (
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setUser()}
                    >
                        Scan again
                    </Button>
                )
        }
    }

    if (!open) return null

    return (
        <Modal isOpen={true} handleClose={onClose} size="max">
            <Box
                p={5}
                display="flex"
                height="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                {loading ? (
                    <CircularProgress size={24} />
                ) : user ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Avatar
                            alt={`${user.firstName} ${user.lastName}`}
                            src={user.avatar}
                            className={classes.avatar}
                        />
                        <Typography variant="h6" align="center">
                            {user.firstName} {user.lastName}
                        </Typography>
                        {renderRegistrationInfo()}
                    </Box>
                ) : (
                    <>
                        <QrReader
                            ref={reader}
                            delay={500}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%', maxWidth: 600 }}
                            facingMode="environment"
                            legacyMode={legacyMode}
                        />
                        <Box p={2}>
                            <Typography variant="subtitle1">
                                Camera not working?
                            </Typography>
                            <Box mt={1} />
                            <Button
                                variant="contained"
                                onClick={() => reader.current.openImageDialog()}
                            >
                                Take a picture
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    )
}

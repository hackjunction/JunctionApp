import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Button } from '@mui/material'
import { removeSnackbar } from 'reducers/snackbar/actions'
import * as SnackbarSelectors from 'reducers/snackbar/selectors'

const Notifier = () => {
    //This is dumb, doesn't need redux :D
    //TODO use hooks
    const dispatch = useDispatch()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const notifications = useSelector(SnackbarSelectors.notifications)
    const [displayed, setDisplayed] = useState([])

    const storeDisplayed = id => {
        setDisplayed(prevDisplayed => [...prevDisplayed, id])
    }

    const removeDisplayed = id => {
        setDisplayed(prevDisplayed => prevDisplayed.filter(key => id !== key))
    }

    const buildMessage = (message, options, key) => {
        if (options?.errorMessages?.length > 0) {
            return (
                <div>
                    <p>{message}</p>
                    <ul>
                        {options.errorMessages.map(msg => (
                            <li key={msg}>{msg}</li>
                        ))}
                    </ul>
                    <Button
                        style={{ color: '#fff' }}
                        onClick={() => {
                            closeSnackbar(key)
                        }}
                    >
                        OK
                    </Button>
                </div>
            )
        } else {
            return message
        }
    }

    useEffect(() => {
        notifications.forEach(
            ({ key, message, options = {}, dismissed = false }) => {
                if (dismissed) {
                    closeSnackbar(key)
                    return
                }
                if (displayed.includes(key)) return

                const formattedMessage = buildMessage(message, options, key)
                enqueueSnackbar(formattedMessage, {
                    key,
                    ...options,
                    persist:
                        options.persist ?? options?.errorMessages?.length > 0,
                    onClose: (event, reason, key) => {
                        if (options.onClose) {
                            options.onClose(event, reason, key)
                        }
                    },
                    onExited: (event, key) => {
                        dispatch(removeSnackbar(key))
                        removeDisplayed(key)
                    },
                })
                storeDisplayed(key)
            },
        )
    }, [notifications, displayed, closeSnackbar, enqueueSnackbar, dispatch])

    return null
}

export default Notifier

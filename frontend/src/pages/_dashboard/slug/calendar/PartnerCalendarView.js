import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_MEETING_SLOT } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useDispatch } from 'react-redux'
import Button from 'components/generic/Button'

export default ({ event }) => {
    const dispatch = useDispatch()
    const [createSlot, createSlotResult] = useMutation(CREATE_MEETING_SLOT, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to save changes', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: true,
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to save changes'))
            }
        },
        onCompleted: () => {
            dispatch(
                SnackbarActions.success('Your changes were saved successfully'),
            )
        },
    })

    console.log(event)
    const challenge = event.challenges[0]._id

    const handleSubmit = () => {
        const meeting = {
            event: event._id,
            startTime: '2020-05-22T13:00:00.000Z',
            endTime: '2020-05-22T13:30:00.000Z',
            challenge,
        }
        createSlot({
            variables: { meeting },
        })
    }

    const handleSubmit1 = () => {
        const meeting = {
            event: event._id,
            startTime: '2020-05-22T14:00:00.000Z',
            endTime: '2020-05-22T14:30:00.000Z',
            challenge,
        }
        createSlot({
            variables: { meeting },
        })
    }
    const handleSubmit2 = () => {
        const meeting = {
            event: event._id,
            startTime: '2020-05-23T13:00:00.000Z',
            endTime: '2020-05-23T13:30:00.000Z',
            challenge,
        }
        createSlot({
            variables: { meeting },
        })
    }
    const handleSubmit3 = () => {
        const meeting = {
            event: event._id,
            startTime: '2020-05-24T15:00:00.000Z',
            endTime: '2020-05-24T15:30:00.000Z',
            challenge,
        }
        createSlot({
            variables: { meeting },
        })
    }

    return (
        <>
            <h4>This is the calendar view</h4>
            <Button onClick={handleSubmit} color="primary" variant="contained">
                SEND IT
            </Button>
            <Button onClick={handleSubmit1} color="primary" variant="contained">
                SEND IT 1
            </Button>
            <Button onClick={handleSubmit2} color="primary" variant="contained">
                SEND IT 2
            </Button>
            <Button onClick={handleSubmit3} color="primary" variant="contained">
                SEND IT 3
            </Button>
        </>
    )
}

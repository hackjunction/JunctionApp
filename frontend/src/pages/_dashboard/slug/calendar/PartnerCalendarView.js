import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_MEETING_SLOT } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useDispatch } from 'react-redux'
import Button from 'components/generic/Button'

export default () => {
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

    const handleSubmit = () => {
        // const meeting = {
        //     event: '606d8326de289c00431125e7',
        //     startTime: '2022-08-08T15:00:00+03:00',
        //     endTime: '2022-08-08T15:30:00+03:00',
        //     challenge: '62ea30080f273de91bd18ccd',
        // }
        // const meeting = {
        //     event: '606d8326de289c00431125e7',
        //     startTime: '2022-08-08T15:30:00+03:00',
        //     endTime: '2022-08-08T16:00:00+03:00',
        //     challenge: '62ea30080f273de91bd18ccd',
        // }
        // const meeting = {
        //     event: '606d8326de289c00431125e7',
        //     startTime: '2022-08-09T15:00:00+03:00',
        //     endTime: '2022-08-09T15:30:00+03:00',
        //     challenge: '62ea30080f273de91bd18ccd',
        // }
        const meeting = {
            event: '606d8326de289c00431125e7',
            startTime: '2022-08-09T15:30:00+03:00',
            endTime: '2022-08-09T16:00:00+03:00',
            challenge: '62ea30080f273de91bd18ccd',
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
        </>
    )
}

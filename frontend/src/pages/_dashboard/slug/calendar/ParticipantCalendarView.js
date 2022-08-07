import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_MEETING_SLOT } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useDispatch } from 'react-redux'
import Button from 'components/generic/Button'

export default () => {
    return (
        <>
            <h4>This is the PARTICIPANT calendar view</h4>
        </>
    )
}

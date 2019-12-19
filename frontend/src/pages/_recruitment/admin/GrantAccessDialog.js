import React, { useState, useCallback } from 'react'

import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'

import TextInput from 'components/inputs/TextInput'
import Select from 'components/inputs/Select'
import Button from 'components/generic/Button'

import * as RecruitmentActions from 'redux/recruitment/actions'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: theme.spacing(2),
        background: 'white',
    },
    dialogContent: {
        minHeight: '300px',
    },
}))

export default ({ userId, onClose }) => {
    const dispatch = useDispatch()
    const events = useSelector(RecruitmentSelectors.events)

    const classes = useStyles()
    const [loading, setLoading] = useState()
    const [selectedEvents, setSelectedEvents] = useState()
    const [organisation, setOrganisation] = useState()

    const handleGrantAccess = useCallback(async () => {
        setLoading(true)
        try {
            await dispatch(
                RecruitmentActions.adminGrantRecruiterAccess(
                    userId,
                    events,
                    organisation.trim()
                )
            )
            dispatch(SnackbarActions.success('Success!'))
            onClose()
        } catch (e) {
            dispatch(SnackbarActions.error('Something went wrong...'))
        } finally {
            setLoading(false)
        }
    }, [dispatch, userId, events, organisation, onClose])

    return (
        <Dialog
            open={typeof userId !== 'undefined'}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                Grant access to recruitment
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>
                    Which events should this recruiter have access to?
                </DialogContentText>
                <Select
                    label="Choose events"
                    value={selectedEvents}
                    onChange={setSelectedEvents}
                    isMulti={true}
                    options={events.map(event => ({
                        value: event._id,
                        label: event.name,
                    }))}
                />
                <Box mt={3} />
                <DialogContentText>
                    Which organisation does this recruiter belong to?
                </DialogContentText>
                <TextInput
                    value={organisation}
                    onChange={setOrganisation}
                    label="Organisation"
                    placeholder="BigCorp Ltd."
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    strong
                    color="theme_white"
                    variant="contained"
                >
                    Cancel
                </Button>
                <Box p={1} />
                <Button
                    disabled={
                        loading || !organisation || selectedEvents.length === 0
                    }
                    strong
                    onClick={handleGrantAccess}
                    color="primary"
                >
                    Grant access
                </Button>
            </DialogActions>
        </Dialog>
    )
}

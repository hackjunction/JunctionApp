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
import * as OrganiserSelectors from 'redux/organiser/selectors'
import { useTranslation } from 'react-i18next'

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
    
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const classes = useStyles()
    const [loading, setLoading] = useState()
    const [organisation, setOrganisation] = useState()

    const event = useSelector(OrganiserSelectors.event)

    const handleGrantAccess = useCallback(async () => {
        console.log("granting...")
        setLoading(true)
        try {
            console.log(userId)
            console.log(event)
            // await dispatch(
            //     RecruitmentActions.adminGrantRecruiterAccess(
            //         userId,
            //         selectedEvents,
            //         organisation.trim(),
            //     ),
            // )
            dispatch(SnackbarActions.success('Success!'))
            onClose()
        } catch (e) {
            dispatch(SnackbarActions.error('Something went wrong...'))
        } finally {
            setLoading(false)
        }
    }, [dispatch, userId, event, organisation, onClose])

    return (
        <Dialog
            open={typeof userId !== 'undefined'}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                {t('Grant_access_recruitment_')}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>
                    {t('Which_organisation_')}
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
                    {t('Cancel_')}
                </Button>
                <Box p={1} />
                <Button
                    disabled={
                        loading || !organisation
                    }
                    strong
                    onClick={handleGrantAccess}
                    color="primary"
                >
                    {t('Grant_access_')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

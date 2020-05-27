import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Box,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Dialog,
    DialogContent,
    DialogActions,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PageWrapper from 'components/layouts/PageWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'
import PageHeader from 'components/generic/PageHeader'
import OrganiserSelectModal from 'components/modals/OrganiserSelectModal'
import OrganiserListItem from 'components/generic/UserListItem/OrganiserListItem'
import EventTagsSelect from 'components/inputs/EventTagsSelect'
import RegistrationStatusSelect from 'components/inputs/RegistrationStatusSelect'
import ConfirmDialog from 'components/generic/ConfirmDialog'
import Button from 'components/generic/Button'

import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useFormField } from 'hooks/formHooks'
import { useTranslation } from 'react-i18next'
export default ({ visible, userIds = [], onClose }) => {
    const { t, i18n } = useTranslation() // eslint-disable-line
    const dispatch = useDispatch()
    const event = useSelector(OrganiserSelectors.event)
    const [loading, setLoading] = useState(false)
    const [organiserModal, setOrganiserModal] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const rating = useFormField(null)
    const assignedTo = useFormField(null)
    const tags = useFormField([])
    const status = useFormField('pending')

    const [expandedIds, setExpandedIds] = useState([])

    const isExpanded = useCallback(
        panel => {
            return expandedIds.indexOf(panel) !== -1
        },
        [expandedIds]
    )

    const toggleExpanded = panel => {
        if (isExpanded(panel)) {
            setExpandedIds(expandedIds.filter(id => id !== panel))
        } else {
            setExpandedIds(expandedIds.concat(panel))
        }
    }

    const reset = useCallback(() => {
        rating.reset()
        assignedTo.reset()
        tags.reset()
        status.reset()
        setLoading(false)
        setExpandedIds([])
    }, [rating, assignedTo, tags, status])

    const handleClose = useCallback(() => {
        reset()
        onClose()
    }, [reset, onClose])

    const getEdits = useCallback(() => {
        const edits = {}
        if (isExpanded('rating')) edits.rating = rating.value
        if (isExpanded('assignedTo')) edits.assignedTo = assignedTo.value
        if (isExpanded('tags')) edits.tags = tags.value
        if (isExpanded('status')) edits.status = status.value
        return edits
    }, [rating, assignedTo, tags, status, isExpanded])

    const handleSubmit = useCallback(() => {
        setLoading(true)
        const edits = getEdits()

        dispatch(
            OrganiserActions.bulkEditRegistrations(userIds, edits, event.slug)
        )
            .then(() => {
                dispatch(
                    SnackbarActions.success(
                        `Edited ${userIds.length} registrations`
                    )
                )
            })
            .catch(err => {
                dispatch(SnackbarActions.error(t('Something_wrong_')))
            })
            .finally(() => {
                setLoading(false)
                handleClose()
            })
    }, [getEdits, dispatch, userIds, event.slug, handleClose, t])

    if (!userIds.length) return null
    return (
        <Dialog fullScreen open={visible} onClose={handleClose}>
            <PageWrapper loading={loading} wrapContent={false}>
                <DialogContent>
                    <ConfirmDialog
                        open={confirmDialog}
                        title="Are you sure?"
                        message={`This will apply your configured changes to ${userIds.length} registrations, and you won't be able to revert them. Please make sure you are not making any unintended changes.`}
                        onClose={() => setConfirmDialog(false)}
                        onOk={handleSubmit}
                    />
                    <CenteredContainer>
                        <PageHeader
                            heading="Bulk edit"
                            subheading={
                                userIds.length + ' selected participants'
                            }
                        />
                        <Typography variant="body1" paragraph>
                            {t('Edit_selected_registrations_')}
                            {t('un_expanded_')}
                            {t('Edit_selected_registration_cont_')}
                        </Typography>
                        <ExpansionPanel
                            expanded={isExpanded('rating')}
                            onChange={() => toggleExpanded('rating')}
                        >
                            <ExpansionPanelSummary>
                                <Box
                                    flex="1"
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="subtitle1">
                                        {t('Rating_')}
                                    </Typography>
                                    {isExpanded('rating') ? (
                                        <Typography
                                            variant="button"
                                            color="secondary"
                                        >
                                            {rating.value
                                                ? 'Set rating to ' +
                                                  rating.value
                                                : 'Clear rating'}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="button"
                                            color="primary"
                                        >
                                            {t('Leave_unchanged_')}
                                        </Typography>
                                    )}
                                </Box>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Rating
                                    value={rating.value}
                                    onChange={(e, num) => rating.setValue(num)}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel
                            expanded={isExpanded('assignedTo')}
                            onChange={() => toggleExpanded('assignedTo')}
                        >
                            <ExpansionPanelSummary>
                                <Box
                                    flex="1"
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="subtitle1">
                                        {t('Assigned to')}
                                    </Typography>
                                    {isExpanded('assignedTo') ? (
                                        <Typography
                                            variant="button"
                                            color="secondary"
                                        >
                                            {assignedTo.value
                                                ? 'Change assigned to'
                                                : 'Clear assigned to'}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="button"
                                            color="primary"
                                        >
                                            {t('Leave_unchanged_')}
                                        </Typography>
                                    )}
                                </Box>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <OrganiserSelectModal
                                    open={organiserModal}
                                    onClose={setOrganiserModal}
                                    onSelect={value =>
                                        assignedTo.setValue(value.userId)
                                    }
                                    onClear={assignedTo.setValue}
                                />
                                <Box display="flex" flexDirection="column">
                                    <Box mb={1} width="100%">
                                        <OrganiserListItem
                                            userId={
                                                assignedTo
                                                    ? assignedTo.value
                                                    : null
                                            }
                                        />
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setOrganiserModal(true)}
                                    >
                                        {t('Change_')}
                                    </Button>
                                </Box>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel
                            expanded={isExpanded('tags')}
                            onChange={() => toggleExpanded('tags')}
                        >
                            <ExpansionPanelSummary>
                                <Box
                                    flex="1"
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="subtitle1">
                                        {t('Tags_')}
                                    </Typography>
                                    {isExpanded('tags') ? (
                                        <Typography
                                            variant="button"
                                            color="secondary"
                                        >
                                            {tags.value && tags.value.length
                                                ? 'Set tags to ' +
                                                  tags.value.join(', ')
                                                : 'Clear tags'}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="button"
                                            color="primary"
                                        >
                                            {t('Leave_unchanged_')}
                                        </Typography>
                                    )}
                                </Box>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <EventTagsSelect
                                    value={tags.value}
                                    onChange={tags.setValue}
                                    tags={event.tags}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel
                            expanded={isExpanded('status')}
                            onChange={() => toggleExpanded('status')}
                        >
                            <ExpansionPanelSummary>
                                <Box
                                    flex="1"
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="subtitle1">
                                        {t('Status_')}
                                    </Typography>
                                    {isExpanded('status') ? (
                                        <Typography
                                            variant="button"
                                            color="secondary"
                                        >
                                            {t('Set_status_', {
                                                value: status.value,
                                            })}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="button"
                                            color="primary"
                                        >
                                            {t('Leave_unchanged_')}
                                        </Typography>
                                    )}
                                </Box>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <RegistrationStatusSelect
                                    value={status.value}
                                    onChange={status.setValue}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </CenteredContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => setConfirmDialog(true)}
                        variant="contained"
                        color="primary"
                        disabled={expandedIds.length === 0}
                    >
                        {expandedIds.length === 0
                            ? 'Expand panels to make edits'
                            : ` Apply edits to ${userIds.length} registrations`}
                    </Button>
                </DialogActions>
            </PageWrapper>
        </Dialog>
    )
}

import React, { useState, useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography,
    Button,
    Grid,
    CircularProgress,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TextInput from 'components/inputs/TextInput'
import { useFormField } from 'hooks/formHooks'
import * as OrganiserActions from 'redux/organiser/actions'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

export default ({ filters, activeItem, reservedLabels, onSave, onDelete }) => {
    const dispatch = useDispatch()
    const event = useSelector(OrganiserSelectors.event)
    const isEdit = !activeItem.isDefault && !activeItem.isAdd
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const label = useFormField(isEdit ? activeItem.label : '', value => {
        if (value.length === 0) {
            return 'Name is required'
        }

        if (value.length > 50) {
            return 'Name must be under 50 characters'
        }

        if (!isEdit) {
            if (reservedLabels.indexOf(value) !== -1) {
                return 'Name is already taken'
            }
        }

        return
    })

    const description = useFormField(
        isEdit ? activeItem.description : '',
        value => {
            if (value.length > 100) {
                return 'Description must be under 100 characters'
            }

            return
        }
    )

    const toggleExpanded = useCallback(
        (event, isExpanded) => {
            setExpanded(isExpanded)
            label.setValue(isEdit ? activeItem.label : '')
            description.setValue(isEdit ? activeItem.description : '')
        },
        [label, isEdit, activeItem.label, activeItem.description, description]
    )

    useEffect(() => {
        setExpanded(false)
    }, [])

    const handleSubmit = () => {
        const errs = [label.validate(), description.validate()].filter(
            err => err !== undefined
        )
        if (errs.length > 0) {
            return
        }

        if (isEdit) {
            handleEdit(label.value, description.value)
        } else {
            handleCreate(label.value, description.value)
        }
    }

    const handleEdit = useCallback(
        (label, description) => {
            setLoading(true)
            dispatch(
                OrganiserActions.editFilterGroup(
                    event.slug,
                    label,
                    description,
                    filters
                )
            )
                .then(item => {
                    dispatch(SnackbarActions.success('Edits saved!'))
                    toggleExpanded(null, false)
                    onSave(item)
                })
                .catch(err => {
                    dispatch(SnackbarActions.error('Something went wrong...'))
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dispatch, event.slug, filters, onSave, toggleExpanded]
    )

    const handleCreate = useCallback(
        (label, description) => {
            setLoading(true)
            dispatch(
                OrganiserActions.createFilterGroup(
                    event.slug,
                    label,
                    description,
                    filters
                )
            )
                .then(item => {
                    dispatch(SnackbarActions.success('Filter group deleted'))
                    toggleExpanded(null, false)
                    onSave(item)
                })
                .catch(err => {
                    dispatch(SnackbarActions.error('Something went wrong...'))
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dispatch, event.slug, filters, onSave, toggleExpanded]
    )

    const handleDelete = useCallback(() => {
        setLoading(true)
        dispatch(OrganiserActions.deleteFilterGroup(event.slug, label.value))
            .then(() => {
                dispatch(SnackbarActions.success('Filter group deleted'))
                toggleExpanded(null, false)
                onDelete()
            })
            .catch(err => {
                dispatch(SnackbarActions.error('Something went wrong'))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [dispatch, event.slug, label.value, onDelete, toggleExpanded])

    return (
        <ExpansionPanel
            expanded={expanded}
            onChange={toggleExpanded}
            disabled={filters.length === 0}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="save-filters"
                id="save-filters"
            >
                <Typography>
                    {isEdit ? 'Edit these filters' : 'Save these filters'}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={3}>
                    {!isEdit && (
                        <Grid item xs={12}>
                            <Typography>
                                You can save this filter group for later use.
                                This allows you to easily view stats for the
                                group, and do things like bulk edit their
                                applications or send an email to everyone in the
                                group.
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <TextInput
                            rawOnChange
                            disabled={isEdit}
                            label="Name"
                            helperText="Give a descriptive name to the filter group e.g. participants from Finland"
                            {...label}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            rawOnChange
                            label="Description"
                            helperText="Add a short description, if needed"
                            {...description}
                        />
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                {loading && <CircularProgress size={24} />}
                {isEdit && (
                    <Button
                        disabled={loading}
                        color="error"
                        variant="contained"
                        onClick={handleDelete}
                    >
                        Delete filter group
                    </Button>
                )}
                <Button
                    disabled={loading}
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {isEdit ? 'Save edits' : 'Create new filter group'}
                </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    )
}

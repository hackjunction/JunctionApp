import React, { useState, useEffect, useCallback } from 'react';

import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography,
    Button,
    Grid,
    CircularProgress
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextInput from 'components/inputs/TextInput';
import { useFormField } from 'hooks/formHooks';
import * as OrganiserActions from 'redux/organiser/actions';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const FilterSaveForm = ({
    createFilterGroup,
    editFilterGroup,
    deleteFilterGroup,
    filters,
    activeItem,
    reservedLabels,
    event,
    enqueueSnackbar,
    onSave,
    onDelete
}) => {
    const isEdit = !activeItem.isDefault && !activeItem.isAdd;
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const label = useFormField(isEdit ? activeItem.label : '', value => {
        if (value.length === 0) {
            return 'Name is required';
        }

        if (value.length > 50) {
            return 'Name must be under 50 characters';
        }

        if (!isEdit) {
            if (reservedLabels.indexOf(value) !== -1) {
                return 'Name is already taken';
            }
        }

        return;
    });

    const description = useFormField(isEdit ? activeItem.description : '', value => {
        if (value.length > 100) {
            return 'Description must be under 100 characters';
        }

        return;
    });

    const toggleExpanded = useCallback(
        (event, isExpanded) => {
            setExpanded(isExpanded);
            label.setValue(isEdit ? activeItem.label : '');
            description.setValue(isEdit ? activeItem.description : '');
        },
        [isEdit, label, description, activeItem]
    );

    useEffect(() => {
        setExpanded(false);
    }, [activeItem]);

    const handleSubmit = () => {
        const errs = [label.validate(), description.validate()].filter(err => err !== undefined);
        if (errs.length > 0) {
            return;
        }

        if (isEdit) {
            handleEdit(label.value, description.value);
        } else {
            handleCreate(label.value, description.value);
        }
    };

    const handleEdit = useCallback(
        (label, description) => {
            setLoading(true);
            editFilterGroup(event.slug, label, description, filters)
                .then(item => {
                    enqueueSnackbar('Edits saved!', { variant: 'success' });
                    toggleExpanded(null, false);
                    onSave(item);
                })
                .catch(err => {
                    enqueueSnackbar('Something went wrong', { variant: 'error' });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [onSave, toggleExpanded, enqueueSnackbar, event.slug, filters, editFilterGroup]
    );

    const handleCreate = useCallback(
        (label, description) => {
            setLoading(true);
            createFilterGroup(event.slug, label, description, filters)
                .then(item => {
                    enqueueSnackbar('Filter group created', { variant: 'success' });
                    toggleExpanded(null, false);
                    onSave(item);
                })
                .catch(err => {
                    enqueueSnackbar('Something went wrong', { variant: 'error' });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [onSave, toggleExpanded, enqueueSnackbar, event.slug, filters, createFilterGroup]
    );

    const handleDelete = useCallback(() => {
        setLoading(true);
        deleteFilterGroup(event.slug, label.value)
            .then(() => {
                enqueueSnackbar('Filter group deleted', { variant: 'success' });
                toggleExpanded(null, false);
                onDelete();
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [label, onDelete, toggleExpanded, enqueueSnackbar, deleteFilterGroup, event.slug]);

    return (
        <ExpansionPanel expanded={expanded} onChange={toggleExpanded} disabled={filters.length === 0}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="save-filters" id="save-filters">
                <Typography>{isEdit ? 'Edit these filters' : 'Save these filters'}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={3}>
                    {!isEdit && (
                        <Grid item xs={12}>
                            <Typography>
                                You can save this filter group for later use. This allows you to easily view stats for
                                the group, and do things like bulk edit their applications or send an email to everyone
                                in the group.
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
                    <Button disabled={loading} color="error" variant="contained" onClick={handleDelete}>
                        Delete filter group
                    </Button>
                )}
                <Button disabled={loading} color="primary" variant="contained" onClick={handleSubmit}>
                    {isEdit ? 'Save edits' : 'Create new filter group'}
                </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state)
});

const mapDispatch = dispatch => ({
    createFilterGroup: (slug, label, description, filters) =>
        dispatch(OrganiserActions.createFilterGroup(slug, label, description, filters)),
    editFilterGroup: (slug, label, description, filters) =>
        dispatch(OrganiserActions.editFilterGroup(slug, label, description, filters)),
    deleteFilterGroup: (slug, label) => dispatch(OrganiserActions.deleteFilterGroup(slug, label))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(FilterSaveForm)
);

import React, {useEffect} from 'react';

import dashify from 'dashify';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography,
    Button,
    Grid,
    Box
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextInput from 'components/inputs/TextInput';
import {useFormField} from 'hooks/formHooks';

const FilterSaveForm = ({ filters, activeItem }) => {

    const label = useFormField('', (value) => {
        if (value.length === 0) {
            return 'Name is required';
        }

        if (value.length > 50) {
            return 'Name must be under 50 characters';
        }

        return;
    });
    const id = useFormField('', (value) => {
        if (value.length === 0) {
            return 'ID is required';
        }
        if (value.length > 50) {
            return 'ID must be under 50 characters'
        }
        return;
    });
    const description = useFormField('', (value) => {
        if (value.length > 100) {
            return 'Description must be under 100 characters';
        }
    });

    useEffect(() => {
        id.setValue(dashify(label.value));
    }, [id.setValue, label.value]);

    const handleSubmit = () => {
        const errs = [
            label.validate(),
            id.validate(),
            description.validate()
        ].filter(err => err !== undefined);
        if (errs.length > 0) {
            return;
        }
        window.alert('DO THE SAVE');
    }

    // const isEdit = activeItem.id !== 'custom' && !activeItem.isDefault;
    const isEdit = true;

    return (
        <ExpansionPanel disabled={filters.length === 0}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="save-filters" id="save-filters">
                <Typography>Save these filters</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={3}>
                    {!isEdit && (
                        <Grid item xs={12}>
                            <Typography>You can save this filter group for later use. This allows you to easily view stats for the group, and do things like bulk edit their applications or send an email to everyone in the group.</Typography>
                        </Grid>  
                    )}
                    <Grid item xs={12} md={6}>
                        <TextInput rawOnChange label="Name" helperText="Give a descriptive name to the filter group e.g. participants from Finland" {...label} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput rawOnChange label="ID" helperText="Give this group a unique id" {...id}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput rawOnChange label="Description" helperText="Add a short description, if needed" {...description}/>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                <Button color="error" variant="contained">Delete filter group</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit}>{isEdit ? 'Save edits' : 'Create new filter group'}</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
};

export default FilterSaveForm;

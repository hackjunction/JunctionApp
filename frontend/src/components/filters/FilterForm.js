import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import { RegistrationFields, FilterTypes } from '@hackjunction/shared';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Grid,
    Button,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography
} from '@material-ui/core';

import Select from 'components/inputs/Select';
import FilterValueInput from './FilterValueInput';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    },
    headingItem: {
        marginRight: theme.spacing(1)
    },
    body: {
        padding: theme.spacing(3)
    }
}));

const FilterForm = ({ onSubmit, event }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [filter, setFilter] = useState();
    const [filterType, setFilterType] = useState();
    const [filterValue, setFilterValue] = useState();

    useEffect(() => {
        setFilterType(undefined);
    }, [filter]);

    useEffect(() => {
        setFilterValue(undefined);
    }, [filterType]);

    const toggleExpanded = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    const handleClear = useCallback(() => {
        setExpanded(false);
        setFilter(undefined);
        setFilterType(undefined);
        setFilterValue(undefined);
    }, []);

    const filterParams = useMemo(() => {
        return filter ? JSON.parse(filter) : null;
    }, [filter]);

    const submitValue = useMemo(() => {
        if (!filterParams) return null;
        if (!filterType) return null;

        return {
            label: filterParams.label,
            path: filterParams.path,
            type: filterType,
            value: filterValue
        };
    }, [filterParams, filterType, filterValue]);

    const handleSubmit = useCallback(() => {
        onSubmit(submitValue);
        handleClear();
    }, [submitValue, onSubmit, handleClear]);

    const filterOptions = useMemo(() => {
        return RegistrationFields.filters.map(filter => ({
            value: JSON.stringify(filter),
            label: filter.label
        }));
    }, []);

    const filterTypeOptions = useMemo(() => {
        if (!filterParams) return [];
        const options = FilterTypes.filterTypesForType[filterParams.type];
        if (!options) return [];

        return options.map(option => ({
            value: option,
            label: FilterTypes.filterTypes[option].label
        }));
    }, [filterParams]);

    return (
        <ExpansionPanel expanded={expanded} onChange={toggleExpanded}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
                <div className={classes.headingItem}>
                    <Typography color="textPrimary">Add a filter</Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.body}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Select
                            label="Choose field"
                            helperText="Choose a field to filter on"
                            value={filter}
                            onChange={setFilter}
                            options={filterOptions}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {filterTypeOptions.length > 0 && (
                            <Select
                                label="How to filter on field"
                                value={filterType}
                                onChange={setFilterType}
                                helperText="Choose how to filter on the field"
                                options={filterTypeOptions}
                            />
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <FilterValueInput
                            filterType={filterType}
                            valueType={filterParams ? filterParams.valueType : null}
                            value={filterValue}
                            onChange={setFilterValue}
                            event={event}
                        />
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                <Button onClick={handleClear}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!submitValue}>
                    Add
                </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state)
});

export default connect(mapState)(FilterForm);

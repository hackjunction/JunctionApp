import React, { useState, useMemo, useCallback } from 'react';

import { RegistrationFields, FilterTypes } from '@hackjunction/shared';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';

import Select from 'components/inputs/Select';
import FilterValueInput from './FilterValueInput';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    }
}));

const FilterForm = ({ onSubmit }) => {
    const classes = useStyles();
    const [filter, setFilter] = useState();
    const [filterType, setFilterType] = useState();
    const [filterValue, setFilterValue] = useState();

    const filterParams = useMemo(() => {
        return filter ? JSON.parse(filter) : null;
    }, [filter]);

    const handleSubmit = useCallback(() => {
        onSubmit({
            path: filterParams ? filterParams.path : '',
            type: filterType,
            value: filterValue
        });
    }, [filterParams, filterType, filterValue, onSubmit]);

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
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Select
                        label="Choose field"
                        helperText="Choose a field to filter on"
                        value={filter}
                        onChange={setFilter}
                        options={filterOptions}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Select
                        label="How to filter on field"
                        value={filterType}
                        onChange={setFilterType}
                        helperText="Choose how to filter on the field"
                        options={filterTypeOptions}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <FilterValueInput
                    filterType={filterType}
                    valueType={filterParams ? filterParams.valueType : null}
                    value={filterValue}
                    onChange={setFilterValue}
                />
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" variant="contained" onClick={handleSubmit}>
                    Add filter
                </Button>
            </Grid>
        </Grid>
    );
};

export default FilterForm;

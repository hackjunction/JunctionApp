import React, { useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { FilterTypes, FilterValues } from '@hackjunction/shared';

import TextInput from 'components/inputs/TextInput';
import Select from 'components/inputs/Select';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    }
}));

const FilterValueInput = ({ filterType, valueType, value, onChange }) => {
    const classes = useStyles();

    const inputParams = { value, onChange };

    const inner = useMemo(() => {
        switch (filterType) {
            case FilterTypes.filterTypes.LESS_THAN.id:
            case FilterTypes.filterTypes.NOT_LESS_THAN.id:
            case FilterTypes.filterTypes.MORE_THAN.id:
            case FilterTypes.filterTypes.NOT_MORE_THAN.id:
                return (
                    <TextInput
                        label="Enter a number here"
                        helperText="If the field is a text field or a list of values, compares the length of the value"
                        {...inputParams}
                    />
                );
            case FilterTypes.filterTypes.CONTAINS.id:
            case FilterTypes.filterTypes.NOT_CONTAINS.id:
            case FilterTypes.filterTypes.EQUALS.id:
            case FilterTypes.filterTypes.NOT_EQUALS.id:
                switch (valueType) {
                    case FilterValues.STRING:
                        return <TextInput label="Enter value" {...inputParams} />;
                    case FilterValues.BOOLEAN:
                        return <TextInput label="Boolean field" {...inputParams} />;
                    case FilterValues.DATE:
                        return <TextInput label="Date field" {...inputParams} />;
                    case FilterValues.GENDER:
                        return <Select label="Gender select" type="gender" {...inputParams} />;
                    case FilterValues.NATIONALITY:
                        return <Select label="Nationality" type="nationality" {...inputParams} />;
                    case FilterValues.LANGUAGE:
                        return <Select label="Language" type="language" {...inputParams} />;
                    default:
                        return null;
                }
            case FilterTypes.filterTypes.IS_EMPTY:
            case FilterTypes.filterTypes.NOT_EMPTY:
            case FilterTypes.filterTypes.BOOLEAN_FALSE.id:
            case FilterTypes.filterTypes.BOOLEAN_TRUE.id:
                return null;
            default:
                return null;
        }
    }, [filterType, valueType, inputParams]);
    if (!inner) return null;
    return <Paper className={classes.paper}>{inner}</Paper>;
};

export default FilterValueInput;

import React, { useCallback } from 'react';

import { Grid } from '@material-ui/core';
import moment from 'moment';
import Select from 'components/inputs/Select';

const DateInput = ({ value, onChange }) => {
    const momentValue = value ? moment(value) : null;

    const handleDateChange = useCallback(
        date => {
            const newValue = moment(value);
            newValue.date(date);
            onChange(newValue);
        },
        [value, onChange]
    );

    const handleMonthChange = useCallback(
        month => {
            const newValue = moment(value);
            newValue.month(month - 1);
            onChange(newValue);
        },
        [value, onChange]
    );

    const handleYearChange = useCallback(
        year => {
            const newValue = moment(value);
            newValue.year(year);
            onChange(newValue);
        },
        [value, onChange]
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Select
                    label="Day"
                    type="day"
                    value={momentValue ? momentValue.date() : null}
                    onChange={handleDateChange}
                />
            </Grid>
            <Grid item xs={4}>
                <Select
                    label="Month"
                    type="month"
                    value={momentValue ? momentValue.month() + 1 : null}
                    onChange={handleMonthChange}
                />
            </Grid>
            <Grid item xs={4}>
                <Select
                    label="Year"
                    type="year"
                    value={momentValue ? momentValue.year() : null}
                    onChange={handleYearChange}
                />
            </Grid>
        </Grid>
    );
};

export default DateInput;

import React, { useCallback } from 'react';

import { Grid } from '@material-ui/core';
import moment from 'moment';
import Select from 'components/inputs/Select';

const DateInput = ({ value, onChange, onBlur }) => {
    const momentValue = value ? moment(value) : null;

    const handleDateChange = useCallback(
        date => {
            const newValue = moment(value);
            newValue.date(date);
            onChange(newValue.startOf('day').format());
        },
        [value, onChange]
    );

    const handleMonthChange = useCallback(
        month => {
            const newValue = moment(value);
            newValue.month(month - 1);
            onChange(newValue.startOf('day').format());
        },
        [value, onChange]
    );

    const handleYearChange = useCallback(
        year => {
            const newValue = moment(value);
            newValue.year(year);
            onChange(newValue.startOf('day').format());
        },
        [value, onChange]
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Select
                    label="Day"
                    options="day"
                    value={momentValue ? momentValue.date() : null}
                    onChange={handleDateChange}
                />
            </Grid>
            <Grid item xs={4}>
                <Select
                    label="Month"
                    options="month"
                    value={momentValue ? momentValue.month() + 1 : null}
                    onChange={handleMonthChange}
                />
            </Grid>
            <Grid item xs={4}>
                <Select
                    label="Year"
                    options="year"
                    value={momentValue ? momentValue.year() : null}
                    onChange={handleYearChange}
                    onBlur={onBlur}
                />
            </Grid>
        </Grid>
    );
};

export default DateInput;

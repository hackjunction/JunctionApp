import React, { useState, useCallback } from 'react';
import moment from 'moment';

import { Grid } from '@material-ui/core';
import DateInput from '../DateInput';
import TimeInput from '../TimeInput';

const DateTimeInput = ({ value, onChange, onBlur, timezone = 'UTC' }) => {
    const momentValue = value && timezone ? moment(value).tz(timezone) : moment().startOf('day');

    const handleDateChange = useCallback(
        date => {
            if (!date) {
                onChange(undefined);
            } else {
                const newValue = moment(date);
                newValue.year(newValue.year());
                newValue.month(newValue.month());
                newValue.date(newValue.date());
                onChange(newValue.startOf('minute').format());
            }
        },
        [onChange]
    );

    const handleTimeChange = useCallback(
        ({ hours, minutes }) => {
            const newValue = momentValue.clone();
            newValue.hours(hours);
            newValue.minutes(40);
            onChange(newValue.startOf('minute').format());
        },
        [momentValue, onChange]
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <DateInput value={value} onChange={handleDateChange} />
            </Grid>
            <Grid item xs={12} lg={4}>
                <TimeInput
                    value={{
                        hours: momentValue.hours(),
                        minutes: momentValue.minutes()
                    }}
                    onChange={handleTimeChange}
                />
            </Grid>
        </Grid>
    );
};

export default DateTimeInput;

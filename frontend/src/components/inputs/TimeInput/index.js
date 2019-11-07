import React, { useCallback } from 'react';

import { Grid } from '@material-ui/core';
import Select from 'components/inputs/Select';

const HOURS = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
];
const MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

const DEFAULT_VALUE = {
    hours: HOURS[0],
    minutes: MINUTES[0]
};

const TimeInput = ({ value = DEFAULT_VALUE, onChange }) => {
    const handleHoursChange = useCallback(
        hours => {
            onChange({
                ...value,
                hours
            });
        },
        [onChange, value]
    );

    const handleMinutesChange = useCallback(
        minutes => {
            onChange({
                ...value,
                minutes
            });
        },
        [onChange, value]
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Select
                    label="HH"
                    options={HOURS.map(hour => ({
                        value: hour,
                        label: hour
                    }))}
                    value={value.hours}
                    onChange={handleHoursChange}
                />
            </Grid>
            <Grid item xs={6}>
                <Select
                    label="mm"
                    options={MINUTES.map(minute => ({
                        value: minute,
                        label: minute
                    }))}
                    value={value.minutes}
                    onChange={handleMinutesChange}
                />
            </Grid>
        </Grid>
    );
};

export default TimeInput;

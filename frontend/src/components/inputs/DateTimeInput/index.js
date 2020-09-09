import React, { useCallback } from 'react'
import moment from 'moment-timezone'

import { Grid } from '@material-ui/core'
import DateInput from '../DateInput'
import TimeInput from '../TimeInput'

const DateTimeInput = React.memo(
    ({ value, onChange, onBlur, timezone = 'UTC' }) => {
        const momentValue =
            value && timezone
                ? moment(value).tz(timezone)
                : moment().tz(timezone).startOf('day')

        const handleDateChange = useCallback(
            date => {
                if (!date) {
                    onChange(undefined)
                } else {
                    const newValue = momentValue.clone()
                    const dateAsMoment = moment(date)
                    newValue.year(dateAsMoment.year())
                    newValue.month(dateAsMoment.month())
                    newValue.date(dateAsMoment.date())
                    onChange(newValue.startOf('minute').format())
                }
            },
            [onChange, momentValue]
        )

        const handleTimeChange = useCallback(
            ({ hours, minutes }) => {
                const newValue = momentValue.clone()
                newValue.hour(hours)
                newValue.minute(minutes)
                onChange(newValue.startOf('minute').format())
            },
            [momentValue, onChange]
        )

        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <DateInput value={value} onChange={handleDateChange} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <TimeInput
                        value={{
                            hours: momentValue.hours(),
                            minutes: momentValue.minutes(),
                        }}
                        onChange={handleTimeChange}
                    />
                </Grid>
            </Grid>
        )
    }
)

export default DateTimeInput

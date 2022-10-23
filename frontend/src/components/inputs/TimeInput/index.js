import React, { useCallback } from 'react'

import { Grid } from '@material-ui/core'
import Select from 'components/inputs/Select'

const HOURS = Array.apply(null, Array(24)).map((value, index) => {
    if (index < 10) {
        return {
            value: index,
            label: '0' + index,
        }
    } else {
        return {
            value: index,
            label: index.toString(),
        }
    }
})

const MINUTES = Array.apply(null, Array(12)).map((value, index) => {
    if (index < 2) {
        return {
            value: index * 5,
            label: '0' + index * 5,
        }
    } else {
        return {
            value: index * 5,
            label: (index * 5).toString(),
        }
    }
})

const DEFAULT_VALUE = {
    hours: HOURS[0].value,
    minutes: MINUTES[0].value,
}

const TimeInput = ({
    value = DEFAULT_VALUE,
    onChange,
    optionsHours = HOURS,
    optionsMinutes = MINUTES,
}) => {
    const handleHoursChange = useCallback(
        hours => {
            const newValue = {
                ...value,
                hours,
            }
            onChange(newValue)
        },
        [onChange, value],
    )

    const handleMinutesChange = useCallback(
        minutes => {
            const newValue = {
                ...value,
                minutes,
            }
            onChange(newValue)
        },
        [onChange, value],
    )

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Select
                    label="HH"
                    options={optionsHours}
                    value={value.hours}
                    onChange={handleHoursChange}
                />
            </Grid>
            <Grid item xs={6}>
                <Select
                    label="mm"
                    options={optionsMinutes}
                    value={value.minutes}
                    onChange={handleMinutesChange}
                />
            </Grid>
        </Grid>
    )
}

export default TimeInput

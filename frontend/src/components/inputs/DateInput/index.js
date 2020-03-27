import React, { useCallback } from 'react'

import { Grid, Box, Typography } from '@material-ui/core'
import moment from 'moment'
import Select from 'components/inputs/Select'
import { useTranslation } from 'react-i18next';

const DateInput = ({ label, value, onChange, onBlur }) => {
    const momentValue = value ? moment(value) : null
    
    const handleDateChange = useCallback(
        date => {
            const newValue = moment(value)
            newValue.date(date)
            onChange(newValue.startOf('day').format())
        },
        [value, onChange]
    )
const { t, i18n } = useTranslation();
    const handleMonthChange = useCallback(
        month => {
            const newValue = moment(value)
            newValue.month(month - 1)
            onChange(newValue.startOf('day').format())
        },
        [value, onChange]
    )

    const handleYearChange = useCallback(
        year => {
            const newValue = moment(value)
            newValue.year(year)
            onChange(newValue.startOf('day').format())
        },
        [value, onChange]
    )

    return (
        <Box>
            {label && <Typography variant="subtitle1">{label}</Typography>}
            <Grid container spacing={3}>
                <Grid item xs={4} md={4}>
                    <Select
                        label={t('Day_')}
                        options="day"
                        value={momentValue ? momentValue.date() : null}
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={8} md={4}>
                    <Select
                        label={t('Month_')}
                        options="month"
                        value={momentValue ? momentValue.month() + 1 : null}
                        onChange={handleMonthChange}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Select
                        label={t('Year_')}
                        options="year"
                        value={momentValue ? momentValue.year() : null}
                        onChange={handleYearChange}
                        onBlur={onBlur}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default DateInput

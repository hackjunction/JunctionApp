import React from 'react'

import { Box, Grid, Paper } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { Field } from 'formik'
import Button from 'components/generic/Button'
import TextInput from 'components/inputs/TextInput'
import DateTimeInput from 'components/inputs/DateTimeInput'
import TimelineForm from './TimelineForm'

export default () => {
    return (
        <Grid item xs={12}>
            <Field
                name="eventTimeline.items"
                render={({ field, form }) => {
                    return (
                        <FormControl
                            label="Timeline"
                            hint="Timeline for the event (displayed on the dashboard)"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TimelineForm
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                            />
                        </FormControl>
                    )
                }}
            />
        </Grid>
    )
}

import React from 'react'

import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { Field } from 'formik'
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
                            hint="Timeline for the event (displayed on the dashboard and the event information page). Adjust the dates to actual timestamps of your schedule."
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

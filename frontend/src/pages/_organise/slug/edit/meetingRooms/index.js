import React from 'react'

import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { Field } from 'formik'
import MeetingRoomsForm from './MeetingRoomsForm'

export default () => {
    return (
        <Grid item xs={12}>
            <Field
                name="meetingRooms"
                render={({ field, form }) => {
                    return (
                        <FormControl
                            label="Meeting Rooms"
                            hint="Rooms available for meetings"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <MeetingRoomsForm
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

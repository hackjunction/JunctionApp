import React from 'react'

import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import BooleanInput from 'components/inputs/BooleanInput'

import { FastField, Field } from 'formik'
import MeetingRoomsForm from './MeetingRoomsForm'

export default () => {
    return (
        <Grid spacing={3} container>
            <Grid item xs={12}>
                <FastField
                    name="meetingsEnabled"
                    render={({ field, form }) => (
                        <FormControl
                            label="Does this event have meetings?"
                            hint={
                                'Can participants book meetings with mentors? ' +
                                'Meetings can happen either live in meeting rooms or remote via Google Meet.'
                            }
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <BooleanInput
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="meetingRooms"
                    render={({ field, form }) => {
                        if (form.values.meetingsEnabled) {
                            return (
                                <FormControl
                                    label="Meetings"
                                    hint="Rooms available for meetings"
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <MeetingRoomsForm
                                        value={field.value}
                                        onChange={value => {
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            )
                                        }}
                                    />
                                </FormControl>
                            )
                        }
                        return null
                    }}
                />
            </Grid>
        </Grid>
    )
}

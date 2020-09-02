import React, { useState, useEffect } from 'react'

import { Grid } from '@material-ui/core'
import { FastField } from 'formik'
import FormControl from 'components/inputs/FormControl'
import AddMentorForm from './AddMentorForm'
import MentorDetail from './MentorDetail'
import MentorsService from 'services/mentors'

export default () => {
    const [mentors, setMentors] = useState([])
    useEffect(() => {
        MentorsService.getFullMentors().then(mentors => {
            if (mentors) setMentors(mentors)
        })
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="tags"
                    render={({ field, form }) => (
                        <FormControl label="Mentor" hint="Add mentors">
                            <AddMentorForm
                                value={field.value}
                                fieldName={field.name}
                                setFieldValue={form.setFieldValue}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                {mentors.map(mentor => (
                    <MentorDetail mentor={mentor} redeemable={true} />
                ))}
            </Grid>
        </Grid>
    )
}

import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router'
import { Grid } from '@material-ui/core'
import { FastField } from 'formik'
import FormControl from 'components/inputs/FormControl'
import AddMentorForm from './AddMentorForm'
import MentorDetail from './MentorDetail'
import MentorsService from 'services/mentors'

export default () => {
    const match = useRouteMatch()
    // const { t } = useTranslation()
    const slug = match.path.slice(10).split('/')[0].toString()
    const [mentors, setMentors] = useState([])
    useEffect(() => {
        MentorsService.getMentorsBySlug(slug).then(mentors => {
            console.log('Mentors in getMentorsBySlug', mentors)
            console.log('Mentors length', mentors.length)
            if (mentors) setMentors(mentors)
        })
    }, [slug])

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

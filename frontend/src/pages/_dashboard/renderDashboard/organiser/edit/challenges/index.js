import React from 'react'

import { Grid, Box } from '@material-ui/core'
import { FastField, Field } from 'formik'

import FormControl from 'components/inputs/FormControl'
import BooleanInput from 'components/inputs/BooleanInput'

import ChallengesForm from './ChallengesForm'

export default () => {
    return (
        <Grid spacing={3} container>
            <Grid item xs={12}>
                <FastField
                    name="challengesEnabled"
                    render={({ field, form }) => (
                        <FormControl
                            label="Does this event have multiple challenges?"
                            hint={
                                'Do you have multiple different challenges from partners, or is every participant working ' +
                                'on the same challenge? Challenge winners are decided separately from track winners, and ' +
                                'the partner responsible for a given challenge will decide the winner(s) of that challenge. ' +
                                'Teams will be able to submit their project to 0-5 different challenges, and the respective ' +
                                'partner will be able to view all projects submitted to their challenge.'
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
                    name="challenges"
                    render={({ field, form }) => {
                        if (form.values.challengesEnabled) {
                            return (
                                <FormControl
                                    label="Challenges"
                                    hint="Enter your different challenges here"
                                    error={
                                        Array.isArray(form.errors[field.name])
                                            ? 'One or more invalid challlenges'
                                            : form.errors[field.name]
                                    }
                                    touched={form.touched[field.name]}
                                >
                                    <ChallengesForm
                                        value={field.value}
                                        onChange={value => {
                                            form.setFieldValue(
                                                field.name,
                                                value,
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

            <Grid item xs={12}>
                <Box height="300px" />
            </Grid>
        </Grid>
    )
}

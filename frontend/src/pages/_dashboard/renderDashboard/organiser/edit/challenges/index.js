import React from 'react'

import { Grid, Box } from '@material-ui/core'
import { FastField, Field } from 'formik'

import FormControl from 'components/inputs/FormControl'
import BooleanInput from 'components/inputs/BooleanInput'

import ChallengesForm from './ChallengesForm'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import { EventHelpers } from '@hackjunction/shared'
import moment from 'moment-timezone'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const isReviewingOpen = EventHelpers.isReviewingOpen(event, moment)
    const isReviewingPast = EventHelpers.isReviewingPast(event, moment)
    return (
        <Grid spacing={3} container>
            <Grid item xs={12}>
                {(isReviewingOpen || isReviewingPast) && (
                    <p className="tw-text-red-500 tw-text-sm tw-font-semibold tw-mb-4">
                        Warning: Reviewing is now{' '}
                        {isReviewingOpen
                            ? 'open'
                            : isReviewingPast && 'completed'}{' '}
                        and if you make changes to the challenges, it might
                        cause unexpected problems. Modify at your own risk!
                    </p>
                )}
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

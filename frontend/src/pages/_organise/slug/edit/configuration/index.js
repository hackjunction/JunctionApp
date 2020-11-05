import React from 'react'

import {
    ReviewingMethods,
    OverallReviewingMethods,
    EventTypes,
} from '@hackjunction/shared'
import { Grid, Box } from '@material-ui/core'
import { FastField, Field } from 'formik'

import FormControl from 'components/inputs/FormControl'
import Select from 'components/inputs/Select'
import BooleanInput from 'components/inputs/BooleanInput'
import StreetAddressForm from 'components/inputs/StreetAddressForm'

import TravelGrantConfig from './TravelGrantConfig'
import TracksForm from './TracksForm'
import ChallengesForm from './ChallengesForm'

export default () => {
    return (
        <Grid spacing={3} container>
            <Grid item xs={12}>
                <FastField
                    name="published"
                    render={({ field, form }) => (
                        <FormControl
                            label="Published"
                            hint="Is this event visible to the public?"
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
                <FastField
                    name="galleryOpen"
                    render={({ field, form }) => (
                        <FormControl
                            label="Project Gallery open"
                            hint="Are the projects submitted to this event visible to the public?"
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
                <FastField
                    name="allowProjectSubmissionsPerChallenge"
                    render={({ field, form }) => (
                        <FormControl
                            label="Projects submitted per challenge"
                            hint="Does this event allow project submissions for each challenge individually?"
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
                <FastField
                    name="eventType"
                    render={({ field, form }) => (
                        <FormControl
                            label="Event type"
                            hint="Is this a physical or online event?"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Select
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                options={Object.keys(EventTypes).map(key => ({
                                    label: EventTypes[key].label,
                                    value: key,
                                }))}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="eventLocation"
                    render={({ field, form }) => {
                        if (form.values.eventType === 'physical') {
                            return (
                                <FormControl
                                    label="Event location"
                                    hint="Where does this event take place?"
                                >
                                    <StreetAddressForm
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        showVenueName
                                    />
                                </FormControl>
                            )
                        }
                        return null
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="travelGrantConfig"
                    render={({ field, form }) => {
                        if (form.values.eventType === 'physical') {
                            return (
                                <TravelGrantConfig
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                />
                            )
                        }
                        return null
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="tracksEnabled"
                    render={({ field, form }) => (
                        <FormControl
                            label="Does this event have multiple tracks?"
                            hint={
                                'If you are organising a large event, it might be a good idea to ' +
                                'separate it into multiple different tracks. A track is essentially a mini-hackathon ' +
                                "within your event, and will have it's own winner. Each team must participate on a single " +
                                'track, which they will select when making their submission. The winning project on each track ' +
                                'advances to the finals, where the overall winner is then decided. As a rule of thumb, ' +
                                "if your event has more than 500 participants, it's probably a good idea to use tracks. " +
                                "If you don't use tracks, there will essentially be a single track, the winner of which " +
                                'is also the overall winner.'
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
                    name="tracks"
                    render={({ field, form }) =>
                        form.values.tracksEnabled ? (
                            <FormControl
                                label="Tracks"
                                hint="Enter your different tracks here"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <TracksForm
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                />
                            </FormControl>
                        ) : null
                    }
                />
            </Grid>
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
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <ChallengesForm
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                    />
                                </FormControl>
                            )
                        }
                        return null
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="reviewMethod"
                    render={({ field, form }) => (
                        <FormControl
                            label="Reviewing method"
                            hint={
                                form.values.tracksEnabled
                                    ? 'Which method should be used to determine the ranking of projects within tracks?'
                                    : 'Which method should be used to determine the ranking of projects?'
                            }
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Select
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                options={Object.keys(ReviewingMethods).map(
                                    key => ({
                                        label: ReviewingMethods[key].label,
                                        value: key,
                                    }),
                                )}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="overallReviewMethod"
                    render={({ field, form }) => (
                        <FormControl
                            label="Overall winner method"
                            hint="Which method should be used to determine the overall winner?"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Select
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                options={Object.keys(
                                    OverallReviewingMethods,
                                ).map(key => ({
                                    label: OverallReviewingMethods[key].label,
                                    value: key,
                                }))}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="allowVoteOnOwnProject"
                    render={({ field, form }) =>
                        form.values.reviewMethod ===
                        ReviewingMethods.gavelPeerReview.id ? (
                            <FormControl
                                label="Allow vote on own projects"
                                hint="Can user vote on their own projects (consider this for events with few participants and multiple submissions per team)"
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
                        ) : null
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <Box height="300px" />
            </Grid>
        </Grid>
    )
}

import React from 'react'
import { FastField } from 'formik'
import { Grid, Typography } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Switch from 'components/generic/Switch'
import EditableOptions from '../submission/components/EditableOptions'
import { EventHelpers } from '@hackjunction/shared'
import moment from 'moment-timezone'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const isReviewingOpen = EventHelpers.isReviewingOpen(event, moment)
    const isReviewingPast = EventHelpers.isReviewingPast(event, moment)
    return (
        <Grid container spacing={8}>
            <Grid
                item
                xs={12}
                className="tw-flex tw-gap-4 tw-flex-col lg:tw-flex-row lg:tw-justify-between lg:tw-items-center"
            >
                <div className="tw-flex tw-flex-col tw-gap-2">
                    <Typography
                        className="tw-font-bold tw-tracking-tight"
                        variant="h4"
                        component="h4"
                    >
                        Score and feedback settings
                    </Typography>
                    <Typography variant="body2" component="p">
                        Customize how judged evaluate projects and set the
                        visibility of scores and feedback for participants.
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="tw-flex tw-flex-col tw-gap-2">
                    <FastField
                        name="scoreCriteriaSettings.showScore"
                        render={({ field, form }) => {
                            return (
                                <div className="tw-px-4 tw-gap-4 tw-pb-4 tw-pt-6 tw-rounded-md tw-shadow-md tw-bg-white tw-w-full tw-flex tw-justify-between tw-items-center ">
                                    <FormControl
                                        label="Score visibility for participants"
                                        hint="Enable or disable the visibility of project scores for participants. If disabled, participants will not be able to see the score their project received."
                                        touched={field.touched}
                                        error={form.errors[field.name]}
                                    ></FormControl>
                                    <Switch
                                        checked={field.value || false}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        checkedText="Enabled"
                                        uncheckedText="Disabled"
                                    />
                                </div>
                            )
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="tw-flex tw-flex-col tw-gap-2">
                    <FastField
                        name="scoreCriteriaSettings.showFeedback"
                        render={({ field, form }) => {
                            return (
                                <div className="tw-px-4 tw-gap-4 tw-pb-4 tw-pt-6 tw-rounded-md tw-shadow-md tw-bg-white tw-w-full tw-flex tw-justify-between tw-items-center ">
                                    <FormControl
                                        label="Show feedback received to participants"
                                        hint="Enable or disable the visibility of feedback left by judges to projects. If disabled, participants will not be able to see the feedback their project received."
                                        touched={field.touched}
                                        error={form.errors[field.name]}
                                    ></FormControl>
                                    <Switch
                                        checked={field.value || false}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        checkedText="Enabled"
                                        uncheckedText="Disabled"
                                    />
                                </div>
                            )
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="tw-flex tw-flex-col tw-gap-2">
                    <FastField
                        name="scoreCriteriaSettings.reviewAnyChallenge"
                        render={({ field, form }) => {
                            return (
                                <div className="tw-px-4 tw-gap-4 tw-pb-4 tw-pt-6 tw-rounded-md tw-shadow-md tw-bg-white tw-w-full tw-flex tw-justify-between tw-items-center ">
                                    <FormControl
                                        label="Allow reviewers to rate projects for any challenge"
                                        hint="Enable or disable the ability for reviewers to rate projects for any challenge. If disabled, reviewers will only be able to rate projects for challenges they are assigned to."
                                        touched={field.touched}
                                        error={form.errors[field.name]}
                                    ></FormControl>
                                    <Switch
                                        checked={field.value || false}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        checkedText="Enabled"
                                        uncheckedText="Disabled"
                                    />
                                </div>
                            )
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                {(isReviewingOpen || isReviewingPast) && (
                    <p className="tw-text-red-500 tw-text-sm tw-font-semibold tw-mb-4">
                        Warning: Reviewing is now{' '}
                        {isReviewingOpen
                            ? 'open'
                            : isReviewingPast && 'completed'}{' '}
                        and if you make changes to the score criteria, it might
                        cause unexpected problems. Modify at your own risk!
                    </p>
                )}
                <FastField
                    name="scoreCriteriaSettings.scoreCriteria"
                    render={({ field, form }) => (
                        <FormControl
                            label={`Judge evaluation criteria`}
                            hint="Add, edit, or delete the criteria judges will use to evaluate projects. For example, creativity, innovation, simplicity, efficiency, etc."
                        >
                            <EditableOptions
                                options={
                                    field.value
                                        ? field.value.map(c => c.label)
                                        : []
                                }
                                handleAddOption={value => {
                                    form.setFieldValue(field.name, [
                                        ...(field.value || []),
                                        {
                                            criteria: value
                                                .toLowerCase()
                                                .replace(/\s/g, '_'),
                                            label: value,
                                        },
                                    ])
                                }}
                                handleEdit={(index, value) => {
                                    const newArr = [...field.value]
                                    newArr[index] = {
                                        criteria: value
                                            .toLowerCase()
                                            .replace(/\s/g, '_'),
                                        label: value,
                                    }
                                    form.setFieldValue(field.name, newArr)
                                }}
                                handleDelete={updatedArray => {
                                    const arrayFormated = updatedArray.map(
                                        c => ({
                                            criteria: c
                                                .toLowerCase()
                                                .replace(/\s/g, '_'),
                                            label: c,
                                        }),
                                    )
                                    form.setFieldValue(
                                        field.name,
                                        arrayFormated,
                                    )
                                }}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    )
}

import React from 'react';

import { Grid } from '@material-ui/core';
import { FastField } from 'formik';
import Select from 'components/inputs/Select';
import FormControl from 'components/inputs/FormControl';
import DateTimeInput from 'components/inputs/DateTimeInput';

const OrganiserEditEventTimes = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="timezone"
                    render={({ field, form }) => (
                        <FormControl
                            label="Timezone"
                            hint="Which timezone is your event happening in?"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Select
                                placeholder="Choose a timezone"
                                value={field.value}
                                options="timezone"
                                onChange={timezone => form.setFieldValue(field.name, timezone)}
                                onBlur={() => form.setFieldTouched}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="registrationStartTime"
                    render={({ field, form }) => (
                        <FormControl
                            label="Registration opens"
                            hint=""
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <DateTimeInput
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="registrationEndTime"
                    render={({ field, form }) => (
                        <FormControl
                            label="Registration closes"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <DateTimeInput
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="startTime"
                    render={({ field, form }) => (
                        <FormControl
                            label="Event begins"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <DateTimeInput
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="submissionsStartTime"
                    render={({ field, form }) => (
                        <FormControl
                            label="Submissions open"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <DateTimeInput
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="submissionsEndTime"
                    render={({ field, form }) => (
                        <FormControl
                            label="Submissions close"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <DateTimeInput
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="reviewingStartTime"
                    render={({ field, form }) => (
                        <FormControl
                            label="Reviewing period begins"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <DateTimeInput
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="reviewingEndTime"
                    render={({ field, form }) => (
                        <FormControl
                            label="Reviewing period ends"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <DateTimeInput
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="endTime"
                    render={({ field, form }) => (
                        <FormControl
                            label="Event ends"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <DateTimeInput
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    );
};

export default OrganiserEditEventTimes;

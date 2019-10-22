import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { FastField } from 'formik';
import Select from 'components/inputs/Select';
import FormControl from 'components/inputs/FormControl';
import DateTimePicker from 'components/inputs/DateTimePicker';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiBox-root': {
            background: theme.palette.background.paper,
            padding: theme.spacing(2),
            boxShadow: theme.shadows[1],
            borderRadius: '2px'
        }
    }
}));

const OrganiserEditEventTimes = props => {
    const classes = useStyles();
    function renderDateField(field, timezone) {
        return (
            <DateTimePicker
                value={field.value}
                onChange={value => {
                    props.setFieldValue(field.name, value);
                }}
                defaultTime="12:00"
                timezone={timezone}
            />
        );
    }

    return (
        <Grid container spacing={3} classes={{ root: classes.root }}>
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
                            {renderDateField(field, props.values.timezone)}
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
                            {renderDateField(field, props.values.timezone)}
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
                            {renderDateField(field, props.values.timezone)}
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
                            {renderDateField(field, props.values.timezone)}
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
                            {renderDateField(field, props.values.timezone)}
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
                            {renderDateField(field, props.values.timezone)}
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    );
};

export default OrganiserEditEventTimes;

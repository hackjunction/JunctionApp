import React from 'react';

import { connect } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import { FastField } from 'formik';

import MarkdownInput from 'components/inputs/MarkdownInput';
import FormControl from 'components/inputs/FormControl';
import TextInput from 'components/inputs/TextInput';
import ImageUpload from 'components/inputs/ImageUpload';

import * as OrganiserSelectors from 'redux/organiser/selectors';

const OrganiserEditEventInfo = ({ event }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="coverImage"
                    render={({ field, form }) => (
                        <FormControl
                            label="Cover image"
                            hint="A cool cover image for your event. Max dimensions 1920x1080 (2MB), will be scaled down if larger."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Box width="100%" pt="56.25%" position="relative">
                                <ImageUpload
                                    value={field.value}
                                    onChange={value => {
                                        form.setFieldValue(field.name, value);
                                        form.setFieldTouched(field.name);
                                    }}
                                    uploadUrl={`/api/upload/events/${event.slug}/cover-image`}
                                    resizeMode="cover"
                                />
                            </Box>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="logo"
                    render={({ field, form }) => (
                        <FormControl
                            label="Event logo"
                            hint="A logo for your event. Max dimensions 640x640 (2MB), will be scaled down if larger."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Box width="100%" pt="33.33%" position="relative">
                                <ImageUpload
                                    value={field.value}
                                    onChange={value => {
                                        form.setFieldValue(field.name, value);
                                        form.setFieldTouched(field.name);
                                    }}
                                    uploadUrl={`/api/upload/events/${event.slug}/logo`}
                                    resizeMode="contain"
                                />
                            </Box>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="name"
                    render={({ field, form }) => (
                        <FormControl
                            label="Event name"
                            hint="The name of your event"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="name"
                                placeholder="Big Hackathon 2020"
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                                onBlur={() => form.setFieldTouched(field.name)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="description"
                    render={({ field, form }) => (
                        <FormControl
                            label="Description"
                            hint="A hype description for your event."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <MarkdownInput
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                                placeholder="Description goes here"
                            />
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state)
});

export default connect(mapState)(OrganiserEditEventInfo);

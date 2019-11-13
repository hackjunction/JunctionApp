import React from 'react';

import { ReviewingMethods, EventTypes } from '@hackjunction/shared';
import { Grid } from '@material-ui/core';
import { FastField, Field } from 'formik';

import FormControl from 'components/inputs/FormControl';
import Select from 'components/inputs/Select';
import StreetAddressForm from 'components/inputs/StreetAddressForm';
import TravelGrantConfig from './TravelGrantConfig';
import DiscordConfig from './DiscordConfig';
import TracksConfig from './TracksConfig';

const ConfigurationTab = () => {
    return (
        <Grid spacing={3} container>
            <Grid item xs={12}>
                <FastField
                    name="published"
                    render={({ field, form }) => (
                        <FormControl
                            label="Published"
                            hint="Once published, this event will be visible to the public"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        />
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
                                onChange={value => form.setFieldValue(field.name, value)}
                                options={Object.keys(EventTypes).map(key => ({
                                    label: EventTypes[key].label,
                                    value: key
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
                                <FormControl label="Event location" hint="Where does this event take place?">
                                    <StreetAddressForm
                                        value={field.value}
                                        onChange={value => form.setFieldValue(field.name, value)}
                                        showVenueName
                                    />
                                </FormControl>
                            );
                        }
                        return null;
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
                                    onChange={value => form.setFieldValue(field.name, value)}
                                />
                            );
                        }
                        return null;
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="tracksConfig"
                    render={({ field, form }) => (
                        <TracksConfig value={field.value} onChange={value => form.setFieldValue(field.name, value)} />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="discordConfig"
                    render={({ field, form }) => (
                        <DiscordConfig value={field.value} onChange={value => form.setFieldValue(field.name, value)} />
                    )}
                ></FastField>
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="reviewConfig"
                    render={({ field, form }) => (
                        <FormControl
                            label="Reviewing method"
                            hint="Which reviewing method should be used?"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Select
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                                options={Object.keys(ReviewingMethods).map(key => ({
                                    label: ReviewingMethods[key].label,
                                    value: key
                                }))}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    );
};

export default ConfigurationTab;

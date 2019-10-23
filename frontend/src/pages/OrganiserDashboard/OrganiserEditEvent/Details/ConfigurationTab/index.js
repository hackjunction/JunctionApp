import React from 'react';

import { Grid } from '@material-ui/core';
import { FastField, Field } from 'formik';

import FormControl from 'components/inputs/FormControl';
import TextInput from 'components/inputs/TextInput';
import Select from 'components/inputs/Select';
import StreetAddressForm from 'components/inputs/StreetAddressForm';
import BooleanInput from 'components/inputs/BooleanInput';

const ConfigurationTab = () => {
    return (
        <Grid spacing={3} container>
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
                                options={[
                                    {
                                        label: 'Physical event',
                                        value: 'physical'
                                    },
                                    {
                                        label: 'Online event',
                                        value: 'online'
                                    }
                                ]}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="location"
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
                    name="travelGrants"
                    render={({ field, form }) => {
                        if (form.values.eventType === 'physical') {
                            return (
                                <FormControl
                                    label="Travel grants"
                                    hint="Will you be offering travel grants for participants?"
                                >
                                    <BooleanInput
                                        value={field.value || false}
                                        onChange={value => form.setFieldValue(field.name, value)}
                                    />
                                </FormControl>
                            );
                        }
                        return null;
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="vetting"
                    render={({ field, form }) => {
                        return (
                            <FormControl
                                label="Participant vetting"
                                hint="Do you want to be able to vet participants? If no, all applicants are automatically accepted"
                            >
                                <BooleanInput
                                    value={field.value || false}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                />
                            </FormControl>
                        );
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="maxParticipants"
                    render={({ field, form }) => {
                        return (
                            <FormControl label="Maximum participants" hint="Is there a maximum amount of participants?">
                                <TextInput
                                    label="Maximum participants"
                                    placeholder="Or leave empty for no maximum"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                />
                            </FormControl>
                        );
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <ul>
                    <li>Quick links on dashboard</li>
                    <li>Event announcements</li>
                    <li>Discord configuration for event - what</li>
                    <li>Is it a physical event or online?</li>
                    <li>If physical: Travel grants available? If yes, in what currency>?</li>
                    <li>If physical: Where is the event?</li>
                    <li>Participant vetting or no? If no, is there a maximum amount of participants?</li>
                    <li>Does the event have multiple tracks?</li>
                    <li>Does the event have multiple challenges?</li>
                    <li>Which judging method to use?</li>
                </ul>
                <p>
                    Once the event configuration is done, probably best to not send all of this config to the client
                    every time
                </p>
            </Grid>
        </Grid>
    );
};

export default ConfigurationTab;

import React from 'react';

import { sortBy } from 'lodash-es';
import { connect } from 'react-redux';
import { Formik, FastField } from 'formik';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import Select from 'components/inputs/Select';
import BooleanInput from 'components/inputs/BooleanInput';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

const Winners = ({ event, projects, updateWinners }) => {
    if (!event || !event.tracks) return null;
    const sorted = sortBy(projects, p => p.name);

    const onSubmit = async values => {
        try {
            await updateWinners(event.slug, values);
        } catch (err) {
            console.log('ERR', err);
            window.alert('Oops! something went wrong. Try again.');
        }
    };

    const initialValues = {
        trackWinners: event.winners ? event.winners.trackWinners || {} : {}
    };

    console.log('WINNERs', event.winners);

    return (
        <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={onSubmit}>
            {formikProps => (
                <Grid container spacing={3}>
                    {console.log(formikProps.values)}
                    <Grid item xs={12}>
                        <Typography variant="h6">Track winners</Typography>
                    </Grid>
                    <FastField
                        name="trackWinners"
                        render={({ field, form }) =>
                            event.tracks.map(track => {
                                return (
                                    <Grid item xs={12} key={track.slug}>
                                        <Select
                                            label={track.name}
                                            value={field.value[track.slug]}
                                            onChange={value => {
                                                form.setFieldValue(field.name, {
                                                    ...field.value,
                                                    [track.slug]: value
                                                });
                                            }}
                                            options={sorted
                                                .filter(project => {
                                                    return project.track === track.slug;
                                                })
                                                .map(project => ({
                                                    value: project._id,
                                                    label: project.name
                                                }))}
                                        />
                                    </Grid>
                                );
                            })
                        }
                    />
                    <Grid item xs={12}>
                        <Typography variant="h6">Finalist voting open?</Typography>
                        <FastField
                            name="votingOpen"
                            render={({ field, form }) => (
                                <BooleanInput
                                    value={field.value || false}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" fullWidth onClick={formikProps.submitForm}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Formik>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state)
});

const mapDispatch = dispatch => ({
    updateWinners: (slug, winners) => dispatch(OrganiserActions.updateWinners(slug, winners))
});
export default connect(mapState, mapDispatch)(Winners);

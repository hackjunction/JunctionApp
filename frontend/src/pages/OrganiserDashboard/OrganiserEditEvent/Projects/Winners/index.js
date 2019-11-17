import React, { useCallback, useEffect, useState } from 'react';

import { sortBy, find } from 'lodash-es';
import { connect } from 'react-redux';
import { Formik, FastField } from 'formik';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import Select from 'components/inputs/Select';
import BooleanInput from 'components/inputs/BooleanInput';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import * as AuthSelectors from 'redux/auth/selectors';

import WinnerVoteService from 'services/winnerVote';

const Winners = ({ event, projects, updateWinners, idToken }) => {
    const sorted = sortBy(projects, p => p.name);
    const [results, setResults] = useState();
    const getResults = useCallback(() => {
        if (!event || !event.tracks) return;
        WinnerVoteService.getResults(idToken, event.slug).then(data => {
            setResults(data);
        });
    }, [idToken, event]);

    useEffect(() => {
        getResults();
    }, [getResults]);

    useEffect(() => {
        getResults();
    }, [getResults]);

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

    if (!event || !event.tracks) return null;

    return (
        <React.Fragment>
            {results && (
                <Box mt={3}>
                    <Typography variant="h6">Finalist results:</Typography>
                    {Object.keys(results).map(projectId => {
                        const voteCount = results[projectId].length;
                        const project = find(projects, p => p._id === projectId);

                        return (
                            <Typography>
                                {project.name}: {voteCount}
                            </Typography>
                        );
                    })}
                </Box>
            )}
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
        </React.Fragment>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state),
    idToken: AuthSelectors.getIdToken(state)
});

const mapDispatch = dispatch => ({
    updateWinners: (slug, winners) => dispatch(OrganiserActions.updateWinners(slug, winners))
});
export default connect(mapState, mapDispatch)(Winners);

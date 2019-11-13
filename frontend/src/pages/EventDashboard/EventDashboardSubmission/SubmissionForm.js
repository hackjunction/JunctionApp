import React from 'react';

import * as yup from 'yup';
import { connect } from 'react-redux';
import { Formik, FastField, Field } from 'formik';
import { ProjectSchema } from '@hackjunction/shared';
import { Grid, Box } from '@material-ui/core';

import FormControl from 'components/inputs/FormControl';
import TextInput from 'components/inputs/TextInput';
import TextAreaInput from 'components/inputs/TextAreaInput';
import MarkdownInput from 'components/inputs/MarkdownInput';
import BooleanInput from 'components/inputs/BooleanInput';
import Select from 'components/inputs/Select';
import Button from 'components/generic/Button';
import ProjectImages from './ProjectImages';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const SubmissionForm = ({ event }) => {
    const initialValues = {
        sourcePublic: true
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(ProjectSchema(event));
                });
            }}
            onSubmit={(values, actions) => {
                console.log('VALUES', values);
            }}
        >
            {formikProps => (
                <React.Fragment>
                    {console.log(formikProps)}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FastField
                                name="name"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Name"
                                        hint="A catchy name for your project"
                                        touched={form.touched[field.name]}
                                        error={form.errors[field.name]}
                                    >
                                        <TextInput
                                            placeholder="Awesome-o 3000"
                                            value={field.value}
                                            onChange={value => form.setFieldValue(field.name, value)}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FastField
                                name="images"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Images"
                                        hint="Upload up to 5 images of your project! Uploaded images will be cropped to 1200x600, resize them as close as possible before upload for best results. Maximum size per image: 2MB, allowed formats: .png/.jpg."
                                        touched={form.touched[field.name]}
                                        error={form.errors[field.name]}
                                    >
                                        <ProjectImages
                                            value={field.value}
                                            onChange={value => form.setFieldValue(field.name, value)}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FastField
                                name="punchline"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Punchline"
                                        hint="A short and sweet description of what your project is about. Max 300 characters."
                                        touched={form.touched[field.name]}
                                        error={form.errors[field.name]}
                                    >
                                        <TextAreaInput
                                            placeholder="What problem does your project solve? How would you describe it in two sentences?"
                                            value={field.value}
                                            onChange={value => form.setFieldValue(field.name, value)}
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
                                        hint="All the juicy details about what you've made. Max 3000 characters."
                                        touched={form.touched[field.name]}
                                        error={form.errors[field.name]}
                                    >
                                        <MarkdownInput
                                            value={field.value}
                                            onChange={value => form.setFieldValue(field.name, value)}
                                            placeholder={
                                                "Here's a few ideas:\n\n" +
                                                '- Describe the problem it solves\n' +
                                                '- What real-world impact it has\n' +
                                                '- What technologies you used to make it\n' +
                                                '- Future plans regarding the project\n\n' +
                                                'Go wild!'
                                            }
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        {event.tracksEnabled && (
                            <Grid item xs={12}>
                                <FastField
                                    name="track"
                                    render={({ field, form }) => (
                                        <FormControl
                                            label="Track"
                                            hint="Choose the track you are participating on. If you've completed multiple challenges from different tracks, choose the one that best matches your project."
                                            touched={form.touched[field.name]}
                                            error={form.errors[field.name]}
                                        >
                                            <Select
                                                label="Track"
                                                value={field.value}
                                                onChange={value => form.setFieldValue(field.name, value)}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        )}
                        {event.challengesEnabled && (
                            <Grid item xs={12}>
                                <FastField
                                    name="challenges"
                                    render={({ field, form }) => (
                                        <FormControl
                                            label="Challenges"
                                            hint="Which partner challenges do you want to submit your project in? You can choose up to 5."
                                            touched={form.touched[field.name]}
                                            error={form.errors[field.name]}
                                        >
                                            <Select
                                                label="Challenges"
                                                value={field.value}
                                                onChange={value => form.setFieldValue(field.name, value)}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <FastField
                                name="demo"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Demo"
                                        hint="Have a demo to show of your project? Link it here! This can be a live version of your project running somewhere on the web, a video of it in action, or something else living on the public internet"
                                        touched={form.touched[field.name]}
                                        error={form.errors[field.name]}
                                    >
                                        <TextInput
                                            value={field.value}
                                            onChange={value => form.setFieldValue(field.name, value)}
                                            placeholder="https://..."
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FastField
                                name="source"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Source code"
                                        hint="A link to the repository containing your source code"
                                        touched={form.touched[field.name]}
                                        error={form.errors[field.name]}
                                    >
                                        <TextInput
                                            value={field.value}
                                            onChange={value => form.setFieldValue(field.name, value)}
                                            placeholder="https://..."
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FastField
                                name="sourcePublic"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Source code public?"
                                        hint="We encourage everyone to show their source code to the public, so others can see how your awesome project was built. In case you don't want to, however, or your source code contains something sensitive, you can choose to show it only to the event organisers and the partners whose challenges you're participating in"
                                        touched={form.touched[field.name]}
                                        error={form.errors[field.name]}
                                    >
                                        <BooleanInput
                                            value={field.value}
                                            onChange={value => form.setFieldValue(field.name, value)}
                                        />
                                    </FormControl>
                                )}
                            />
                            <FastField
                                name="location"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Table location"
                                        hint="Where can judges find your project? Make sure this is always correct and up-to-date!"
                                        touched={form.touched[field.name]}
                                        error={form.errors[field.name]}
                                    >
                                        <TextInput
                                            value={field.value}
                                            onChange={value => form.setFieldValue(field.name, value)}
                                            placeholder="E.g. A3"
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box margin="0 auto" width="100%" maxWidth="300px">
                                <Button
                                    onClick={formikProps.submitForm}
                                    fullWidth
                                    color="theme_turquoise"
                                    variant="contained"
                                >
                                    Save changes
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </React.Fragment>
            )}
        </Formik>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state)
});

export default connect(mapState)(SubmissionForm);

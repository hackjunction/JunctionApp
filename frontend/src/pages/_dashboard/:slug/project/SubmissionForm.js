import React, { useMemo } from 'react'

import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, FastField } from 'formik'
import { ProjectSchema, EventTypes } from '@hackjunction/shared'
import { Grid, Box } from '@material-ui/core'

import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import MarkdownInput from 'components/inputs/MarkdownInput'
import BooleanInput from 'components/inputs/BooleanInput'
import Select from 'components/inputs/Select'
import Button from 'components/generic/Button'
import PageWrapper from 'components/layouts/PageWrapper'
import ErrorsBox from 'components/generic/ErrorsBox'
import ProjectImages from './ProjectImages'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import * as AuthSelectors from 'redux/auth/selectors'

//TODO make the form labels and hints customizable
export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const idTokenData = useSelector(AuthSelectors.idTokenData)

    const projects = useSelector(DashboardSelectors.projects)
    const projectLoading = useSelector(DashboardSelectors.projectsLoading)

    let project = projects && projects.length ? projects[0] : null || null

    const initialValues = {
        sourcePublic: true,
        hiddenMembers: [],
        privacy:
            !projectLoading && project
                ? !project.hiddenMembers.includes(idTokenData.sub)
                : true,
        ...project,
    }

    const trackOptions = useMemo(() => {
        if (!event.tracksEnabled || !event.tracks) return null
        return event.tracks.map(track => ({
            label: track.name,
            value: track.slug,
        }))
    }, [event])

    const challengeOptions = useMemo(() => {
        if (!event.challengesEnabled || !event.challenges) return null
        return event.challenges.map(challenge => ({
            label: `${challenge.name} (${challenge.partner})`,
            value: challenge.slug,
        }))
    }, [event])

    const locationEnabled = useMemo(() => {
        return event.eventType === EventTypes.physical.id
    }, [event])

    const renderForm = formikProps => {
        if (projectLoading) {
            return <PageWrapper loading />
        }
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FastField
                            name="name"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Name"
                                    hint="A catchy name for your project"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        placeholder="Awesome-o 3000"
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
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
                                    touched={true}
                                    error={form.errors[field.name]}
                                >
                                    <ProjectImages
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            )
                                        }
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
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextAreaInput
                                        placeholder="What problem does your project solve? How would you describe it in two sentences?"
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
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
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <MarkdownInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
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
                    {trackOptions && (
                        <Grid item xs={12}>
                            <FastField
                                name="track"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Track"
                                        hint="Choose the track you are participating on. If you've completed multiple challenges from different tracks, choose the one that best matches your project."
                                        touched={
                                            form.touched[field.name] ||
                                            formikProps.submitCount > 0
                                        }
                                        error={form.errors[field.name]}
                                    >
                                        <Select
                                            label="Track"
                                            options={trackOptions}
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(field.name)
                                            }
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    )}
                    {challengeOptions && (
                        <Grid item xs={12}>
                            <FastField
                                name="challenges"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Challenges"
                                        hint="Which partner challenges do you want to submit your project in? You can choose up to 5."
                                        touched={
                                            form.touched[field.name] ||
                                            formikProps.submitCount > 0
                                        }
                                        error={form.errors[field.name]}
                                    >
                                        <Select
                                            label="Challenges"
                                            options={challengeOptions}
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(field.name)
                                            }
                                            isMulti
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FastField
                            name="technologies"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Technologies & Tools"
                                    hint="Add up to 5 technologies or tools you used to build this project"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <Select
                                        label="Technologies & Tools"
                                        options="technology"
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        isMulti
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FastField
                            name="demo"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Demo"
                                    hint="Download your presentation video of the project to Vimeo and link it here. Max duration is 2 minutes. (Make sure everyone receiving the link has access to the video.) If you have any materials, such as a presentation deck or a demo, they should be presented in the video."
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
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
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
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
                                    touched={true}
                                    error={form.errors[field.name]}
                                >
                                    <BooleanInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            )
                                        }
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid>
                    {locationEnabled && (
                        <Grid item xs={12}>
                            <FastField
                                name="location"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Table location"
                                        hint="Where can judges find your project? Make sure this is always correct and up-to-date!"
                                        touched={
                                            form.touched[field.name] ||
                                            formikProps.submitCount > 0
                                        }
                                        error={form.errors[field.name]}
                                    >
                                        <TextInput
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(field.name)
                                            }
                                            placeholder="E.g. A3"
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                alignContent: 'flex-start',
                            }}
                        >
                            <FastField
                                name="privacy"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Privacy"
                                        hint="I want to be credited for the project."
                                        touched={
                                            form.touched[field.name] ||
                                            formikProps.submitCount > 0
                                        }
                                        error={form.errors[field.name]}
                                    >
                                        <BooleanInput
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                )
                                            }
                                        />
                                    </FormControl>
                                )}
                            />
                        </Box>
                    </Grid>
                    {Object.keys(formikProps.errors).length > 0 && (
                        <Grid item xs={12}>
                            <ErrorsBox errors={formikProps.errors} />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Box margin="0 auto" width="100%" maxWidth="300px">
                            <Button
                                onClick={formikProps.submitForm}
                                fullWidth
                                disabled={
                                    Object.keys(formikProps.errors).length > 0
                                }
                                color="theme_turquoise"
                                variant="contained"
                            >
                                Save changes
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(ProjectSchema(event))
                })
            }}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true)
                console.log('values are!', values)
                //No I don't want to be credited, don't show my name
                if (!values.privacy) {
                    if (!values.hiddenMembers.includes(idTokenData.sub)) {
                        values.hiddenMembers.push(idTokenData.sub)
                    }
                } else {
                    const index = values.hiddenMembers.indexOf(idTokenData.sub)
                    if (index !== -1) values.hiddenMembers.splice(index, 1)
                }
                console.log('sending', values)
                let res
                if (project) {
                    res = await dispatch(
                        DashboardActions.editProject(event.slug, values)
                    )
                } else {
                    res = await dispatch(
                        DashboardActions.createProject(event.slug, values)
                    )
                }

                if (res.error) {
                    const message =
                        res?.payload?.response?.data?.message ??
                        'Oops, something went wrong...'
                    dispatch(
                        SnackbarActions.error(message, {
                            autoHideDuration: 3000,
                        })
                    )
                } else {
                    dispatch(
                        SnackbarActions.success(
                            'Success! Project submission updated'
                        )
                    )
                }
                actions.setSubmitting(false)
            }}
        >
            {renderForm}
        </Formik>
    )
}

import React, { useMemo, useState, useEffect } from 'react'

import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, FastField } from 'formik'
import { ProjectSchema, EventTypes } from '@hackjunction/shared'
import { Grid, Box, Typography } from '@material-ui/core'
import GradientBox from 'components/generic/GradientBox'

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
import ProjectStatusInput from 'components/inputs/ProjectStatusInput'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import RegistrationSectionCustom from 'pages/_events/slug/register/RegistrationSectionCustom'
import RegistrationQuestion from 'pages/_events/slug/register/RegistrationQuestion'
import SubmissionFormCustomInput from 'components/inputs/SubmissionFormCustomInput'
import BottomBar from 'components/inputs/BottomBar'
import NameField from 'components/projects/ProjectSubmissionFields/NameField'
import ImagesField from 'components/projects/ProjectSubmissionFields/ImagesField'
import PrivacyField from 'components/projects/ProjectSubmissionFields/PrivacyField'
import _ from 'lodash'
import PunchlineField from 'components/projects/ProjectSubmissionFields/PunchlineField'
import DescriptionField from 'components/projects/ProjectSubmissionFields/DescriptionField'
import TrackField from 'components/projects/ProjectSubmissionFields/TrackField'
import ChallengesField from 'components/projects/ProjectSubmissionFields/ChallengesField'
import TechnologiesField from 'components/projects/ProjectSubmissionFields/TechnologiesField'
import VideoField from 'components/projects/ProjectSubmissionFields/VideoField'
import DemoField from 'components/projects/ProjectSubmissionFields/DemoField'
import SourceField from 'components/projects/ProjectSubmissionFields/SourceField'
import SourcePublicField from 'components/projects/ProjectSubmissionFields/SourcePublicField'
import LocationField from 'components/projects/ProjectSubmissionFields/LocationField'
import StatusField from 'components/projects/ProjectSubmissionFields/StatusField'
import ProjectFieldsComponents from 'constants/projectFields'

const useStyles = makeStyles(theme => ({
    uppercase: { 'text-transform': 'uppercase' },
}))

// TODO make the form labels and hints customizable
const SubmissionForm = props => {
    const id = props.id
    const handleProjectSelected = props.handleProjectSelected
    const classes = useStyles()
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const idTokenData = useSelector(AuthSelectors.idTokenData)
    const { t } = useTranslation()
    const projects = useSelector(DashboardSelectors.projects)
    const projectLoading = useSelector(DashboardSelectors.projectsLoading)
    const [project, setProject] = useState(null)
    const [projectStatus, setProjectStatus] = useState('')

    useEffect(() => {
        if (projects && projects.length && id) {
            const foundProject = projects.find(p => p._id === id)
            setProject(foundProject)
            setProjectStatus(foundProject.status)
        } else {
            setProject(null)
        }
    }, [id, projects])

    const initialValues = {
        sourcePublic: true,
        hiddenMembers: [],
        privacy:
            !projectLoading && project
                ? !project.hiddenMembers.includes(idTokenData.sub)
                : true,
        ...project,
    }

    if (project && project.submissionFormAnswers?.length > 0) {
        project.submissionFormAnswers.forEach(question => {
            event.submissionFormQuestions.forEach(section => {
                // console.log(
                //     'section answer exist test',
                //     section.questions.find(q => q.name === question.key),
                // )
            })
        })
    }

    if (project && project.submissionFormAnswers?.length > 0) {
        event.submissionFormQuestions.forEach(section => {
            section.questions.forEach(question => {
                const answerObject = project.submissionFormAnswers.find(
                    answer =>
                        answer.key === question.name &&
                        answer.section === section.name,
                )
                initialValues[question.name] = answerObject
                    ? answerObject.value
                    : ''
            })
        })
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

    const valuesFormatter = values => {
        console.log('values', values)
        const formData = { ...values }
        if (event.submissionFormQuestions.length > 0) {
            formData['submissionFormAnswers'] = []
            event.submissionFormQuestions.forEach(section => {
                const sec = section.name
                section.questions.forEach(question => {
                    const que = question.name
                    const value = values[que]
                    const custom = {
                        section: sec,
                        key: que,
                        value: value,
                    }
                    formData['submissionFormAnswers'].push(custom)
                })
            })
            console.log('formData', formData)
        }
        return formData
    }

    // const ChallengeFieldTest = (props, settings) => {
    //     const { challengeOptions } = settings
    //     return (
    //         <Grid item xs={12}>
    //             <FastField
    //                 name="challenges"
    //                 render={({ field, form }) => (
    //                     <FormControl
    //                         label="Challenges"
    //                         hint="Which partner challenges do you want to submit your project in? You can choose up to 5. Note: make sure you read the event guidelines about how many challenges you can set here!"
    //                         touched={
    //                             form.touched[field.name] ||
    //                             props.submitCount > 0
    //                         }
    //                         error={form.errors[field.name]}
    //                     >
    //                         <Select
    //                             label="Challenges"
    //                             options={challengeOptions}
    //                             value={field.value}
    //                             onChange={value =>
    //                                 form.setFieldValue(field.name, value)
    //                             }
    //                             onBlur={() => form.setFieldTouched(field.name)}
    //                             isMulti
    //                         />
    //                     </FormControl>
    //                 )}
    //             />
    //         </Grid>
    //     )
    // }

    const enabledFieldProcessor = (defaultFields, enabledFields) => {
        return _.intersection(
            Object.keys(defaultFields).filter(
                key => defaultFields[key] === true,
            ),
            enabledFields,
        )
    }

    const renderDefaultFields = (
        defaultFields,
        eventEnabledFields,
        props,
        settings = {
            trackOptions,
            locationEnabled,
            challengeOptions,
            event,
        },
    ) => {
        const fieldList = enabledFieldProcessor(
            defaultFields,
            eventEnabledFields,
        )
        // const fieldList = _.intersection(
        //     Object.keys(ProjectFieldsComponents),
        //     eventEnabledFields,
        // )
        return fieldList.map(field => {
            return ProjectFieldsComponents[field](props, settings)
        })
    }

    // const obj = {
    //     name: props => <NameField props={props} />,
    //     images: props => <ImagesField props={props} />,
    //     punchline: props => <PunchlineField props={props} />,
    //     description: props => <DescriptionField props={props} />,
    //     track: props => <TrackField props={props} settings={settings} />,
    //     challenges: props => <ChallengesField props={props} />,
    //     technologies: props => <TechnologiesField props={props} />,
    //     video: props => <VideoField props={props} />,
    //     demo: props => <DemoField props={props} />,
    //     source: props => <SourceField props={props} />,
    //     sourcePublic: props => <SourcePublicField props={props} />,
    //     location: props => <LocationField props={props} />,
    //     privacy: props => <PrivacyField props={props} />,
    //     status: props => <StatusField props={props} />,
    // }

    const renderForm = formikProps => {
        if (projectLoading) {
            return <PageWrapper loading />
        }
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <GradientBox p={3} color="theme_white">
                            <Typography variant="overline" gutterBottom>
                                This projects status is:
                            </Typography>
                            <Typography
                                variant="h4"
                                color={
                                    projectStatus === 'final'
                                        ? 'primary'
                                        : 'error'
                                }
                                className={classes.uppercase}
                                gutterBottom
                            >
                                {projectStatus}
                            </Typography>
                            <Typography variant="body1">
                                Remember to update the project status to final
                                if you want this project to be graded!
                            </Typography>
                        </GradientBox>
                    </Grid>
                    <NameField props={formikProps} />
                    {/* <NameField props={formikProps} />
                    <ImagesField props={formikProps} />
                    <PunchlineField props={formikProps} />
                    <DescriptionField props={formikProps} />
                    <TrackField
                        props={formikProps}
                        settings={{ trackOptions }}
                    />
                    <ChallengesField
                        props={formikProps}
                        settings={{ challengeOptions }}
                    />
                    <TechnologiesField props={formikProps} />
                    <VideoField props={formikProps} />
                    <DemoField props={formikProps} settings={{ event }} />
                    <SourceField props={formikProps} />
                    <SourcePublicField />
                    <PrivacyField props={formikProps} />
                    <StatusField props={formikProps} /> */}

                    {renderDefaultFields(
                        event.submissionFormDefaultFields,
                        event.submissionFormEnabledFields,
                        formikProps,
                    )}

                    {/* 'name',
                        'images',
                        'punchline',
                        'description',
                        'track',
                        'challenges',
                        'technologies',
                        'video',
                        'demo',
                        'source',
                        'sourcePublic',
                        'location',
                        'privacy',
                        'status', */}

                    {/* {ChallengeFieldTest(formikProps, { challengeOptions })} */}
                    {/* <Grid item xs={12}>
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
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid> */}
                    {/* <Grid item xs={12}>
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
                                                value,
                                            )
                                        }
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid> */}
                    {/* <Grid item xs={12}>
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
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid> */}
                    {/* <Grid item xs={12}>
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
                                                value,
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
                    </Grid> */}
                    {/* {trackOptions && (
                        <Grid item xs={12}>
                            <FastField
                                name="track"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Track"
                                        hint="Choose the track you are participating with this project in. If you've completed multiple challenges from different tracks, choose the one that best matches this project."
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
                                                    value,
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
                    )} */}
                    {/* {challengeOptions && (
                        <Grid item xs={12}>
                            <FastField
                                name="challenges"
                                render={({ field, form }) => {
                                    console.log(challengeOptions)
                                    console.log(
                                        'Field data from challenge field',
                                        field.value,
                                    )
                                    console.log(
                                        'Form data from challenge field',
                                        form,
                                    )
                                    return (
                                        <FormControl
                                            label="Challenges"
                                            hint="Which partner challenges do you want to submit your project in? You can choose up to 5. Note: make sure you read the event guidelines about how many challenges you can set here!"
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
                                                        value,
                                                    )
                                                }
                                                onBlur={() =>
                                                    form.setFieldTouched(
                                                        field.name,
                                                    )
                                                }
                                                isMulti
                                            />
                                        </FormControl>
                                    )
                                }}
                            />
                        </Grid>
                    )} */}
                    {/* <Grid item xs={12}>
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
                                                value,
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
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <FastField
                            name="video"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Video link"
                                    hint="YouTube link for embedded video"
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
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="https://youtu..."
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <FastField
                            name="demo"
                            render={({ field, form }) => (
                                <FormControl
                                    label={
                                        event.demoLabel
                                            ? event.demoLabel
                                            : 'Demo URL or Coupon Code'
                                    }
                                    hint={
                                        event.demoHint
                                            ? event.demoHint
                                            : 'Add the link of the working version of your project. Depending on the event, this could be a link to an API, a link to file or a presentation. Make sure the link is accessible for humans, as well as machines!'
                                    }
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
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder={
                                            event.demoPlaceholder
                                                ? event.demoPlaceholder
                                                : 'https://..'
                                        }
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid> */}
                    {/* <Grid item xs={12}>
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
                                                value,
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
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <FastField
                            name="sourcePublic"
                            render={({ field, form }) => {
                                //console.log('sourcePublic', field.value)
                                return (
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
                                                    value,
                                                )
                                            }
                                        />
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid> */}
                    {/* {locationEnabled && (
                        <Grid item xs={12}>
                            <FastField
                                name="location"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Table location"
                                        hint="How can people judging the projects contact you during judging? Make sure this info is always up-to-date!"
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
                                                    value,
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
                    )} */}
                    {/* <LocationField
                        props={formikProps}
                        settings={{ locationEnabled }}
                    /> */}
                    {/* {event.submissionFormQuestions?.length > 0 &&
                        event.submissionFormQuestions.map((section, index) => (
                            <Grid item xs={12}>
                                <h2>{section.label}</h2>
                                <p>{section.description}</p>
                                {section.questions.map((question, index) => (
                                    <FastField name={question.name}>
                                        {props => {
                                            return (
                                                <RegistrationQuestion
                                                    config={question}
                                                    isCustom={true}
                                                    field={props.field}
                                                    form={props.form}
                                                />
                                            )
                                        }}
                                    </FastField>
                                ))}
                            </Grid>
                        ))} */}
                    {event.submissionFormQuestions?.length > 0 &&
                        event.submissionFormQuestions.map(section => (
                            <SubmissionFormCustomInput
                                section={section}
                                sectionAnswers={
                                    project &&
                                    project.submissionFormAnswers.length > 0 &&
                                    project.submissionFormAnswers.find(
                                        answer =>
                                            answer.section === section.name &&
                                            answer.value,
                                    )
                                }
                                key={section.name}
                            />
                        ))}
                    {/* <Grid item xs={12}>
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
                                                    value,
                                                )
                                            }
                                        />
                                    </FormControl>
                                )}
                            />
                        </Box>
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <FastField
                            name="status"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Final or draft"
                                    hint="If you're done with your project, you can mark it as final. If you're still working on it, you can mark it as draft."
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <ProjectStatusInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid> */}
                    {/* {Object.keys(formikProps.errors).length > 0 && (
                        <Grid item xs={12}>
                            <ErrorsBox errors={formikProps.errors} />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Box margin="0 auto" width="100%" maxWidth="300px">
                            <Button
                                onClick={() => {
                                    formikProps.submitForm()
                                    handleProjectSelected(undefined)
                                }}
                                fullWidth
                                disabled={
                                    Object.keys(formikProps.errors).length >
                                    0 || formikProps.isSubmitting
                                }
                                color="theme_turquoise"
                                variant="contained"
                            >
                                {t('Save_changes_')}
                            </Button>
                        </Box>
                    </Grid> */}
                    <StatusField props={formikProps} />
                    <BottomBar
                        onSubmit={() => {
                            formikProps.submitForm()
                            handleProjectSelected(undefined)
                        }}
                        errors={formikProps.errors}
                        dirty={formikProps.dirty}
                        loading={formikProps.isSubmitting}
                    />
                </Grid>
            </>
        )
    }
    return (
        <Formik
            enableReinitialize
            validateOnMount
            initialValues={initialValues}
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(ProjectSchema(event))
                })
            }}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true)
                if (!values.privacy) {
                    if (!values.hiddenMembers.includes(idTokenData.sub)) {
                        values.hiddenMembers.push(idTokenData.sub)
                    }
                } else {
                    const index = values.hiddenMembers.indexOf(idTokenData.sub)
                    if (index !== -1) values.hiddenMembers.splice(index, 1)
                }
                let res
                if (project) {
                    res = await dispatch(
                        DashboardActions.editProject(
                            event.slug,
                            valuesFormatter(values),
                        ),
                        // DashboardActions.editProject(event.slug, values),
                    )
                } else {
                    res = await dispatch(
                        DashboardActions.createProject(
                            event.slug,
                            valuesFormatter(values),
                        ),
                        // DashboardActions.createProject(event.slug, values),
                    )
                }

                if (res.error) {
                    const message =
                        res?.payload?.response?.data?.message ??
                        'Oops, something went wrong...'
                    dispatch(
                        SnackbarActions.error(message, {
                            autoHideDuration: 3000,
                        }),
                    )
                } else {
                    dispatch(
                        SnackbarActions.success(
                            'Success! Project submission updated',
                        ),
                    )
                }
                actions.setSubmitting(false)
            }}
        >
            {renderForm}
        </Formik>
    )
}

export default SubmissionForm

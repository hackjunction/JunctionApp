import React, { useMemo, useState, useEffect } from 'react'

import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { ProjectSchema, EventTypes } from '@hackjunction/shared'
import { Grid, Box, Typography } from '@material-ui/core'
import GradientBox from 'components/generic/GradientBox'
import PageWrapper from 'components/layouts/PageWrapper'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import SubmissionFormCustomInput from 'components/inputs/SubmissionFormCustomInput'
import BottomBar from 'components/inputs/BottomBar'
import NameField from 'components/projects/ProjectSubmissionFields/NameField'
import _ from 'lodash'
import StatusField from 'components/projects/ProjectSubmissionFields/StatusField'
import ProjectFieldsComponents from 'constants/projectFields'
import { debugGroup } from 'utils/debuggingTools'

const useStyles = makeStyles(theme => ({
    uppercase: { 'text-transform': 'uppercase' },
}))

// TODO make the form labels and hints customizable
const SubmissionForm = props => {
    debugGroup('SubmissionForm >>', props)
    const id = props.id
    const handleProjectSelected = props.handleProjectSelected
    const classes = useStyles()
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const idTokenData = useSelector(AuthSelectors.idTokenData)
    const idToken = useSelector(AuthSelectors.getIdToken)
    const { t } = useTranslation()
    const projects = useSelector(DashboardSelectors.projects)
    const projectLoading = useSelector(DashboardSelectors.projectsLoading)
    const [project, setProject] = useState(null)
    const [projectStatus, setProjectStatus] = useState('')

    useEffect(() => {
        debugGroup('useEffect in submissionForm', [project, id])
        if (projects && projects.length > 0 && id) {
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
        }
        console.log('formData after formatting:>> ', formData)
        return formData
    }

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
        return fieldList.map(field => {
            return ProjectFieldsComponents[field](props, settings)
        })
    }

    const renderForm = formikProps => {
        if (projectLoading) {
            return <PageWrapper loading />
        } //TODO: make better looking
        return (
            <Box className="tw-flex tw-flex-col tw-gap-4">
                <GradientBox p={3} color="theme_white">
                    <Typography variant="overline" gutterBottom>
                        This projects status is:
                    </Typography>
                    <Typography
                        variant="h4"
                        color={projectStatus === 'final' ? 'primary' : 'error'}
                        className={classes.uppercase}
                        gutterBottom
                    >
                        {projectStatus}
                    </Typography>
                    <Typography variant="body1">
                        Remember to update the project status to final if you
                        want this project to be graded!
                    </Typography>
                </GradientBox>
                <Box className="tw-p-6 tw-rounded-md tw-flex tw-flex-col tw-gap-4 tw-bg-white tw-shadow-md">
                    <Grid container spacing={6}>
                        <Grid item xs={12}></Grid>
                        <NameField props={formikProps} />

                        {renderDefaultFields(
                            event.submissionFormDefaultFields,
                            event.submissionFormEnabledFields,
                            formikProps,
                        )}

                        {event.submissionFormQuestions?.length > 0 &&
                            event.submissionFormQuestions.map(section => (
                                <SubmissionFormCustomInput
                                    section={section}
                                    sectionAnswers={
                                        project &&
                                        project.submissionFormAnswers.length >
                                            0 &&
                                        project.submissionFormAnswers.find(
                                            answer =>
                                                answer.section ===
                                                    section.name &&
                                                answer.value,
                                        )
                                    }
                                    key={section.name}
                                />
                            ))}

                        <StatusField props={formikProps} />
                    </Grid>
                </Box>
                <div className=" tw-mb-16" />
                <BottomBar
                    onSubmit={async () => {
                        formikProps.submitForm().then(() => {
                            if (event.allowProjectSubmissionsPerChallenge)
                                handleProjectSelected(undefined)
                        })
                    }}
                    errors={formikProps.errors}
                    dirty={formikProps.dirty}
                    loading={formikProps.isSubmitting}
                    loadingText="uploading, this might take a while ..."
                />
            </Box>
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
                try {
                    if (!values.privacy) {
                        if (!values.hiddenMembers.includes(idTokenData.sub)) {
                            values.hiddenMembers.push(idTokenData.sub)
                        }
                    } else {
                        const index = values.hiddenMembers.indexOf(
                            idTokenData.sub,
                        )
                        if (index !== -1) values.hiddenMembers.splice(index, 1)
                    }
                    let res
                    if (project) {
                        res = await dispatch(
                            DashboardActions.editProject(
                                event.slug,
                                valuesFormatter(values),
                            ),
                        )
                    } else {
                        res = await dispatch(
                            DashboardActions.createProject(
                                event.slug,
                                valuesFormatter(values),
                            ),
                        )
                    }
                    if (res.error) {
                        const message =
                            res?.payload?.response?.data?.message ??
                            'Oops, something went wrong...'
                        dispatch(
                            SnackbarActions.error(message, {
                                autoHideDuration: 10000,
                            }),
                        )
                    } else {
                        dispatch(
                            SnackbarActions.success(
                                'Success! Project submission updated',
                            ),
                        )
                    }
                } catch (error) {
                    console.error('An error occurred:', error)
                    dispatch(
                        SnackbarActions.error('Oops, something went wrong...', {
                            autoHideDuration: 10000,
                        }),
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

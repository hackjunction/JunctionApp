import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import TextAreaInput from 'components/inputs/TextAreaInput'
import { Field, Formik } from 'formik'
import Select from 'components/inputs/Select'
import React, { useCallback, useMemo } from 'react'
import * as yup from 'yup'
import * as UserSelectors from 'reducers/user/selectors'
import * as DashboardActions from 'reducers/dashboard/actions'
import * as DashboardSelectors from 'reducers/dashboard/selectors'
import * as SnackbarActions from 'reducers/snackbar/actions'
import BottomBar from 'components/inputs/BottomBar'
import _ from 'lodash'
import { Box, Typography, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from 'components/inputs/FormControl'
import PageWrapper from 'components/layouts/PageWrapper'

export default ({
    teamRolesData = [],
    afterSubmitAction = () => {},
    loading = false,
}) => {
    const dispatch = useDispatch()
    if (
        !_.includes(
            teamRolesData.map(teamRole => teamRole.role),
            'Open application',
        )
    ) {
        teamRolesData.unshift({ role: 'Open application' })
    }
    const roles = useMemo(() => {
        return [
            ...teamRolesData.map(role => ({
                label: role.role,
                value: role.role,
            })),
        ]
    }, [teamRolesData])

    const applicationSchema = {
        roles: yup.array().of(yup.string()).required('Add at least one role'),
        motivation: yup
            .string()
            .min(
                3,
                ({ min }) =>
                    `The motivation must have at least ${min} characters`,
            )
            .max(
                300,
                ({ max }) => `The motivation can have up to ${max} characters`,
            )
            .required('Add a motivation'),
    }

    // TODO remove any redux calls from this component and pass the data as props
    const userProfile = useSelector(UserSelectors.userProfile)
    const selectedTeam = useSelector(DashboardSelectors.selectedTeam)
    const event = useSelector(DashboardSelectors.event)

    const challengeLabel = useMemo(() => {
        if (
            !selectedTeam?.challenge ||
            !event?.challenges ||
            event.challenges.length < 1
        )
            return null
        if (selectedTeam.challenge.length === 24) {
            const challenge = event.challenges.find(
                challenge => challenge._id === selectedTeam.challenge,
            )
            return challenge?.name
        }
        return selectedTeam.challenge
    }, [selectedTeam, event])

    const handleApply = useCallback(
        (values, formikBag) => {
            formikBag.setSubmitting(true)
            const submittionData = {}
            console.log('values from application', values)
            console.log('teamRolesData from application', teamRolesData)
            submittionData.roles = _.filter(teamRolesData, role =>
                _.includes(values.roles, role.role),
            )
            submittionData.motivation = values.motivation
            submittionData.userId = userProfile.userId
            console.log('submittionData from application', submittionData)
            dispatch(
                DashboardActions.candidateApplyToTeam(
                    event.slug,
                    selectedTeam.code,
                    submittionData,
                ),
            )
                .then(() => {
                    dispatch(SnackbarActions.success('Created new application'))
                    afterSubmitAction()
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... please try again.',
                        ),
                    )
                })
                .finally(() => {
                    formikBag.setSubmitting(false)
                })
        },
        [dispatch, userProfile],
    )

    return (
        <PageWrapper loading={loading}>
            <Container>
                <PageHeader
                    heading="Application Form"
                    subheading="Fields marked with * are mandatory"
                />
                <Formik
                    validationSchema={yup.object().shape(applicationSchema)}
                    initialValues={{ roles: [], motivation: '' }}
                    enableReinitialize={true}
                    onSubmit={handleApply}
                >
                    {formikProps => (
                        <>
                            <Box
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <h1>{selectedTeam.name}</h1>
                                {selectedTeam?.challenge && (
                                    <h3>#{challengeLabel}</h3>
                                )}
                            </Box>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Field
                                        name="roles"
                                        render={({ field, form }) => (
                                            <FormControl
                                                label="Roles *"
                                                hint="Choose at least one role to apply"
                                                touched={
                                                    form.touched[field.name] ||
                                                    formikProps.submitCount > 0
                                                }
                                                error={form.errors[field.name]}
                                            >
                                                <Select
                                                    label="Roles"
                                                    value={field.value}
                                                    options={roles}
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
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <Field
                                            name="motivation"
                                            render={({ field, form }) => (
                                                <FormControl
                                                    label="Motivation *"
                                                    hint="Briefly explain what motivates you to join this team"
                                                    touched={
                                                        form.touched[
                                                            field.name
                                                        ] ||
                                                        formikProps.submitCount >
                                                            0
                                                    }
                                                    error={
                                                        form.errors[field.name]
                                                    }
                                                >
                                                    <TextAreaInput
                                                        value={field.value}
                                                        placeholder="I would like to join this team because..."
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
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                        <Typography>
                                            *Your profile information is
                                            automatically included in the
                                            application
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <div className="tw-h-24" />
                            <BottomBar
                                onSubmit={formikProps.handleSubmit}
                                errors={
                                    formikProps.touched?.roles &&
                                    formikProps.touched?.motivation
                                        ? formikProps.errors
                                        : {}
                                }
                                dirty={formikProps.dirty}
                                loading={formikProps.isSubmitting}
                            />
                        </>
                    )}
                </Formik>
            </Container>
        </PageWrapper>
    )
}

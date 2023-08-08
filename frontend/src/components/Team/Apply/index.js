import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import TextAreaInput from 'components/inputs/TextAreaInput'
import { FastField, Field, Formik } from 'formik'
import Select from 'components/inputs/Select'
import React, { useCallback, useMemo, useState } from 'react'
import * as yup from 'yup'
import * as UserSelectors from 'redux/user/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import BottomBar from 'components/inputs/BottomBar'
import _ from 'lodash'
import { Box, Typography, Grid } from '@material-ui/core'

import Button from 'components/generic/Button'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from 'components/inputs/FormControl'

export default ({ teamRolesData = [], afterSubmitAction = () => {} }) => {
    const dispatch = useDispatch()
    teamRolesData.unshift({ role: 'Open application' })
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
        motivation: yup.string().max(1000).required('Add a motivation'),
    }

    // TODO remove any redux calls from this component and pass the data as props
    const userProfile = useSelector(UserSelectors.userProfile)
    const selectedTeam = useSelector(DashboardSelectors.selectedTeam)
    const event = useSelector(DashboardSelectors.event)

    const handleApply = useCallback(
        (values, formikBag) => {
            formikBag.setSubmitting(true)
            const submittionData = {}
            submittionData.roles = _.filter(teamRolesData, role =>
                _.includes(values.roles, role.role),
            )
            submittionData.motivation = values.motivation
            //TODO Make all this data dynamically fetched from the user profile in the backend
            submittionData.userId = userProfile.userId
            submittionData.avatar = userProfile.avatar
            submittionData.firstName = userProfile.firstName
            submittionData.lastName = userProfile.lastName
            submittionData.headline = userProfile.headline
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
        <>
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
                            {console.log(formikProps)}
                            <Box
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <h1>{selectedTeam.name}</h1>
                                {selectedTeam?.challenge && (
                                    <h3>#{selectedTeam.challenge}</h3>
                                )}
                            </Box>
                            {/* <h2>Role/s applied for*</h2> */}
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
                                    <h2>Motivation*</h2>
                                    <Field
                                        name="motivation"
                                        render={({ field, form }) => (
                                            <FormControl
                                                label="Motivation *"
                                                hint="Briefly explain what motivates you to join this team"
                                                touched={
                                                    form.touched[field.name] ||
                                                    formikProps.submitCount > 0
                                                }
                                                error={form.errors[field.name]}
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
        </>
    )
}

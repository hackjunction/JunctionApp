import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import TextAreaInput from 'components/inputs/TextAreaInput'
import { FastField, Field, Formik } from 'formik'
import Select from 'components/inputs/Select'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import * as UserSelectors from 'redux/user/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import BottomBar from 'components/inputs/BottomBar'
import _ from 'lodash'
import {
    Box,
    List,
    Typography,
    CardContent,
    Card,
    Grid,
} from '@material-ui/core'

import Button from 'components/generic/Button'
import { useDispatch, useSelector } from 'react-redux'

// export const roles = [
//     {
//         label: 'Manager',
//         value: 'Manager',
//     },
//     {
//         label: 'Software Developer',
//         value: 'Software Developer',
//     },
//     {
//         label: 'UI/UX Designer',
//         value: 'UI/UX Designer',
//     },
// ]

export default ({
    teamRolesData = [
        {
            role: 'Test1',
            _id: '1',
        },
        {
            role: 'Test2',
            _id: '2',
        },
    ],
}) => {
    const dispatch = useDispatch()
    const roles = [
        {
            label: 'Open application',
            value: 'Open application',
        },
        ...teamRolesData.map(role => ({
            label: role.role,
            value: role.role,
        })),
    ]
    const userProfile = useSelector(UserSelectors.userProfile)
    const selectedTeam = useSelector(DashboardSelectors.selectedTeam)
    const event = useSelector(DashboardSelectors.event)

    const handleApply = useCallback(
        (values, formikBag) => {
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
            console.log('Submission data:', submittionData)
            console.log('Values:', values)
            console.log('FormikBag:', formikBag)
            dispatch(
                DashboardActions.candidateApplyToTeam(
                    event.slug,
                    selectedTeam.code,
                    submittionData,
                ),
            )
                .then(() => {
                    dispatch(SnackbarActions.success('Created new application'))
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... please try again.',
                        ),
                    )
                })
                .finally(() => {
                    console.log('Finally')
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
                    initialValues={{ roles: roles, motivation: '' }}
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
                                <h1>Explorers</h1>
                                <h3>#Fazer</h3>
                            </Box>
                            <h2>Role/s applied for*</h2>
                            <Grid item xs={12}>
                                <FastField
                                    name="roles"
                                    render={({ field, form }) => (
                                        <Select
                                            label="Choose the role/s to apply for"
                                            value={field.value}
                                            options={roles}
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
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box>
                                    <h2>Motivation*</h2>
                                    <Field
                                        name="motivation"
                                        render={({ field, form }) => (
                                            <TextAreaInput
                                                value={field.value}
                                                placeholder={`Briefly explain what motivates you to join this team`}
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
                                errors={formikProps.errors}
                                dirty={formikProps.dirty}
                                loading={`Loading...`}
                            />
                        </>
                    )}
                </Formik>
            </Container>
        </>
    )
}

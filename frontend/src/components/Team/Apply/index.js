import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import TextAreaInput from 'components/inputs/TextAreaInput'
import { FastField, Field, Formik } from 'formik'
import Select from 'components/inputs/Select'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import BottomBar from 'components/inputs/BottomBar'
import {
    Box,
    List,
    Typography,
    CardContent,
    Card,
    Grid,
} from '@material-ui/core'

import Button from 'components/generic/Button'

export const roles = [
    {
        label: 'Manager',
        value: 'Manager',
    },
    {
        label: 'Software Developer',
        value: 'Software Developer',
    },
    {
        label: 'UI/UX Designer',
        value: 'UI/UX Designer',
    },
]

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
    return (
        <>
            <Container>
                <PageHeader
                    heading="Application Form"
                    subheading="Fields marked with * are mandatory"
                />
                <Formik
                    initialValues={{ roles: roles, motivationMessage: '' }}
                    enableReinitialize={true}
                    onSubmit={() => console.log('submitted')}
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
                                        name="motivationMessage"
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
                            <div style={{ height: '100px' }} />
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

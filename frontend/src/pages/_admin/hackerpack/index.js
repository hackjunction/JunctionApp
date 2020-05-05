import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, FastField, Field } from 'formik'
import * as yup from 'yup'

import PageWrapper from 'components/layouts/PageWrapper'
import TextInput from 'components/inputs/TextInput'
import BottomBar from 'components/inputs/BottomBar'

import * as HackerpackActions from 'redux/hackerpack/actions'
import * as SnackbarActions from 'redux/snackbar/actions'

import { useTranslation } from 'react-i18next'
const useStyles = makeStyles(theme => ({
    topWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'white',
        borderRadius: '7px',
        boxShadow: '2px 7px 15px rgba(0, 0, 0, 0.12)',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
    },
    box: {
        background: 'white',
        borderRadius: '7px',
        boxShadow: '2px 7px 30px rgba(0, 0, 0, 0.12)',
        padding: theme.spacing(3),
    },
    imageUpload: {
        width: '300px',
        height: '300px',
    },
}))

export default () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const classes = useStyles()
    const handleSubmit = useCallback(
        (values, formikBag) => {
            formikBag.setSubmitting(true)
            dispatch(HackerpackActions.createHackerpack(values))
                .then(() => {
                    dispatch(SnackbarActions.success('Changes saved!'))
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... Please try again'
                        )
                    )
                })
                .finally(() => {
                    formikBag.setSubmitting(false)
                })
        },
        [dispatch]
    )

    return (
        <Formik enableReinitialize onSubmit={handleSubmit}>
            {formikProps => (
                <React.Fragment>
                    <Box className={classes.topWrapper}>
                        <Box flex="1" display="flex" flexDirection="column">
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="firstName"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={t('First_name_')}
                                                value={field.value}
                                                onChange={value =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        value
                                                    )
                                                }
                                                onBlur={() =>
                                                    form.setFieldTouched(
                                                        field.name
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="lastName"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={t('Last_name_')}
                                                value={field.value}
                                                onChange={value =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        value
                                                    )
                                                }
                                                onBlur={() =>
                                                    form.setFieldTouched(
                                                        field.name
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <BottomBar
                        onSubmit={formikProps.handleSubmit}
                        errors={formikProps.errors}
                        dirty={formikProps.dirty}
                        loading={formikProps.isSubmitting}
                    />
                </React.Fragment>
            )}
        </Formik>
    )
}

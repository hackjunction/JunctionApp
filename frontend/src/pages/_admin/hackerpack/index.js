import React, { useCallback, useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, FastField } from 'formik'
import * as yup from 'yup'

import ImageUpload from 'components/inputs/ImageUpload'
import TextInput from 'components/inputs/TextInput'
import BottomBar from 'components/inputs/BottomBar'

import HackerpackService from 'services/hackerpack'

import * as SnackbarActions from 'redux/snackbar/actions'
import * as AdminActions from 'redux/admin/actions'

import * as AuthSelectors from 'redux/auth/selectors'

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
    const match = useRouteMatch()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { slug } = match.params

    const [initialData, setInitialData] = useState({})

    useEffect(() => {
        HackerpackService.getHackerpackBySlug(slug).then(data => {
            if (data) setInitialData(data)
        })
    }, [slug])

    const classes = useStyles()
    const idToken = useSelector(AuthSelectors.getIdToken)

    const validationSchema = useCallback(data => {
        const validations = {}
        validations['name'] = yup.string()
        validations['description'] = yup.string()
        validations['link'] = yup.string().url()
        validations['icon'] = yup.string().url().nullable()
        return validations
    }, [])

    const handleSubmit = useCallback(
        (values, formikBag) => {
            formikBag.setSubmitting(true)
            dispatch(AdminActions.editHackerpack(idToken, slug, values))
                .then(() => {
                    dispatch(SnackbarActions.success('Changes saved!'))
                    dispatch(push(`/admin`))
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... Please try again',
                        ),
                    )
                })
                .finally(() => {
                    formikBag.setSubmitting(false)
                })
        },
        [dispatch, idToken, slug],
    )

    return (
        <Formik
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(validationSchema(values))
                })
            }}
            enableReinitialize
            initialValues={initialData}
            onSubmit={handleSubmit}
        >
            {formikProps => (
                <>
                    <Box className={classes.topWrapper}>
                        <Box flex="1" display="flex" flexDirection="column">
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="name"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={t('Name_')}
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
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="description"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={t('Description_')}
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
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="icon"
                                        render={({ field, form }) => (
                                            <Box
                                                width="100%"
                                                height="100%"
                                                borderRadius="50%"
                                                overflow="hidden"
                                                position="relative"
                                            >
                                                <ImageUpload
                                                    value={
                                                        field.value
                                                            ? {
                                                                  url:
                                                                      field.value,
                                                              }
                                                            : undefined
                                                    }
                                                    onChange={value =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            value
                                                                ? value.url
                                                                : null,
                                                        )
                                                    }
                                                    uploadUrl={`/api/upload/hackerpack/${slug}/icon/`}
                                                    resizeMode="cover"
                                                />
                                            </Box>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="link"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={t('Link_')}
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
                </>
            )}
        </Formik>
    )
}

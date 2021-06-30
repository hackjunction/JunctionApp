import React, { useCallback, useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, FastField, FieldArray } from 'formik'
import * as yup from 'yup'

import ImageUpload from 'components/inputs/ImageUpload'
import TextInput from 'components/inputs/TextInput'
import BottomBar from 'components/inputs/BottomBar'

import BannerService from 'services/banner'

import * as SnackbarActions from 'redux/snackbar/actions'
import * as AdminActions from 'redux/admin/actions'

import * as AuthSelectors from 'redux/auth/selectors'

import { useTranslation } from 'react-i18next'
import Button from 'components/generic/Button'
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
    const router = match
    console.log('router :>> ', router)

    const [initialData, setInitialData] = useState({})

    useEffect(() => {
        BannerService.getBannerBySlug(slug).then(data => {
            if (data) setInitialData(data)
        })
    }, [slug])

    const classes = useStyles()
    const idToken = useSelector(AuthSelectors.getIdToken)

    const validationSchema = useCallback(data => {
        const validations = {}
        validations['name'] = yup.string()
        validations['buttons'] = yup
            .array()
            .of(yup.object().shape({ text: yup.string(), push: yup.string() }))
        validations['icon'] = yup.string().url().nullable()
        return validations
    }, [])

    const handleSubmit = useCallback(
        (values, formikBag) => {
            console.log(values)
            const newVal = {
                buttons: values.buttons,
                name: values.name,
                icon: values.icon,
            }
            formikBag.setSubmitting(true)
            dispatch(AdminActions.editBanner(idToken, slug, newVal))
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
            initialValues={initialData}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {formikProps => (
                <>
                    <Box className={classes.topWrapper}>
                        <Box flex="1" display="flex" flexDirection="column">
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Grid container direction="column">
                                        <Grid item xs={12} md={12}>
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
                                        <Grid item xs={12} md={12}>
                                            <Typography>
                                                The name of the item isn't
                                                basically used for anything, but
                                                the Text on the button is shown
                                                on top of the image. You can add
                                                several buttons. The push
                                                destination is important, for
                                                now only tested inside the
                                                platform, but should be used so
                                                that you take everything after
                                                "app.hackjunction.com",
                                                including the last slash, and
                                                add it there. For example
                                                "/pricing" at the push
                                                destiation would lead to
                                                app.hackjunction.com/pricing
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="icon"
                                        render={({ field, form }) => (
                                            <Box
                                                width="100%"
                                                height="200px"
                                                overflow="hidden"
                                                position="relative"
                                            >
                                                <ImageUpload
                                                    value={
                                                        field.value
                                                            ? {
                                                                  url: field.value,
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
                                                    uploadUrl={`/api/upload/banner/${slug}/icon/`}
                                                    resizeMode="cover"
                                                />
                                            </Box>
                                        )}
                                    />
                                </Grid>

                                <FieldArray
                                    name="buttons"
                                    render={({ push }) => (
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <FastField
                                                    name="text"
                                                    render={({
                                                        field,
                                                        form,
                                                    }) => (
                                                        <TextInput
                                                            label="Text on button"
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
                                                    name="push"
                                                    render={({
                                                        field,
                                                        form,
                                                    }) => (
                                                        <TextInput
                                                            label="Push destination"
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
                                                <Button
                                                    type="button"
                                                    variant="outlinedNew"
                                                    color="theme_blue"
                                                    onClick={() =>
                                                        push({
                                                            text: formikProps
                                                                .values.text,
                                                            push: formikProps
                                                                .values.push,
                                                        })
                                                    }
                                                >
                                                    Add button to image
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}
                                />
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

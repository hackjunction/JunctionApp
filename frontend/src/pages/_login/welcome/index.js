import React, { useCallback } from 'react'

import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Typography, Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'

import * as AuthSelectors from 'redux/auth/selectors'
import * as UserActions from 'redux/user/actions'
import * as AuthActions from 'redux/auth/actions'
import * as SnackbarActions from 'redux/snackbar/actions'

import Button from 'components/generic/Button'
import UserProfilesService from 'services/userProfiles'

import FixedLayout from 'components/layouts/FixedLayout'
import LightTextField from './LightTextField'
import LightCheckbox from './LightCheckbox'
import config from 'constants/config'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        padding: 0,
        display: 'flex',
        background: 'black',
        overflowY: 'scroll',
    },
    whiteCentered: {
        color: theme.palette.theme_white.main,
        textAlign: 'center',
    },
    label: {
        color: theme.palette.theme_white.main,
    },
    error: {
        color: theme.palette.error.main,
    },
    link: {
        color: theme.palette.primary.main,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
        zIndex: 10,
        minHeight: '900px',
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'row',
        },
    },
    contentLeft: {
        zIndex: 15,
        background: 'black',
        display: 'flex',
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '300px',
        minHeight: '300px',
        position: 'relative',
        [theme.breakpoints.up('lg')]: {
            maxHeight: 'none',
        },
    },
    contentLeftBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.4,
    },
    contentLeftLogo: {
        width: '100%',
        maxWidth: '500px',
        objectFit: 'contain',
        position: 'relative',
        zIndex: 10,
    },
    contentRight: {
        background: 'linear-gradient(152deg, #111, #111 15%, #343434)',
        flex: 2,
        padding: theme.spacing(0, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(0, 3),
            justifyContent: 'center',
        },
    },
}))

export default () => {
    const { t } = useTranslation()
    const classes = useStyles()
    const dispatch = useDispatch()

    const idToken = useSelector(AuthSelectors.getIdToken)
    const idTokenData = useSelector(AuthSelectors.idTokenData)

    const handleSubmit = useCallback(
        async (data, actions) => {
            actions.setSubmitting(true)
            try {
                const profile = await UserProfilesService.createUserProfile(
                    data,
                    idToken,
                )
                dispatch(UserActions.setUserProfile(profile))
                dispatch(AuthActions.pushNextRoute())
            } catch (err) {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... Please try again',
                    ),
                )
            }
            actions.setSubmitting(false)
            return
        },
        [dispatch, idToken],
    )

    const formik = useFormik({
        initialValues: {
            firstName: idTokenData?.given_name ?? '',
            lastName: idTokenData?.family_name ?? '',
            email: idTokenData?.email ?? '',
            avatar: idTokenData?.picture ?? '',
            accepted: false,
        },
        onSubmit: handleSubmit,
        validationSchema: yup.object().shape({
            firstName: yup
                .string()
                .min(1)
                .max(100)
                .required()
                .label('First name'),
            lastName: yup
                .string()
                .min(1)
                .max(100)
                .required()
                .label('Last name'),
            email: yup.string().email().required().label('Email'),
            accepted: yup.bool().oneOf([true]),
        }),
    })
    // TODO check if this causes the loop
    if (!idToken) {
        return <Redirect to="/login" />
    }

    return (
        <FixedLayout
            background={require('assets/images/default_cover_image.png')}
        >
            <div className={classes.content}>
                <div className={classes.contentLeft}>
                    <img
                        className={classes.contentLeftBackground}
                        src={require('assets/images/laser_2016.jpg')}
                        alt="illustration"
                    />
                    <img
                        className={classes.contentLeftLogo}
                        src={config.LOGO_LIGHT_URL}
                        alt={config.PLATFORM_OWNER_NAME + ' logo'}
                    />
                </div>
                <div className={classes.contentRight}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h4"
                                    paragraph
                                    className={classes.whiteCentered}
                                >
                                    {t('Welcome_')}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={classes.whiteCentered}
                                >
                                    {t('Looks_like_new_')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LightTextField
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    type="text"
                                    name="firstName"
                                    label={t('First_name_')}
                                    placeholder="Herbert"
                                    InputProps={{
                                        error: formik.errors.hasOwnProperty(
                                            'firstName',
                                        ),
                                    }}
                                />
                                <Typography variant="caption" color="error">
                                    {formik.errors.firstName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LightTextField
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    type="text"
                                    name="lastName"
                                    label={t('Last_name_')}
                                    placeholder="Hacker"
                                    InputProps={{
                                        error: formik.errors.hasOwnProperty(
                                            'lastName',
                                        ),
                                    }}
                                />
                                <Typography variant="caption" color="error">
                                    {formik.errors.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LightTextField
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    type="text"
                                    name="email"
                                    label={t('Email_')}
                                    placeholder="herbert.hacker@bighackathon.com"
                                    InputProps={{
                                        error: formik.errors.hasOwnProperty(
                                            'email',
                                        ),
                                    }}
                                />
                                <Typography variant="caption" color="error">
                                    {formik.errors.email}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                mt={3}
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                            >
                                <LightCheckbox
                                    name="accepted"
                                    checked={formik.values.accepted}
                                    onChange={(e, value) =>
                                        formik.setFieldValue('accepted', value)
                                    }
                                    value="accepted"
                                    inputProps={{
                                        'aria-label': 'checkbox',
                                    }}
                                />
                                <Box p={1}>
                                    {/* TODO Change this text in locale JSON */}
                                    <Typography
                                        variant="subtitle2"
                                        className={classes.label}
                                    >
                                        I confirm that I am at least 15 years of
                                        age, and I have read and agree with the{' '}
                                        {config.PLATFORM_OWNER_NAME}{' '}
                                        <a
                                            href={config.TERMS_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={classes.link}
                                        >
                                            Terms & Conditions
                                        </a>{' '}
                                        and{' '}
                                        <a
                                            href={config.PRIVACY_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={classes.link}
                                        >
                                            Privacy Policy
                                        </a>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box width="240px">
                                <Button
                                    id="welcome-button"
                                    onClick={formik.submitForm}
                                    disabled={!formik.isValid}
                                    loading={formik.isSubmitting}
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                >
                                    {t('Let_go_')}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </div>
            </div>
        </FixedLayout>
    )
}

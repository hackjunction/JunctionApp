import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, FastField, Field } from 'formik'
import { RegistrationFields } from '@hackjunction/shared'
import * as yup from 'yup'
import config from 'constants/config'

import PageWrapper from 'components/layouts/PageWrapper'
import ImageUpload from 'components/inputs/ImageUpload'
import DateInput from 'components/inputs/DateInput'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import PhoneNumberInput from 'components/inputs/PhoneNumberInput'
import JobRoleInput from 'components/inputs/JobRoleInput'
import SkillsInput from 'components/inputs/SkillsInput'
import EducationInput from 'components/inputs/EducationInput'
import RecruitmentOptionInput from 'components/inputs/RecruitmentOptionInput'
import Select from 'components/inputs/Select'
import BottomBar from 'components/inputs/BottomBar'

import * as UserSelectors from 'redux/user/selectors'
import * as UserActions from 'redux/user/actions'
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
    const userProfile = useSelector(UserSelectors.userProfile)
    const userProfileLoading = useSelector(UserSelectors.userProfileLoading)
    const hasProfile = useSelector(UserSelectors.hasProfile)
    const loading = userProfileLoading || !hasProfile
    const { t } = useTranslation()

    const classes = useStyles()

    const validationSchema = useCallback(data => {
        console.log('data on validation', data)
        const validations = {}
        Object.keys(data).forEach(field => {
            const fieldConfig = RegistrationFields.getField(field)
            if (fieldConfig) {
                const required =
                    ['email', 'firstName', 'lastName'].indexOf(field) !== -1
                validations[field] = fieldConfig.validationSchema(required)
            }
        })

        validations['avatar'] = yup.string().url().nullable()
        console.log('Validation schema', validations)

        return validations
    }, [])

    const handleSubmit = useCallback(
        (values, formikBag) => {
            formikBag.setSubmitting(true)
            dispatch(UserActions.editUserProfile(values))
                .then(() => {
                    dispatch(SnackbarActions.success('Changes saved!'))
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
        [dispatch],
    )

    return (
        <PageWrapper loading={loading}>
            <Formik
                validationSchema={props => {
                    return yup.lazy(values => {
                        return yup.object().shape(validationSchema(values))
                    })
                }}
                enableReinitialize
                initialValues={userProfile}
                onSubmit={handleSubmit}
            >
                {formikProps => (
                    <>
                        <Box className={classes.topWrapper}>
                            <Box width="300px" height="300px" margin={3}>
                                <FastField
                                    name="avatar"
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
                                                uploadUrl="/api/upload/users/avatar/"
                                                resizeMode="cover"
                                            />
                                        </Box>
                                    )}
                                />
                            </Box>
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
                                            name="lastName"
                                            render={({ field, form }) => (
                                                <TextInput
                                                    label={t('Last_name_')}
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
                                    <Grid item xs={12}>
                                        <FastField
                                            name="email"
                                            render={({ field, form }) => (
                                                <TextInput
                                                    label={t('Email_')}
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
                                        <Typography variant="caption">
                                            {t('Contact_email_', {
                                                platform:
                                                    config.PLATFORM_OWNER_NAME,
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="phoneNumber"
                                            render={({ field, form }) => (
                                                <PhoneNumberInput
                                                    label={t('Phone_number_')}
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
                                        <Typography variant="caption">
                                            {t('Contact_phone_')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="dateOfBirth"
                                            render={({ field, form }) => (
                                                <DateInput
                                                    label={t('Date_of_birth_')}
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
                                                    disableFutureYears={true}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="gender"
                                            render={({ field, form }) => (
                                                <Select
                                                    label={t('Gender_')}
                                                    options="gender"
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
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">
                                {t('Profile_details_')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {t('Pre_filled_details_', {
                                    owner: config.PLATFORM_OWNER_NAME,
                                    privacy: config.PRIVACY_URL,
                                })}
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FastField
                                        name="headline"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={
                                                    RegistrationFields.getField(
                                                        'headline',
                                                    ).label
                                                }
                                                placeholder="Fullstack developer, hackathon enthusiast"
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
                                    <Typography variant="caption">
                                        {
                                            RegistrationFields.getField(
                                                'headline',
                                            ).hint
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <Field
                                            name="biography"
                                            render={({ field, form }) => (
                                                <TextAreaInput
                                                    label={
                                                        RegistrationFields.getField(
                                                            'biography',
                                                        ).label
                                                    }
                                                    placeholder={`Hi my name is ${form.values.firstName} and...`}
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
                                    </Box>
                                    <Typography variant="caption">
                                        {
                                            RegistrationFields.getField(
                                                'biography',
                                            ).hint
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="countryOfResidence"
                                        render={({ field, form }) => (
                                            <Select
                                                label={t(
                                                    'Country_of_residence_',
                                                )}
                                                value={field.value}
                                                options="country"
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
                                        name="nationality"
                                        render={({ field, form }) => (
                                            <Select
                                                label={t('Nationality_')}
                                                value={field.value}
                                                options="nationality"
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
                                <Grid item xs={12}>
                                    <FastField
                                        name="spokenLanguages"
                                        render={({ field, form }) => (
                                            <Select
                                                label={t('Spoken_languages_')}
                                                value={field.value}
                                                options="language"
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
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name="themesOfInterest"
                                        render={({ field, form }) => (
                                            <Select
                                                label={t('Themes_of_interest_')}
                                                value={field.value}
                                                options="theme"
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
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name="industriesOfInterest"
                                        render={({ field, form }) => (
                                            <Select
                                                label={t(
                                                    'Industries_of_interest_',
                                                )}
                                                value={field.value}
                                                options="industry"
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
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">
                                {t('Education_')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {t('Most_recent_education_')}
                            </Typography>
                            <FastField
                                name="education"
                                render={({ field, form }) => (
                                    <EducationInput
                                        value={
                                            field.value !== null
                                                ? field.value
                                                : {}
                                        }
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                    />
                                )}
                            />
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">{t('Skills_')}</Typography>
                            <Typography variant="body1" gutterBottom>
                                {t('Enter_skills_')}
                            </Typography>
                            <FastField
                                name="skills"
                                render={({ field, form }) => (
                                    <SkillsInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                    />
                                )}
                            />
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">
                                {t('Pro_roles_')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {t('Enter_roles_')}
                            </Typography>
                            <FastField
                                name="roles"
                                render={({ field, form }) => (
                                    <JobRoleInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                    />
                                )}
                            />
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">
                                {t('Recruitment_pref_')}
                            </Typography>
                            <FastField
                                name="recruitmentOptions"
                                render={({ field, form }) => (
                                    <RecruitmentOptionInput
                                        value={
                                            field.value !== null
                                                ? field.value
                                                : {}
                                        }
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                    />
                                )}
                            />
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">
                                {t('Additional_links_')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {t('You_can_link_')}
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FastField
                                        name="curriculumVitae"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={
                                                    RegistrationFields.getField(
                                                        'curriculumVitae',
                                                    ).label
                                                }
                                                placeholder="myhomepage.com/cv"
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
                                    <Typography variant="caption">
                                        {
                                            RegistrationFields.getField(
                                                'curriculumVitae',
                                            ).hint
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name="portfolio"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={
                                                    RegistrationFields.getField(
                                                        'portfolio',
                                                    ).label
                                                }
                                                placeholder="myhomepage.com/portfolio"
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
                                    <Typography variant="caption">
                                        {
                                            RegistrationFields.getField(
                                                'portfolio',
                                            ).hint
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name="github"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={
                                                    RegistrationFields.getField(
                                                        'github',
                                                    ).label
                                                }
                                                placeholder="github.com/myusername"
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
                                    <Typography variant="caption">
                                        {
                                            RegistrationFields.getField(
                                                'github',
                                            ).hint
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name="linkedin"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={
                                                    RegistrationFields.getField(
                                                        'linkedin',
                                                    ).label
                                                }
                                                placeholder="linkedin.com/in/myname"
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
                                    <Typography variant="caption">
                                        {
                                            RegistrationFields.getField(
                                                'linkedin',
                                            ).hint
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box height="300px" />
                        <BottomBar
                            onSubmit={formikProps.handleSubmit}
                            errors={formikProps.errors}
                            dirty={formikProps.dirty}
                            loading={formikProps.isSubmitting}
                        />
                    </>
                )}
            </Formik>
        </PageWrapper>
    )
}

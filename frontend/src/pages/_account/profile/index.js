import React, { useCallback } from 'react';

import { connect } from 'react-redux';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, FastField, Field } from 'formik';
import { withSnackbar } from 'notistack';
import { RegistrationFields } from '@hackjunction/shared';
import * as yup from 'yup';

import PageWrapper from 'components/layouts/PageWrapper';
import ImageUpload from 'components/inputs/ImageUpload';
import DateInput from 'components/inputs/DateInput';
import TextInput from 'components/inputs/TextInput';
import TextAreaInput from 'components/inputs/TextAreaInput';
import PhoneNumberInput from 'components/inputs/PhoneNumberInput';
import JobRoleInput from 'components/inputs/JobRoleInput';
import SkillsInput from 'components/inputs/SkillsInput';
import EducationInput from 'components/inputs/EducationInput';
import RecruitmentOptionInput from 'components/inputs/RecruitmentOptionInput';
import Select from 'components/inputs/Select';
import BottomBar from 'components/inputs/BottomBar';

import * as UserSelectors from 'redux/user/selectors';
import * as UserActions from 'redux/user/actions';

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
            alignItems: 'flex-start'
        }
    },
    box: {
        background: 'white',
        borderRadius: '7px',
        boxShadow: '2px 7px 30px rgba(0, 0, 0, 0.12)',
        padding: theme.spacing(3)
    },
    imageUpload: {
        width: '300px',
        height: '300px'
    }
}));

const AccountEditProfile = ({ userProfile = {}, editUserProfile, loading, enqueueSnackbar }) => {
    const classes = useStyles();

    const validationSchema = useCallback(data => {
        const validations = {};
        Object.keys(data).forEach(field => {
            const fieldConfig = RegistrationFields.getField(field);
            if (fieldConfig) {
                const required = ['email', 'firstName', 'lastName'].indexOf(field) !== -1;
                validations[field] = fieldConfig.validationSchema(required);
            }
        });

        validations['avatar'] = yup
            .string()
            .url()
            .nullable();

        return validations;
    }, []);

    const handleSubmit = useCallback(
        (values, formikBag) => {
            formikBag.setSubmitting(true);
            editUserProfile(values)
                .then(() => {
                    enqueueSnackbar('Changes saved!', { variant: 'success' });
                })
                .catch(err => {
                    console.log('ERR', err.message);
                    enqueueSnackbar('Something went wrong... Please try again', { variant: 'error' });
                })
                .finally(() => {
                    formikBag.setSubmitting(false);
                });
        },
        [editUserProfile, enqueueSnackbar]
    );

    return (
        <PageWrapper loading={loading}>
            <Formik
                validationSchema={props => {
                    return yup.lazy(values => {
                        return yup.object().shape(validationSchema(values));
                    });
                }}
                enableReinitialize
                initialValues={userProfile}
                onSubmit={handleSubmit}
            >
                {formikProps => (
                    <React.Fragment>
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
                                                              url: field.value
                                                          }
                                                        : undefined
                                                }
                                                onChange={value =>
                                                    form.setFieldValue(field.name, value ? value.url : null)
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
                                                    label="First name"
                                                    value={field.value}
                                                    onChange={value => form.setFieldValue(field.name, value)}
                                                    onBlur={() => form.setFieldTouched(field.name)}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FastField
                                            name="lastName"
                                            render={({ field, form }) => (
                                                <TextInput
                                                    label="Last name"
                                                    value={field.value}
                                                    onChange={value => form.setFieldValue(field.name, value)}
                                                    onBlur={() => form.setFieldTouched(field.name)}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="email"
                                            render={({ field, form }) => (
                                                <TextInput
                                                    label="Email address"
                                                    value={field.value}
                                                    onChange={value => form.setFieldValue(field.name, value)}
                                                    onBlur={() => form.setFieldTouched(field.name)}
                                                />
                                            )}
                                        />
                                        <Typography variant="caption">
                                            Your contact email address, where you want to receive necessary
                                            notifications related to your activity on the Junction app. Your email
                                            address will never be shared with any 3rd parties.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="phoneNumber"
                                            render={({ field, form }) => (
                                                <PhoneNumberInput
                                                    label="Phone number"
                                                    value={field.value}
                                                    onChange={value => form.setFieldValue(field.name, value)}
                                                    onBlur={() => form.setFieldTouched(field.name)}
                                                />
                                            )}
                                        />
                                        <Typography variant="caption">
                                            Your phone number will only be used to contact you in urgent matters, and
                                            will never be shared with any 3rd parties.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="dateOfBirth"
                                            render={({ field, form }) => (
                                                <DateInput
                                                    label="Date of Birth"
                                                    value={field.value}
                                                    onChange={value => form.setFieldValue(field.name, value)}
                                                    onBlur={() => form.setFieldTouched(field.name)}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="gender"
                                            render={({ field, form }) => (
                                                <Select
                                                    label="Gender"
                                                    options="gender"
                                                    value={field.value}
                                                    onChange={value => form.setFieldValue(field.name, value)}
                                                    onBlur={() => form.setFieldTouched(field.name)}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">Profile details</Typography>
                            <Typography variant="body1" gutterBottom>
                                When you register to events on the Junction app, the below details will be pre-filled
                                into your registrations, and updated from your latest registration. In case you have
                                opted in for recruitment functionality, these details will also be shown to select
                                Junction partners who are looking to hire. Please see our{' '}
                                <a href="https://www.hackjunction.com/policy">Privacy Policy</a> for more details on how
                                your data is used.
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FastField
                                        name="headline"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={RegistrationFields.getFields()['headline'].label}
                                                placeholder="Fullstack developer, hackathon enthusiast"
                                                value={field.value}
                                                onChange={value => form.setFieldValue(field.name, value)}
                                                onBlur={() => form.setFieldTouched(field.name)}
                                            />
                                        )}
                                    />
                                    <Typography variant="caption">
                                        {RegistrationFields.getFields()['headline'].hint}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <Field
                                            name="biography"
                                            render={({ field, form }) => (
                                                <TextAreaInput
                                                    label={RegistrationFields.getFields()['biography'].label}
                                                    placeholder={`Hi my name is ${form.values.firstName} and...`}
                                                    value={field.value}
                                                    onChange={value => form.setFieldValue(field.name, value)}
                                                    onBlur={() => form.setFieldTouched(field.name)}
                                                />
                                            )}
                                        />
                                    </Box>
                                    <Typography variant="caption">
                                        {RegistrationFields.getFields()['biography'].hint}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="countryOfResidence"
                                        render={({ field, form }) => (
                                            <Select
                                                label="Country of residence"
                                                value={field.value}
                                                options="country"
                                                onChange={value => form.setFieldValue(field.name, value)}
                                                onBlur={() => form.setFieldTouched(field.name)}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FastField
                                        name="nationality"
                                        render={({ field, form }) => (
                                            <Select
                                                label="Nationality"
                                                value={field.value}
                                                options="nationality"
                                                onChange={value => form.setFieldValue(field.name, value)}
                                                onBlur={() => form.setFieldTouched(field.name)}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name="spokenLanguages"
                                        render={({ field, form }) => (
                                            <Select
                                                label="Spoken languages"
                                                value={field.value}
                                                options="language"
                                                onChange={value => form.setFieldValue(field.name, value)}
                                                onBlur={() => form.setFieldTouched(field.name)}
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
                                                label="Themes of interest"
                                                value={field.value}
                                                options="theme"
                                                onChange={value => form.setFieldValue(field.name, value)}
                                                onBlur={() => form.setFieldTouched(field.name)}
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
                                                label="Industries of interest"
                                                value={field.value}
                                                options="industry"
                                                onChange={value => form.setFieldValue(field.name, value)}
                                                onBlur={() => form.setFieldTouched(field.name)}
                                                isMulti
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">Education</Typography>
                            <Typography variant="body1" gutterBottom>
                                Your most recent education
                            </Typography>
                            <FastField
                                name="education"
                                render={({ field, form }) => (
                                    <EducationInput
                                        value={field.value !== null ? field.value : {}}
                                        onChange={value => form.setFieldValue(field.name, value)}
                                    />
                                )}
                            />
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">Skills</Typography>
                            <Typography variant="body1" gutterBottom>
                                Enter up to 10 skills you consider yourself proficient at
                            </Typography>
                            <FastField
                                name="skills"
                                render={({ field, form }) => (
                                    <SkillsInput
                                        value={field.value}
                                        onChange={value => form.setFieldValue(field.name, value)}
                                    />
                                )}
                            />
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">Professional roles</Typography>
                            <Typography variant="body1" gutterBottom>
                                Enter up to 5 roles you have working experience in
                            </Typography>
                            <FastField
                                name="roles"
                                render={({ field, form }) => (
                                    <JobRoleInput
                                        value={field.value}
                                        onChange={value => form.setFieldValue(field.name, value)}
                                    />
                                )}
                            />
                        </Box>
                        <Box className={classes.box} mt={3}>
                            <Typography variant="h6">Recruitment preferences</Typography>
                            <FastField
                                name="recruitmentOptions"
                                render={({ field, form }) => (
                                    <RecruitmentOptionInput
                                        value={field.value !== null ? field.value : {}}
                                        onChange={value => form.setFieldValue(field.name, value)}
                                    />
                                )}
                            />
                        </Box>
                        <Box height="300px" />
                        <BottomBar
                            onSubmit={formikProps.handleSubmit}
                            errors={formikProps.errors}
                            dirty={formikProps.dirty}
                            loading={formikProps.isSubmitting}
                        />
                    </React.Fragment>
                )}
            </Formik>
        </PageWrapper>
    );
};

const mapState = state => ({
    userProfile: UserSelectors.userProfile(state),
    loading: UserSelectors.userProfileLoading(state) || !UserSelectors.hasProfile(state)
});

const mapDispatch = dispatch => ({
    editUserProfile: data => dispatch(UserActions.editUserProfile(data))
});

export default withSnackbar(connect(mapState, mapDispatch)(AccountEditProfile));

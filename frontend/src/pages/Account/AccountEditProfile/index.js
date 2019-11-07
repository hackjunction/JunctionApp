import React, { useCallback } from 'react';

import { connect } from 'react-redux';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, FastField } from 'formik';

import ImageUpload from 'components/inputs/ImageUpload';
import Button from 'components/generic/Button';
import FormControl from 'components/inputs/FormControl';
import DateInput from 'components/inputs/DateInput';
import TextInput from 'components/inputs/TextInput';
import PhoneNumberInput from 'components/inputs/PhoneNumberInput';
import JobRoleInput from 'components/inputs/JobRoleInput';
import SkillsInput from 'components/inputs/SkillsInput';
import EducationInput from 'components/inputs/EducationInput';
import RecruitmentOptionInput from 'components/inputs/RecruitmentOptionInput';
import Select from 'components/inputs/Select';
import CenteredContainer from 'components/generic/CenteredContainer/index';

import * as UserSelectors from 'redux/user/selectors';
import * as UserActions from 'redux/user/actions';

const useStyles = makeStyles(theme => ({
    topWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start'
        }
    },
    imageUpload: {
        width: '300px',
        height: '300px'
    }
}));

const AccountEditProfile = ({ userProfile = {}, editUserProfile }) => {
    const classes = useStyles();

    return (
        <CenteredContainer>
            <Formik initialValues={userProfile} onSubmit={values => console.log('VALUES', values)}>
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
                                                onChange={imageUrl => form.setFieldValue(field.name, imageUrl)}
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
                        <Box mt={3}>
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
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Education</Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Your most recent education
                                    </Typography>
                                    <FastField
                                        name="education"
                                        render={({ field, form }) => (
                                            <EducationInput
                                                value={field.value}
                                                onChange={value => form.setFieldValue(field.name, value)}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Recruitment preferences</Typography>
                                    <FastField
                                        name="recruitmentOptions"
                                        render={({ field, form }) => (
                                            <RecruitmentOptionInput
                                                value={field.value}
                                                onChange={value => form.setFieldValue(field.name, value)}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </React.Fragment>
                )}
            </Formik>
        </CenteredContainer>
    );
};

const mapState = state => ({
    userProfile: UserSelectors.userProfile(state)
});

const mapDispatch = dispatch => ({
    editUserProfile: data => dispatch(UserActions.editUserProfile(data))
});

export default connect(
    mapState,
    mapDispatch
)(AccountEditProfile);

import React, { useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { RegistrationFields } from '@hackjunction/shared';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Formik, FastField } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as UserSelectors from 'redux/user/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import RegistrationQuestion from '../RegistrationQuestion';
import ErrorDisplay from './ErrorDisplay';

const registrationButtons = document.getElementById('registration-step-buttons');

const useStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: 'transparent',
        padding: 0
    },
    question: {
        backgroundColor: 'white',
        marginTop: '1px',
        padding: theme.spacing(3),
        transition: 'all 0.2s ease',
        '&:focus-within': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        }
    },
    questionInner: {
        opacity: 0.6,
        '&:focus-within': {
            opacity: 1
        }
    },
    errorMsg: {
        color: 'white',
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: lighten('#ff0000', 0.3),
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    errorIcon: {
        marginRight: theme.spacing(1)
    },
    bottom: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: '#000000',
        padding: theme.spacing(2),
        zIndex: 2000
    },
    bottomRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}));

const RegistrationSection = props => {
    const { fields, onNext, nextLabel, data, userProfile, registration, idTokenPayload } = props;
    const classes = useStyles();
    const mainRef = useRef(null);

    console.log('REGISTRATION BUTTONS', registrationButtons);

    const { validationSchema, initialValues } = useMemo(() => {
        return fields.reduce(
            (result, field) => {
                const fieldParams = RegistrationFields.getField(field.fieldName);

                if (fieldParams) {
                    result.validationSchema[field.fieldName] = fieldParams.validationSchema(field.require);
                    if (registration && registration.answers && registration.answers[field.fieldName]) {
                        result.initialValues[field.fieldName] = registration.answers[field.fieldName];
                    } else {
                        result.initialValues[field.fieldName] = fieldParams.default(userProfile, idTokenPayload);
                    }
                }

                if (data.hasOwnProperty(field.fieldName)) {
                    result.initialValues[field.fieldName] = data[field.fieldName];
                }

                return result;
            },
            {
                validationSchema: {},
                initialValues: {}
            }
        );
    }, [fields, userProfile, idTokenPayload, data, registration]);

    const renderErrors = errors => {
        if (Object.keys(errors).length === 0) return null;
        return (
            <Box flex="1" mr={1} mb={1} display="flex" flexDirection="column" alignItems="flex-start">
                {Object.keys(errors).map(fieldName => {
                    return (
                        <Typography className={classes.errorMsg} variant="subtitle1">
                            <ErrorOutlineIcon className={classes.errorIcon} /> {errors[fieldName]}
                        </Typography>
                    );
                })}
            </Box>
        );
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(validationSchema);
                });
            }}
            onSubmit={(values, actions) => {
                onNext(values);
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                <Box display="flex" flexDirection="column" ref={mainRef}>
                    <Box p={2} className={classes.wrapper}>
                        <Grid container spacing={0}>
                            {fields.map((field, index) => (
                                <Grid item xs={12} key={field.fieldName} className={classes.question}>
                                    <div className={classes.questionInner}>
                                        <FastField
                                            autoFocus={index === 0}
                                            name={field.fieldName}
                                            component={RegistrationQuestion}
                                            config={field.fieldConfig}
                                            required={field.require}
                                        />
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {/* <Box className={classes.bottom}>
                        <Button className={classes.backButton}>Back</Button>
                        <Button
                            disabled={Object.keys(errors).length > 0}
                            color="primary"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Next: {nextLabel} <ArrowForwardIcon />
                        </Button>
                    </Box> */}
                    {ReactDOM.createPortal(
                        <Box className={classes.bottom}>
                            <Button>Previous: Basic Details</Button>
                            <Box className={classes.bottomRight}>
                                <ErrorDisplay errors={errors} />
                                <Button
                                    disabled={Object.keys(errors).length > 0}
                                    color="primary"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Next: {nextLabel} <ArrowForwardIcon />
                                </Button>
                            </Box>
                        </Box>,
                        document.body
                    )}
                    {/* <Box mt={2} display="flex" flexDirection="column" alignItems="flex-end">
                        {renderErrors(errors)}
                        {onNext && nextLabel && (
                            <Button
                                disabled={Object.keys(errors).length > 0}
                                color="primary"
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Next: {nextLabel} <ArrowForwardIcon />
                            </Button>
                        )}
                    </Box> */}
                </Box>
            )}
        </Formik>
    );
};

const mapStateToProps = state => ({
    userProfile: UserSelectors.userProfile(state),
    idTokenPayload: AuthSelectors.getCurrentUser(state),
    registration: EventDetailSelectors.registration(state),
    hasRegistration: EventDetailSelectors.hasRegistration(state)
});

export default connect(mapStateToProps)(RegistrationSection);

import React, { useMemo, useRef } from 'react';
import { RegistrationFields } from '@hackjunction/shared';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid } from '@material-ui/core';
import { Formik, FastField } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as UserSelectors from 'redux/user/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import RegistrationQuestion from '../RegistrationQuestion';

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
    }
}));

const RegistrationSection = ({ fields, label, onNext, nextLabel, userProfile, idTokenPayload }) => {
    const classes = useStyles();
    const mainRef = useRef(null);

    const { validationSchema, initialValues } = useMemo(() => {
        return fields.reduce(
            (result, field) => {
                const fieldParams = RegistrationFields.getField(field.fieldName);

                if (fieldParams) {
                    result.validationSchema[field.fieldName] = fieldParams.validationSchema(field.require);
                    result.initialValues[field.fieldName] = fieldParams.default(userProfile, idTokenPayload);
                }

                return result;
            },
            {
                validationSchema: {},
                initialValues: {}
            }
        );
    }, [fields, userProfile, idTokenPayload]);

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
                    <Box mt={2} display="flex" flexDirection="row" justifyContent="flex-end">
                        {onNext && nextLabel && (
                            <Button color="primary" variant="contained" onClick={handleSubmit}>
                                Next: {nextLabel} <ArrowForwardIcon />
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
        </Formik>
    );
};

const mapStateToProps = state => ({
    userProfile: UserSelectors.userProfile(state),
    idTokenPayload: AuthSelectors.getCurrentUser(state)
});

export default connect(mapStateToProps)(RegistrationSection);

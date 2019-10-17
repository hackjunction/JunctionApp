import React from 'react';
import { RegistrationFields, RegistrationFieldsHelpers } from '@hackjunction/shared';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Paper, Button, Grid } from '@material-ui/core';
import { Formik, Field, FastField } from 'formik';
import * as yup from 'yup';
import RegistrationQuestion from '../RegistrationQuestion';

const useStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: 'white'
    },
    button: {
        color: 'white'
    }
}));

const RegistrationSection = ({ fields, label, onNext, nextLabel, onPrevious, previousLabel }) => {
    const classes = useStyles();
    console.log('FIELDS', fields);
    // const schema = RegistrationFieldsHelpers.buildValidationSchema(yup, fields);
    // console.log('Schema', schema);

    const buildSchema = () => {
        const result = {};
        fields.forEach(({ fieldName, require }) => {
            const fieldParams = RegistrationFields.getField(fieldName);

            if (fieldParams) {
                result[fieldName] = fieldParams.validationSchema(yup, false);
            }
        });
        return result;
    };

    console.log('SCEHMA', buildSchema());

    return (
        <Formik
            validationSchema={buildSchema()}
            onSubmit={(values, actions) => {
                console.log('SUBMIT', values);
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                <Box display="flex" flexDirection="column">
                    <Box p={2} className={classes.wrapper}>
                        <Grid container spacing={3}>
                            {fields.map(field => (
                                <Grid item xs={12} key={field.fieldName}>
                                    <FastField
                                        name={field.fieldName}
                                        component={RegistrationQuestion}
                                        config={field.fieldConfig}
                                        required={field.require}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box mt={2} display="flex" flexDirection="row" justifyContent="space-between">
                        {onPrevious && previousLabel && (
                            <Button className={classes.button} onClick={handleSubmit}>
                                Previous: {previousLabel}
                            </Button>
                        )}
                        {onNext && nextLabel && (
                            <Button className={classes.button} onClick={handleSubmit}>
                                Next: {nextLabel}
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
        </Formik>
    );
};

export default RegistrationSection;

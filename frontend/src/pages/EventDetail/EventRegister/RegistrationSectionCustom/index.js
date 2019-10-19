import React from 'react';

import { Formik, FastField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as yup from 'yup';
import { RegistrationFieldsCustom } from '@hackjunction/shared';

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
    },
    description: {
        color: 'white',
        fontSize: '1rem',
        textAlign: 'center',
        maxWidth: '600px'
    }
}));

const RegistrationSectionCustom = ({ section, onNext, nextLabel }) => {
    const classes = useStyles();

    const buildValidationSchema = () => {
        return section.questions.reduce((schema, question) => {
            if (RegistrationFieldsCustom.hasOwnProperty(question.fieldType)) {
                schema[question.name] = RegistrationFieldsCustom[question.fieldType].validationSchema(
                    question.fieldRequired,
                    question
                );
            }
            return schema;
        }, {});
    };

    const validationSchema = buildValidationSchema();

    console.log('SCHEMA', validationSchema);
    return (
        <Formik
            initialValues={{}}
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(validationSchema);
                });
            }}
            onSubmit={(values, actions) => {
                onNext(values, section.name);
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                <Box display="flex" flexDirection="column">
                    <Box
                        p={2}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        className={classes.descriptionWrapper}
                    >
                        <Typography variant="subtitle1" className={classes.description}>
                            {section.description}
                        </Typography>
                    </Box>
                    <Box p={2} className={classes.wrapper}>
                        <Grid container spacing={0}>
                            {section.questions.map((question, index) => (
                                <Grid item xs={12} key={question.name} className={classes.question}>
                                    <div className={classes.questionInner}>
                                        <FastField
                                            autoFocus={index === 0}
                                            name={question.name}
                                            component={RegistrationQuestion}
                                            config={question}
                                            isCustom={true}
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

export default RegistrationSectionCustom;

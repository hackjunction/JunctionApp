import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Formik, FastField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import * as yup from 'yup';
import { RegistrationFieldsCustom } from '@hackjunction/shared';

import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import RegistrationQuestion from '../RegistrationQuestion';
import RegistrationBottomBar from '../RegistrationBottomBar';

const useStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: 'transparent',
        padding: 0,
        marginBottom: '200px'
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

const RegistrationSectionCustom = ({
    section,
    onNext,
    nextLabel,
    onPrev,
    prevLabel,
    registration,
    hasRegistration
}) => {
    const classes = useStyles();

    const { initialValues, validationSchema } = useMemo(() => {
        return section.questions.reduce(
            (result, question) => {
                if (RegistrationFieldsCustom.hasOwnProperty(question.fieldType)) {
                    result.validationSchema[question.name] = RegistrationFieldsCustom[
                        question.fieldType
                    ].validationSchema(question.fieldRequired, question);
                }

                if (registration && registration.answers && registration.answers[section.name]) {
                    result.initialValues[question.name] = registration.answers[section.name][question.name];
                }
                return result;
            },
            {
                validationSchema: {},
                initialValues: {}
            }
        );
    }, [registration, section]);

    return (
        <Formik
            initialValues={initialValues}
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
                    {ReactDOM.createPortal(
                        <RegistrationBottomBar
                            prevLabel={prevLabel}
                            onPrev={onPrev}
                            nextLabel={nextLabel}
                            onNext={handleSubmit}
                            errors={errors}
                        />,
                        document.body
                    )}
                </Box>
            )}
        </Formik>
    );
};

const mapState = state => ({
    registration: EventDetailSelectors.registration(state),
    hasRegistration: EventDetailSelectors.hasRegistration(state)
});

export default connect(mapState)(RegistrationSectionCustom);

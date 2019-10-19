import React, { useEffect, useCallback, useState, useMemo } from 'react';
import styles from './EventRegister.module.scss';

import { forOwn, sortBy } from 'lodash-es';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Stepper, Step, StepContent, Box, Button } from '@material-ui/core';
import { RegistrationFields } from '@hackjunction/shared';
import classNames from 'classnames';

import * as EventDetailActions from 'redux/eventdetail/actions';
import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import * as UserSelectors from 'redux/user/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

import CenteredContainer from 'components/generic/CenteredContainer';
import Image from 'components/generic/Image';
import FadeInWrapper from 'components/animated/FadeInWrapper';

import RequiresPermission from 'hocs/RequiresPermission';

import RegistrationSection from './RegistrationSection';
import RegistrationSectionCustom from './RegistrationSectionCustom';
import RegistrationSectionLabel from './RegistrationSectionLabel';
import NewsLetterButton from 'components/inputs/NewsLetterButton';
import SubmitButton from 'components/inputs/SubmitButton';

const useStyles = makeStyles(theme => ({
    mainTitle: {
        color: 'white',
        textAlign: 'center'
    },
    sectionTitle: {
        color: 'white',
        fontSize: '1.4rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        position: 'relative',
        zIndex: 1000
    },
    stepper: {
        background: 'transparent',
        padding: 0
    },
    stepContent: {
        border: 'none',
        marginLeft: 0,
        paddingLeft: '8px'
    },
    top: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: theme.spacing(2),
        background: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 2000
    },
    topTitle: {
        fontSize: '1rem',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        margin: '2px'
    },
    topTitleExtra: {
        fontSize: '1rem',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'normal',
        margin: '2px'
    }
}));

const EventRegister = ({
    slug,
    event,
    registration,
    hasRegistration,
    createRegistration,
    editRegistration,
    userProfile,
    idTokenPayload
}) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({});
    const [activeStep, setActiveStep] = useState(0);

    const setNextStep = useCallback(
        (nextStep, values, path) => {
            if (path) {
                setFormData({
                    ...formData,
                    [path]: {
                        ...formData[path],
                        ...values
                    }
                });
            } else {
                setFormData({
                    ...formData,
                    ...values
                });
            }
            setActiveStep(nextStep);
        },
        [formData]
    );

    useEffect(() => {
        setTimeout(function() {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }, 500);
    }, [activeStep]);

    const setPrevStep = useCallback(() => {
        setActiveStep(activeStep - 1);
    }, [activeStep]);

    const sections = useMemo(() => {
        const fieldCategories = {};
        forOwn(event.userDetailsConfig, (config, fieldName) => {
            if (config.enable) {
                const fieldConfig = RegistrationFields.getField(fieldName);
                const category = fieldConfig.category.label;

                if (fieldCategories.hasOwnProperty(category)) {
                    fieldCategories[category].push({
                        fieldName,
                        fieldConfig: RegistrationFields.getField(fieldName),
                        ...config
                    });
                } else {
                    fieldCategories[category] = [
                        {
                            fieldName,
                            fieldConfig: RegistrationFields.getField(fieldName),
                            ...config
                        }
                    ];
                }
            }
        });
        const fieldSections = Object.keys(fieldCategories).map(categoryLabel => {
            return {
                order: RegistrationFields.getCategoryOrderByLabel(categoryLabel),
                label: categoryLabel,
                fields: fieldCategories[categoryLabel]
            };
        });

        const sorted = sortBy(fieldSections, 'order');
        return sorted.concat(event.customQuestions);
    }, [event.userDetailsConfig, event.customQuestions]);

    const submitted = false;

    const renderSteps = () => {
        return sections.map((section, index) => {
            const isCustomSection = section.hasOwnProperty('name');
            const nextStep = index !== sections.length - 1 ? sections[index + 1] : null;
            const prevStep = index !== 0 ? sections[index - 1] : null;
            return (
                <Step key={section.label}>
                    <RegistrationSectionLabel
                        isFirst={index === 0}
                        onClick={() => setActiveStep(index)}
                        label={section.label}
                        previousLabel={prevStep ? prevStep.label : null}
                        onPrevious={setPrevStep}
                    />
                    <StepContent
                        classes={{
                            root: classes.stepContent
                        }}
                    >
                        {isCustomSection ? (
                            <RegistrationSectionCustom
                                section={section}
                                data={formData}
                                onNext={(values, path) => setNextStep(index + 1, values, path)}
                                nextLabel={nextStep ? nextStep.label : null}
                            />
                        ) : (
                            <RegistrationSection
                                data={formData}
                                label={section.label}
                                fields={section.fields}
                                onNext={values => setNextStep(index + 1, values)}
                                nextLabel={nextStep ? nextStep.label : null}
                            />
                        )}
                        {index === sections.length - 1 && (
                            <Box mb={3} display="flex" flexDirection="column">
                                <Button
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    onClick={() => setActiveStep(index + 1)}
                                >
                                    Finish
                                </Button>
                                <div style={{ height: '100px' }} />
                            </Box>
                        )}
                    </StepContent>
                </Step>
            );
        });
    };

    return (
        <FadeInWrapper className={styles.wrapper}>
            <Image
                className={classNames({
                    [styles.backgroundImage]: true,
                    [styles.backgroundImageSubmitted]: submitted
                })}
                publicId={event && event.coverImage ? event.coverImage.publicId : null}
                default={require('assets/images/default_cover_image.png')}
                transformation={{
                    width: 1920,
                    height: 1080
                }}
            />
            <CenteredContainer wrapperClass={classes.content}>
                <FadeInWrapper enterDelay={0.4}>
                    <Box className={classes.top}>
                        <Typography variant="h1" className={classes.topTitle}>
                            Register
                        </Typography>
                        <Box p={1} />
                        <Typography variant="h2" className={classes.topTitleExtra}>
                            Junction 2019
                        </Typography>
                    </Box>
                </FadeInWrapper>
                <div style={{ height: '100px' }} />
                <Stepper connector={<div />} className={classes.stepper} activeStep={activeStep} orientation="vertical">
                    {renderSteps()}
                    <Step>
                        <StepContent>
                            <NewsLetterButton email={formData.email} country={formData.countryOfResidence} />
                            <Box mt={5} />
                            <SubmitButton hasErrors={false} onSubmit={() => window.alert('SUBMIT')} loading={false} />
                        </StepContent>
                    </Step>
                </Stepper>
            </CenteredContainer>
        </FadeInWrapper>
    );
};

const mapStateToProps = state => ({
    event: EventDetailSelectors.event(state),
    registration: EventDetailSelectors.registration(state),
    hasRegistration: EventDetailSelectors.hasRegistration(state),
    userProfile: UserSelectors.userProfile(state),
    idTokenPayload: AuthSelectors.getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
    createRegistration: (slug, data) => dispatch(EventDetailActions.createRegistration(slug, data)),
    editRegistration: (slug, data) => dispatch(EventDetailActions.editRegistration(slug, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequiresPermission(EventRegister));

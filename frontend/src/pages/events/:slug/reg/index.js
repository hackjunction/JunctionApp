import React, { useEffect, useCallback, useState, useMemo } from 'react';

import { forOwn, sortBy } from 'lodash-es';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Stepper, Step, StepContent, Box, Button } from '@material-ui/core';
import { RegistrationFields } from '@hackjunction/shared';
import { withSnackbar } from 'notistack';
import { push } from 'connected-react-router';

import * as EventDetailActions from './node_modules/redux/eventdetail/actions';
import * as EventDetailSelectors from './node_modules/redux/eventdetail/selectors';
import * as UserSelectors from './node_modules/redux/user/selectors';
import * as AuthSelectors from './node_modules/redux/auth/selectors';

import CenteredContainer from './node_modules/components/generic/CenteredContainer';
import Image from './node_modules/components/generic/Image';
import FadeInWrapper from './node_modules/components/animated/FadeInWrapper';
import AnalyticsService from './node_modules/services/analytics';

import RequiresPermission from './node_modules/hocs/RequiresPermission';

import RegistrationSection from './RegistrationSection';
import RegistrationSectionCustom from './RegistrationSectionCustom';
import RegistrationSectionLabel from './RegistrationSectionLabel';
import NewsLetterButton from './node_modules/components/inputs/NewsLetterButton';
import SubmitButton from './node_modules/components/inputs/SubmitButton';

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100%',
        background: 'black',
        zIndex: 100
    },
    backgroundImage: {
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.3,
        filter: 'blur(5px)'
    },
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
    },
    doneTitle: {
        color: 'white',
        textAlign: 'center'
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
    enqueueSnackbar,
    openDashboard,
    openEvent
}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        setTimeout(function() {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }, 500);
    }, [activeStep]);

    useEffect(() => {
        if (!hasRegistration) {
            AnalyticsService.events.BEGIN_REGISTRATION(slug);
        }
    }, [hasRegistration, slug]);

    useEffect(() => {
        document.querySelector('html').style.backgroundColor = '#000000';

        return () => {
            document.querySelector('html').style.backgroundColor = '#ffffff';
        };
    }, []);

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

    const setPrevStep = useCallback(() => {
        setActiveStep(activeStep - 1);
    }, [activeStep]);

    const handleSubmit = useCallback(async () => {
        setLoading(true);
        try {
            if (hasRegistration) {
                await editRegistration(event.slug, formData);
            } else {
                await createRegistration(event.slug, formData);
            }
            AnalyticsService.events.COMPLETE_REGISTRATION(event.slug);
        } catch (e) {
            enqueueSnackbar('Oops, something went wrong... Please try again');
        } finally {
            setActiveStep(sections.length + 1);
            setLoading(false);
        }
    }, [sections, createRegistration, editRegistration, hasRegistration, event.slug, formData, enqueueSnackbar]);

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
                                isActive={activeStep === index}
                                section={section}
                                data={formData}
                                onPrev={setPrevStep}
                                prevLabel={prevStep ? prevStep.label : null}
                                onNext={(values, path) => setNextStep(index + 1, values, path)}
                                nextLabel={nextStep ? nextStep.label : 'Finish'}
                            />
                        ) : (
                            <RegistrationSection
                                isActive={activeStep === index}
                                data={formData}
                                label={section.label}
                                fields={section.fields}
                                onPrev={setPrevStep}
                                prevLabel={prevStep ? prevStep.label : null}
                                onNext={values => setNextStep(index + 1, values)}
                                nextLabel={nextStep ? nextStep.label : 'Finish'}
                            />
                        )}
                    </StepContent>
                </Step>
            );
        });
    };

    return (
        <FadeInWrapper className={classes.wrapper}>
            <Image
                className={classes.backgroundImage}
                publicId={event && event.coverImage ? event.coverImage.publicId : null}
                default={require('./node_modules/assets/images/default_cover_image.png')}
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
                    <Step key="finish">
                        <StepContent
                            classes={{
                                root: classes.stepContent
                            }}
                        >
                            <NewsLetterButton email={formData.email} country={formData.countryOfResidence} />
                            <Box mt={5} />
                            <SubmitButton hasErrors={false} onSubmit={handleSubmit} loading={loading} />
                        </StepContent>
                    </Step>
                    <Step key="done">
                        <StepContent
                            classes={{
                                root: classes.stepContent
                            }}
                        >
                            <Box mt={'200px'} display="flex" flexDirection="column" alignItems="center">
                                <Typography className={classes.doneTitle} variant="h3">
                                    Registration saved!
                                </Typography>
                                <div style={{ height: '50px' }} />
                                <Button
                                    onClick={() => openDashboard(event.slug)}
                                    style={{ width: '300px' }}
                                    color="primary"
                                    variant="contained"
                                >
                                    Event dashboard
                                </Button>
                                <div style={{ height: '1rem' }} />
                                <Button
                                    onClick={() => openEvent(event.slug)}
                                    style={{ width: '300px', color: 'white' }}
                                >
                                    Back to event page
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
                <div style={{ height: '100px' }} />
            </CenteredContainer>
        </FadeInWrapper>
    );
};

const mapStateToProps = state => ({
    event: EventDetailSelectors.event(state),
    registration: EventDetailSelectors.registration(state),
    hasRegistration: EventDetailSelectors.hasRegistration(state),
    userProfile: UserSelectors.userProfile(state)
});

const mapDispatchToProps = dispatch => ({
    createRegistration: (slug, data) => dispatch(EventDetailActions.createRegistration(slug, data)),
    editRegistration: (slug, data) => dispatch(EventDetailActions.editRegistration(slug, data)),
    openDashboard: slug => dispatch(push(`/dashboard/${slug}`)),
    openEvent: slug => dispatch(push(`/events/${slug}`))
});

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(RequiresPermission(EventRegister)));

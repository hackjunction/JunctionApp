import React, { useEffect, useCallback, useState, useMemo } from 'react';
import styles from './EventRegister.module.scss';

import { Formik } from 'formik';
import { Row, Col, notification, Alert, Icon } from 'antd';
import { forOwn, sortBy } from 'lodash-es';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Stepper, Step, StepLabel, StepContent, Button } from '@material-ui/core';
import { RegistrationFields } from '@hackjunction/shared';
import classNames from 'classnames';

import * as EventDetailActions from 'redux/eventdetail/actions';
import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import * as UserSelectors from 'redux/user/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

import CenteredContainer from 'components/generic/CenteredContainer';
// import Button from 'components/generic/Button';
import Image from 'components/generic/Image';
import NewsLetterButton from 'components/FormComponents/NewsLetterButton';
import FadeInWrapper from 'components/animated/FadeInWrapper';
import StaggeredList from 'components/animated/StaggeredList';
import StaggeredListItem from 'components/animated/StaggeredListItem';
import Divider from 'components/generic/Divider';
import RegistrationField from 'components/FormComponents/RegistrationField';
import SubmitButton from 'components/FormComponents/SubmitButton';
import FormStatus from 'components/FormComponents/FormStatus';
import CustomRegistrationSection from './CustomRegistrationSection';

import RequiresPermission from 'hocs/RequiresPermission';
import AnalyticsService from 'services/analytics';

import RegistrationSection from './RegistrationSection';
import RegistrationSectionLabel from './RegistrationSectionLabel';

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
        values => {
            setFormData({
                ...formData,
                ...values
            });
            setActiveStep(activeStep + 1);
        },
        [formData, activeStep]
    );

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
        return sorted;
    }, [event.userDetailsConfig]);

    const submitted = false;

    const renderSteps = () => {
        return sections.map((section, index) => {
            const nextStep = index !== sections.length - 1 ? sections[index + 1] : null;
            const prevStep = index !== 0 ? sections[index - 1] : null;
            return (
                <Step key={section.label}>
                    <RegistrationSectionLabel
                        label={section.label}
                        previousLabel={prevStep ? prevStep.label : null}
                        onPrevious={setPrevStep}
                    />
                    {/* <StepLabel>
                        <Typography className={classes.sectionTitle} variant="subtitle1">
                            {section.label}
                        </Typography>
                    </StepLabel> */}
                    <StepContent
                        classes={{
                            root: classes.stepContent
                        }}
                    >
                        <RegistrationSection
                            label={section.label}
                            fields={section.fields}
                            onPrevious={setPrevStep}
                            onNext={setNextStep}
                            previousLabel={prevStep ? prevStep.label : null}
                            nextLabel={nextStep ? nextStep.label : null}
                        />
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
                <FadeInWrapper className={styles.registrationTop} enterDelay={0.4}>
                    <Image
                        publicId={event && event.logo ? event.logo.publicId : null}
                        transformation={{
                            width: 600
                        }}
                    />
                    <Typography variant="h3" className={classes.mainTitle}>
                        Register
                    </Typography>
                </FadeInWrapper>
                <Stepper connector={<div />} className={classes.stepper} activeStep={activeStep} orientation="vertical">
                    {renderSteps()}
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

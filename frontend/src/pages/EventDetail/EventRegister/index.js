import React, { useEffect, useState, useMemo } from 'react';
import styles from './EventRegister.module.scss';

import { Formik } from 'formik';
import { Row, Col, notification, Alert, Icon } from 'antd';
import { forOwn, sortBy } from 'lodash-es';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { RegistrationFields } from '@hackjunction/shared';
import classNames from 'classnames';

import * as EventDetailActions from 'redux/eventdetail/actions';
import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import * as UserSelectors from 'redux/user/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

import Button from 'components/generic/Button';
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
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!hasRegistration) {
            AnalyticsService.events.BEGIN_REGISTRATION(slug);
        }
    }, [hasRegistration, slug]);

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

    function getInitialValues() {
        if (registration && registration.hasOwnProperty('_id')) {
            return registration.answers;
        } else {
            return RegistrationFields.getDefaultValuesFromConfig(
                event.userDetailsConfig,
                event.customQuestions,
                userProfile,
                idTokenPayload
            );
        }
    }

    async function handleSubmit(values, formikProps) {
        formikProps.setSubmitting(true);

        const isUpdate = registration && registration.hasOwnProperty('_id');
        try {
            if (isUpdate) {
                await editRegistration(event.slug, values);
            } else {
                await createRegistration(event.slug, values);
            }
            setSubmitted(true);
            AnalyticsService.events.COMPLETE_REGISTRATION(slug);
        } catch (e) {
            notification.error({
                message: 'Oopsie!',
                description:
                    "Looks like that didn't work... Please make sure you're connected to the internet and try again"
            });
        } finally {
            formikProps.setSubmitting(false);
        }
    }

    function renderFields(fields, formikProps) {
        return fields.map(field => (
            <Col xs={24} key={field.fieldName}>
                <StaggeredListItem>
                    <RegistrationField
                        name={field.fieldName}
                        required={field.require}
                        isFast={true}
                        fieldConfig={field.fieldConfig}
                    />
                    <Divider size={2} />
                </StaggeredListItem>
            </Col>
        ));
    }

    function renderSections(formikProps) {
        return sections.map(section => {
            return (
                <Row gutter={1} key={section.label}>
                    <Col xs={24}>
                        <Divider size={2} />
                        <StaggeredListItem>
                            <h3 className={styles.registrationSectionTitle}>{section.label}</h3>
                        </StaggeredListItem>
                        <Divider size={2} />
                    </Col>
                    {renderFields(section.fields, formikProps)}
                </Row>
            );
        });
    }

    function renderCustomSections(formikProps) {
        return event.customQuestions.map(section => {
            const hasValue = formikProps.values.hasOwnProperty(section.name);
            return (
                <Row gutter={1} key={section.label}>
                    <Col xs={24}>
                        <StaggeredListItem>
                            <CustomRegistrationSection section={section} hasValue={hasValue} />
                        </StaggeredListItem>
                    </Col>
                </Row>
            );
        });
    }

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
            <Formik
                initialValues={getInitialValues()}
                enableReinitialize={true}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {formikProps => {
                    return (
                        <React.Fragment>
                            <div className={styles.scrollable}>
                                <div className={styles.inner}>
                                    <FadeInWrapper className={styles.registrationTop} enterDelay={0.4}>
                                        <Image
                                            className={styles.logo}
                                            publicId={event && event.logo ? event.logo.publicId : null}
                                            transformation={{
                                                width: 600
                                            }}
                                        />
                                        <h2 className={styles.registrationTopTitle}>Register</h2>
                                    </FadeInWrapper>
                                    <motion.div
                                        style={{ overflow: 'hidden' }}
                                        animate={{
                                            opacity: submitted ? 1 : 0,
                                            height: submitted ? 'auto' : 0
                                        }}
                                        initial={{
                                            opacity: 0,
                                            height: 0
                                        }}
                                    >
                                        <div className={styles.submittedWrapper}>
                                            <Icon type="check-circle" className={styles.submittedIcon} />
                                            <h3 className={styles.submittedMessage}>Your submission has been saved!</h3>
                                            <Button
                                                block
                                                round
                                                theme="accent"
                                                text="Event dashboard"
                                                link={{
                                                    internal: '/dashboard/' + slug
                                                }}
                                            />
                                            <Divider size={1} />
                                            <Button
                                                block
                                                round
                                                text="Back to event page"
                                                theme="minimal"
                                                link={{
                                                    internal: '/events/' + slug
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                    <StaggeredList animate={submitted ? 'collapsed' : 'visible'}>
                                        {hasRegistration && (
                                            <StaggeredListItem>
                                                <Alert
                                                    message="Your registration has already been submitted"
                                                    description="We'll process it as soon as possible. You can still make changes to it, but keep in mind that we may have already reviewed your registration"
                                                    type="success"
                                                />
                                            </StaggeredListItem>
                                        )}
                                        {renderSections(formikProps)}
                                        {renderCustomSections(formikProps)}
                                        <Divider size={5} />
                                        <StaggeredListItem>
                                            <NewsLetterButton
                                                email={
                                                    !formikProps.errors.hasOwnProperty('email')
                                                        ? formikProps.values.email
                                                        : null
                                                }
                                                country={formikProps.values.countryOfResidence}
                                            />
                                        </StaggeredListItem>
                                        <Divider size={5} />
                                        <StaggeredListItem>
                                            <SubmitButton formikProps={formikProps} />
                                        </StaggeredListItem>
                                        <Divider size={5} />
                                    </StaggeredList>
                                </div>
                            </div>
                            <motion.div
                                animate={{
                                    bottom: submitted ? '-100px' : 0
                                }}
                                className={styles.footer}
                            >
                                <div className={styles.footerInner}>
                                    <FormStatus formikProps={formikProps} />
                                </div>
                            </motion.div>
                        </React.Fragment>
                    );
                }}
            </Formik>
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

import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './EditRegistrationModal.module.scss';

import { connect } from 'react-redux';
import moment from 'moment';
import { Descriptions, Popover, Divider as AntDivider, Tag, Rate, Icon, Select, Row, Col, Drawer } from 'antd';
import { isEmpty, groupBy, find } from 'lodash-es';
import { RegistrationFields, Skills, Roles, Misc } from '@hackjunction/shared';

import PageWrapper from 'components/PageWrapper';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';
import GenericModal from 'components/modals/GenericModal';
import RegistrationsService from 'services/registrations';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import MiscUtils from 'utils/misc';

const EditRegistrationModal = ({ event, idToken, registrationId, onExit, renderTrigger }) => {
    const [registration, setRegistration] = useState();
    const [rating, setRating] = useState();
    const [ratingLoading, setRatingLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (registrationId) {
            setRating(0);
            setLoading(true);
            RegistrationsService.getFullRegistration(idToken, event.slug, registrationId)
                .then(data => {
                    setRegistration(data);
                    if (data.rating) {
                        setRating(data.rating);
                    }
                })
                .catch(e => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [idToken, registrationId, event.slug]);

    const handleEdit = useCallback(
        (field, value) => {
            setRegistration({
                ...registration,
                [field]: value
            });
        },
        [registration]
    );

    const getColSpan = field => {
        switch (field) {
            case 'roles':
            case 'skills':
            case 'motivation':
                return 3;
            default:
                return 1;
        }
    };

    const renderAnswerField = (field, answer) => {
        /** Handle special cases first */
        switch (field) {
            case 'roles': {
                return (
                    <ul>
                        {answer.map(item => (
                            <li key={item.role}>{`${item.role}: ${Roles.getLabelForExperienceLevel(item.years)}`}</li>
                        ))}
                    </ul>
                );
            }
            case 'skills': {
                return (
                    <React.Fragment>
                        <ul>
                            {answer.map(item => {
                                const label = Skills.getLabelForSkillLevel(item.level);
                                const description = (
                                    <div style={{ width: '200px' }}>
                                        {Skills.getDescriptionForSkillLevel(item.level)}
                                    </div>
                                );
                                return (
                                    <Popover placement="top" title={label} content={description}>
                                        <li key={item.skill}>{`${item.skill}: ${label}`}</li>
                                    </Popover>
                                );
                            })}
                        </ul>
                    </React.Fragment>
                );
            }
            case 'education': {
                return (
                    <ul>
                        <li>Level: {answer.level}</li>
                        <li>School: {answer.university}</li>
                        <li>Degree: {answer.degree}</li>
                        <li>Graduation year: {answer.graduationYear}</li>
                    </ul>
                );
            }
            case 'teamOptions': {
                return (
                    <ul>
                        <li>Applying as team: {answer.applyAsTeam ? 'Yes' : 'No'}</li>
                        <li>Applying also alone: {answer.applyAlone ? 'Yes' : 'No'}</li>
                    </ul>
                );
            }
            case 'phoneNumber': {
                return `${answer.country_code} ${answer.number}`;
            }
            case 'dateOfBirth': {
                return moment(answer).format('LL');
            }
            case 'numHackathons': {
                return Misc.numHackathonOptions.getLabelForValue(answer);
            }
            case 'portfolio':
            case 'github':
            case 'linkedin': {
                return (
                    <a href={answer} target="_blank" rel="noopener noreferrer">
                        {answer}
                    </a>
                );
            }
            case 'recruitmentOptions': {
                const getLabel = Misc.recruitmentStatuses.getLabelForValue;
                const getRelocationLabel = Misc.relocationOptions.getLabelForValue;
                return (
                    <ul>
                        <li>Job status: {getLabel(answer.status)}</li>
                        <li>Can share data to partners: {answer.consent ? 'Yes' : 'No'}</li>
                        <li>Willing to relocate: {getRelocationLabel(answer.relocation)}</li>
                    </ul>
                );
            }
            default:
                break;
        }

        const answerType = typeof answer;

        if (!answer) {
            return 'N/A';
        }

        /* Generic renderers */
        switch (answerType) {
            case 'string':
                return answer;
            case 'boolean':
                if (answer === true) return <Tag color="green">Yes</Tag>;
                return <Tag color="red">No</Tag>;
            case 'array':
                if (isEmpty(answer)) return 'None';
                return answer.join(', ');
            case 'object':
                return (
                    <ul>
                        {Object.keys(answer).map(key => (
                            <li key={key}>{`${key}: ${renderAnswerField(null, answer[key])}`}</li>
                        ))}
                    </ul>
                );
            default:
                return '';
        }
    };

    const renderContent = () => {
        if (!registration) return null;
        const fields = Object.keys(registration.answers);
        const grouped = groupBy(fields, field => RegistrationFields.getCategory(field));
        const categoryNames = Object.keys(grouped).filter(key => key !== '');

        return (
            <React.Fragment>
                {categoryNames.map(name => (
                    <React.Fragment key={name}>
                        <AntDivider>
                            <h3>{name}</h3>
                        </AntDivider>
                        <Descriptions bordered column={3} layout="vertical">
                            {grouped[name].map(field => {
                                let label = RegistrationFields.fieldToLabelMap[field];
                                if (!label) {
                                    const customField = find(event.registrationQuestions, f => f.name === field);
                                    if (customField) {
                                        label = customField.label;
                                    }
                                }
                                return (
                                    <Descriptions.Item
                                        span={getColSpan(field)}
                                        key={field}
                                        style={{ background: 'green' }}
                                        label={<strong>{label}</strong>}
                                    >
                                        {renderAnswerField(field, registration.answers[field])}
                                    </Descriptions.Item>
                                );
                            })}
                        </Descriptions>
                    </React.Fragment>
                ))}
                {event.customQuestions.map(section => {
                    const sectionAnswers = registration.answers[section.name] || {};
                    return (
                        <React.Fragment key={section.name}>
                            <AntDivider>
                                <h3>{section.label}</h3>
                            </AntDivider>
                            <Descriptions bordered column={1} layout="vertical">
                                {section.questions.map(question => {
                                    return (
                                        <Descriptions.Item
                                            key={question.name}
                                            label={<strong>{question.label}</strong>}
                                        >
                                            {renderAnswerField(question.name, sectionAnswers[question.name])}
                                        </Descriptions.Item>
                                    );
                                })}
                            </Descriptions>
                        </React.Fragment>
                    );
                })}
            </React.Fragment>
        );
    };

    return (
        <GenericModal
            renderTrigger={renderTrigger}
            onReset={() => window.alert('RESET!')}
            onDone={() => window.alert('DONE!')}
            onCancel={() => window.alert('CANCEL')}
            modalProps={{
                width: '90%',
                bodyStyle: { paddingLeft: '1rem', paddingRight: '1rem', overflow: 'auto', height: '80vh' }
            }}
            renderContent={() => (
                <div className={styles.content}>
                    {/* <Drawer
                        title="Basic Drawer"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        <p>Some contents...</p>
                    </Drawer> */}
                    <PageWrapper loading={loading} error={error}>
                        {renderContent()}
                        <Divider size={5} />
                    </PageWrapper>
                </div>
            )}
        />
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state)
});

// event, idToken, slug, registrationId, onExit, renderTrigger

export default connect(mapState)(EditRegistrationModal);

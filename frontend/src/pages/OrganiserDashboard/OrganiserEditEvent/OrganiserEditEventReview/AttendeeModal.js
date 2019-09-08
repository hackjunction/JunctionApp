import React, { useEffect, useState, useRef } from 'react';
import styles from './AttendeeModal.module.scss';

import { connect } from 'react-redux';
import moment from 'moment';
import {
    Modal,
    Descriptions,
    Rate,
    notification,
    Popover,
    Divider as AntDivider,
    Tag,
    PageHeader,
    Row,
    Col,
    Card,
    BackTop
} from 'antd';
import { isEmpty, groupBy, find } from 'lodash-es';
import { RegistrationFields, Skills, Roles, Misc } from '@hackjunction/shared';

import PageWrapper from 'components/PageWrapper';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';
import RegistrationsService from 'services/registrations';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import MiscUtils from 'utils/misc';

const AttendeeModal = ({ event, idToken, slug, registrationId, onExit }) => {
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
            RegistrationsService.getFullRegistration(idToken, slug, registrationId)
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
    }, [idToken, registrationId, slug]);

    const handleSubmitRating = async () => {
        setRatingLoading(true);
        await MiscUtils.sleep(1000);
        await RegistrationsService.rateRegistration(idToken, slug, registrationId, rating)
            .then(registration => {
                notification.success({
                    message: 'Rating saved'
                });
                onExit();
            })
            .catch(e => {
                notification.error({
                    message: 'Unable to save rating'
                });
            })
            .finally(() => {
                setRatingLoading(false);
            });
    };

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

    const renderFooter = () => {
        return (
            <div className={styles.footer}>
                <Rate value={rating} onChange={setRating} />
                <Divider size={1} />
                <Button
                    theme="accent"
                    text="Save rating"
                    button={{
                        disabled: !rating,
                        loading: ratingLoading,
                        onClick: handleSubmitRating
                    }}
                />
                <Divider size={1} />
                <Button
                    text="Cancel"
                    button={{
                        onClick: onExit
                    }}
                />
            </div>
        );
    };

    const renderBottom = () => {
        return (
            <Row gutter={16}>
                <Col xs={8}>
                    <Card title="Rating">
                        <Rate value={rating} onChange={setRating} />
                    </Card>
                </Col>
                <Col xs={8}>
                    <Card title="Status">
                        <h1>Status</h1>
                    </Card>
                </Col>
                <Col xs={8}>
                    <Card title="Tags">
                        <h1>Tags</h1>
                    </Card>
                </Col>
            </Row>
        );
    };

    return (
        <Modal width="80%" visible={!isEmpty(registrationId)} onCancel={onExit} footer={renderFooter()}>
            <PageWrapper loading={loading} error={error}>
                <PageHeader
                    children={
                        <React.Fragment>
                            {renderContent()}
                            <Divider size={5} />
                            {renderBottom()}
                        </React.Fragment>
                    }
                />
            </PageWrapper>
        </Modal>
    );
};

const mapStateToProps = state => ({
    event: OrganiserSelectors.event(state)
});

export default connect(mapStateToProps)(AttendeeModal);

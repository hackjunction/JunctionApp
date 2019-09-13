import React from 'react';
import styles from './DescriptionItem.module.scss';

import { isEmpty } from 'lodash-es';
import { Tag, List, Popover, Row, Col } from 'antd';
import { Skills, Roles, Misc } from '@hackjunction/shared';
import moment from 'moment';

import Divider from 'components/generic/Divider';

const DescriptionItem = ({ title, content, fieldName }) => {
    const renderBoolean = bool => {
        if (bool === true) {
            return <Tag color="green">Yes</Tag>;
        }
        if (bool === false) {
            return <Tag color="red">No</Tag>;
        }
        return <Tag color="orange">N/A</Tag>;
    };

    const renderObjectFields = (obj, labelMap = {}, valueMap = {}) => {
        return (
            <Row gutter={16}>
                {Object.keys(obj).map(key => (
                    <Col key={key} xs={12}>
                        <Divider size={1} />
                        <strong>{labelMap[key] || key}</strong>
                        <p>{valueMap[key] ? valueMap[key](obj[key]) : obj[key] || 'N/A'}</p>
                    </Col>
                ))}
            </Row>
        );
    };

    const renderContent = (content, fieldName) => {
        switch (fieldName) {
            case 'roles':
                return (
                    <List
                        dataSource={content}
                        renderItem={item => (
                            <List.Item key={item.role}>
                                <List.Item.Meta
                                    title={item.role}
                                    description={Roles.getLabelForExperienceLevel(item.years)}
                                />
                            </List.Item>
                        )}
                    />
                );
            case 'skills':
                return (
                    <List
                        dataSource={content}
                        renderItem={item => {
                            const label = Skills.getLabelForSkillLevel(item.level);
                            const description = (
                                <div style={{ width: '200px' }}>{Skills.getDescriptionForSkillLevel(item.level)}</div>
                            );
                            return (
                                <List.Item key={item.skill}>
                                    <List.Item.Meta
                                        title={item.skill}
                                        description={
                                            <Popover placement="right" title={label} content={description}>
                                                {label}
                                            </Popover>
                                        }
                                    />
                                </List.Item>
                            );
                        }}
                    />
                );
            case 'education':
                return renderObjectFields(content, {
                    level: 'Level',
                    university: 'University',
                    degree: 'Degree',
                    graduationYear: 'Graduation Year'
                });
            case 'teamOptions':
                return renderObjectFields(
                    content,
                    {
                        applyAsTeam: 'Applying as a team?',
                        applyAlone: 'Applying also alone?'
                    },
                    {
                        applyAsTeam: renderBoolean,
                        applyAlone: renderBoolean
                    }
                );
            case 'dateOfBirth':
                return moment(content).format('DD.MM.YYYY');
            case 'numHackathons':
                return Misc.numHackathonOptions.getLabelForValue(content);
            case 'portfolio':
            case 'github':
            case 'linkedin':
                return (
                    <a href={content} target="_blank" rel="noopener noreferrer">
                        {content}
                    </a>
                );
            case 'recruitmentOptions':
                return renderObjectFields(
                    content,
                    {
                        consent: 'Can share data with partners?',
                        relocation: 'Willing to relocate?',
                        status: 'Job-seeking status'
                    },
                    {
                        consent: renderBoolean,
                        relocation: value => Misc.relocationOptions.getLabelForValue(value),
                        status: value => Misc.recruitmentStatuses.getLabelForValue(value)
                    }
                );
            case 'dietaryRestrictions':
            case 'spokenLanguages':
                if (!content || !content.length) return 'None';
                return content.join(', ');
            case 'themesOfInterest':
            case 'industriesOfInterest':
                return <List dataSource={content} renderItem={item => <List.Item key={item}>{item}</List.Item>}></List>;
            case 'phoneNumber':
                return `${content.country_code} ${content.number}`;
            default:
                if (!content) return <Tag color="orange">N/A</Tag>;
                const contentType = typeof content;

                switch (contentType) {
                    case 'string':
                        return content;
                    case 'boolean':
                        return renderBoolean(content);
                    case 'array':
                        if (isEmpty(content)) return 'None';
                        return content.join(', ');
                    case 'object':
                        return renderObjectFields(content);
                    default:
                        return '';
                }
        }
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.title}>{title}</span>
            <div className={styles.content}>{renderContent(content, fieldName)}</div>
        </div>
    );
};

export default DescriptionItem;

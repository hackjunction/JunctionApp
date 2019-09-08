import React from 'react';
import './style.scss';

import { Select, PageHeader, Row, Col } from 'antd';
import DateTimePicker from 'components/FormComponents/DateTimePicker';
import Divider from 'components/generic/Divider';
import FormikField from 'components/FormComponents/FormikField';
import timezones from 'data/timezones.json';

const OrganiserEditEventTimes = props => {
    function renderDateField(field, timezone) {
        return (
            <DateTimePicker
                value={field.value}
                onChange={value => {
                    props.setFieldValue(field.name, value);
                }}
                defaultTime="12:00"
                timezone={timezone}
            />
        );
    }

    return (
        <div>
            <PageHeader title="Event schedule" subTitle="Choose the important times for your event" />
            <Row>
                <Col xs={24}>
                    <FormikField
                        name="timezone"
                        label="Timezone"
                        hint="Which timezone is your event happening in?"
                        hintAbove
                        alwaysShowHint
                        render={({ field }) => {
                            return (
                                <Select
                                    placeholder="Search for timezones"
                                    showSearch={true}
                                    value={field.value}
                                    size="large"
                                    onChange={val => props.setFieldValue('timezone', val)}
                                    style={{ width: '100%' }}
                                >
                                    {timezones.map(tz => (
                                        <Select.Option key={tz}>{tz}</Select.Option>
                                    ))}
                                </Select>
                            );
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <FormikField
                        name="registrationStartTime"
                        label="Registration opens"
                        hideLabel
                        render={({ field }) => renderDateField(field, props.values.timezone)}
                    />
                </Col>
                <Col xs={24}>
                    <FormikField
                        name="registrationEndTime"
                        label="Registration closes"
                        hideLabel
                        render={({ field }) => renderDateField(field, props.values.timezone)}
                    />
                </Col>
                <Col xs={24}>
                    <FormikField
                        name="startTime"
                        label="Event begins"
                        hideLabel
                        render={({ field }) => renderDateField(field, props.values.timezone)}
                    />
                </Col>
                <Col xs={24}>
                    <FormikField
                        name="submissionsStartTime"
                        label="Submissions open"
                        hideLabel
                        render={({ field }) => renderDateField(field, props.values.timezone)}
                    />
                </Col>
                <Col xs={24}>
                    <FormikField
                        name="submissionsEndTime"
                        label="Submissions close"
                        hideLabel
                        render={({ field }) => renderDateField(field, props.values.timezone)}
                    />
                </Col>
                <Col xs={24}>
                    <FormikField
                        name="endTime"
                        label="Event ends"
                        hideLabel
                        render={({ field }) => renderDateField(field, props.values.timezone)}
                    />
                </Col>
            </Row>
            <Divider />
        </div>
    );
};

export default OrganiserEditEventTimes;

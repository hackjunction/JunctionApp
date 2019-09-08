import React, { Component } from 'react';
import './style.scss';

import { Row, Col } from 'react-grid-system';
import { Input, Select, DatePicker } from 'antd';
import { Formik, Form } from 'formik';
import moment from 'moment';
import FormikField from 'components/FormComponents/FormikField';
import * as Validate from 'services/validation';
import Shared from '@hackjunction/shared';

class UserProfileForm extends Component {
    render() {
        return (
            <Formik
                render={props => {
                    return (
                        <Form>
                            <Row>
                                <Col xs={12} md={6}>
                                    <FormikField
                                        name="firstName"
                                        label="First name"
                                        isFast={true}
                                        validate={Validate.String({
                                            min: 0,
                                            max: 100,
                                            required: true
                                        })}
                                        render={({ field }) => {
                                            return <Input {...field} size="large" placeholder="First name" />;
                                        }}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <FormikField
                                        name="lastName"
                                        label="Last name"
                                        isFast={true}
                                        validate={Validate.String({
                                            min: 0,
                                            max: 100,
                                            required: true
                                        })}
                                        render={({ field }) => {
                                            return <Input {...field} size="large" placeholder="Last name" />;
                                        }}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <FormikField
                                        name="email"
                                        label="Email Address"
                                        isFast={true}
                                        validate={Validate.String({
                                            min: 0,
                                            max: 100,
                                            required: true
                                        })}
                                        render={({ field }) => {
                                            return <Input {...field} size="large" placeholder="Email" />;
                                        }}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <FormikField
                                        name="gender"
                                        label="Gender"
                                        isFast={true}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    value={field.value}
                                                    onChange={value => props.setFieldValue(field.name, value)}
                                                    size="large"
                                                    placeholder="Choose one"
                                                >
                                                    <Select.Option key="male">Male</Select.Option>
                                                    <Select.Option key="female">Female</Select.Option>
                                                    <Select.Option key="other">Other</Select.Option>
                                                    <Select.Option key="none">None</Select.Option>
                                                    <Select.Option key="unanswered">Don't want to answer</Select.Option>
                                                </Select>
                                            );
                                        }}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <FormikField
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        isFast={true}
                                        render={({ field }) => {
                                            return (
                                                <DatePicker
                                                    style={{ width: '100%' }}
                                                    value={field.value}
                                                    onChange={value => props.setFieldValue(field.name, value)}
                                                    size="large"
                                                    defaultPickerValue={moment()
                                                        .year(2000)
                                                        .startOf('year')}
                                                />
                                            );
                                        }}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <FormikField
                                        name="nationality"
                                        label="Nationality"
                                        isFast={true}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    value={field.value}
                                                    onChange={value => props.setFieldValue(field.name, value)}
                                                    size="large"
                                                    placeholder="Choose one"
                                                    showSearch
                                                >
                                                    {Shared.Countries.asArrayOfNationalities.map(nationality => (
                                                        <Select.Option key={nationality}>{nationality}</Select.Option>
                                                    ))}
                                                </Select>
                                            );
                                        }}
                                    />
                                </Col>
                                <Col xs={12} md={6}>
                                    <FormikField
                                        name="countryOfResidence"
                                        label="Country of Residence"
                                        isFast={true}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    value={field.value}
                                                    onChange={value => props.setFieldValue(field.name, value)}
                                                    size="large"
                                                    placeholder="Choose one"
                                                    showSearch
                                                >
                                                    {Shared.Countries.asArrayOfName.map(country => (
                                                        <Select.Option key={country}>{country}</Select.Option>
                                                    ))}
                                                </Select>
                                            );
                                        }}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <FormikField
                                        name="spokenLanguages"
                                        label="Spoken languages"
                                        isFast={true}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    value={field.value}
                                                    onChange={value => props.setFieldValue(field.name, value)}
                                                    size="large"
                                                    placeholder="Select all with working efficiency"
                                                    showSearch
                                                    mode="multiple"
                                                >
                                                    {Shared.Languages.asArrayOfNames.map(lang => (
                                                        <Select.Option key={lang}>{lang}</Select.Option>
                                                    ))}
                                                </Select>
                                            );
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            />
        );
    }
}

export default UserProfileForm;

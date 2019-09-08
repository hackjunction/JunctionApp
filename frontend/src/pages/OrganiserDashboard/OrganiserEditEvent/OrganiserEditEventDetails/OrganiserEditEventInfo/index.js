import React from 'react';

import { Input, Row, Col, PageHeader } from 'antd';

import * as Validate from 'services/validation';
import Divider from 'components/generic/Divider';
import FormikImage from 'components/Forms/FormikImage';
import FormikField from 'components/FormComponents/FormikField';
import MarkdownInput from 'components/FormComponents/MarkdownInput/index';

const OrganiserEditEventInfo = props => {
    return (
        <PageHeader
            title="Basic event details"
            subTitle="Edit the name, description, location etc. of your event"
            footer={
                <Row gutter={16}>
                    <Col xs={24}>
                        <FormikField
                            name="name"
                            type="text"
                            label="Name"
                            hint="A name for your event"
                            validate={Validate.String({
                                min: 0,
                                max: 100,
                                required: true
                            })}
                            render={({ field }) => {
                                return <Input {...field} size="large" placeholder="Name of your event" />;
                            }}
                        />
                        <Divider size={2} />
                    </Col>
                    <Col xs={24} md={16}>
                        <FormikField
                            name="coverImage"
                            type="text"
                            label="Cover Image"
                            hint="Upload a cool image for your event"
                            render={({ field }) => {
                                return (
                                    <FormikImage
                                        {...field}
                                        onChange={val => props.setFieldValue(field.name, val)}
                                        aspectRatio={{
                                            w: 2,
                                            h: 1
                                        }}
                                        fileTypes={['.jpg', '.png', '.gif']}
                                        minWidth={1280}
                                        uploadUrl={`/api/upload/events/${props.values.slug}/cover-image`}
                                    />
                                );
                            }}
                        />
                        <Divider size={2} />
                    </Col>
                    <Col xs={24} md={8}>
                        <FormikField
                            name="logo"
                            type="text"
                            label="Logo"
                            hint="Upload a logo for your event"
                            render={({ field }) => {
                                return (
                                    <FormikImage
                                        {...field}
                                        onChange={val => props.setFieldValue(field.name, val)}
                                        aspectRatio={{
                                            w: 1,
                                            h: 1
                                        }}
                                        fileTypes={['.jpg', '.png', '.gif']}
                                        minWidth={640}
                                        uploadUrl={`/api/upload/events/${props.values.slug}/logo`}
                                    />
                                );
                            }}
                        />
                        <Divider size={2} />
                    </Col>
                    <Col xs={24}>
                        <FormikField
                            name="description"
                            type="text"
                            label="Description"
                            hint="A hype description for your event"
                            renderValue={() => null}
                            render={({ field }) => {
                                return <MarkdownInput {...field} />;
                            }}
                        />
                        <Divider size={2} />
                    </Col>
                    <Col xs={24}>
                        <FormikField
                            name="slug"
                            label="Slug"
                            hint="A unique human-readable id for your event. This will be used in e.g. any url's linking to your event"
                            render={({ field }) => {
                                return <Input {...field} size="large" placeholder="Slug" />;
                            }}
                        />
                        <Divider size={2} />
                    </Col>
                    <Col xs={24}>
                        <FormikField
                            name="location"
                            label="Location"
                            hint="If your event takes place at a physical location, enter it here"
                            render={({ field }) => {
                                return <Input {...field} size="large" placeholder="Location" />;
                            }}
                        />
                        <Divider size={2} />
                    </Col>
                </Row>
            }
        />
    );
};

export default OrganiserEditEventInfo;

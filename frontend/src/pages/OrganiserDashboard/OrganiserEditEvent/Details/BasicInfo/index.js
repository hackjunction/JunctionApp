import React from 'react';

import { Grid, Box } from '@material-ui/core';
import { FastField } from 'formik';

import MarkdownInput from 'components/inputs/MarkdownInput';
import FormControl from 'components/inputs/FormControl';
import TextInput from 'components/inputs/TextInput';
import ImageUpload from 'components/inputs/ImageUpload';

const OrganiserEditEventInfo = props => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="coverImage"
                    render={({ field, form }) => (
                        <FormControl
                            label="Cover image"
                            hint="A cool cover image for your event. Max dimensions 1920x1080 (2MB), will be scaled down if larger."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Box width="100%" pt="56.25%" position="relative">
                                <ImageUpload
                                    value={field.value}
                                    onChange={value => {
                                        form.setFieldValue(field.name, value);
                                        form.setFieldTouched(field.name);
                                    }}
                                    uploadUrl={`/api/upload/events/${props.values.slug}/cover-image`}
                                    resizeMode="cover"
                                />
                            </Box>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="logo"
                    render={({ field, form }) => (
                        <FormControl
                            label="Event logo"
                            hint="A logo for your event. Max dimensions 640x640 (2MB), will be scaled down if larger."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Box width="100%" pt="33.33%" position="relative">
                                <ImageUpload
                                    value={field.value}
                                    onChange={value => {
                                        form.setFieldValue(field.name, value);
                                        form.setFieldTouched(field.name);
                                    }}
                                    uploadUrl={`/api/upload/events/${props.values.slug}/logo`}
                                    resizeMode="contain"
                                />
                            </Box>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="name"
                    render={({ field, form }) => (
                        <FormControl
                            label="Event name"
                            hint="The name of your event"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="name"
                                placeholder="Big Hackathon 2020"
                                value={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                                onBlur={() => form.setFieldTouched(field.name)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="description"
                    render={({ field, form }) => (
                        <FormControl
                            label="Description"
                            hint="A hype description for your event."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <MarkdownInput {...field} />
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    );
    // return (
    //     <PageHeader
    //         title="Basic event details"
    //         subTitle="Edit the name, description, location etc. of your event"
    //         footer={
    //             <Row gutter={16}>
    //                 <Col xs={24} md={16}>
    //                     <FormikField
    //                         name="coverImage"
    //                         type="text"
    //                         label="Cover Image"
    //                         hint="Upload a cool image for your event"
    //                         render={({ field }) => {
    //                             return (
    //                                 <FormikImage
    //                                     {...field}
    //                                     onChange={val => props.setFieldValue(field.name, val)}
    //                                     aspectRatio={{
    //                                         w: 2,
    //                                         h: 1
    //                                     }}
    //                                     fileTypes={['.jpg', '.png', '.gif']}
    //                                     minWidth={1280}
    //                                     uploadUrl={`/api/upload/events/${props.values.slug}/cover-image`}
    //                                 />
    //                             );
    //                         }}
    //                     />
    //                     <Divider size={2} />
    //                 </Col>
    //                 <Col xs={24} md={8}>
    //                     <FormikField
    //                         name="logo"
    //                         type="text"
    //                         label="Logo"
    //                         hint="Upload a logo for your event"
    //                         render={({ field }) => {
    //                             return (
    //                                 <FormikImage
    //                                     {...field}
    //                                     onChange={val => props.setFieldValue(field.name, val)}
    //                                     aspectRatio={{
    //                                         w: 1,
    //                                         h: 1
    //                                     }}
    //                                     fileTypes={['.jpg', '.png', '.gif']}
    //                                     minWidth={640}
    //                                     uploadUrl={`/api/upload/events/${props.values.slug}/logo`}
    //                                 />
    //                             );
    //                         }}
    //                     />
    //                     <Divider size={2} />
    //                 </Col>
    //                 <Col xs={24}>
    //                     <FormikField
    //                         name="description"
    //                         type="text"
    //                         label="Description"
    //                         hint="A hype description for your event"
    //                         renderValue={() => null}
    //                         render={({ field }) => {
    //                             return <MarkdownInput {...field} />;
    //                         }}
    //                     />
    //                     <Divider size={2} />
    //                 </Col>
    //                 <Col xs={24}>
    //                     <FormikField
    //                         name="slug"
    //                         label="Slug"
    //                         hint="A unique human-readable id for your event. This will be used in e.g. any url's linking to your event"
    //                         render={({ field }) => {
    //                             return <Input {...field} size="large" placeholder="Slug" />;
    //                         }}
    //                     />
    //                     <Divider size={2} />
    //                 </Col>
    //                 <Col xs={24}>
    //                     <FormikField
    //                         name="location"
    //                         label="Location"
    //                         hint="If your event takes place at a physical location, enter it here"
    //                         render={({ field }) => {
    //                             return <Input {...field} size="large" placeholder="Location" />;
    //                         }}
    //                     />
    //                     <Divider size={2} />
    //                 </Col>
    //             </Row>
    //         }
    //     />
    // );
};

export default OrganiserEditEventInfo;

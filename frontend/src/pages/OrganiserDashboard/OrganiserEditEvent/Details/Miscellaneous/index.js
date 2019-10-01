import React from 'react';

import { Row, Col } from 'react-grid-system';

import Divider from 'components/generic/Divider';
import FormikField from 'components/FormComponents/FormikField';
import EventTagsForm from 'components/FormComponents/EventTagsForm';

const OrganiserEditEventMisc = props => {
    return (
        <React.Fragment>
            <Row gutter={16}>
                <Col xs={12}>
                    <FormikField
                        name="tags"
                        label="Tags"
                        hint="Add tags with which you can mark registrations"
                        render={({ field, form }) => {
                            return (
                                <EventTagsForm
                                    value={field.value}
                                    fieldName={field.name}
                                    setFieldValue={form.setFieldValue}
                                />
                            );
                        }}
                    />
                    <Divider size={2} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OrganiserEditEventMisc;

import React from 'react';
import styles from './AttendeeDrawerEdit.module.scss';

import { filter } from 'lodash-es';
import { connect } from 'react-redux';
import { RegistrationStatuses } from '@hackjunction/shared';
import { Formik } from 'formik';
import { Drawer, Descriptions, Button, Rate, Tag, Dropdown, Menu, Icon } from 'antd';
import Divider from 'components/generic/Divider';
import * as AuthSelectors from 'redux/auth/selectors';

const AttendeeDrawerEdit = ({ isOpen, onClose, onSubmit, registration, session }) => {
    function buildInitial() {
        return {
            status: registration.status,
            rating: registration.rating,
            ratedBy: registration.ratedBy
        };
    }

    function handleSubmit(values) {
        onSubmit(values);
        onClose();
    }

    function handleRatingChange(rating, setFieldValue) {
        setFieldValue('rating', rating);
        setFieldValue('ratedBy', session.sub);
    }

    function renderStatusMenu(currentStatus, setFieldValue) {
        const statuses = RegistrationStatuses.asArray.filter(status => status.id !== currentStatus.id);
        const assignable = filter(statuses, s => s.allowAssign);
        return (
            <Menu>
                {assignable.map(status => (
                    <Menu.Item key={status.id} onClick={() => setFieldValue('status', status.id)}>
                        <Tag color={status.color}>{status.label}</Tag>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }

    const initialValues = buildInitial();

    return (
        <Drawer
            destroyOnClose={true}
            title="Edit registration"
            placement="right"
            closable={true}
            visible={isOpen}
            onClose={onClose}
            width={500}
        >
            <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={handleSubmit}>
                {formikProps => {
                    const { values } = formikProps;
                    const currentStatus = RegistrationStatuses.asObject[values.status];
                    const initialStatus = RegistrationStatuses.asObject[initialValues.status];
                    return (
                        <React.Fragment>
                            <Descriptions column={1} bordered>
                                <Descriptions.Item key="status" label="Status">
                                    <div className={styles.statusWrapper}>
                                        <div className={styles.statusWrapperTop}>
                                            <Tag color={currentStatus.color}>{currentStatus.label}</Tag>
                                            <Dropdown.Button
                                                overlay={renderStatusMenu(currentStatus, formikProps.setFieldValue)}
                                                disabled={!initialStatus.allowEdit}
                                                icon={<Icon type="down" />}
                                                type="link"
                                            >
                                                Change
                                            </Dropdown.Button>
                                        </div>
                                        <Divider size={1} />
                                        <span>{currentStatus.description}</span>
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item key="rating" label="Rating">
                                    <Rate
                                        allowHalf
                                        value={values.rating}
                                        onChange={value => handleRatingChange(value, formikProps.setFieldValue)}
                                    />
                                </Descriptions.Item>
                                <Descriptions.Item key="rated-by" label="Rated by">
                                    <span>{values.ratedBy}</span>
                                </Descriptions.Item>
                            </Descriptions>
                            <Divider size={1} />
                            <Button block type="primary" disabled={!formikProps.dirty} onClick={formikProps.submitForm}>
                                Save changes
                            </Button>
                        </React.Fragment>
                    );
                }}
            </Formik>
        </Drawer>
    );
};

const mapStateToProps = state => ({
    session: AuthSelectors.getCurrentUser(state)
});

export default connect(mapStateToProps)(AttendeeDrawerEdit);

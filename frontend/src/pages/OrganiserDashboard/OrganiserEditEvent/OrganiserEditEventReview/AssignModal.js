import React, { useState, useEffect } from 'react';
import styles from './AssignModal.module.scss';

import { isEmpty } from 'lodash-es';
import { Modal, List, Avatar, message } from 'antd';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import Button from 'components/generic/Button';
import RegistrationsService from 'services/registrations';

const AssignModal = ({ onExit, registration, idToken, slug, organisers }) => {
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(false);
    const name = registration ? `${registration.answers.firstName} ${registration.answers.lastName}` : '';

    useEffect(() => {
        if (!registration) {
            setSelected(undefined);
        }
    }, [registration]);

    const handleAssign = () => {
        setLoading(true);
        RegistrationsService.assignRegistration(idToken, slug, registration._id, selected.userId)
            .then(() => {
                onExit();
                message.success('Assigned to ' + selected.firstName);
            })
            .catch(() => {
                message.error('Something went wrong...');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const renderFooter = () => {
        const buttonText = selected ? `Assign to ${selected.firstName}` : 'Assign';
        return (
            <Button
                text={buttonText}
                block
                theme="accent"
                button={{
                    disabled: !selected,
                    loading: loading,
                    onClick: handleAssign
                }}
            />
        );
    };

    return (
        <Modal
            width={400}
            title={`Assign ${name}`}
            visible={!isEmpty(registration)}
            onCancel={onExit}
            footer={renderFooter()}
            bodyStyle={{ height: '100%', maxHeight: '600px', overflow: 'auto' }}
        >
            <List
                dataSource={organisers}
                renderItem={item => {
                    return (
                        <List.Item
                            className={classNames({
                                [styles.listItem]: true,
                                [styles.listItemSelected]: selected && item.userId === selected.userId
                            })}
                            key={item.userId}
                            onClick={() => setSelected(item)}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={`${item.firstName} ${item.lastName}`}
                                description={item.email}
                            />
                        </List.Item>
                    );
                }}
            />
        </Modal>
    );
};

const mapStateToProps = state => ({
    organisers: OrganiserSelectors.organisers(state)
});

export default connect(mapStateToProps)(AssignModal);

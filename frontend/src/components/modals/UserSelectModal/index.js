import React, { useState, useCallback } from 'react';
import styles from './UserSelectModal.module.scss';

import classNames from 'classnames';
import { List, Avatar, Icon } from 'antd';
import { findIndex, isEmpty } from 'lodash-es';

import Button from 'components/generic/Button';
import GenericModal from '../GenericModal';

const UserSelectModal = ({
    renderTrigger,
    onDone,
    onCancel,
    loading,
    userProfiles = [],
    title,
    allowMultiple = true
}) => {
    const [selected, setSelected] = useState([]);

    const handleSelect = useCallback(
        user => {
            const index = findIndex(selected, profile => profile.userId === user.userId);
            const result = selected.slice();
            if (index !== -1) {
                result.splice(index, 1);
                setSelected(result);
            } else {
                if (allowMultiple) {
                    setSelected(result.concat(user));
                } else {
                    setSelected([user]);
                }
            }
        },
        [selected, allowMultiple]
    );

    const isSelected = userId => {
        return findIndex(selected, userProfile => userProfile.userId === userId) !== -1;
    };

    const renderButtonText = () => {
        if (isEmpty(selected)) {
            if (allowMultiple) {
                return 'Select users';
            } else {
                return 'Select user';
            }
        }
        if (selected.length === 1) {
            return `${selected[0].firstName} ${selected[0].lastName}`;
        }
        if (selected.length <= 3) {
            return selected.map(user => user.firstName).join(', ');
        } else {
            return (
                selected
                    .slice(0, 3)
                    .map(user => user.firstName)
                    .join(', ') + ` and ${selected.length - 3} more`
            );
        }
    };

    const formatSubmit = doneHandler => {
        if (allowMultiple) {
            doneHandler(selected);
        } else {
            const result = selected.length ? selected[0] : undefined;
            doneHandler(result);
        }
    };

    return (
        <GenericModal
            renderTrigger={renderTrigger}
            onReset={() => setSelected([])}
            onDone={onDone}
            onCancel={onCancel}
            modalProps={{
                title: title || (allowMultiple ? 'Select users' : 'Select user'),
                bodyStyle: { height: '100%', maxHeight: '600px', overflow: 'auto', paddingBottom: '100px' }
            }}
            renderContent={handleDone => (
                <div className={styles.wrapper}>
                    <List
                        dataSource={userProfiles}
                        renderItem={item => {
                            return (
                                <List.Item
                                    className={classNames({
                                        [styles.listItem]: true,
                                        [styles.listItemSelected]: isSelected(item.userId)
                                    })}
                                    key={item.userId}
                                    onClick={() => handleSelect(item)}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={`${item.firstName} ${item.lastName}`}
                                        description={item.email}
                                    />
                                    <Icon type="check-circle" className={styles.selectedIcon} />
                                </List.Item>
                            );
                        }}
                    />
                    <div className={styles.footer}>
                        <Button
                            text={renderButtonText()}
                            block
                            theme="accent"
                            button={{
                                disabled: isEmpty(selected),
                                loading: loading,
                                onClick: () => formatSubmit(handleDone)
                            }}
                        />
                    </div>
                </div>
            )}
        />
    );
};

export default UserSelectModal;

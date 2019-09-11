import React, { useState, useCallback } from 'react';
import styles from './RatingModal.module.scss';

import { Rate, Icon, Button } from 'antd';

import Divider from 'components/generic/Divider';
import GenericModal from '../GenericModal';

const RatingModal = ({ renderTrigger, initialValue = 0, onDone = () => {}, onCancel = () => {} }) => {
    const [value, setValue] = useState(initialValue);

    const handleReset = useCallback(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <GenericModal
            renderTrigger={renderTrigger}
            onReset={handleReset}
            onDone={onDone}
            onCancel={onCancel}
            renderContent={onDone => (
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Select rating</h2>
                    <Rate
                        character={<Icon type="star" theme="filled" style={{ fontSize: 30 }} />}
                        value={value}
                        onChange={setValue}
                    />
                    <Divider size={1} />
                    <Button type="primary" onClick={() => onDone(value)} disabled={!value}>
                        Ok
                    </Button>
                </div>
            )}
        />
    );
};

export default RatingModal;

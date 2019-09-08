import React, { useCallback, useState } from 'react';
import styles from './RatingModal.module.scss';

import { Modal, Rate, Icon, Button, Row, Col } from 'antd';

import Divider from 'components/generic/Divider';

const RatingModal = ({ render, initialValue = 0, onDone = () => {}, onCancel = () => {} }) => {
    const [value, setValue] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDone = useCallback(() => {
        onDone(value);
        setModalVisible(false);
    }, [onDone, value]);

    const handleCancel = useCallback(() => {
        onCancel();
        setModalVisible(false);
    }, [onCancel]);

    return (
        <React.Fragment>
            <Modal
                destroyOnClose={true}
                visible={modalVisible}
                title={null}
                icon={null}
                footer={null}
                onCancel={handleCancel}
            >
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Choose rating</h2>
                    <Rate
                        character={<Icon type="star" theme="filled" style={{ fontSize: 30 }} />}
                        value={value}
                        onChange={setValue}
                    />
                    <Divider size={1} />
                    <Button type="primary" onClick={handleDone} disabled={!value}>
                        Ok
                    </Button>
                </div>
            </Modal>
            {render(setModalVisible)}
        </React.Fragment>
    );
};

export default RatingModal;

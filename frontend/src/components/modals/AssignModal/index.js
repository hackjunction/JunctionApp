import React, { useCallback, useState } from 'react';
import styles from './AssignModal.module.scss';

import { Modal, Rate, Icon, Button, Row, Col } from 'antd';

import Divider from 'components/generic/Divider';

const AssignModal = ({ render, initialValue = 0, onDone = () => {}, onCancel = () => {} }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDone = useCallback(() => {
        onDone();
        setModalVisible(false);
    }, [onDone]);

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
                    <h2 className={styles.title}>Assign applicant</h2>
                    {/* <Rate
                        character={<Icon type="star" theme="filled" style={{ fontSize: 30 }} />}
                        value={value}
                        onChange={setValue}
                    />
                    <Divider size={1} /> */}
                    <Button type="primary" onClick={handleDone}>
                        Ok
                    </Button>
                </div>
            </Modal>
            {render(setModalVisible)}
        </React.Fragment>
    );
};

export default AssignModal;

import React, { useCallback, useState, useEffect } from 'react';

import { Modal } from 'antd';

const GenericModal = ({
    renderTrigger,
    renderContent,
    onDone = () => {},
    onCancel = () => {},
    onReset = () => {},
    modalProps = {}
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDone = useCallback(
        (...args) => {
            onDone(...args);
            setModalVisible(false);
            onReset();
        },
        [onDone, onReset]
    );

    const handleCancel = useCallback(() => {
        onCancel();
        setModalVisible(false);
        onReset();
    }, [onCancel, onReset]);

    return (
        <React.Fragment>
            {modalVisible && (
                <Modal
                    destroyOnClose
                    visible={true}
                    title={null}
                    icon={null}
                    footer={null}
                    onCancel={handleCancel}
                    {...modalProps}
                >
                    {renderContent(handleDone)}
                </Modal>
            )}
            {renderTrigger(setModalVisible)}
        </React.Fragment>
    );
};

export default GenericModal;

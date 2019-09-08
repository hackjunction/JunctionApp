import React, { useCallback } from 'react';

import { Modal } from 'antd';

const TagsModal = ({ render }) => {
    const showModal = useCallback(() => {
        Modal.confirm({
            title: 'Change tags',
            content: 'Content here',
            onOk: () => window.alert('OK'),
            onCancel: () => window.alert('CANCEL')
        });
    }, []);

    return render(showModal);
};

export default TagsModal;

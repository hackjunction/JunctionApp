import React from 'react';
import styles from './FormField.module.scss';

import { Row, Col } from 'antd';

import Divider from 'components/generic/Divider';
import GenderSelect from 'components/FormComponents/GenderSelect';

const FormFieldWrapper = () => {
    return (
        <div className={styles.wrapper}>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <label className={styles.label}>First name</label>
                </Col>
                <Col xs={24} md={16}>
                    <Divider size={1} />
                    <GenderSelect />
                </Col>
            </Row>
        </div>
    );
};

export default FormFieldWrapper;

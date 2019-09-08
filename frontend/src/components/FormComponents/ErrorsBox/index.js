import React from 'react';
import './style.scss';

import { Row, Col } from 'antd';
import AnimateHeight from 'react-animate-height';

import Divider from 'components/generic/Divider';

const ErrorsBox = ({ formikProps, labelMap, title }) => {
    const errorKeys = Object.keys(formikProps.errors);
    const hasErrors = errorKeys.length > 0;

    function renderErrors() {
        return errorKeys.map(key => {
            return (
                <li key={key} className="ErrorsBox--error">
                    <strong>{labelMap[key] || key}: </strong>
                    {formikProps.errors[key]}
                </li>
            );
        });
    }

    return (
        <Row>
            <Col xs={24}>
                <div className="ErrorsBox">
                    <AnimateHeight duration={500} animateOpacity={true} height={hasErrors ? 'auto' : 0}>
                        <p className="ErrorsBox--title">{title}</p>
                        <ul className="ErrorsBox--errors">{renderErrors()}</ul>
                        <Divider size={3} />
                    </AnimateHeight>
                </div>
            </Col>
        </Row>
    );
};

export default ErrorsBox;

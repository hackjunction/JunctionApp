import React from 'react';
import './style.scss';

const FormFieldLabel = ({ show, label, required }) => {
    return (
        <div className={`FormFieldLabel ${show ? 'FormFieldLabel-visible' : ''}`}>
            <span className="FormFieldLabel__text">
                {label}
                {required ? <span className="FormFieldLabel__required">*</span> : null}
            </span>
        </div>
    );
};

export default FormFieldLabel;

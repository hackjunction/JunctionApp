import React from 'react';
import './style.scss';

import AnimateHeight from 'react-animate-height';

const FormFieldHint = ({ show, hint }) => {
    return (
        <AnimateHeight duration={200} animateOpacity={true} height={show ? 'auto' : 0}>
            <span className="FormFieldHint--text">{hint || ''}</span>
        </AnimateHeight>
    );
};

export default FormFieldHint;

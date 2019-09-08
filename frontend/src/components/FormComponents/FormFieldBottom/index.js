import React from 'react';
import './style.scss';

import { isEmpty } from 'lodash-es';

const FormFieldBottom = ({ errorMessage }) => {
    if (isEmpty(errorMessage)) return null;
    return (
        <div className="FormFieldBottom">
            <span className="FormFieldBottom__error">{isEmpty(errorMessage) ? '' : errorMessage}</span>
        </div>
    );
};

export default FormFieldBottom;

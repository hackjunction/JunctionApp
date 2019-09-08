import React from 'react';
import styles from './FormStatus.module.scss';

import { RegistrationFields } from '@hackjunction/shared';
import { toArray } from 'lodash-es';
import { Icon, Popover } from 'antd';
import { motion } from 'framer-motion';

const variants = {
    visible: {
        height: 'auto',
        opacity: 1,
        transition: {
            ease: 'easeInOut'
        }
    },
    hidden: {
        height: 0,
        opacity: 0,
        transition: {
            ease: 'easeInOut'
        }
    }
};

const FormStatus = ({ formikProps }) => {
    const { errors, values, touched } = formikProps;
    const errorKeys = Object.keys(errors);
    const hasErrors = errorKeys.length !== 0;
    const fieldKeys = Object.keys(formikProps.values);
    const completedFields = fieldKeys.filter(field => {
        if (values[field] !== undefined) return true;
        if (touched.hasOwnProperty(field)) return true;
        return false;
    });
    const completionPercent = Math.floor((completedFields.length * 100) / fieldKeys.length);

    function renderErrorText() {
        if (errorKeys.length === 0) return null;
        if (errorKeys.length === 1) {
            return RegistrationFields.getLabel(errorKeys[0]) + ': ' + errors[errorKeys[0]];
        } else {
            return errorKeys.length + ' errors';
        }
    }

    return (
        <div className={styles.wrapper}>
            <motion.span
                animate={hasErrors ? 'hidden' : 'visible'}
                variants={variants}
                className={styles.completionText}
            >
                {completionPercent}% Completed
            </motion.span>
            <motion.span animate={hasErrors ? 'visible' : 'hidden'} variants={variants} className={styles.errorText}>
                <Icon type="exclamation-circle" /> {renderErrorText()}
            </motion.span>
        </div>
    );
};

export default FormStatus;

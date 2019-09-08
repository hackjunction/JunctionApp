import React, { useCallback, useEffect } from 'react';
import styles from './BooleanField.module.scss';

import CustomCheckbox from 'components/FormComponents/CustomCheckbox';

const BooleanField = React.memo(({ value, name, setFieldValue, validateField, setFieldTouched, touched }) => {
    useEffect(() => {
        if (!touched) return;
        validateField(name);
    }, [name, touched, validateField, value]);

    const onChange = useCallback(
        value => {
            setFieldValue(name, value);
            setFieldTouched(name);
        },
        [name, setFieldTouched, setFieldValue]
    );

    return (
        <div className={styles.wrapper}>
            <CustomCheckbox selected={value === true} onToggle={() => onChange(true)}>
                Yes
            </CustomCheckbox>
            <CustomCheckbox selected={value === false} onToggle={() => onChange(false)}>
                No
            </CustomCheckbox>
        </div>
    );
});

export default BooleanField;

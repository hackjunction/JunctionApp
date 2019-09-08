import React, { useCallback, useEffect } from 'react';
import styles from './TShirtSizeSelect.module.scss';

import { Misc } from '@hackjunction/shared';
import CustomCheckbox from 'components/FormComponents/CustomCheckbox';

const TShirtSizeSelect = React.memo(({ value, name, setFieldValue, validateField, setFieldTouched, touched }) => {
    useEffect(() => {
        if (!touched) return;
        validateField(name);
    }, [name, touched, validateField, value]);

    const onChange = useCallback(
        size => {
            const val = value === size ? undefined : size;
            setFieldValue(name, val);
            setFieldTouched(name);
        },
        [name, setFieldTouched, setFieldValue, value]
    );

    return (
        <div className={styles.wrapper}>
            {Misc.tShirtSizes.map(size => (
                <CustomCheckbox key={size} selected={value === size} onToggle={() => onChange(size)}>
                    {size}
                </CustomCheckbox>
            ))}
        </div>
    );
});

export default TShirtSizeSelect;

import React, { useCallback, useEffect } from 'react';
import styles from './TeamOptionForm.module.scss';

import Divider from 'components/generic/Divider';
import CustomCheckbox from 'components/FormComponents/CustomCheckbox';
import { motion } from 'framer-motion';

const TeamOptionForm = React.memo(({ value = {}, name, setFieldValue, validateField, setFieldTouched, touched }) => {
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

    const handleChange = useCallback(
        (field, fieldValue) => {
            const newValue = {
                ...value,
                [field]: fieldValue
            };
            onChange(newValue);
        },
        [onChange, value]
    );

    return (
        <div className={styles.wrapper}>
            <span className={styles.sectionTitle}>Do you want to apply as a team?</span>
            <div className={styles.checkboxRow}>
                <CustomCheckbox
                    selected={value.applyAsTeam === true}
                    onToggle={val => handleChange('applyAsTeam', val === true ? true : undefined)}
                >
                    Yes
                </CustomCheckbox>
                <CustomCheckbox
                    selected={value.applyAsTeam === false}
                    onToggle={val => handleChange('applyAsTeam', val === true ? false : undefined)}
                >
                    No
                </CustomCheckbox>
            </div>
            <motion.div
                animate={{
                    height: value.applyAsTeam ? 'auto' : 0,
                    opacity: value.applyAsTeam ? 1 : 0
                }}
            >
                <Divider size={1} />
                <span className={styles.sectionTitle}>
                    If your team is not accepted as a whole, do you want to also apply as an individual?
                </span>
                <div className={styles.checkboxRow}>
                    <CustomCheckbox
                        selected={value.applyAlone === true}
                        onToggle={val => handleChange('applyAlone', val === true ? true : undefined)}
                    >
                        Yes
                    </CustomCheckbox>
                    <CustomCheckbox
                        selected={value.applyAlone === false}
                        onToggle={val => handleChange('applyAlone', val === true ? false : undefined)}
                    >
                        No
                    </CustomCheckbox>
                </div>
            </motion.div>
        </div>
    );
});

export default TeamOptionForm;

import React, { useCallback, useEffect } from 'react';
import styles from './RecruitmentOptionForm.module.scss';

import { Misc } from '@hackjunction/shared';

import { Radio } from 'antd';
import { motion } from 'framer-motion';
import Divider from 'components/generic/Divider';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
};

const RecruitmentOptionForm = React.memo(
    ({ value = {}, name, setFieldValue, validateField, setFieldTouched, touched }) => {
        const expanded = value.status === 'actively-looking' || value.status === 'up-for-discussions';
        useEffect(() => {
            if (!touched) return;
            validateField(name);
        }, [name, touched, validateField, value]);

        const handleChange = useCallback(
            (field, fieldValue) => {
                const newValue = {
                    ...value,
                    [field]: fieldValue
                };
                setFieldValue(name, newValue);
                setFieldTouched(name);
            },
            [name, setFieldTouched, setFieldValue, value]
        );
        return (
            <div className={styles.wrapper}>
                <p className={styles.sectionTitle}>What is your current professional situation?</p>
                <div className={styles.checkboxRow}>
                    <Radio.Group value={value.status} onChange={e => handleChange('status', e.target.value)}>
                        {Misc.recruitmentStatuses.asArray.map(({ id, label }) => (
                            <Radio key={id} style={radioStyle} value={id}>
                                {label}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
                <motion.div
                    variants={{
                        hidden: {
                            height: 0,
                            opacity: 0
                        },
                        visible: {
                            height: 'auto',
                            opacity: 1
                        }
                    }}
                    animate={expanded ? 'visible' : 'hidden'}
                >
                    <Divider size={1} />
                    <p className={styles.sectionTitle}>
                        Cool! Can our partners contact you regarding job opportunities they have?
                    </p>
                    <span className={styles.sectionHelpText}>
                        This means that relevant recruitment information about you (ex. contact info, education, skills
                        and other cv information) will be visible to the event partners representatives before, during
                        and after the event. You can also choose to opt out of this later.
                    </span>
                    <Divider size={1} />
                    <Radio.Group value={value.consent} onChange={e => handleChange('consent', e.target.value)}>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                    <Divider size={1} />
                    <p className={styles.sectionTitle}>
                        And finally: would you consider relocating to another country for work as a possibility?
                    </p>
                    <Radio.Group value={value.relocation} onChange={e => handleChange('relocation', e.target.value)}>
                        {Misc.relocationOptions.asArray.map(({ id, label }) => (
                            <Radio key={id} style={radioStyle} value={id}>
                                {label}
                            </Radio>
                        ))}
                    </Radio.Group>
                </motion.div>
            </div>
        );
    }
);

export default RecruitmentOptionForm;

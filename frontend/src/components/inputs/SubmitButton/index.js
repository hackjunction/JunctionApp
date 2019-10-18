import React, { useState } from 'react';
import styles from './SubmitButton.module.scss';

import Button from 'components/generic/Button';
import ExternalLink from 'components/generic/ExternalLink';
import { Switch } from 'antd';

const SubmitButton = ({ hasErrors, loading, onSubmit }) => {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div>
            <div className={styles.privacyClause}>
                <Switch className={styles.privacyClauseSwitch} checked={confirmed} onChange={setConfirmed} />
                <ul className={styles.privacyClauseList}>
                    <li className={styles.privacyClauseListItem}>
                        <span className={styles.privacyClauseText}>
                            I've read and consent to the processing of my data in accordance to the{' '}
                            <ExternalLink href="https://hackjunction.com/policy">Junction Privacy Policy</ExternalLink>
                        </span>
                    </li>
                    <li className={styles.privacyClauseListItem}>
                        <span className={styles.privacyClauseText}>
                            I've read and agree to the{' '}
                            <ExternalLink href="https://hackjunction.com/terms">
                                Junction Terms & Conditions
                            </ExternalLink>
                        </span>
                    </li>
                    <li className={styles.privacyClauseListItem}>
                        <span className={styles.privacyClauseText}>
                            I confirm that the information entered in this form is truthful and accurate
                        </span>
                    </li>
                </ul>
            </div>
            <Button
                theme="accent"
                text="Submit"
                block
                size="large"
                button={{
                    disabled: hasErrors || !confirmed,
                    loading,
                    onClick: onSubmit
                }}
            />
        </div>
    );
};

export default SubmitButton;

import React, { useState, useCallback } from 'react';
import styles from './NewsLetterButton.module.scss';

import { motion } from 'framer-motion';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

import NewsletterService from 'services/newsletter';

const NewsLetterButton = ({ email, country }) => {
    const [hidden, setHidden] = useState(false);
    const [loading, setLoading] = useState(false);

    const isHidden = hidden || !email;

    const handleSubscribe = useCallback(() => {
        setLoading(true);
        NewsletterService.subscribe(email, country)
            .catch(err => {
                setLoading(false);
            })
            .finally(() => {
                setHidden(true);
            });
    }, [country, email]);
    return (
        <motion.div
            variants={{
                hidden: {
                    height: 100,
                    opacity: 0
                },
                visible: {
                    height: 'auto',
                    opacity: 1
                }
            }}
            animate={isHidden ? 'hidden' : 'visible'}
            className={styles.wrapper}
        >
            <span className={styles.title}>While you're here</span>
            <Divider size={1} />
            <p className={styles.body}>
                This is a perfect opportunity to join our mailing list, where we send very occasional (monthly) updates
                about our upcoming events and other things happening around the Junction community. Care to join?
            </p>
            <Divider size={1} />
            <div className={styles.buttons}>
                <Button
                    text="Sign me up!"
                    theme="accent"
                    button={{
                        loading: loading,
                        onClick: handleSubscribe
                    }}
                    block
                />
                <Divider size={1} />
                <Button
                    text="Not now, thanks"
                    theme="transparent"
                    block
                    button={{
                        disabled: loading,
                        onClick: () => setHidden(true)
                    }}
                />
            </div>
        </motion.div>
    );
};

export default NewsLetterButton;

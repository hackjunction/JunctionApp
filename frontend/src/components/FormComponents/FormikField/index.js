import React, { useMemo } from 'react';
import styles from './FormikField.module.scss';

import { isEmpty } from 'lodash-es';
import { Field, FastField } from 'formik';
import { motion } from 'framer-motion';
import FocusWithin from 'react-focus-within';
import classNames from 'classnames';

import Markdown from 'components/generic/Markdown';
import Divider from 'components/generic/Divider';

const FormikField = props => {
    const {
        name,
        type,
        label,
        hint,
        hintMarkdown = false,
        validate = () => {},
        required,
        render,
        renderValue,
        isFast,
        validateOnBlur = true,
        alwaysFocused = true
    } = props;

    function renderFieldValue(value) {
        if ((typeof renderValue === 'function' && !isEmpty(value)) || typeof value === 'boolean') {
            return renderValue(value);
        } else if (typeof value !== 'object') {
            return value;
        } else {
            return null;
        }
    }

    const renderHint = useMemo(() => {
        if (!hint) return <Divider size={1} />;
        if (hintMarkdown) {
            return (
                <React.Fragment>
                    <Markdown source={hint} />
                    <Divider size={1} />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <span>{hint}</span>
                    <Divider size={1} />
                </React.Fragment>
            );
        }
    }, [hint, hintMarkdown]);

    function renderField(renderProps) {
        const error = renderProps.form.errors[renderProps.field.name];

        const fieldProps = {
            ...renderProps,
            field: {
                ...renderProps.field,
                onBlur: (...args) => {
                    if (validateOnBlur) {
                        renderProps.form.validateField(name, renderProps.field.value);
                    }
                    renderProps.field.onBlur(...args);
                }
            }
        };
        const field = ({ focusProps = {}, isFocused }) => (
            <div
                className={classNames({
                    [styles.wrapper]: true,
                    [styles.wrapperFocused]: isFocused,
                    [styles.wrapperError]: !isEmpty(error)
                })}
                {...focusProps}
                onClick={alwaysFocused ? () => {} : () => focusProps.onFocus()}
            >
                <motion.div
                    style={{ opacity: 0 }}
                    animate={{
                        height: isFocused ? 0 : 56,
                        transition: {
                            ease: 'easeInOut',
                            duration: 0.25
                        }
                    }}
                />
                <div className={styles.top}>
                    <label className={styles.label}>
                        {label}
                        {required && <span className={styles.labelRequired}>*</span>}
                    </label>
                    <motion.div
                        className={styles.topValue}
                        animate={{
                            opacity: isFocused ? 0 : 1
                        }}
                    >
                        <span className={styles.value}>{renderFieldValue(fieldProps.field.value)}</span>
                    </motion.div>
                </div>
                <div className={styles.hintWrapper}>
                    <span className={styles.errorText}>{error}</span>
                </div>
                <motion.div
                    animate={{
                        height: isFocused ? 'auto' : 0,
                        opacity: isFocused ? 1 : 0,
                        transition: {
                            ease: 'easeInOut',
                            duration: 0.25
                        }
                    }}
                    className={styles.field}
                >
                    {renderHint}
                    {render(fieldProps)}
                </motion.div>
            </div>
        );

        if (alwaysFocused) {
            return field({ isFocused: true });
        } else {
            return <FocusWithin>{args => field(args)}</FocusWithin>;
        }
    }

    if (isFast) {
        return <FastField name={name} type={type} validate={validate} render={renderField} />;
    } else {
        return <Field name={name} type={type} validate={validate} render={renderField} />;
    }
};

export default FormikField;

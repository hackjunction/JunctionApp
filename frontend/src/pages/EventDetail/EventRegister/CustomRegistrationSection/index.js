import React, { useState } from 'react';
import styles from './CustomRegistrationSection.module.scss';

import Divider from 'components/generic/Divider';
import Markdown from 'components/generic/Markdown';
import CustomCheckbox from 'components/FormComponents/CustomCheckbox';
import RegistrationFieldCustom from 'components/FormComponents/RegistrationFieldCustom';
import StaggeredListItem from 'components/animated/StaggeredListItem';

const CustomRegistrationSection = ({ section, hasValue }) => {
    const hasConditional = typeof section.conditional !== 'undefined';
    const initialShow = !hasConditional || hasValue;
    const [showQuestions, setShowQuestions] = useState(initialShow);

    const renderConditional = () => {
        if (hasConditional) {
            return (
                <div className={styles.conditionalWrapper}>
                    <p className={styles.conditionalText}>{section.conditional}</p>
                    <div className={styles.conditionalCheckboxes}>
                        <CustomCheckbox inverted selected={showQuestions} onToggle={() => setShowQuestions(true)}>
                            Yes
                        </CustomCheckbox>
                        <CustomCheckbox inverted selected={!showQuestions} onToggle={() => setShowQuestions(false)}>
                            No
                        </CustomCheckbox>
                    </div>
                </div>
            );
        }
    };

    const renderQuestions = () => {
        if (!showQuestions) return;

        return section.questions.map(question => (
            <StaggeredListItem key={question.name}>
                <Divider size={1} />
                <RegistrationFieldCustom section={section} question={question} />
            </StaggeredListItem>
        ));
    };

    return (
        <div className={styles.wrapper}>
            <Divider size={2} />
            <h3 className={styles.title}>{section.label}</h3>
            <Divider size={2} />
            <div className={styles.header}>
                <Markdown source={section.description} className={styles.description} light large />
                {renderConditional()}
            </div>
            {renderQuestions()}
        </div>
    );
};

export default CustomRegistrationSection;

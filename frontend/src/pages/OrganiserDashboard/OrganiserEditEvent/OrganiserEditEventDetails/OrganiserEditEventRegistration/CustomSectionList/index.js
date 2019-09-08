import React, { useState, useCallback, useMemo } from 'react';
import styles from './CustomSectionList.module.scss';

import { Empty } from 'antd';
import { RegistrationFields } from '@hackjunction/shared';

import Button from 'components/generic/Button';
import AddSectionModal from '../AddSectionModal';
import CustomSectionListItem from '../CustomSectionListItem';

const CustomSectionList = ({ sections = [], onChange }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState();
    const reservedNames = useMemo(() => {
        const sectionNames = sections.map(s => s.name);
        const questionNames = Object.keys(RegistrationFields.getFields());
        return sectionNames.concat(questionNames);
    }, [sections]);

    const handleAdd = useCallback(
        section => {
            const newValue = sections.concat(section);
            onChange(newValue);
        },
        [onChange, sections]
    );

    const handleChange = useCallback(
        (updatedSection, updatedIndex) => {
            const newValue = sections.map((section, index) => {
                if (updatedIndex === index) {
                    return updatedSection;
                }
                return section;
            });
            onChange(newValue);
        },
        [onChange, sections]
    );

    const handleRemove = useCallback(
        (section, index) => {
            const newValue = sections.slice();
            newValue.splice(index, 1);
            onChange(newValue);
        },
        [onChange, sections]
    );

    const handleMoveUp = useCallback(
        (section, index) => {
            if (index === 0) return;
            const newValue = sections.slice();
            newValue[index] = newValue[index - 1];
            newValue[index - 1] = section;
            onChange(newValue);
        },
        [onChange, sections]
    );

    const handleMoveDown = useCallback(
        (section, index) => {
            if (index === sections.length - 1) return;
            const newValue = sections.slice();
            newValue[index] = newValue[index + 1];
            newValue[index + 1] = section;
            onChange(newValue);
        },
        [onChange, sections]
    );

    const handleEditDone = useCallback(
        section => {
            const newValue = sections.map(s => {
                if (s.name === section.name) {
                    return section;
                }
                return s;
            });
            onChange(newValue);
            setEditing(undefined);
        },
        [onChange, sections]
    );

    const renderAdd = () => (
        <Button
            text="Add section"
            block
            button={{
                onClick: () => setModalOpen(true)
            }}
        />
    );

    const renderEmpty = () => {
        return <Empty description="No custom questions" />;
    };

    const renderList = () => {
        return sections.map((section, index) => (
            <CustomSectionListItem
                key={section.label}
                section={section}
                onChange={section => handleChange(section, index)}
                onRemove={() => handleRemove(section, index)}
                onMoveUp={() => handleMoveUp(section, index)}
                onMoveDown={() => handleMoveDown(section, index)}
                onEdit={() => setEditing(section)}
                isFirst={index === 0}
                isLast={index === sections.length - 1}
            />
        ));
    };

    return (
        <React.Fragment>
            <AddSectionModal
                visible={modalOpen}
                onVisibleChange={setModalOpen}
                onSubmit={handleAdd}
                reservedNames={reservedNames}
                editing={editing}
                onEditDone={section => handleEditDone(section)}
                onEditCancel={() => setEditing(undefined)}
            />
            {sections.length === 0 ? renderEmpty() : renderList()}
            <div className={styles.addButtonWrapper}>{renderAdd()}</div>
        </React.Fragment>
    );
};

export default CustomSectionList;

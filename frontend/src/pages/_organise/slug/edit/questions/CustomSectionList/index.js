import React, { useState, useCallback, useMemo } from 'react'

import { RegistrationFields } from '@hackjunction/shared'
import { Box } from '@material-ui/core'

import Empty from 'components/generic/Empty'
import Button from 'components/generic/Button'
import AddSectionModal from './AddSectionModal'
import CustomSectionListItem from './CustomSectionListItem'

export default ({ sections = [], onChange, projectsExist = false }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState()
    const reservedNames = useMemo(() => {
        const sectionNames = sections.map(s => s.name)
        const questionNames = Object.keys(RegistrationFields.getFields())
        return sectionNames.concat(questionNames)
    }, [sections])

    console.log('Do projects exist?', projectsExist)
    const handleAdd = useCallback(
        section => {
            const newValue = sections.concat(section)
            onChange(newValue)
        },
        [onChange, sections],
    )

    const handleChange = useCallback(
        (updatedSection, updatedIndex) => {
            const newValue = sections.map((section, index) => {
                if (updatedIndex === index) {
                    return updatedSection
                }
                return section
            })
            onChange(newValue)
        },
        [onChange, sections],
    )

    const handleRemove = useCallback(
        (section, index) => {
            if (projectsExist) {
                return alert(
                    'Participants have submitted projects already so you cannot remove questions anymore.',
                )
            }
            const newValue = sections.slice()
            newValue.splice(index, 1)
            onChange(newValue)
        },
        [onChange, sections, projectsExist],
    )

    const handleMoveUp = useCallback(
        (section, index) => {
            if (index === 0) return
            const newValue = sections.slice()
            newValue[index] = newValue[index - 1]
            newValue[index - 1] = section
            onChange(newValue)
        },
        [onChange, sections],
    )

    const handleMoveDown = useCallback(
        (section, index) => {
            if (index === sections.length - 1) return
            const newValue = sections.slice()
            newValue[index] = newValue[index + 1]
            newValue[index + 1] = section
            onChange(newValue)
        },
        [onChange, sections],
    )

    const handleEditDone = useCallback(
        section => {
            const newValue = sections.map(s => {
                if (s.name === section.name) {
                    return section
                }
                return s
            })
            onChange(newValue)
            setEditing(undefined)
        },
        [onChange, sections],
    )

    const renderAdd = () => (
        <Button
            onClick={() => setModalOpen(true)}
            fullWidth
            color="primary"
            variant="contained"
        >
            Add section
        </Button>
    )

    const renderEmpty = () => {
        return <Empty isEmpty emptyText="No custom questions" />
    }

    const renderList = () => {
        return sections.map((section, index) => (
            <CustomSectionListItem
                key={section.name}
                section={section}
                onChange={section => handleChange(section, index)}
                onRemove={() => handleRemove(section, index)}
                onMoveUp={() => handleMoveUp(section, index)}
                onMoveDown={() => handleMoveDown(section, index)}
                onEdit={() => setEditing(section)}
                isFirst={index === 0}
                isLast={index === sections.length - 1}
            />
        ))
    }

    return (
        <>
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
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                maxWidth="300px"
                width="100%"
                margin="0 auto"
                padding={2}
            >
                {renderAdd()}
            </Box>
        </>
    )
}

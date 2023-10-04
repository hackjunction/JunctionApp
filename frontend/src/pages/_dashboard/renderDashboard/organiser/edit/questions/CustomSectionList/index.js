import React, { useCallback } from 'react'

import { Box } from '@material-ui/core'

import Empty from 'components/generic/Empty'
import Button from 'components/generic/Button'
import CustomSectionListItem from './CustomSectionListItem'
import { useTranslation } from 'react-i18next'
import { now } from 'moment'

export default ({ sections = [], onChange, projectsExist = false }) => {
    const { t } = useTranslation()
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
                    t(`submission_form_customization_prevent_delete_section`),
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
        },
        [onChange, sections],
    )

    const renderAdd = () => (
        <Button
            onClick={() =>
                handleAdd({
                    label: 'New section - click here to edit the name of this section',
                    name: `section_${now()}`,
                })
            }
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
        return (
            <Box className="tw-flex tw-flex-col tw-gap-4">
                {sections.map((section, index) => {
                    return (
                        <CustomSectionListItem
                            key={section.name}
                            section={section}
                            index
                            onChange={section => handleChange(section, index)}
                            onRemove={() => handleRemove(section, index)}
                            onMoveUp={() => handleMoveUp(section, index)}
                            onMoveDown={() => handleMoveDown(section, index)}
                            isFirst={index === 0}
                            isLast={index === sections.length - 1}
                            projectsExist={projectsExist}
                        />
                    )
                })}
            </Box>
        )
    }

    return (
        <>
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

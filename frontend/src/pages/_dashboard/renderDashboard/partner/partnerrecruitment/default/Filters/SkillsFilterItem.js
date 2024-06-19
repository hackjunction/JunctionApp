import React, { useCallback } from 'react'

import { makeStyles } from '@mui/styles'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionActions,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'
import { Skills } from '@hackjunction/shared'

const useStyles = makeStyles(theme => ({
    radios: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}))
const SkillsFilterItem = React.memo(({ skill, levels, onEdit, onRemove }) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const toggleLevel = useCallback(
        level => {
            if (levels.indexOf(level) !== -1) {
                onEdit({
                    skill,
                    levels: levels.filter(item => item !== level),
                })
            } else {
                onEdit({
                    skill,
                    levels: levels.concat(level),
                })
            }
        },
        [skill, levels, onEdit],
    )

    const renderSelected = () => {
        if (levels.length === 0 || levels.length === 5) {
            return t('Any_skill_level_')
        } else {
            return levels
                .map(level => Skills.getLabelForSkillLevel(level))
                .join(', ')
        }
    }
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle1">{skill}</Typography>
                    <Typography variant="caption">
                        {renderSelected()}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup className={classes.radios}>
                    {Skills.skillLevelArray.map(({ value, label }) => (
                        <FormControlLabel
                            key={label}
                            control={
                                <Checkbox
                                    checked={levels.indexOf(value) !== -1}
                                    onChange={() => toggleLevel(value)}
                                    value={label}
                                />
                            }
                            label={label}
                        />
                    ))}
                </FormGroup>
            </AccordionDetails>
            <AccordionActions>
                <Button size="small" onClick={onRemove}>
                    {t('Remove_')}
                </Button>
            </AccordionActions>
        </Accordion>
    )
})

export default SkillsFilterItem

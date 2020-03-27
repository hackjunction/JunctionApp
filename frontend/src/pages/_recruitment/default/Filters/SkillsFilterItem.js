import React, { useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTranslation } from 'react-i18next';
import { Skills } from '@hackjunction/shared'

const useStyles = makeStyles(theme => ({
    radios: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}))
const { t, i18n } = useTranslation();
const SkillsFilterItem = React.memo(({ skill, levels, onEdit, onRemove }) => {
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
        [skill, levels, onEdit]
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
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle1">{skill}</Typography>
                    <Typography variant="caption">
                        {renderSelected()}
                    </Typography>
                </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
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
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
                <Button size="small" onClick={onRemove}>
                    {t('Remove_')}
                </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    )
})

export default SkillsFilterItem

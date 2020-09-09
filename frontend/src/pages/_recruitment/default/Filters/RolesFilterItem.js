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

import { Roles } from '@hackjunction/shared'

const useStyles = makeStyles(theme => ({
    radios: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}))

const RolesFilterItem = React.memo(({ role, years, onEdit, onRemove }) => {
    const classes = useStyles()
    const toggleLevel = useCallback(
        year => {
            if (years.indexOf(year) !== -1) {
                onEdit({
                    role,
                    years: years.filter(item => item !== year),
                })
            } else {
                onEdit({
                    role,
                    years: years.concat(year),
                })
            }
        },
        [role, years, onEdit]
    )

    const renderSelected = () => {
        if (years.length === 0 || years.length === 5) {
            return 'Any amount of experience'
        } else {
            return years
                .map(year => Roles.getLabelForExperienceLevel(year))
                .join(', ')
        }
    }
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle1">{role}</Typography>
                    <Typography variant="caption">
                        {renderSelected()}
                    </Typography>
                </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <FormGroup className={classes.radios}>
                    {Roles.experienceLevelArray.map(({ value, label }) => (
                        <FormControlLabel
                            key={label}
                            control={
                                <Checkbox
                                    checked={years.indexOf(value) !== -1}
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
                    Remove
                </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    )
})

export default RolesFilterItem

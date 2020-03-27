import React, { useCallback } from 'react'

import { RegistrationStatuses } from '@hackjunction/shared'
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
import { useTranslation } from 'react-i18next'

const STATUSES = [
    RegistrationStatuses.asObject.confirmed,
    RegistrationStatuses.asObject.checkedIn,
]
const { t, i18n } = useTranslation()
const useStyles = makeStyles(theme => ({
    radios: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}))

const EventsFilterItem = React.memo(
    ({ event, eventName, statuses, onEdit, onRemove }) => {
        const classes = useStyles()
        const toggleStatus = useCallback(
            status => {
                if (statuses.indexOf(status) !== -1) {
                    onEdit({
                        event,
                        statuses: statuses.filter(item => item !== status),
                    })
                } else {
                    onEdit({
                        event,
                        statuses: statuses.concat(status),
                    })
                }
            },
            [event, statuses, onEdit]
        )

        const renderSelected = () => {
            if (statuses.length === 0 || statuses.length === 5) {
                return t('Has_applied_')
            } else {
                return statuses
                    .map(
                        status =>
                            RegistrationStatuses.asObject[status].description
                    )
                    .join(', ')
            }
        }
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="subtitle1">{eventName}</Typography>
                        <Typography variant="caption">
                            {renderSelected()}
                        </Typography>
                    </Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormGroup className={classes.radios}>
                        {STATUSES.map(({ id, description }) => (
                            <FormControlLabel
                                key={id}
                                control={
                                    <Checkbox
                                        checked={statuses.indexOf(id) !== -1}
                                        onChange={() => toggleStatus(id)}
                                        value={id}
                                    />
                                }
                                label={description}
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
    }
)

export default EventsFilterItem

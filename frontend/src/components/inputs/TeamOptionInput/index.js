import React, { useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import BooleanInput from 'components/inputs/BooleanInput'

const useStyles = makeStyles(theme => ({
    label: {
        fontWeight: 'bold',
    },
    hint: {},
}))

const TeamOptionInput = ({ value, onChange, onBlur = () => {}, autoFocus }) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation() // eslint-disable-line
    const handleChange = useCallback(
        (fieldName, fieldValue) => {
            onChange({
                ...value,
                [fieldName]: fieldValue,
            })
        },
        [value, onChange]
    )
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography className={classes.label} variant="subtitle2">
                    {t('Apply_as_team_')}
                </Typography>
                <Typography className={classes.hint} variant="subtitle2">
                    {t('Please_note_apply_')}
                </Typography>
                <BooleanInput
                    autoFocus={autoFocus}
                    value={value.applyAsTeam}
                    onChange={applyAsTeam =>
                        handleChange('applyAsTeam', applyAsTeam)
                    }
                    onBlur={onBlur}
                />
            </Grid>
            {value.applyAsTeam && (
                <Grid item xs={12}>
                    <Typography className={classes.label} variant="subtitle2">
                        {t('Apply_also_alone_')}
                    </Typography>
                    <Typography className={classes.hint} variant="subtitle2">
                        {t('Apply_also_entire_')}
                    </Typography>
                    <BooleanInput
                        value={value.applyAlone}
                        onChange={applyAlone =>
                            handleChange('applyAlone', applyAlone)
                        }
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default TeamOptionInput

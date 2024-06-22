import React, { useCallback } from 'react'

import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import BooleanInput from 'components/inputs/BooleanInput'

const TeamOptionInput = ({ value, onChange, onBlur = () => {}, autoFocus }) => {
    const { t } = useTranslation()
    const handleChange = useCallback(
        (fieldName, fieldValue) => {
            onChange({
                ...value,
                [fieldName]: fieldValue,
            })
        },
        [value, onChange],
    )
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography className=" tw-font-bold" variant="subtitle2">
                    {t('Apply_as_team_')}
                </Typography>
                <Typography variant="subtitle2">
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
                    <Typography className=" tw-font-bold" variant="subtitle2">
                        {t('Apply_also_alone_')}
                    </Typography>
                    <Typography variant="subtitle2">
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

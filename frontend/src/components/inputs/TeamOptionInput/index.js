import React, { useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import BooleanInput from 'components/inputs/BooleanInput'

const useStyles = makeStyles(theme => ({
    label: {
        fontWeight: 'bold',
    },
    hint: {},
}))

const TeamOptionInput = ({ value, onChange, onBlur = () => {}, autoFocus }) => {
    const classes = useStyles()

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
                    Do you want to apply as a team?
                </Typography>
                <Typography className={classes.hint} variant="subtitle2">
                    Please note: if you do apply as a team, you must form the
                    team on the event dashboard, which you will be able to
                    access after completing this form.
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
                        Do you want to apply also alone?
                    </Typography>
                    <Typography className={classes.hint} variant="subtitle2">
                        If your entire team can't make it, do you want to also
                        apply alone?
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

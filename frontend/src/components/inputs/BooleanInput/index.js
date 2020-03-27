import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles'
import { Box, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    radioGroup: ({ alignCenter }) => ({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: alignCenter ? 'center' : 'flex-start',
    }),
}))


const BooleanInput = ({ value = false, onChange, alignCenter = false }) => {
    const classes = useStyles({ alignCenter })
const { t, i18n } = useTranslation();
    const handleChange = useCallback(
        e => {
            onChange(!value)
        },
        [onChange, value]
    )
    return (
        <Box>
            <RadioGroup
                className={classes.radioGroup}
                aria-label="yes-no"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    key={'yes'}
                    value={true}
                    control={<Radio color="primary" />}
                    label={t('Yes_')}
                    labelPlacement="start"
                />
                <FormControlLabel
                    key={'no'}
                    value={false}
                    control={<Radio color="primary" />}
                    label={t('No_')}
                    labelPlacement="start"
                />
            </RadioGroup>
        </Box>
    )
}

export default BooleanInput

import React, { useCallback } from 'react'

import { Misc } from '@hackjunction/shared'
import { Grid, Typography } from '@material-ui/core'

import Select from 'components/inputs/Select'
import BooleanInput from 'components/inputs/BooleanInput'
import config from 'constants/config'
import { useTranslation } from 'react-i18next'

const STATUS_OPTIONS = Misc.recruitmentStatuses.asArray.map(
    ({ id, label }) => ({
        value: id,
        label,
    })
)

const RELOCATION_OPTIONS = Misc.relocationOptions.asArray.map(
    ({ id, label }) => ({
        value: id,
        label,
    })
)

const RecruitmentOptionInput = ({
    value = {},
    onChange,
    onBlur,
    autoFocus,
}) => {
    const { t, i18n } = useTranslation()
    const handleChange = useCallback(
        (field, fieldValue) => {
            if (field === 'status' && fieldValue === 'not-interested') {
                onChange({
                    ...value,
                    status: fieldValue,
                    consent: false,
                    relocation: undefined,
                })
            } else {
                onChange({
                    ...value,
                    [field]: fieldValue,
                })
            }
        },
        [onChange, value]
    )

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                    {t('Current_pro_situation_')}
                </Typography>
                <Select
                    autoFocus={autoFocus}
                    placeholder="Choose one"
                    value={value.status}
                    onChange={status => handleChange('status', status)}
                    onBlur={onBlur}
                    options={STATUS_OPTIONS}
                />
            </Grid>
            {value.status &&
                value.status !== 'not-interested' && [
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {t('Cool_partners_')}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {t('Cool_partners_mean_', {
                                owner: config.PLATFORM_OWNER_NAME,
                            })}
                        </Typography>
                        <BooleanInput
                            value={value.consent}
                            onChange={consent =>
                                handleChange('consent', consent)
                            }
                        />
                    </Grid>,
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>
                            {t('Relocation_option_')}
                        </Typography>
                        <Select
                            placeholder="Choose one"
                            value={value.relocation}
                            onChange={relocation =>
                                handleChange('relocation', relocation)
                            }
                            options={RELOCATION_OPTIONS}
                        />
                    </Grid>,
                ]}
        </Grid>
    )
}

export default RecruitmentOptionInput

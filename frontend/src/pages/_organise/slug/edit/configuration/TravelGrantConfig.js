import React, { useCallback } from 'react'

import { Grid } from '@material-ui/core'

import BooleanInput from 'components/inputs/BooleanInput'
import TextInput from 'components/inputs/TextInput'
import FormControl from 'components/inputs/FormControl'
import Select from 'components/inputs/Select'

export default ({ value = {}, onChange }) => {
    const { enabled, budget, currency } = value

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
        <>
            <FormControl
                label="Travel grants"
                hint="Will you be offering travel grants for participants?"
            >
                <BooleanInput
                    value={enabled || false}
                    onChange={value => handleChange('enabled', value)}
                />
            </FormControl>
            {enabled && (
                <FormControl hint="What's your total travel grant budget?">
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <TextInput
                                label="Amount"
                                value={budget}
                                type="number"
                                onChange={value => {
                                    handleChange('budget', Number(value))
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                options="currency"
                                label="Currency"
                                value={currency}
                                onChange={value =>
                                    handleChange('currency', value)
                                }
                            />
                        </Grid>
                    </Grid>
                </FormControl>
            )}
        </>
    )
}

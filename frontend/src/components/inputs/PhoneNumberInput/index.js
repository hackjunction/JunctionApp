import React, { useCallback } from 'react'

import { Grid, InputAdornment, Box, Typography } from '@material-ui/core'
import Select from 'components/inputs/Select'
import TextInput from 'components/inputs/TextInput'

const PhoneNumberInput = React.memo(
    ({ label, value = {}, onChange, onBlur }) => {
        const handleCodeChange = useCallback(
            code => {
                onChange({
                    ...value,
                    country_code: code,
                })
            },
            [value, onChange]
        )

        const handleNumberChange = useCallback(
            number => {
                onChange({
                    ...value,
                    number,
                })
            },
            [value, onChange]
        )
        console.log('country values', value)
        return (
            <Box>
                {label && <Typography variant="subtitle1">{label}</Typography>}
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    alignItems="flex-end"
                >
                    <Grid item xs={12} md={4}>
                        <Select
                            options="countryCode"
                            label="Country code"
                            value={value.country_code}
                            onChange={handleCodeChange}
                            onBlur={onBlur}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextInput
                            label="Phone number"
                            type="number"
                            value={value.number}
                            onChange={handleNumberChange}
                            onBlur={onBlur}
                            disabled={!value.country_code}
                            textFieldProps={{
                                InputProps: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {value.country_code}
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        )
    }
)

export default PhoneNumberInput

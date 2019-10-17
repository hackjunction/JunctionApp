import React, { useCallback } from 'react';

import { Grid, InputAdornment, Typography } from '@material-ui/core';
import Select from 'components/inputs/Select';
import TextInput from 'components/inputs/TextInput';

const PhoneNumberInput = React.memo(({ label, value = {}, onChange }) => {
    const handleCodeChange = useCallback(
        code => {
            onChange({
                ...value,
                country_code: code
            });
        },
        [value, onChange]
    );

    const handleNumberChange = useCallback(
        number => {
            onChange({
                ...value,
                number
            });
        },
        [value, onChange]
    );

    return (
        <Grid container spacing={3} direction="row" alignItems="flex-end">
            <Grid item xs={12} md={4}>
                <Select
                    type="countryCode"
                    label="Country code"
                    value={value.country_code}
                    onChange={handleCodeChange}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextInput
                    label="Phone number"
                    type="number"
                    value={value.number}
                    onChange={handleNumberChange}
                    disabled={!value.country_code}
                    textFieldProps={{
                        InputProps: {
                            startAdornment: <InputAdornment position="start">{value.country_code}</InputAdornment>
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
});

export default PhoneNumberInput;

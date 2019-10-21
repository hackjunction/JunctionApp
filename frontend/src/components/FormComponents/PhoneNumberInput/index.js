import React, { useCallback, useEffect } from 'react';

import { Grid, InputAdornment } from '@material-ui/core';

import Select from 'components/inputs/Select';
import TextInput from 'components/inputs/TextInput';

const PhoneNumberInput = React.memo(({ value = {}, name, setFieldValue, setFieldTouched, validateField, touched }) => {
    useEffect(() => {
        if (!touched) return;
        validateField(name);
    }, [name, touched, validateField, value]);

    const onChange = useCallback(
        function(value) {
            setFieldValue(name, value);
            setFieldTouched(name);
        },
        [name, setFieldTouched, setFieldValue]
    );

    const setCountryCode = useCallback(
        val => {
            onChange({
                ...value,
                country_code: val
            });
        },
        [onChange, value]
    );
    const setNumber = useCallback(
        number => {
            onChange({
                ...value,
                number
            });
        },
        [onChange, value]
    );
    return (
        <Grid container spacing={3} direction="row" alignItems="flex-end">
            <Grid item xs={12} md={4}>
                <Select
                    type="countryCode"
                    label="Choose country"
                    value={value.country_code}
                    onChange={setCountryCode}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextInput
                    label="Phone number"
                    type="number"
                    value={value.number}
                    onChange={setNumber}
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

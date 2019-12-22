import React, { useCallback } from 'react'

import { Grid } from '@material-ui/core'
import Select from 'components/inputs/Select'
import TextInput from 'components/inputs/TextInput'

const StreetAddressInput = ({
    value = {},
    onChange,
    onBlur,
    showVenueName = false,
}) => {
    const {
        country,
        addressLine,
        addressLine2,
        city,
        postalCode,
        venueName,
    } = value

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
                <Select
                    label="Country"
                    options="country"
                    value={country}
                    onChange={value => handleChange('country', value)}
                    onBlur={onBlur}
                />
            </Grid>
            <Grid item xs={9}>
                <TextInput
                    label="Street address"
                    value={addressLine}
                    onChange={value => handleChange('addressLine', value)}
                    onBlur={onBlur}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    label="Apartment/Unit/Other"
                    value={addressLine2}
                    onChange={value => handleChange('addressLine2', value)}
                    onBlur={onBlur}
                />
            </Grid>
            <Grid item xs={8}>
                <TextInput
                    label="City"
                    value={city}
                    onChange={value => handleChange('city', value)}
                />
            </Grid>
            <Grid item xs={4}>
                <TextInput
                    label="Postal code"
                    value={postalCode}
                    onChange={value => handleChange('postalCode', value)}
                    onBlur={onBlur}
                />
            </Grid>
            {showVenueName && (
                <Grid item xs={12}>
                    <TextInput
                        label="Venue name"
                        value={venueName}
                        onChange={value => handleChange('venueName', value)}
                        onBlur={onBlur}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default StreetAddressInput

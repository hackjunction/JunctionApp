import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import Select from 'components/inputs/Select';
import TextInput from 'components/inputs/TextInput';

const StreetAddressInput = ({ showVenueName }) => {
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [postalCode, setPostalCode] = useState();
    const [venueName, setVenueName] = useState();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Select label="Country" options="country" value={country} onChange={setCountry} />
            </Grid>
            <Grid item xs={9}>
                <TextInput label="Street address" value={address} onChange={setAddress} />
            </Grid>
            <Grid item xs={3}>
                <TextInput label="Apartment/Unit/Other" value={address2} onChange={setAddress2} />
            </Grid>
            <Grid item xs={8}>
                <TextInput label="City" value={city} onChange={setCity} />
            </Grid>
            <Grid item xs={4}>
                <TextInput label="Postal code" value={postalCode} onChange={setPostalCode} />
            </Grid>
            {showVenueName && (
                <Grid item xs={12}>
                    <TextInput label="Venue name" value={venueName} onChange={setVenueName} />
                </Grid>
            )}
        </Grid>
    );
};

export default StreetAddressInput;

import React from 'react';

import { Grid, Box, FormControl, InputLabel, MenuItem, Select as MaterialSelect } from '@material-ui/core';
import { useFormField } from 'hooks/formHooks';

import CenteredContainer from 'components/generic/CenteredContainer';
import TextInput from 'components/inputs/TextInput';
import PhoneNumberInput from 'components/inputs/PhoneNumberInput';
import DateInput from 'components/inputs/DateInput';
import Select from 'components/inputs/SelectOld';

const DemoPage = () => {
    const textInput = useFormField('');
    const phoneInput = useFormField({});
    const dateInput = useFormField(new Date());
    const countryInput = useFormField('');
    const countryCodeInput = useFormField('');
    const nationalityInput = useFormField('');
    const genderInput = useFormField('');
    const industryInput = useFormField('');
    const languageInput = useFormField('');
    const roleInput = useFormField('');
    const skillInput = useFormField('');
    const themeInput = useFormField('');
    const statusInput = useFormField('');
    return (
        <CenteredContainer wrapContent={true}>
            <Box mt={10}></Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextInput label="Text input" value={textInput.value} onChange={textInput.setValue} />
                </Grid>
                <Grid item xs={12}>
                    <PhoneNumberInput value={phoneInput.value} onChange={phoneInput.setValue} />
                </Grid>
                <Grid item xs={12}>
                    <DateInput value={dateInput.value} onChange={dateInput.setValue} />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={countryInput.value}
                        onChange={countryInput.setValue}
                        label="Choose country"
                        type="country"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={countryCodeInput.value}
                        onChange={countryCodeInput.setValue}
                        label="Choose country"
                        type="countryCode"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={nationalityInput.value}
                        onChange={nationalityInput.setValue}
                        label="Choose nationality"
                        type="nationality"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={genderInput.value}
                        onChange={genderInput.setValue}
                        label="Choose gender"
                        type="gender"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={industryInput.value}
                        onChange={industryInput.setValue}
                        label="Choose industry"
                        type="industry"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={languageInput.value}
                        onChange={languageInput.setValue}
                        label="Choose language"
                        type="language"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select value={roleInput.value} onChange={roleInput.setValue} label="Choose role" type="role" />
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel htmlFor="age-simple">Age</InputLabel>
                        <MaterialSelect
                            value={10}
                            onChange={console.log}
                            inputProps={{
                                name: 'age',
                                id: 'age-simple'
                            }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </MaterialSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Select value={skillInput.value} onChange={skillInput.setValue} label="Choose skill" type="skill" />
                </Grid>
                <Grid item xs={12}>
                    <Select value={themeInput.value} onChange={themeInput.setValue} label="Choose theme" type="theme" />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={statusInput.value}
                        onChange={statusInput.setValue}
                        label="Choose status"
                        type="status"
                    />
                </Grid>
            </Grid>
            <Box mb={10}></Box>
        </CenteredContainer>
    );
};

export default DemoPage;

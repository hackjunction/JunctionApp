import React, { useState, useCallback } from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { connect } from 'react-redux';
import moment from 'moment';
import { Typography, Grid, Button } from '@material-ui/core';

import { Drawer } from 'antd';

import TextInput from 'components/inputs/TextInput';
import DateInput from 'components/inputs/DateInput';
import { useFormField } from 'hooks/formHooks';

import VisaInvitationPDF from './VisaInvitationPDF';
import * as DashboardSelectors from 'redux/dashboard/selectors';

const VisaInvitationDrawer = ({ registration }) => {
    const [visible, setVisible] = useState(false);
    const firstName = useFormField(registration ? registration.answers.firstName : '');
    const lastName = useFormField(registration ? registration.answers.lastName : '');
    const nationality = useFormField(registration ? registration.answers.nationality : '');
    const passportNo = useFormField('');
    const profession = useFormField('');
    const arrivalDate = useFormField(Date.now());
    const arrivalCity = 'Helsinki';
    const arrivalCountry = 'Finland';

    const [generated, setGenerated] = useState(false);

    const handleClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <React.Fragment>
            <Drawer
                title={`Generate visa invitation letter`}
                placement="right"
                width={640}
                closable={true}
                onClose={handleClose}
                visible={visible}
                getContainer={false}
            >
                <Typography variant="body1" paragraph>
                    Just fill in a few more travel details and we'll generate a visa invitation letter for you. We will
                    not save this information for later use - in fact it is never sent anywhere from your device.
                </Typography>
                <Typography variant="body1" paragraph>
                    Once you've generated the visa invitation letter, double check it to make sure all of the
                    information is correct. You can always generate a new invitation should you need to.
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextInput
                            label="First name"
                            value={firstName.value}
                            onChange={firstName.onChange}
                            rawOnChange
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput label="Last name" value={lastName.value} onChange={lastName.onChange} rawOnChange />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            label="Nationality"
                            helperText="E.g. 'Finnish', 'American', 'German'"
                            value={nationality.value}
                            onChange={nationality.onChange}
                            rawOnChange
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            label="Passport Number"
                            value={passportNo.value}
                            onChange={passportNo.onChange}
                            rawOnChange
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            label="Profession"
                            value={profession.value}
                            helperText='E.g. " Student at Aalto University" / "Employed at BigCorp Inc.'
                            onChange={profession.onChange}
                            rawOnChange
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption" color="textSecondary">
                            Date of arrival
                        </Typography>
                        <DateInput value={arrivalDate.value} onChange={arrivalDate.setValue} />
                        <Typography variant="caption" color="textSecondary">
                            The date you will be arriving to the country
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth color="primary" variant="contained" onClick={setGenerated}>
                            Generate PDF
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {generated && (
                            <PDFDownloadLink
                                document={
                                    <VisaInvitationPDF
                                        date={moment().format('DD.MM.YYYY')}
                                        granteeFirstName={firstName.value}
                                        granteeLastName={lastName.value}
                                        granteeNationality={nationality.value}
                                        granteePassportNo={passportNo.value}
                                        profession={profession.value}
                                        arrivalCity={arrivalCity}
                                        arrivalCountry={arrivalCountry}
                                        arrivalDate={moment(arrivalDate.value).format('DD.MM.YYYY')}
                                    />
                                }
                                fileName="visa_invitation_letter.pdf"
                            >
                                <Button fullWidth color="primary" variant="contained">
                                    Download PDF
                                </Button>
                            </PDFDownloadLink>
                        )}
                    </Grid>
                </Grid>
            </Drawer>
            <Button color="primary" variant="contained" onClick={setVisible}>
                Generate
            </Button>
        </React.Fragment>
    );
};

const mapState = state => ({
    registration: DashboardSelectors.registration(state)
});

export default connect(mapState)(VisaInvitationDrawer);

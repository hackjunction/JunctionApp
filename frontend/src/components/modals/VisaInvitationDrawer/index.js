import React, { useState, useCallback, useEffect } from 'react'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Typography, Grid, Drawer, Box } from '@material-ui/core'

import TextInput from 'components/inputs/TextInput'
import DateInput from 'components/inputs/DateInput'
import Button from 'components/generic/Button'
import { useFormField } from 'hooks/formHooks'

import VisaInvitationPDF from './VisaInvitationPDF'
import * as DashboardSelectors from 'redux/dashboard/selectors'

export default () => {
    const registration = useSelector(DashboardSelectors.registration)

    const [visible, setVisible] = useState(false)
    const firstName = useFormField('')
    const lastName = useFormField('')
    const nationality = useFormField('')
    const passportNo = useFormField('')
    const profession = useFormField('')
    const arrivalDate = useFormField(Date.now())
    const arrivalCity = 'Helsinki'
    const arrivalCountry = 'Finland'

    useEffect(() => {
        if (registration?.answers) {
            firstName.setValue(registration?.answers?.firstName)
            lastName.setValue(registration?.answers?.lastName)
            nationality.setValue(registration?.answers?.nationality)
        }
    }, [registration])

    const [generated, setGenerated] = useState(false)

    const handleClose = useCallback(() => {
        setVisible(false)
    }, [])

    // <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
    //     {sideList('right')}
    // </Drawer>

    return (
        <>
            <Drawer
                anchor="right"
                width={640}
                onClose={handleClose}
                open={visible}
            >
                <Box p={3} width="100%" maxWidth={640}>
                    <Typography variant="body1" color="textPrimary" paragraph>
                        Just fill in a few more travel details and we'll
                        generate a visa invitation letter for you. We will not
                        save this information for later use - in fact it is
                        never sent anywhere from your device.
                    </Typography>
                    <Typography variant="body1" color="textPrimary" paragraph>
                        Once you've generated the visa invitation letter, double
                        check it to make sure all of the information is correct.
                        You can always generate a new invitation should you need
                        to.
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextInput
                                label="First name"
                                value={firstName.value}
                                onChange={firstName.setValue}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput
                                label="Last name"
                                value={lastName.value}
                                onChange={lastName.setValue}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput
                                label="Nationality"
                                value={nationality.value}
                                onChange={nationality.setValue}
                            />
                            <Typography
                                width="100%"
                                variant="caption"
                                color="textSecondary"
                            >
                                "E.g. 'Finnish', 'American', 'German'"
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput
                                label="Passport Number"
                                value={passportNo.value}
                                onChange={passportNo.setValue}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput
                                label="Profession"
                                value={profession.value}
                                onChange={profession.setValue}
                            />
                            <Typography
                                width="100%"
                                variant="caption"
                                color="textSecondary"
                            >
                                E.g. "Student at Aalto University" / "Employed
                                at BigCorp Inc.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" color="textSecondary">
                                Date of arrival
                            </Typography>
                            <DateInput
                                value={arrivalDate.value}
                                onChange={arrivalDate.setValue}
                            />
                            <Typography variant="caption" color="textSecondary">
                                The date you will be arriving to the country
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                color="primary"
                                variant="contained"
                                onClick={setGenerated}
                            >
                                Generate PDF
                            </Button>
                            <Box p={1} />
                            <Button
                                variant="contained"
                                color="theme_lightgray"
                                fullWidth
                                onClick={handleClose}
                            >
                                Close
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
                                            granteeNationality={
                                                nationality.value
                                            }
                                            granteePassportNo={passportNo.value}
                                            profession={profession.value}
                                            arrivalCity={arrivalCity}
                                            arrivalCountry={arrivalCountry}
                                            arrivalDate={moment(
                                                arrivalDate.value
                                            ).format('DD.MM.YYYY')}
                                        />
                                    }
                                    fileName="visa_invitation_letter.pdf"
                                >
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                    >
                                        Download PDF
                                    </Button>
                                </PDFDownloadLink>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
            <Button
                color="theme_white"
                variant="contained"
                onClick={setVisible}
            >
                Generate Visa Invitation
            </Button>
        </>
    )
}

import React, { useState, useCallback } from 'react';
import styles from './VisaInvitationDrawer.module.scss';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { connect } from 'react-redux';
import moment from 'moment';

import { Drawer, Input, Button as AntButton } from 'antd';

import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';
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
    const arrivalDate = useFormField('');
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
                <p className={styles.label}>
                    Just fill in a few more travel details and we'll generate a visa invitation letter for you. We will
                    not save this information for later use - in fact it is never sent anywhere from your device.
                    <br />
                    <br />
                    Once you've generated the visa invitation letter, double check it to make sure all of the
                    information is correct. You can always generate a new invitation should you need to.
                </p>
                <Divider size={1} />
                <label className={styles.label}>First name</label>
                <Input size="large" {...firstName} />
                <Divider size={1} />
                <label className={styles.label}>Last name</label>
                <Input size="large" {...lastName} />
                <Divider size={1} />
                <label className={styles.label}>Nationality</label>
                <Input size="large" {...nationality} />
                <span className={styles.hint}>E.g. "Finnish", "American", "German"</span>
                <Divider size={1} />
                <label className={styles.label}>Passport Number</label>
                <Input size="large" {...passportNo} />
                <Divider size={1} />
                <label className={styles.label}>Profession</label>
                <Input size="large" {...profession} />
                <span className={styles.hint}>E.g. "Student at Aalto University" / "Employed at BigCorp Inc."</span>
                <Divider size={1} />
                <label className={styles.label}>Arrival date</label>
                <Input size="large" {...arrivalDate} placeholder="DD.MM.YYYY" />
                <span className={styles.hint}>The date of your arrival to the country</span>
                <Divider size={1} />
                <AntButton type="secondary" size="large" block onClick={setGenerated}>
                    Generate PDF
                </AntButton>
                <Divider size={1} />
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
                                arrivalDate={arrivalDate.value}
                            />
                        }
                        fileName="visa_invitation_letter.pdf"
                    >
                        <AntButton type="primary" size="large" block>
                            Download PDF
                        </AntButton>
                    </PDFDownloadLink>
                )}
            </Drawer>
            <Button text="Generate" button={{ onClick: setVisible }}></Button>
        </React.Fragment>
    );
};

const mapState = state => ({
    registration: DashboardSelectors.registration(state)
});

export default connect(mapState)(VisaInvitationDrawer);

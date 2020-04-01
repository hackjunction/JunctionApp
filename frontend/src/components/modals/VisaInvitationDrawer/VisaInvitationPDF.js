import React from 'react'
import {
    Page,
    Text,
    Image,
    Document,
    StyleSheet,
    Font,
} from '@react-pdf/renderer'
import config from 'constants/config'
// TODO: Make dynamic
Font.register({
    family: 'Montserrat',
    src:
        'https://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf',
    fontWeight: 'bold',
})
Font.register({
    family: 'Lato',
    src: 'https://fonts.gstatic.com/s/lato/v13/v0SdcGFAl2aezM9Vq_aFTQ.ttf',
    fontWeight: 'light',
})

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    topLeftLogo: {
        width: 200,
    },
    topRightTitle: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily: 'Montserrat',
        textAlign: 'right',
    },
    topRightItem: {
        fontSize: 13,
        fontFamily: 'Lato',
        textAlign: 'right',
    },
    paragraph: {
        fontSize: 13,
        fontFamily: 'Lato',
        marginBottom: 16,
    },
    signature: {
        width: 200,
    },
})

const VisaInvitationPDF = ({
    hostName = 'Karoliina Pellinen',
    hostAddress = 'Junction Oy (2823785-1)',
    hostAddress2 = 'PL1188, 00101 Helsinki',
    hostPhone = '+358 45 2318287',
    hostEmail = 'karoliina.pellinen@hackjunction.com',
    hostTitle = 'Head of Participants',
    hostCompany = 'Junction Oy',
    date = '',
    granteeFirstName = '',
    granteeLastName = '',
    granteeNationality = '',
    granteePassportNo = '',
    profession = '',
    arrivalCity = 'Helsinki',
    arrivalCountry = 'Finland',
    arrivalDate = '',
}) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Image style={styles.topLeftLogo} src={config.LOGO_DARK_URL} />
            <Text style={styles.topRightTitle}>{hostName}</Text>
            <Text style={styles.topRightItem}>{hostAddress}</Text>
            <Text style={styles.topRightItem}>{hostAddress2}</Text>
            <Text style={styles.topRightItem}>{hostPhone}</Text>
            <Text style={styles.topRightItem}>{hostEmail}</Text>
            <Text style={styles.paragraph}>{date}</Text>
            <Text style={styles.paragraph}>Dear Madame/Sir,</Text>
            <Text style={styles.paragraph}>
                We hereby kindly ask you to issue Visitor Schengen Visa with one
                entry for {granteeFirstName} {granteeLastName},{' '}
                {granteeNationality}, bearer of passport number{' '}
                {granteePassportNo}.
            </Text>
            <Text style={styles.paragraph}>
                {granteeFirstName}, {profession}, will arrive in {arrivalCity},{' '}
                {arrivalCountry} on {arrivalDate}.
            </Text>
            <Text style={styles.paragraph}>
                During their stay in {arrivalCountry}, {granteeFirstName} will
                be hosted at the Aalto University campus (Väre & School of
                Business Building), Otaniementie 14, 02150 Espoo, and will be
                attending the following events organised by Junction:
            </Text>
            <Text style={styles.paragraph}>
                1) Junction 2019, from November 15th to 17th 2019
            </Text>
            <Text style={styles.paragraph}>
                2) Optional Junction 2019 pre-events (networking & conferences),
                from November 11th to 15th 2019
            </Text>
            <Text style={styles.paragraph}>
                We have arranged accommodation for {granteeFirstName} for the
                duration of the above events, and participation in the events is
                supported by Junction. We also invite {granteeFirstName} to get
                to know {arrivalCity} at their leisure and attend complementary
                events such as those organised by Slush during the week after,
                November 18th to 25th.
            </Text>
            <Text style={styles.paragraph}>Sincerely,</Text>
            <Image
                style={styles.signature}
                src={require('assets/images/visa_signature.jpg')}
            />
            <Text style={styles.paragraph}>{hostName}</Text>
            <Text style={styles.paragraph}>
                {hostTitle}, {hostCompany}
            </Text>
        </Page>
    </Document>
)

export default VisaInvitationPDF

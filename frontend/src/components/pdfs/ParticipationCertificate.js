import React from 'react'
import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
    Font,
} from '@react-pdf/renderer'
import MiscUtils from 'utils/misc'
import config from 'constants/config'

Font.register({
    family: 'Montserrat',
    src:
        'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD-_x3rCs.ttf',
    fontWeight: 'bold',
})
Font.register({
    family: 'Lato',
    src: 'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh7USSwiPHA3q5d0.ttf',
})

Font.registerHyphenationCallback(word => [word])

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '16pt',
        position: 'relative',
        boxSizing: 'border-box',
    },
    outer: {
        flex: 1,
        borderWidth: '4pt',
        borderColor: '#232323',
        borderStyle: 'solid',
        display: 'flex',
        padding: '6pt',
    },
    outer2: {
        flex: 1,
        borderWidth: '3pt',
        borderColor: '#232323',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px 50px',
        position: 'relative',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '21pt',
        fontWeight: 'bold',
    },
    eventName: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '42pt',
        fontWeight: 'bold',
    },
    date: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '21pt',
        fontWeight: 'bold',
    },
    preName: {
        marginTop: '80px',
        textAlign: 'center',
        fontFamily: 'Lato',
    },
    name: {
        textAlign: 'center',
        fontSize: '42pt',
        fontFamily: 'Montserrat',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        lineHeight: 0.9,
        marginBottom: '3px',
    },
    nameSmall: {
        textAlign: 'center',
        fontSize: '32pt',
        fontFamily: 'Montserrat',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    postName: {
        marginTop: '10px',
        textAlign: 'center',
        fontFamily: 'Lato',
    },
    footer: {
        marginTop: '80pt',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: '16pt',
    },
    logoWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: '52pt',
        objectFit: 'contain',
    },
    footerLink: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '16pt',
        fontFamily: 'Montserrat',
        marginTop: '10px',
    },
})

// TODO make this agnostic to PLATFORM_OWNER_CONFIG
const ParticipationCertificate = ({ event, project, userProfile }) => {
    if (!event) return null

    const name = `${userProfile.firstName} ${userProfile.lastName}`
    const nameStyle = name.length > 17 ? styles.nameSmall : styles.name
    const postName =
        project && project.name
            ? `for participating in ${event.name} with the project ${project.name}`
            : `for participating in ${event.name}`
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap={false}>
                <View style={styles.outer} wrap={false}>
                    <View style={styles.outer2} wrap={false}>
                        <View style={styles.logoWrapper}>
                            <Image
                                src={config.LOGO_DARK_URL}
                                style={styles.logo}
                            />
                        </View>
                        <Text style={styles.title}>
                            Certificate of participation
                        </Text>
                        <Text style={styles.eventName}>{event.name}</Text>
                        <Text style={styles.date}>
                            {MiscUtils.formatDateInterval(
                                event.startTime,
                                event.endTime,
                            )}
                        </Text>
                        <Text style={styles.preName}>
                            This certificate is proudly presented to
                        </Text>
                        <Text style={nameStyle}>{name}</Text>
                        <Text style={styles.postName}>{postName}</Text>
                        <Text style={styles.footer}>
                            Junction is the world's leading hackathon organiser
                            and a global community of hackers. Our mission is to
                            empower people to create with technology.
                        </Text>
                        <Text style={styles.footerLink}>hackjunction.com</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default ParticipationCertificate

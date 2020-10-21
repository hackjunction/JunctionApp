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
})
Font.register({
    family: 'Lato',
    src: 'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh7USSwiPHA3q5d0.ttf',
})

Font.registerHyphenationCallback(word => [word])

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#F4D1A1',
        padding: '2pt 16pt ',
        position: 'relative',
        boxSizing: 'border-box',
    },
    outer: {
        flex: 1,
        // borderWidth: '4pt',
        // borderColor: '#232323',
        // borderStyle: 'solid',
        display: 'flex',
        padding: '6pt',
    },
    outer2: {
        flex: 1,
        // borderWidth: '3pt',
        // borderColor: '#232323',
        // borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2px 50px',
        position: 'relative',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1C2F5C',
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
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#1C2F5C',
    },
    preName: {
        marginTop: '80px',
        textAlign: 'center',
        fontFamily: 'Lato',
        color: '#1C2F5C',

        fontSize: 13,
    },
    name: {
        textAlign: 'center',
        fontSize: '42pt',
        fontFamily: 'Montserrat',

        fontWeight: 'bold',
        lineHeight: 0.9,
        margin: '5pt 0 5pt',
        color: '#1C2F5C',
    },
    nameSmall: {
        textAlign: 'center',
        fontSize: '32pt',
        fontFamily: 'Montserrat',

        fontWeight: 'bold',
        color: '#1C2F5C',
        margin: '3px 0 3px',
    },
    postName: {
        marginTop: '15px',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 13,

        color: '#1C2F5C',
    },
    footer: {
        // padding: '80pt',

        // marginTop: '80pt',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 12,
        color: '#1C2F5C',
        position: 'absolute',
        bottom: 90,
        left: 100,
        right: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
    },
    logo: {
        height: '70pt',
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
    connected: {
        // fontWeight: 'bold',
        marginVertical: 25,
        marginHorizontal: 100,
        // height: '60pt',
        objectFit: 'contain',
    },
    image: {},
    upper: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '70pt',
    },
    junction: {
        fontWeight: 600,
    },
    upperRings: {
        position: 'absolute',
        height: 250,

        objectFit: 'contain',
        left: -22,
        top: 0,
        zIndex: 10,
    },
    lowerRings: {
        position: 'absolute',
        height: 250,

        objectFit: 'contain',
        right: -22,
        bottom: -8,
        zIndex: 10,
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
                        <View style={styles.upperRings}>
                            <Image src="https://res.cloudinary.com/hackjunction/image/upload/v1603291704/misc_assets/Group.png" />
                        </View>
                        <Text style={styles.title}>
                            Certificate of Participation
                        </Text>

                        {/* <Text style={styles.eventName}>{event.name}</Text> */}
                        <View style={styles.connected}>
                            <Image
                                src="https://res.cloudinary.com/hackjunction/image/upload/v1603284923/misc_assets/logo.png"
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.date}>
                            {MiscUtils.formatDateInterval(
                                event.startTime,
                                event.endTime,
                            )}
                        </Text>

                        <Text style={styles.preName}>
                            This certificate is proudly presented to:
                        </Text>
                        <Text style={nameStyle}>{name}</Text>
                        <Text style={styles.postName}>{postName}</Text>
                        <View style={styles.logoWrapper}>
                            <Image
                                src={config.EMBLEM_DARK_URL}
                                style={styles.logo}
                            />
                        </View>
                        <Text style={styles.footer}>
                            <strong style={styles.junction}>Junction</strong> is
                            the world's leading hackathon organiser and a global
                            community of hackers. Our mission is to empower
                            people to create with technology.
                        </Text>

                        <View style={styles.lowerRings}>
                            <Image
                                src="https://res.cloudinary.com/hackjunction/image/upload/v1603291704/misc_assets/Groupsecond.png"
                                style={styles.image}
                            />
                        </View>
                        {/* <Text style={styles.footerLink}>hackjunction.com</Text> */}
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default ParticipationCertificate

import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Montserrat',
    src: 'http://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD-_x3rCs.ttf',
    fontWeight: 'bold'
});
Font.register({
    family: 'Lato',
    src: 'http://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh7USSwiPHA3q5d0.ttf',
    fontWeight: 'light'
});

Font.registerHyphenationCallback(word => [word]);

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '16pt'
    },
    outer: {
        flex: 1,
        borderWidth: '4pt',
        borderColor: '#232323',
        borderStyle: 'solid',
        display: 'flex',
        padding: '6pt'
    },
    outer2: {
        flex: 1,
        borderWidth: '3pt',
        borderColor: '#232323',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20pt'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '21pt',
        fontWeight: 'bold'
    },
    eventName: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '42pt',
        fontWeight: 'bold'
    },
    date: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '21pt',
        fontWeight: 'bold'
    },
    preName: {
        marginTop: '80pt',
        textAlign: 'center',
        fontFamily: 'Lato'
    },
    name: {
        textAlign: 'center',
        fontSize: '42pt',
        fontFamily: 'Montserrat',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    postName: {
        textAlign: 'center',
        fontFamily: 'Lato'
    },
    footer: {
        marginTop: '80pt',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: '16pt'
    },
    footerLink: {
        textAlign: 'center',
        marginTop: '10pt',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '16pt',
        fontFamily: 'Montserrat'
    }
});

const ParticipationCertificate = ({ event }) => {
    if (!event) return null;
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap={false}>
                <View style={styles.outer} wrap={false}>
                    <View style={styles.outer2} wrap={false}>
                        <Text style={styles.title}>Certificate of participation</Text>
                        <Text style={styles.eventName}>{event.name}</Text>
                        <Text style={styles.date}>November 15-17, 2019</Text>
                        <Text style={styles.preName}>This certificate is proudly presented to</Text>
                        <Text style={styles.name}>Marvin Howard</Text>
                        <Text style={styles.postName}>For participating in Junction 2019</Text>
                        <Text style={styles.footer}>
                            Junction is the world's leading hackathon organiser and a global community of hackers. Our
                            mission is to empower people to create with technology.
                        </Text>
                        <Text style={styles.footerLink}>hackjunction.com</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default ParticipationCertificate;

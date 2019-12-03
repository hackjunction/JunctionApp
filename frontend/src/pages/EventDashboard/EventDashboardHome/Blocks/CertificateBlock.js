import React from 'react';

import { connect } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import { PDFViewer } from '@react-pdf/renderer';

import GradientBox from 'components/generic/GradientBox';
import { Typography } from '@material-ui/core';

import * as DashboardSelectors from 'redux/dashboard/selectors';

import ParticipationCertificate from 'components/pdfs/ParticipationCertificate';

const CertificateBlock = ({ event }) => {
    return (
        <Grid item xs={12}>
            <GradientBox p={2} color="theme_white">
                <Typography variant="h4">Participation certificate</Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet. Lorem ipsum dolor sit amet.
                </Typography>
                <Box margin="0 auto" width="100%" maxWidth="600px" padding={2}>
                    <Box width="100%" paddingTop="141.4%" position="relative">
                        <PDFViewer
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            size="A4"
                        >
                            <ParticipationCertificate event={event} />
                        </PDFViewer>
                    </Box>
                </Box>
            </GradientBox>
        </Grid>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state)
});

export default connect(mapState)(CertificateBlock);

import React from 'react'

import { Box, Grid } from '@material-ui/core'

import PageHeader from 'components/generic/PageHeader'

import RegistrationStatusBlock from './Blocks/RegistrationStatusBlock'
import ProjectBlock from './Blocks/ProjectBlock'
import TeamStatusBlock from './Blocks/TeamStatusBlock'
import VisaInvitationBlock from './Blocks/VisaInvitationBlock'
import TravelGrantStatusBlock from './Blocks/TravelGrantStatusBlock'
import GavelReviewingBlock from './Blocks/GavelReviewingBlock'
import PartnerReviewingBlock from './Blocks/PartnerReviewingBlock'
import ReviewingPeriodBlock from './Blocks/ReviewingPeriodBlock'
import CertificateBlock from './Blocks/CertificateBlock'
import EventOverBlock from './Blocks/EventOverBlock'

export default () => {
    return (
        <Box>
            <PageHeader heading="Dashboard" />
            <Box mt={2} />
            <Grid container spacing={5}>
                <EventOverBlock />
                <CertificateBlock />
                <ReviewingPeriodBlock />
                <RegistrationStatusBlock />
                <TravelGrantStatusBlock />
                <VisaInvitationBlock />
                <ProjectBlock />
                <TeamStatusBlock />
                <GavelReviewingBlock />
                <PartnerReviewingBlock />
            </Grid>
        </Box>
    )
}

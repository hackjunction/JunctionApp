import React from 'react'
import { Box, Divider, Grid } from '@material-ui/core'

import MentorSection from './MentorSection'
import GradientBox from 'components/generic/GradientBox'

const MentorDetail = ({ mentor, redeemable = false }) => {
    return (
        <Grid item xs={4} md={4}>
            <GradientBox color="theme_white" p={3}>
                <MentorSection
                    name={mentor.name}
                    email={mentor.email}
                    phoneNumber={mentor.phoneNumber}
                    link={mentor.link}
                />
            </GradientBox>
        </Grid>
    )
}
export default MentorDetail

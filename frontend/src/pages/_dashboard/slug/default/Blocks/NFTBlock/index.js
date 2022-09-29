import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import GradientBox from 'components/generic/GradientBox'
import { useNavigation } from 'flow/hooks/useNavigation'

const NFTBlock = () => {
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const isJ22 = event.slug === 'junction-2022'
    /* const isValid = registration.isValid */
    const isValid = true

    const { content } = useNavigation()

    if (!isJ22 || !isValid) return null

    return (
        <Grid item xs={12}>
            <GradientBox p={3} color="theme_purple" radius={8}>
                <Typography variant="button">Mint NFT</Typography>
                {content}
            </GradientBox>
        </Grid>
    )
}

export default NFTBlock

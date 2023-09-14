import React from 'react'
import { Box, Divider } from '@material-ui/core'

import CompanySection from './CompanySection'
import GradientBox from 'components/generic/GradientBox'

const HackerpackDetail = ({ hackerpack, redeemable = false }) => {
    return (
        <>
            <Box p={2}>
                <GradientBox color="theme_white" p={3}>
                    <CompanySection
                        name={hackerpack.name}
                        description={hackerpack.description}
                        icon={hackerpack.icon}
                        link={hackerpack.link}
                        //TODO: remove this after junction2021
                        redeemable
                    />
                </GradientBox>
            </Box>

            <Divider variant="middle" />
        </>
    )
}
export default HackerpackDetail

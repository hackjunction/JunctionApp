import React from 'react'
import { Box, Divider } from '@material-ui/core'

import CompanySection from './CompanySection'
import GradientBox from 'components/generic/GradientBox'

const HackerpackDetail = ({ partner }) => {
    return (
        <>
            <Box p={2}>
                <GradientBox color="theme_white" p={3}>
                    <CompanySection
                        name={partner.name}
                        description={partner.description}
                        icon={partner.icon}
                        link={partner.link}
                    />
                </GradientBox>
            </Box>

            <Divider variant="middle" />
        </>
    )
}
export default HackerpackDetail

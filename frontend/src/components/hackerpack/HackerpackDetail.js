import React from 'react'
import { Box, Divider } from '@material-ui/core'

import CompanySection from './CompanySection'

const HackerpackDetail = ({ partner }) => {
    return (
        <React.Fragment>
            <Box p={2}>
                <CompanySection
                    name={partner.name}
                    description={partner.description}
                    icon={partner.icon}
                    link={partner.link}
                />
            </Box>
            <Divider variant="middle" />
        </React.Fragment>
    )
}
export default HackerpackDetail

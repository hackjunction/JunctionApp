import React from 'react'
import { Box, Typography, Divider } from '@material-ui/core'

import CompanySection from './CompanySection'

import PageHeader from 'components/generic/PageHeader'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import CenteredContainer from 'components/generic/CenteredContainer'
import Partners from 'constants/hackerpack-partners.js'

export default () => {
    return (
        <PageWrapper
            loading={false}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
        >
            <CenteredContainer>
                <PageHeader
                    heading="Hackerpack"
                    subheading="We want you to be able to fully focus on making your hackathon project as cool as possible! These software provided by our partners will help you unleash your creativity and maximize your learning during our events."
                />
                <Divider variant="middle" />
                {Partners.map(company => (
                    <React.Fragment>
                        <Box p={2}>
                            <CompanySection
                                name={company.name}
                                description={company.description}
                                icon={company.icon}
                                link={company.link}
                            />
                        </Box>
                        <Divider variant="middle" />
                    </React.Fragment>
                ))}
                <Box p={2}>
                    <Typography color="textSecondary" variant="subtitle1">
                        Anything you would like to see here in the future?
                        Contact us at partnerships@hackjunction.com with your
                        suggestion.
                    </Typography>
                </Box>
            </CenteredContainer>
        </PageWrapper>

        // </React.Fragment>
    )
}

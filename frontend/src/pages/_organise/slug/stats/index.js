import React from 'react'

import { Typography } from '@material-ui/core'

import PageWrapper from 'components/layouts/PageWrapper'
import PageHeader from 'components/generic/PageHeader'

export default () => {
    return (
        <PageWrapper>
            <PageHeader
                heading="Stats"
                subheading="See detailed event statistics"
            />
            <Typography variant="subtitle1">
                This feature is undergoing some changes and is currently
                unavailable.
            </Typography>
        </PageWrapper>
    )
}

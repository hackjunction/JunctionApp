import React from 'react'

import { Typography } from '@material-ui/core'

import PageWrapper from 'components/layouts/PageWrapper'
import PageHeader from 'components/generic/PageHeader'

export default () => {
    return (
        <PageWrapper>
            <PageHeader
                heading="Travel Grants"
                subheading="Configure travel grants for this event"
            />
            <Typography variant="subtitle1">
                This feature is undergoing some changes and is currently
                unavailable.
            </Typography>
        </PageWrapper>
    )
}

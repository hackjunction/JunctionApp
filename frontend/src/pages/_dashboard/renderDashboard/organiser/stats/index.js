import React from 'react'
import config from 'constants/config'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import PageWrapper from 'components/layouts/PageWrapper'
import PageHeader from 'components/generic/PageHeader'
import * as OrganiseSelectors from 'redux/organiser/selectors'
var jwt = require('jsonwebtoken')


var METABASE_SITE_URL = config.METABASE_SITE_URL
var METABASE_SECRET_KEY = config.METABASE_SECRET_KEY

export default () => {
    const event = useSelector(OrganiseSelectors.event)
    var payload = {
        resource: { dashboard: 57 },
        params: { event: event.name },
        exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
    }
    var token = jwt.sign(payload, METABASE_SECRET_KEY)
    var iframeUrl =
        METABASE_SITE_URL +
        '/embed/dashboard/' +
        token +
        '#bordered=false&titled=false'

    return (
        <PageWrapper>
            <PageHeader
                heading="Stats"
                subheading="See detailed event statistics"
            />

            <Typography variant="subtitle1"></Typography>
            <iframe
                src={iframeUrl}
                frameBorder={0}
                width={1200}
                height={2500}
                allowTransparency
            />
        </PageWrapper>
    )
}

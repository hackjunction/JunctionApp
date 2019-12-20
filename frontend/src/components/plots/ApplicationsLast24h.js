import React from 'react'

import Statistic from 'components/generic/Statistic'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'

export default () => {
    const value = useSelector(OrganiserSelectors.registrationsLast24h)
    return <Statistic label="Applications in the last 24h" value={value} />
}

import React from 'react'

import Statistic from 'components/generic/Statistic'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'reducers/organiser/selectors'

export default () => {
    const value = useSelector(OrganiserSelectors.percentReviewed) ?? 0
    return <Statistic label="Reviewed" value={value.toFixed(2)} suffix={'%'} />
}

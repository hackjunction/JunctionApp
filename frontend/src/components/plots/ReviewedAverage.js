import React from 'react'

import Statistic from 'components/generic/Statistic'
import StarIcon from '@material-ui/icons/Star'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'

export default () => {
    const value = useSelector(OrganiserSelectors.averageRating)
    return (
        <Statistic
            label="Avg. Rating"
            value={value.toFixed(2)}
            suffix={<StarIcon />}
        />
    )
}

import React from 'react'
import PropTypes from 'prop-types'
import { LinearProgress, Typography, Box } from '@mui/material'
import clsx from 'clsx'

const LinearProgressWithLabel = ({ value, title }) => {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress
                    variant="determinate"
                    value={value}
                    className={clsx('h-2 rounded-lg', 'bg-gray-200')}
                    classes={{
                        bar: clsx(
                            'rounded-lg',
                            'bg-gradient-to-r',
                            value <= 100 && `from-blue-300 to-blue-700`,
                        ),
                    }}
                />
            </Box>
            <Box minWidth={35}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                >{`${title}d left`}</Typography>
            </Box>
        </Box>
    )
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
    title: PropTypes.number.isRequired,
}

const ProgressBar = ({ start, end, current }) => {
    const startDate = Date.parse(start)
    const endDate = Date.parse(end)
    const currentDate = current ? Date.parse(current) : Date.now()

    let daysLeft
    let progress

    if (currentDate <= endDate && currentDate >= startDate) {
        daysLeft = Math.ceil(
            Math.abs(endDate - currentDate) / (1000 * 60 * 60 * 24),
        )
        progress =
            Math.abs((currentDate - startDate) / (endDate - startDate)) * 100
    } else if (currentDate > endDate) {
        daysLeft = 0
        progress = 100
    } else {
        daysLeft = Math.ceil(
            Math.abs(endDate - currentDate) / (1000 * 60 * 60 * 24),
        )
        progress = 0
    }

    return (
        <div className="h-2 rounded-lg">
            <LinearProgressWithLabel value={progress} title={daysLeft} />
        </div>
    )
}

export default ProgressBar

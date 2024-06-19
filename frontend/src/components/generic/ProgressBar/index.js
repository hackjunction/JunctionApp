import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// const BorderLinearProgress = withStyles((theme) => ({
//     root: {
//         height: 10,
//         borderRadius: 5,
//     },
//     colorPrimary: {
//         backgroundColor: theme.palette.theme_lightgray.main,
//     },
//     bar: {
//         borderRadius: 5,
//         backgroundColor: 'primary',
//     },
// }))(LinearProgress)

const useStyles = makeStyles(theme => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: '#efefef',
    },
    bar: ({ value }) => ({
        borderRadius: 5,
        background: `linear-gradient(90deg, #80b0ff ${
            100 - value
        }%, #0045B6 100%)`, //TODO: use colors from theme
    }),
}))

function LinearProgressWithLabel({ value, title }) {
    const classes = useStyles({ value })

    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress
                    classes={{ root: classes.root, bar: classes.bar }}
                    variant="determinate"
                    value={value}
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
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
    title: PropTypes.number.isRequired,
}

export default function ProgressBar({ start, end, current, event }) {
    const classes = useStyles()
    const startDate = Date.parse(start)
    const endDate = Date.parse(end)
    const currentDate = Date.now() //TODO: make this take time sectors into a count

    var daysLeft
    var progress
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
        daysLeft = daysLeft = Math.ceil(
            Math.abs(endDate - currentDate) / (1000 * 60 * 60 * 24),
        )
        progress = 0
    }

    return (
        <div className={classes.root}>
            <LinearProgressWithLabel value={progress} title={daysLeft} />
        </div>
    )
}

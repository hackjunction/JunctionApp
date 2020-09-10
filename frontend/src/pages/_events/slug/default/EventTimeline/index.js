import React, { useMemo } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Typography,
} from '@material-ui/core'
import { sortBy } from 'lodash-es'
import moment from 'moment'
import MiscUtils from 'utils/misc'
import TimelineDot from 'components/generic/TimelineDot'

const useStyles = makeStyles(theme => ({
    root: {
        background: 'transparent',
    },
}))

const EventTimeline = ({ event }) => {
    const classes = useStyles()
    const timelineItems = useMemo(() => {
        const items = [
            {
                date: moment(event.registrationStartTime).format('MMMM D'),
                dateValue: moment(event.registrationStartTime).unix(),
                completed: moment(event.registrationStartTime).isBefore(),
                title: 'Application period begins',
                active: true,
            },
            {
                date: moment(event.registrationEndTime).format('MMMM D'),
                dateValue: moment(event.registrationEndTime).unix(),
                completed: moment(event.registrationEndTime).isBefore(),
                title: 'Application period ends',
                active: true,
            },
            {
                date: MiscUtils.formatDateInterval(
                    event.startTime,
                    event.endTime,
                ),
                dateValue: moment(event.startTime).unix(),
                completed: moment(event.endTime).isBefore(),
                title: event.name,
                active: true,
            },
        ]

        const sorted = sortBy(items, 'dateValue')

        return sorted
    }, [
        event.endTime,
        event.name,
        event.registrationEndTime,
        event.registrationStartTime,
        event.startTime,
    ])

    return (
        <Stepper className={classes.root} activeStep={0} orientation="vertical">
            {timelineItems.map(item => (
                <Step
                    key={item.date + item.title}
                    active={item.active}
                    completed={item.completed}
                >
                    <StepLabel StepIconComponent={TimelineDot}>
                        <Typography variant="button">{item.date}</Typography>
                    </StepLabel>
                    <StepContent>
                        <Typography variant="subtitle2">
                            {item.title}
                        </Typography>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    )
}

export default EventTimeline

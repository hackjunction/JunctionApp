import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
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
import StepConnector from '@material-ui/core/StepConnector'

const useStyles = makeStyles(theme => ({
    root: {
        background: 'transparent',
    },
    borderContent: {
        borderColor: props => props.accentColor || '#19DDEA',
        paddingTop: '8px',
        marginTop: '-9px',
        marginLeft: '6px',
        textTransform: 'uppercase',
        color: props => props.textColor,
    },
    date: {
        fontWeight: 'bold',
        paddingTop: '2px',
        fontSize: '18px',
    },
    label: {
        marginTop: '-9px',
        '& .MuiStepLabel-label': {
            color: props => props.textColor,
            opacity: 0.54,
        },
        '& .MuiStepLabel-active': {
            opacity: 0.87,
        },
    },
}))

const colorLibStyle = props => ({
    root: {
        marginLeft: '6px',
        paddingBottom: 0,
    },
    active: {
        '& $line': {
            borderColor: props => props.accent || '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: props => props.accent || '#784af4',
        },
    },
    line: {
        borderColor: props => props.accent || '#19DDEA',

        borderRadius: 1,
    },
    lineVertical: {
        borderColor: props => props.accent || '#19DDEA',
        padding: 0,

        borderRadius: 1,
    },
})

const ColorlibConnector = withStyles(colorLibStyle())(StepConnector)

ColorlibConnector.propTypes = {
    ...ColorlibConnector.propTypes,
    accent: PropTypes.string,
}
function differentYear(event) {
    const currentYear = moment()
    return (
        currentYear.diff(event.registrationStartTime, 'years') ||
        currentYear.diff(event.registrationEndTime, 'years') ||
        currentYear.diff(event.startTime, 'years') ||
        currentYear.diff(event.endTime, 'years')
    )
}
const EventTimeline = ({ event, textColor, accentColor = undefined }) => {
    const classes = useStyles({ accentColor, textColor })
    const dateString = differentYear(event) ? 'MMM D YYYY' : 'MMM D'
    const timelineItems = useMemo(() => {
        const realItems = event.eventTimeline.items.map(item => {
            return {
                date: moment(item.startTime).format(dateString),
                dateValue: moment(item.startTime).unix(),
                completed: moment(item.startTime).isBefore(),
                title: item.title,
                active: true,
            }
        })
        const items =
            realItems.length > 0
                ? realItems
                : [
                      {
                          date: moment(event.registrationStartTime).format(
                              dateString,
                          ),
                          dateValue: moment(event.registrationStartTime).unix(),
                          completed: moment(
                              event.registrationStartTime,
                          ).isBefore(),
                          title: 'Application period begins',
                          active: true,
                      },
                      {
                          date: moment(event.registrationEndTime).format(
                              dateString,
                          ),
                          dateValue: moment(event.registrationEndTime).unix(),
                          completed: moment(
                              event.registrationEndTime,
                          ).isBefore(),
                          title: 'Application period ends',
                          active: true,
                      },
                  ]

        if (realItems.length < 1) {
            if (
                moment(event.registrationEndTime).isBetween(
                    event.startTime,
                    event.endTime,
                )
            ) {
                items.push({
                    date: moment(event.startTime).format(dateString),
                    dateValue: moment(event.startTime).unix(),
                    completed: moment(event.startTime).isBefore(),
                    title: event.name + ' begins',
                    active: true,
                })
                items.push({
                    date: moment(event.endTime).format(dateString),
                    dateValue: moment(event.endTime).unix(),
                    completed: moment(event.endTime).isBefore(),
                    title: event.name + ' ends',
                    active: true,
                })
            } else {
                items.push({
                    date: MiscUtils.formatPDFDateInterval(
                        event.startTime,
                        event.endTime,
                    ),
                    dateValue: moment(event.startTime).unix(),
                    completed: moment(event.endTime).isBefore(),
                    title: event.name,
                    active: true,
                })
            }
        }

        const sorted = sortBy(items, 'dateValue')

        return sorted
    }, [
        dateString,
        event.endTime,
        event.eventTimeline,
        event.name,
        event.registrationEndTime,
        event.registrationStartTime,
        event.startTime,
    ])

    return (
        <Stepper
            className={classes.root}
            activeStep={0}
            orientation="vertical"
            connector={<ColorlibConnector accent={accentColor} />}
        >
            {timelineItems.map(item => (
                <Step
                    key={item.date + item.title}
                    active={item.active}
                    completed={item.completed}
                    expanded
                >
                    <StepLabel
                        StepIconComponent={props => (
                            <TimelineDot {...props} accentColor={accentColor} />
                        )}
                        className={classes.label}
                    >
                        <Typography variant="button" className={classes.date}>
                            {item.date}
                        </Typography>
                    </StepLabel>
                    <StepContent className={classes.borderContent}>
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

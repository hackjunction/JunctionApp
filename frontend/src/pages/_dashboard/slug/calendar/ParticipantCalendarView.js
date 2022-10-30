import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { BOOK_MEETING, CANCEL_MEETING } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { getMeetingSlotsWithPolling } from 'graphql/queries/meetings'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import MeetingCard from './MeetingCard'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import {
    CircularProgress,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from 'components/generic/PageHeader'
import MeetingLocationSelection from './MeetingLocationSelection'

const useStyles = makeStyles(theme => ({
    formWrapper: {
        width: '100%',
        marginBottom: '2em',
    },
    columns: {
        display: 'flex',
        width: '100%',
        height: 'max-content',
        overflowX: 'scroll',
    },
    column: noOfEventDays => ({
        width: noOfEventDays > 2 ? '33%' : '50%',
    }),
    columnDay: {
        fontWeight: 'bold',
        fontSize: '1.5em',
        margin: '0.5em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    columnContent: {
        height: '600px',
        padding: '0 0.5em',
    },
    iconVisible: {
        padding: '0.5em 0.25em 0.2em 0.4em',
        cursor: 'pointer',
        borderRadius: '0.5em',
        '&:hover': {
            backgroundColor: 'lightgray',
        },
    },
    iconHidden: {
        padding: '0.5em 0.25em 0.2em 0.4em',
        visibility: 'hidden',
    },
    info: {
        marginLeft: theme.spacing(0.5),
        fontSize: '1rem',
    },
    loadingOverlay: {
        width: '100%',
        minHeight: '100vh',
        background: 'rgba(255,255,255,0.6)',
        zIndex: 200,
        position: 'absolute',
        top: '0',
        left: '0',
    },
    loadingSpinner: {
        marginTop: '50%',
        marginLeft: '50%',
        transform: 'translateXY(-24px, -24px)',
    },
}))

export default ({ event, user }) => {
    const challenges = event.challenges
    const [challenge, setChallenge] = React.useState('')
    const [daysStartIndex, setDaysStartIndex] = useState(0)
    const [noOfDaysToShow, setNoOfDaysToShow] = useState(3)
    const dispatch = useDispatch()
    const [meetingsLoaded, setMeetingsLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showLocationSelection, setShowLocationSelection] = useState(false)
    const [meetingForLocationSelection, setMeetingForLocationSelection] =
        useState(null)
    const [openCard, setOpenCard] = useState('')

    const startDate = new Date(event.startTime)
    const endDate = new Date(event.endTime)
    const timeDifference = endDate.getTime() - startDate.getTime()
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))
    const eventDays = {}
    for (let i = 0; i < dayDifference; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        eventDays[date.toISOString().split('T')[0]] = []
    }
    const [meetings, loadingMeetings, error] = getMeetingSlotsWithPolling({
        eventId: event._id,
        from: event.startTime,
        to: event.endTime,
        challengeId: challenge,
    })
    useEffect(() => {
        setDays(eventDays)
        setMeetingsLoaded(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meetings])
    const [hasFutureBooking, setHasFutureBooking] = useState(false)
    const [days, setDays] = useState({})
    const classes = useStyles(dayDifference)
    const [cancelMeeting, cancelMeetingResult] = useMutation(CANCEL_MEETING, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to cancel meeting', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: true,
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to cancel meeting'))
            }
            setLoading(false)
        },
        onCompleted: res => {
            if (!res) {
                dispatch(SnackbarActions.error('Failed to cancel meeting'))
                setLoading(false)
                return
            }
            setTimeout(() => {
                setDays(eventDays)
                setMeetingsLoaded(false)
                setLoading(false)
                dispatch(
                    SnackbarActions.success('Meeting cancelled successfully'),
                )
            }, 500)
        },
    })
    const [bookMeeting, bookMeetingResult] = useMutation(BOOK_MEETING, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to book meeting', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: true,
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to book meeting'))
            }
            setLoading(false)
        },
        onCompleted: res => {
            if (!res) {
                dispatch(SnackbarActions.error('Failed to book meeting'))
            }
            setTimeout(() => {
                setDays(eventDays)
                setMeetingsLoaded(false)
                setLoading(false)
                setShowLocationSelection(false)
                dispatch(SnackbarActions.success('Meeting booked successfully'))
            }, 500)
        },
    })

    const handleChallengeChange = event => {
        if (event.target.value !== challenge) {
            // init days back to object with only days of event, but no meeting slots from challenge, as this will be repopulated
            setDays(eventDays)
            setMeetingsLoaded(false)
            setChallenge(event.target.value)
        }
    }

    var att = []
    const team = useSelector(DashboardSelectors.team)
    if (team) {
        att = [...team.members, team.owner]
    } else {
        att = [user.userId]
    }

    const bookMeetingAction = (meeting, location, partiComment) => {
        setLoading(true)
        console.log(partiComment)
        bookMeeting({
            variables: {
                meetingId: meeting._id,
                attendees: att,
                location: location,
                description: partiComment,
            },
        })
    }

    const sortMeetings = () => {
        if (!meetings || meetingsLoaded) return
        const daysObj = { ...days }
        meetings.forEach(meeting => {
            const meetingStartDate = new Date(meeting.startTime)
            const meetingDateStr = meetingStartDate.toISOString().split('T')[0]
            if (
                daysObj[meetingDateStr] &&
                (meeting.attendees.includes(user.userId) ||
                    meeting.attendees.length === 0)
            ) {
                daysObj[meetingDateStr] =
                    daysObj[meetingDateStr].concat(meeting)
            }
            if (
                meeting.attendees.includes(user.userId) &&
                new Date(meeting.startTime).getTime() > new Date().getTime()
            ) {
                setHasFutureBooking(true)
            }
        })
        setDays(daysObj)
    }

    const cancelMeetingAction = meeting => {
        setLoading(true)
        cancelMeeting({
            variables: { meetingId: meeting._id },
        })
        setHasFutureBooking(false)
    }

    if (meetings && !meetingsLoaded) {
        sortMeetings()
        setMeetingsLoaded(true)
    }

    const cardOnClick = id => {
        if (openCard === id) {
            setOpenCard('')
        } else {
            setOpenCard(id)
        }
    }
    const columnContent = meetings =>
        meetings ? (
            meetings.map((meeting, index) => (
                <MeetingCard
                    key={index}
                    startTime={meeting.startTime}
                    endTime={meeting.endTime}
                    booked={meeting.attendees.includes(user.userId)}
                    googleMeetLink={meeting.googleMeetLink}
                    cancelAction={() => {
                        cancelMeetingAction(meeting)
                    }}
                    hasFutureBooking={hasFutureBooking}
                    isOpen={openCard === meeting._id}
                    cardOnClick={() => {
                        cardOnClick(meeting._id)
                    }}
                    location={meeting.location}
                    showLocationSelection={() => {
                        setMeetingForLocationSelection(meeting)
                        setShowLocationSelection(true)
                    }}
                />
            ))
        ) : (
            <></>
        )

    const dayStr = dateStr => {
        const dateObj = new Date(dateStr)
        return `${dateObj.getDate()}.${dateObj.getMonth() + 1}.`
    }

    const showNextDayRange = index => {
        setDaysStartIndex(daysStartIndex + noOfDaysToShow)
    }

    const showPrevDayRange = index => {
        setDaysStartIndex(daysStartIndex - noOfDaysToShow)
    }

    const nextDayRangeButtonVisible = index =>
        index === noOfDaysToShow - 1 &&
        daysStartIndex + noOfDaysToShow < dayDifference

    const prevDayButtonVisible = index => index === 0 && daysStartIndex > 0

    return (
        <>
            {loading && (
                <div className={classes.loadingOverlay}>
                    <CircularProgress
                        size={48}
                        className={classes.loadingSpinner}
                    />
                </div>
            )}
            {showLocationSelection && (
                <MeetingLocationSelection
                    bookFunction={bookMeetingAction}
                    meetingInfo={meetingForLocationSelection}
                    attendeesCount={att.length + 1}
                    eventId={event._id}
                    close={() => {
                        setMeetingForLocationSelection(null)
                        setShowLocationSelection(false)
                    }}
                />
            )}
            <PageHeader
                heading="Meetings"
                subheading="Book a meeting with Partners to learn more about their Challenge."
            />
            {!challenge && (
                <div className={classes.info}>
                    Select a Challenge to see the available time slots.
                </div>
            )}
            <FormControl className={classes.formWrapper}>
                <InputLabel id="challenge-selection-label">
                    Challenge
                </InputLabel>
                <Select
                    labelId="challenge-selection-label"
                    id="challenge-selection"
                    value={challenge}
                    label="Choose a challenge"
                    onChange={handleChallengeChange}
                >
                    {challenges.map((c, index) => (
                        <MenuItem key={index} value={c._id}>
                            {c.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {challenge && (
                <div className={classes.columns}>
                    {days &&
                        Object.keys(days)
                            .slice(
                                daysStartIndex,
                                daysStartIndex + noOfDaysToShow,
                            )
                            .map((day, index) => {
                                const columnMeetings = days[day]
                                return (
                                    <div className={classes.column} key={day}>
                                        <div className={classes.columnDay}>
                                            <div
                                                onClick={() => {
                                                    prevDayButtonVisible(
                                                        index,
                                                    ) && showPrevDayRange(index)
                                                }}
                                                className={
                                                    prevDayButtonVisible(index)
                                                        ? classes.iconVisible
                                                        : classes.iconHidden
                                                }
                                            >
                                                <ArrowBackIosIcon />
                                            </div>
                                            <p>{dayStr(day)}</p>
                                            <div
                                                onClick={() => {
                                                    nextDayRangeButtonVisible(
                                                        index,
                                                    ) && showNextDayRange(index)
                                                }}
                                                className={
                                                    nextDayRangeButtonVisible(
                                                        index,
                                                    )
                                                        ? classes.iconVisible
                                                        : classes.iconHidden
                                                }
                                            >
                                                <ArrowForwardIosIcon />
                                            </div>
                                        </div>
                                        <div
                                            className={classes.columnContent}
                                            style={{
                                                borderRight:
                                                    index == noOfDaysToShow - 1
                                                        ? 'none'
                                                        : '1px solid lightgray',
                                            }}
                                        >
                                            {columnContent(columnMeetings)}
                                        </div>
                                    </div>
                                )
                            })}
                </div>
            )}
        </>
    )
}

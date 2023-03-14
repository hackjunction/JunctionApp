import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { MEETINGS_BULK_ACTION } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { getMeetingSlots } from 'graphql/queries/meetings'
import PartnerMeetingCard from './PartnerMeetingCard'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    CircularProgress,
} from '@material-ui/core'
import Button from 'components/generic/Button'
import { useDispatch } from 'react-redux'
import PageHeader from 'components/generic/PageHeader'

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
    saveButtonContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        padding: '1em',
        borderRadius: '1em',
        marginBottom: '0.5em',
        backgroundColor: theme.palette.grey[300],
    },
    colorInfo: {
        fontWeight: 'bold',
        display: 'flex',
        flexWrap: 'wrap',
    },
    infoAvailable: {
        display: 'block',
        width: '2em',
        height: '2em',
        borderRadius: '0.5em',
        marginRight: '0.5em',
        backgroundColor: theme.palette.primary.main,
    },
    infoNotAvailable: {
        display: 'block',
        width: '2em',
        height: '2em',
        borderRadius: '0.5em',
        marginRight: '0.5em',
        backgroundColor: theme.palette.grey[300],
    },
    infoBooked: {
        display: 'block',
        width: '2em',
        height: '2em',
        borderRadius: '0.5em',
        marginRight: '0.5em',
        backgroundColor: theme.palette.secondary.main,
    },
    colorInfoLine: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.25em',
    },
    loadingOverlay: {
        width: '100%',
        minHeight: '100vh',
        background: 'rgba(255,255,255,0.6)',
        zIndex: 100,
        position: 'absolute',
    },
    loadingSpinner: {
        marginTop: '50%',
        marginLeft: '50%',
        transform: 'translateXY(-24px, -24px)',
    },
    contentContianer: {
        display: 'absolute',
    },
    content: {
        position: 'relative',
    },
}))

const dailyPresetMeetings = () => {
    const dailyPresetMeetings = []
    for (let hour = 8; hour < 20; hour++) {
        dailyPresetMeetings.push(
            {
                startHour: hour,
                startMin: 0,
                endHour: hour,
                endMin: 30,
                attendees: [],
                googleMeetLink: null,
                available: false,
            },
            {
                startHour: hour,
                startMin: 30,
                endHour: hour + 1,
                endMin: 0,
                attendees: [],
                googleMeetLink: null,
                available: false,
            },
        )
    }
    return dailyPresetMeetings
}

export default ({ event }) => {
    const challenges = event.challenges
    const [challenge, setChallenge] = React.useState('')
    const [daysStartIndex, setDaysStartIndex] = useState(0)
    const [noOfDaysToShow, setNoOfDaysToShow] = useState(3)
    const [slotsToAdd, setSlotsToAdd] = useState({})
    const [slotsToDelete, setSlotsToDelete] = useState({})
    const dispatch = useDispatch()
    // const [loading, setLoading] = useState(true)
    const [meetingsLoaded, setMeetingsLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [meetings, meetingsLoading, meetingsError, refetch] = getMeetingSlots(
        {
            eventId: event._id,
            from: event.startTime,
            to: event.endTime,
            challengeId: challenge,
        },
    )

    const startDate = new Date(event.startTime)
    const endDate = new Date(event.endTime)
    const timeDifference = endDate.getTime() - startDate.getTime()
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))
    const eventDays = {}
    for (let i = 0; i < dayDifference; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        let dailySlots = dailyPresetMeetings()
        if (i === 0) {
            // drop those slots that are before event start / after event end
            dailySlots = dailySlots.filter(
                slot => slot.startHour >= new Date(event.startTime).getHours(),
            )
        }
        if (i === dayDifference - 1) {
            dailySlots = dailySlots.filter(
                slot => slot.startHour < new Date(event.endTime).getHours() + 1,
            )
        }
        eventDays[date.toISOString().split('T')[0]] = dailySlots
    }
    const [days, setDays] = useState(eventDays)
    const classes = useStyles(dayDifference)

    const [meetingsBulkAction, responses] = useMutation(MEETINGS_BULK_ACTION, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to save changes', {
                        errormessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: true,
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to save changes'))
            }
            setLoading(false)
        },
        onCompleted: data => {
            const created = data?.meetingSlotsBulkAction.created
            const deleted = data?.meetingSlotsBulkAction.deleted.deletedCount
            if (
                created.length === Object.keys(slotsToAdd).length &&
                deleted === Object.keys(slotsToDelete).length
            ) {
                dispatch(
                    SnackbarActions.success(
                        'Your changes were saved successfully',
                    ),
                )
                refetch()
                setTimeout(() => {
                    setDays(eventDays)
                    setMeetingsLoaded(false)
                    setSlotsToAdd({})
                    setSlotsToDelete({})
                    setLoading(false)
                }, 1000)
            } else {
                dispatch(
                    SnackbarActions.error(
                        'Failed to save changes, reloading page',
                    ),
                )
                setTimeout(() => {
                    setLoading(false)
                    window.location.reload()
                }, 500)
            }
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

    const populateExistingMeetings = () => {
        if (!meetings || meetingsLoaded) return
        const daysObj = { ...days }
        meetings.forEach(meeting => {
            const meetingStartDate = new Date(meeting.startTime)
            const meetingDateStr = meetingStartDate.toISOString().split('T')[0]
            if (daysObj[meetingDateStr]) {
                const dayMeetingsArrayClone = [...daysObj[meetingDateStr]]
                const meetingToUpdate = dayMeetingsArrayClone.find(
                    presetMeeting => {
                        return (
                            presetMeeting.startHour ===
                                meetingStartDate.getHours() &&
                            presetMeeting.startMin ===
                                meetingStartDate.getMinutes()
                        )
                    },
                )
                if (meetingToUpdate) {
                    meetingToUpdate.available = true
                    meetingToUpdate.location = meeting.location
                    meetingToUpdate._id = meeting._id
                    meetingToUpdate.attendees = meeting.attendees
                    meetingToUpdate.googleMeetLink =
                        meeting.googleMeetLink ?? null
                }
                daysObj[meetingDateStr] = dayMeetingsArrayClone
            }
        })
        setDays(daysObj)
    }

    if (meetings && !meetingsLoaded) {
        populateExistingMeetings()
        setMeetingsLoaded(true)
    }

    const changeSlotAvailability = (
        initiallyAvailable,
        meetingInput,
        makeAvailable,
        _id = null,
    ) => {
        const uniqueMeetingKey =
            meetingInput.startTime + '' + meetingInput.endTime
        const slotsToAddClone = { ...slotsToAdd }
        const slotsToDeleteClone = { ...slotsToDelete }

        if (initiallyAvailable && !makeAvailable) {
            // add this meeting to deleteArray
            slotsToDeleteClone[uniqueMeetingKey] = _id
            setSlotsToDelete(slotsToDeleteClone)
            return
        }
        if (!initiallyAvailable && makeAvailable) {
            // add this meeting to addArray
            slotsToAddClone[uniqueMeetingKey] = meetingInput
            setSlotsToAdd(slotsToAddClone)
            return
        }
        // do not change = remove from add and delete arrays
        delete slotsToDeleteClone[uniqueMeetingKey]
        delete slotsToAddClone[uniqueMeetingKey]
        setSlotsToAdd(slotsToAddClone)
        setSlotsToDelete(slotsToDeleteClone)
    }

    const columnContent = (meetings, dayStr) =>
        meetings ? (
            meetings.map((meetingObj, index) => {
                const startTime = new Date(dayStr)
                startTime.setHours(meetingObj.startHour)
                startTime.setMinutes(meetingObj.startMin)
                const endTime = new Date(dayStr)
                endTime.setHours(meetingObj.endHour)
                endTime.setMinutes(meetingObj.endMin)
                return (
                    <PartnerMeetingCard
                        key={index}
                        _id={meetingObj._id}
                        startHour={meetingObj.startHour}
                        startMin={meetingObj.startMin}
                        endHour={meetingObj.endHour}
                        endMin={meetingObj.endMin}
                        attendees={meetingObj.attendees}
                        googleMeetLink={meetingObj.googleMeetLink}
                        location={meetingObj.location}
                        // initiallyAvailable has the current state from db, either available or not, this is used to check if available needs to be added or removed when changed
                        initiallyAvailable={meetingObj.available}
                        changeSlotAvailability={changeSlotAvailability}
                        meetingInput={{
                            event: event._id,
                            startTime: startTime.toISOString(),
                            endTime: endTime.toISOString(),
                            challenge,
                        }}
                    />
                )
            })
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

    const submitChanges = () => {
        setLoading(true)
        meetingsBulkAction({
            variables: {
                create: Object.values(slotsToAdd),
                delete: Object.values(slotsToDelete),
            },
        })
    }

    const showSaveButton = () =>
        Object.keys(slotsToAdd).length > 0 ||
        Object.keys(slotsToDelete).length > 0

    const colorInfoContainer = () => (
        <div className={classes.colorInfo}>
            <p className={classes.colorInfoLine}>
                <span className={classes.infoAvailable}></span> = available
            </p>
            <p className={classes.colorInfoLine}>
                <span className={classes.infoNotAvailable}></span> = not
                available
            </p>
            <p className={classes.colorInfoLine}>
                <span className={classes.infoBooked}></span> = booked py
                participant
            </p>
        </div>
    )

    const saveButtonContainer = () => (
        <div
            className={classes.saveButtonContainer}
            style={{
                visibility: showSaveButton() ? 'visible' : 'hidden',
            }}
        >
            <Button variant="contained" color="primary" onClick={submitChanges}>
                SAVE
            </Button>
        </div>
    )

    return (
        <div className={classes.content}>
            {loading && (
                <div className={classes.loadingOverlay}>
                    <CircularProgress
                        size={48}
                        className={classes.loadingSpinner}
                    />
                </div>
            )}
            <div className={classes.contentContianer}>
                <PageHeader
                    heading="Meetings"
                    subheading='Select the time slots which participants can book for a meeting with you. Online meetings will have a "Join meeting" button for the Google Meets call.'
                />
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
                            <MenuItem value={c._id} key={index}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {challenge && (
                    <>
                        {saveButtonContainer()}
                        {colorInfoContainer()}
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
                                            <div
                                                className={classes.column}
                                                key={day}
                                            >
                                                <div
                                                    className={
                                                        classes.columnDay
                                                    }
                                                >
                                                    <div
                                                        onClick={() => {
                                                            prevDayButtonVisible(
                                                                index,
                                                            ) &&
                                                                showPrevDayRange(
                                                                    index,
                                                                )
                                                        }}
                                                        className={
                                                            prevDayButtonVisible(
                                                                index,
                                                            )
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
                                                            ) &&
                                                                showNextDayRange(
                                                                    index,
                                                                )
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
                                                    className={
                                                        classes.columnContent
                                                    }
                                                    style={{
                                                        borderRight:
                                                            index ==
                                                            noOfDaysToShow - 1
                                                                ? 'none'
                                                                : '1px solid lightgray',
                                                    }}
                                                >
                                                    {columnContent(
                                                        columnMeetings,
                                                        day,
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
